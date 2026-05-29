import Link from "next/link";
import { db } from "@/db";
import { roles } from "@/db/schema";
import { and, desc, eq, gte, inArray, or, like, sql } from "drizzle-orm";
import { TierBadge, NarrativeBadge } from "@/components/admin/Badges";
import { FilterChips, SearchInput } from "@/components/admin/Filters";
import { OverviewActions } from "@/components/admin/OverviewActions";
import { OpportunityActions } from "@/components/admin/OpportunityActions";
import { formatSalary, formatRelative, remoteLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OpportunitiesPage({
  searchParams,
}: {
  searchParams: { tier?: string; bucket?: string; q?: string };
}) {
  const tier = (searchParams.tier ?? "").split(",").filter(Boolean) as ("S" | "A" | "B")[];
  const bucket = (searchParams.bucket ?? "").split(",").filter(Boolean);
  const q = searchParams.q?.trim();

  const sinceYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const where = [eq(roles.status, "scored")] as any[];
  if (tier.length) where.push(inArray(roles.tier, tier));
  if (bucket.length) where.push(inArray(roles.narrativeBucket, bucket as any));
  if (q) where.push(or(like(roles.company, `%${q}%`), like(roles.title, `%${q}%`)));

  const [open, newTodayRows, unscoredRows, appliedTotalRows] = await Promise.all([
    db
      .select()
      .from(roles)
      .where(and(...where))
      .orderBy(sql`CASE WHEN tier='S' THEN 1 WHEN tier='A' THEN 2 WHEN tier='B' THEN 3 ELSE 4 END`, desc(roles.score), desc(roles.scoredAt)),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(and(eq(roles.status, "scored"), gte(roles.scoredAt, sinceYesterday))),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "unscored")),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "submitted")),
  ]);

  const newToday = newTodayRows[0]?.c ?? 0;
  const unscored = unscoredRows[0]?.c ?? 0;
  const appliedTotal = appliedTotalRows[0]?.c ?? 0;

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-row">
          <div>
            <div className="admin-page-eyebrow">Opportunities</div>
            <h1 className="admin-page-title">Open roles</h1>
            <p className="admin-page-subtitle">
              Auto-found across the watchlist, ranked by fit. Click <strong>Apply ↗</strong> to open the posting, then ✓ or ✕ to keep this list clean.
            </p>
          </div>
          <OverviewActions unscored={unscored} />
        </div>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat">
          <div className="admin-stat-label">Open opportunities</div>
          <div className="admin-stat-value" style={{ color: open.length > 0 ? "var(--tier-s-fg)" : undefined }}>{open.length}</div>
          <div className="admin-stat-sub">ranked & ready</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">New (24h)</div>
          <div className="admin-stat-value">{newToday}</div>
          <div className="admin-stat-sub">freshly discovered</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Applied</div>
          <div className="admin-stat-value">{appliedTotal}</div>
          <div className="admin-stat-sub"><Link href="/admin/applied" style={{ color: "var(--color-blue)" }}>view all →</Link></div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Unscored</div>
          <div className="admin-stat-value" style={{ color: unscored > 0 ? "var(--status-pending-fg)" : undefined }}>{unscored}</div>
          <div className="admin-stat-sub">{unscored > 0 ? "hit “Score” above" : "all ranked"}</div>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-filters-group">
          <span className="admin-filters-label">Tier</span>
          <FilterChips param="tier" options={[{ value: "S", label: "S" }, { value: "A", label: "A" }, { value: "B", label: "B" }]} />
        </div>
        <div className="admin-filters-group">
          <span className="admin-filters-label">Bucket</span>
          <FilterChips
            param="bucket"
            options={[
              { value: "ai_devtools", label: "AI / devtools" },
              { value: "b2b_infra_fintech", label: "B2B · fintech" },
              { value: "govtech_civic", label: "Govtech" },
            ]}
          />
        </div>
        <div className="admin-filters-group" style={{ marginLeft: "auto" }}>
          <SearchInput placeholder="Company, title…" />
        </div>
      </div>

      {open.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-eyebrow">Nothing open</div>
            <div className="admin-empty-title">No matching opportunities</div>
            <div className="admin-empty-body">
              {unscored > 0 ? `${unscored} unscored — hit “Score” above.` : "Hit “Find new roles now” to scan the watchlist, or clear your filters."}
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: "6px 8px" }}>
          <div className="admin-role-list">
            {open.map((r) => (
              <div key={r.id} className="admin-opp-row">
                <Link href={`/admin/role/${r.id}`} className="admin-opp-main">
                  <div className="admin-opp-head">
                    <span className="admin-opp-company">{r.company}</span>
                    <TierBadge tier={r.tier} />
                    {r.score !== null && <span className="admin-opp-score">{r.score}</span>}
                    <NarrativeBadge bucket={r.narrativeBucket} />
                  </div>
                  <div className="admin-opp-title">{r.title}</div>
                  <div className="admin-opp-meta">
                    {formatSalary(r.salaryMin, r.salaryMax)} · {remoteLabel(r.remotePolicy)} · {formatRelative(r.scoredAt)}
                  </div>
                  {r.scoreReasoning && (
                    <div className="admin-opp-why">{r.scoreReasoning.replace(/\s*\[auto-scored.*$/, "")}</div>
                  )}
                </Link>
                <div className="admin-opp-actions">
                  <OpportunityActions roleId={r.id} sourceUrl={r.sourceUrl} variant="open" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
