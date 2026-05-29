import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { roles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { TierBadge, StatusBadge, NarrativeBadge } from "@/components/admin/Badges";
import { OpportunityActions } from "@/components/admin/OpportunityActions";
import { formatSalary, formatDate, formatRelative, remoteLabel, atsLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function RoleDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();
  const [role] = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
  if (!role) notFound();

  const variant = role.status === "submitted" ? "applied" : role.status === "archived" ? "dismissed" : "open";

  return (
    <>
      <div className="admin-page-header">
        <Link href="/admin" className="admin-detail-link" style={{ marginBottom: 12 }}>
          ← All opportunities
        </Link>
        <div className="admin-page-header-row" style={{ alignItems: "flex-start" }}>
          <div>
            <div className="admin-page-eyebrow">{role.company}</div>
            <h1 className="admin-page-title">{role.title}</h1>
            <div className="admin-detail-meta" style={{ marginTop: 16 }}>
              <TierBadge tier={role.tier} />
              <StatusBadge status={role.status} />
              <NarrativeBadge bucket={role.narrativeBucket} />
              <span className="admin-detail-meta-item">{remoteLabel(role.remotePolicy)}</span>
              <span className="admin-detail-meta-item">{atsLabel(role.atsPlatform)}</span>
              {(role.salaryMin || role.salaryMax) && (
                <span className="admin-detail-meta-item">{formatSalary(role.salaryMin, role.salaryMax)}</span>
              )}
              {role.score !== null && <span className="admin-detail-meta-item">Score {role.score}</span>}
            </div>
          </div>
          <OpportunityActions roleId={role.id} sourceUrl={role.sourceUrl} variant={variant} />
        </div>
      </div>

      <div className="admin-detail">
        <div className="admin-detail-main">
          {role.scoreReasoning && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">
                <span>Why this fits</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-blue)" }}>{role.score ?? "—"}</span>
              </div>
              <div className="admin-detail-reasoning">{role.scoreReasoning.replace(/\s*\[auto-scored.*$/, "")}</div>
            </div>
          )}

          {role.jdText && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">
                <span>Job description</span>
              </div>
              <div className="admin-detail-jd">{role.jdText}</div>
            </div>
          )}
        </div>

        <aside className="admin-detail-side">
          <div className="admin-detail-section">
            <div className="admin-detail-section-title">Details</div>
            <div className="admin-meta-row"><span className="admin-meta-row-label">Company</span><span className="admin-meta-row-value">{role.company}</span></div>
            <div className="admin-meta-row"><span className="admin-meta-row-label">Salary</span><span className="admin-meta-row-value is-mono">{formatSalary(role.salaryMin, role.salaryMax)}</span></div>
            <div className="admin-meta-row"><span className="admin-meta-row-label">Remote</span><span className="admin-meta-row-value">{remoteLabel(role.remotePolicy)}</span></div>
            <div className="admin-meta-row"><span className="admin-meta-row-label">ATS</span><span className="admin-meta-row-value">{atsLabel(role.atsPlatform)}</span></div>
            {role.location && <div className="admin-meta-row"><span className="admin-meta-row-label">Location</span><span className="admin-meta-row-value">{role.location}</span></div>}
            <div className="admin-meta-row"><span className="admin-meta-row-label">Found</span><span className="admin-meta-row-value is-mono">{formatRelative(role.createdAt)}</span></div>
            <div className="admin-meta-row"><span className="admin-meta-row-label">Scored</span><span className="admin-meta-row-value is-mono">{role.scoredAt ? formatDate(role.scoredAt) : "—"}</span></div>
            {role.sourceUrl && (
              <div className="admin-meta-row">
                <span className="admin-meta-row-label">Posting</span>
                <a href={role.sourceUrl} target="_blank" rel="noopener noreferrer" className="admin-meta-row-value admin-detail-link" style={{ display: "inline" }}>Open ↗</a>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
