import Link from "next/link";
import { db } from "@/db";
import { roles } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { TierBadge, NarrativeBadge } from "@/components/admin/Badges";
import { OpportunityActions } from "@/components/admin/OpportunityActions";
import { formatSalary, formatRelative, remoteLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AppliedPage({ searchParams }: { searchParams: { view?: string } }) {
  const view = searchParams.view === "dismissed" ? "dismissed" : "applied";
  const status = view === "dismissed" ? "archived" : "submitted";

  const rows = await db
    .select()
    .from(roles)
    .where(eq(roles.status, status))
    .orderBy(desc(roles.lastTouchedAt));

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-row">
          <div>
            <div className="admin-page-eyebrow">Tracking</div>
            <h1 className="admin-page-title">{view === "dismissed" ? "Dismissed" : "Applied"}</h1>
            <p className="admin-page-subtitle">
              {view === "dismissed" ? "Roles you passed on. Re-open any to put it back on the board." : "Roles you’ve applied to. Re-open if you need to revisit one."}
            </p>
          </div>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-filters-group">
          <Link href="/admin/applied" className={`admin-chip${view === "applied" ? " is-active" : ""}`}>Applied</Link>
          <Link href="/admin/applied?view=dismissed" className={`admin-chip${view === "dismissed" ? " is-active" : ""}`}>Dismissed</Link>
        </div>
        <div className="admin-filters-group" style={{ marginLeft: "auto" }}>
          <Link href="/admin" className="admin-detail-link">← Back to opportunities</Link>
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-eyebrow">Empty</div>
            <div className="admin-empty-body">{view === "dismissed" ? "Nothing dismissed yet." : "Nothing applied yet — apply from the Opportunities board."}</div>
          </div>
        </div>
      ) : (
        <div className="admin-card" style={{ padding: "6px 8px" }}>
          <div className="admin-role-list">
            {rows.map((r) => (
              <div key={r.id} className="admin-opp-row">
                <Link href={`/admin/role/${r.id}`} className="admin-opp-main">
                  <div className="admin-opp-head">
                    <span className="admin-opp-company">{r.company}</span>
                    <TierBadge tier={r.tier} />
                    <NarrativeBadge bucket={r.narrativeBucket} />
                  </div>
                  <div className="admin-opp-title">{r.title}</div>
                  <div className="admin-opp-meta">
                    {formatSalary(r.salaryMin, r.salaryMax)} · {remoteLabel(r.remotePolicy)} · {view === "applied" ? "applied" : "dismissed"} {formatRelative(r.lastTouchedAt)}
                  </div>
                </Link>
                <div className="admin-opp-actions">
                  <OpportunityActions roleId={r.id} sourceUrl={r.sourceUrl} variant={view} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
