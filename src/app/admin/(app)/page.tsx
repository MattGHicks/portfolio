import { db } from "@/db";
import { roles, applications, inboxMessages } from "@/db/schema";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import Link from "next/link";
import { TierBadge, StatusBadge, NarrativeBadge } from "@/components/admin/Badges";
import { formatSalary, formatRelative, remoteLabel } from "@/lib/format";

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
    awaitingApproval,
    tierS,
    tierA,
    recentActivity,
    unscored,
    unclassified,
  ] = await Promise.all([
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(applications)
      .where(eq(applications.status, "submitted")),
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
      .where(eq(applications.status, "pending_approval")),
    db
      .select()
      .from(roles)
      .where(and(eq(roles.tier, "S"), sql`status NOT IN ('archived', 'dropped', 'submitted', 'rejected')`))
      .orderBy(desc(roles.score), desc(roles.scoredAt))
      .limit(8),
    db
      .select()
      .from(roles)
      .where(and(eq(roles.tier, "A"), sql`status NOT IN ('archived', 'dropped', 'submitted', 'rejected')`))
      .orderBy(desc(roles.score), desc(roles.scoredAt))
      .limit(8),
    db
      .select({
        id: applications.id,
        roleId: applications.roleId,
        status: applications.status,
        submittedAt: applications.submittedAt,
        company: roles.company,
        title: roles.title,
        tier: roles.tier,
      })
      .from(applications)
      .innerJoin(roles, eq(roles.id, applications.roleId))
      .orderBy(desc(applications.submittedAt))
      .limit(6),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(roles)
      .where(eq(roles.status, "unscored")),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(inboxMessages)
      .where(sql`classification IS NULL`),
  ]);

  return {
    totalSubmitted: totalSubmitted[0]?.c ?? 0,
    submittedToday: todayCount[0]?.c ?? 0,
    submittedThisWeek: weekCount[0]?.c ?? 0,
    awaitingApproval: awaitingApproval[0]?.c ?? 0,
    tierS,
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
              Mid-level Product Designer hunt — remote-US, healthy culture, $140–180K target. Approvals required before submission.
            </p>
          </div>
        </div>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat">
          <div className="admin-stat-label">Submitted this hunt</div>
          <div className="admin-stat-value">{data.totalSubmitted}</div>
          <div className="admin-stat-sub">across the watchlist</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Today / cap</div>
          <div className="admin-stat-value">
            {data.submittedToday}<span style={{ color: "var(--text-on-dark-tertiary)", fontSize: "24px" }}> / {dayCap}</span>
          </div>
          <div className="admin-stat-sub">{dayCap - data.submittedToday} submissions remaining today</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Week / cap</div>
          <div className="admin-stat-value">
            {data.submittedThisWeek}<span style={{ color: "var(--text-on-dark-tertiary)", fontSize: "24px" }}> / {weekCap}</span>
          </div>
          <div className="admin-stat-sub">{weekCap - data.submittedThisWeek} remaining this week</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Awaiting approval</div>
          <div className="admin-stat-value" style={{ color: data.awaitingApproval > 0 ? "var(--status-pending-fg)" : undefined }}>
            {data.awaitingApproval}
          </div>
          <div className="admin-stat-sub">
            {data.awaitingApproval === 0 ? "queue is empty" : (
              <Link href="/admin/applications?status=pending_approval" style={{ color: "var(--color-blue)" }}>
                review queue →
              </Link>
            )}
          </div>
        </div>
      </div>

      {(data.unscored > 0 || data.unclassified > 0) && (
        <div className="admin-card admin-card-padded" style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {data.unscored > 0 && (
              <div>
                <div className="admin-stat-label" style={{ marginBottom: 4 }}>Needs Claude</div>
                <div style={{ fontSize: 14, color: "var(--text-on-dark-primary)" }}>
                  <strong style={{ color: "var(--tier-s-fg)" }}>{data.unscored}</strong> unscored role{data.unscored === 1 ? "" : "s"} — ask Claude to score
                </div>
              </div>
            )}
            {data.unclassified > 0 && (
              <div>
                <div className="admin-stat-label" style={{ marginBottom: 4 }}>Needs Claude</div>
                <div style={{ fontSize: 14, color: "var(--text-on-dark-primary)" }}>
                  <strong style={{ color: "var(--tier-s-fg)" }}>{data.unclassified}</strong> unclassified inbox message{data.unclassified === 1 ? "" : "s"}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <RoleSection
        label="Tier S — apply this week"
        eyebrow="bullseye fit"
        roles={data.tierS}
        emptyMessage="No Tier S roles in queue."
      />

      <RoleSection
        label="Tier A — actionable"
        eyebrow="strong fit"
        roles={data.tierA}
        emptyMessage="No Tier A roles in queue."
      />

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
              <div className="admin-empty-body">Once you submit applications, they'll show up here.</div>
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
                    <td className="is-mono is-secondary" style={{ textAlign: "right" }}>{formatRelative(row.submittedAt)}</td>
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

function RoleSection({
  label,
  eyebrow,
  roles,
  emptyMessage,
}: {
  label: string;
  eyebrow: string;
  roles: Array<{
    id: number;
    company: string;
    title: string;
    salaryMin: number | null;
    salaryMax: number | null;
    remotePolicy: string | null;
    tier: "S" | "A" | "B" | "drop" | null;
    score: number | null;
    narrativeBucket: string | null;
    status: string;
  }>;
  emptyMessage: string;
}) {
  return (
    <section className="admin-section">
      <div className="admin-section-header">
        <span className="admin-section-label">
          {label}
          <span style={{ marginLeft: 12, color: "var(--text-on-dark-tertiary)", textTransform: "none", letterSpacing: 0 }}>
            · {eyebrow}
          </span>
        </span>
        <span className="admin-section-count">{roles.length}</span>
      </div>

      {roles.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-eyebrow">Empty</div>
            <div className="admin-empty-body">{emptyMessage}</div>
          </div>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: "8px 20px" }}>
          <div className="admin-role-list">
            {roles.map((r) => (
              <Link key={r.id} href={`/admin/role/${r.id}`} className="admin-role-row">
                <div className="admin-role-row-main">
                  <div className="admin-role-row-company">{r.company}</div>
                  <div className="admin-role-row-title">{r.title} · {remoteLabel(r.remotePolicy)}</div>
                </div>
                <div className="admin-role-row-salary">{formatSalary(r.salaryMin, r.salaryMax)}</div>
                <NarrativeBadge bucket={r.narrativeBucket} />
                {r.score !== null ? (
                  <div className="admin-role-row-score">{r.score}</div>
                ) : (
                  <div style={{ width: 38 }} />
                )}
                <TierBadge tier={r.tier} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
