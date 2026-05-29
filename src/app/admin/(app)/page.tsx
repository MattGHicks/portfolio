import { db } from "@/db";
import { roles, applications, inboxMessages, drafts } from "@/db/schema";
import { and, desc, eq, gte, inArray, sql } from "drizzle-orm";
import Link from "next/link";
import { TierBadge, StatusBadge, NarrativeBadge } from "@/components/admin/Badges";
import { formatSalary, formatRelative, remoteLabel } from "@/lib/format";
import { OverviewActions } from "@/components/admin/OverviewActions";
import { ApplyButton } from "@/components/admin/ApplyButton";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const [
    totalSubmitted,
    todayCount,
    weekCount,
    inFlight,
    readyToApply,
    tierA,
    recentActivity,
    unscored,
    unclassified,
  ] = await Promise.all([
    db.select({ c: sql<number>`count(*)::int` }).from(applications).where(eq(applications.status, "submitted")),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(applications)
      .where(and(eq(applications.status, "submitted"), gte(applications.submittedAt, startOfDay))),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(applications)
      .where(and(eq(applications.status, "submitted"), gte(applications.submittedAt, startOfWeek))),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(applications)
      .where(inArray(applications.status, ["pending_approval", "approved", "submitting"])),
    // Ready to apply = actionable, ranked, has a draft, not yet in-flight/done.
    db
      .select({
        id: roles.id,
        company: roles.company,
        title: roles.title,
        salaryMin: roles.salaryMin,
        salaryMax: roles.salaryMax,
        remotePolicy: roles.remotePolicy,
        tier: roles.tier,
        score: roles.score,
        narrativeBucket: roles.narrativeBucket,
        status: roles.status,
        atsPlatform: roles.atsPlatform,
        sourceUrl: roles.sourceUrl,
        hasDraft: sql<boolean>`EXISTS (SELECT 1 FROM drafts d WHERE d.role_id = ${roles.id})`,
      })
      .from(roles)
      .where(
        and(
          inArray(roles.tier, ["S", "A"]),
          sql`${roles.status} IN ('scored', 'drafting', 'awaiting_approval')`
        )
      )
      .orderBy(
        sql`CASE WHEN tier = 'S' THEN 1 WHEN tier = 'A' THEN 2 ELSE 3 END`,
        desc(roles.score)
      )
      .limit(12),
    db
      .select()
      .from(roles)
      .where(and(eq(roles.tier, "A"), sql`status NOT IN ('archived', 'dropped', 'submitted', 'rejected', 'responded')`))
      .orderBy(desc(roles.score))
      .limit(6),
    db
      .select({
        id: applications.id,
        roleId: applications.roleId,
        status: applications.status,
        submittedAt: applications.submittedAt,
        createdAt: applications.createdAt,
        company: roles.company,
        title: roles.title,
        tier: roles.tier,
      })
      .from(applications)
      .innerJoin(roles, eq(roles.id, applications.roleId))
      .orderBy(desc(sql`COALESCE(${applications.submittedAt}, ${applications.createdAt})`))
      .limit(6),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "unscored")),
    db.select({ c: sql<number>`count(*)::int` }).from(inboxMessages).where(sql`classification IS NULL`),
  ]);

  return {
    totalSubmitted: totalSubmitted[0]?.c ?? 0,
    submittedToday: todayCount[0]?.c ?? 0,
    submittedThisWeek: weekCount[0]?.c ?? 0,
    inFlight: inFlight[0]?.c ?? 0,
    readyToApply,
    tierA,
    recentActivity,
    unscored: unscored[0]?.c ?? 0,
    unclassified: unclassified[0]?.c ?? 0,
  };
}

export default async function OverviewPage() {
  const data = await getDashboardData();
  const now = new Date();
  const dayCap = 3;
  const weekCap = 10;

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-row">
          <div>
            <div className="admin-page-eyebrow">Overview · {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</div>
            <h1 className="admin-page-title">Career Operations</h1>
            <p className="admin-page-subtitle">
              Mid-level Product Designer hunt — remote-US, healthy culture, $140–180K target. New roles are auto-found, auto-scored, and arrive draft-ready. Review &amp; apply in one click.
            </p>
          </div>
          <OverviewActions unscored={data.unscored} />
        </div>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat">
          <div className="admin-stat-label">Ready to apply</div>
          <div className="admin-stat-value" style={{ color: data.readyToApply.length > 0 ? "var(--tier-s-fg)" : undefined }}>
            {data.readyToApply.length}
          </div>
          <div className="admin-stat-sub">ranked &amp; draft-ready</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Today / cap</div>
          <div className="admin-stat-value">
            {data.submittedToday}<span style={{ color: "var(--text-on-dark-tertiary)", fontSize: "24px" }}> / {dayCap}</span>
          </div>
          <div className="admin-stat-sub">{Math.max(0, dayCap - data.submittedToday)} submissions left today</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">In flight</div>
          <div className="admin-stat-value" style={{ color: data.inFlight > 0 ? "var(--status-pending-fg)" : undefined }}>
            {data.inFlight}
          </div>
          <div className="admin-stat-sub">{data.inFlight === 0 ? "nothing pending" : "awaiting / submitting"}</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Submitted this hunt</div>
          <div className="admin-stat-value">{data.totalSubmitted}</div>
          <div className="admin-stat-sub">{data.submittedThisWeek}/{weekCap} this week</div>
        </div>
      </div>

      {/* Ready to apply — the action queue */}
      <section className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-label">
            Ready to apply
            <span style={{ marginLeft: 12, color: "var(--text-on-dark-tertiary)", textTransform: "none", letterSpacing: 0 }}>
              · ranked, draft-ready — one click to submit
            </span>
          </span>
          <span className="admin-section-count">{data.readyToApply.length}</span>
        </div>
        {data.readyToApply.length === 0 ? (
          <div className="admin-card">
            <div className="admin-empty">
              <div className="admin-empty-eyebrow">Queue empty</div>
              <div className="admin-empty-title">No ranked roles waiting</div>
              <div className="admin-empty-body">
                {data.unscored > 0
                  ? `${data.unscored} unscored role${data.unscored === 1 ? "" : "s"} — hit “Score ${data.unscored} unscored” above.`
                  : "Hit “Find new roles now” to scan the watchlist for fresh postings."}
              </div>
            </div>
          </div>
        ) : (
          <div className="admin-card" style={{ padding: "8px 20px" }}>
            <div className="admin-role-list">
              {data.readyToApply.map((r) => (
                <div key={r.id} className="admin-role-row" style={{ cursor: "default" }}>
                  <Link href={`/admin/role/${r.id}`} className="admin-role-row-main" style={{ textDecoration: "none" }}>
                    <div className="admin-role-row-company">{r.company}</div>
                    <div className="admin-role-row-title">{r.title} · {remoteLabel(r.remotePolicy)}</div>
                  </Link>
                  <div className="admin-role-row-salary">{formatSalary(r.salaryMin, r.salaryMax)}</div>
                  <NarrativeBadge bucket={r.narrativeBucket} />
                  {r.score !== null ? <div className="admin-role-row-score">{r.score}</div> : <div style={{ width: 38 }} />}
                  <TierBadge tier={r.tier} />
                  <span style={{ marginLeft: 8 }}>
                    <ApplyButton roleId={r.id} atsPlatform={r.atsPlatform} sourceUrl={r.sourceUrl} size="sm" label="Apply" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="admin-section">
        <div className="admin-section-header">
          <span className="admin-section-label">Recent activity</span>
          <span className="admin-section-count">last 6</span>
        </div>
        {data.recentActivity.length === 0 ? (
          <div className="admin-card">
            <div className="admin-empty">
              <div className="admin-empty-eyebrow">No activity</div>
              <div className="admin-empty-title">Quiet so far</div>
              <div className="admin-empty-body">Once you apply, submissions show up here.</div>
            </div>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Tier</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right" }}>When</th>
                </tr>
              </thead>
              <tbody>
                {data.recentActivity.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Link href={`/admin/role/${row.roleId}`} className="admin-table-link" style={{ fontWeight: 500 }}>
                        {row.company}
                      </Link>
                    </td>
                    <td className="is-secondary" style={{ maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.title}</td>
                    <td><TierBadge tier={row.tier} /></td>
                    <td><StatusBadge status={row.status} /></td>
                    <td className="is-mono is-secondary" style={{ textAlign: "right" }}>{formatRelative(row.submittedAt ?? row.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
