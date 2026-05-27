import Link from "next/link";
import { db } from "@/db";
import { roles, applications, drafts } from "@/db/schema";
import { and, desc, eq, sql, inArray } from "drizzle-orm";
import { TierBadge, StatusBadge, NarrativeBadge } from "@/components/admin/Badges";
import { formatSalary, formatRelative, remoteLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getDraftsView() {
  // Roles that are in active drafting / approval flow
  const rows = await db
    .select({
      role: roles,
      app: applications,
    })
    .from(roles)
    .leftJoin(applications, eq(applications.roleId, roles.id))
    .where(
      and(
        inArray(roles.status, ["drafting", "awaiting_approval", "approved"] as any),
        sql`NOT EXISTS (SELECT 1 FROM applications a2 WHERE a2.role_id = ${roles.id} AND a2.status IN ('submitted', 'failed'))`
      )
    )
    .orderBy(desc(roles.lastTouchedAt));

  // Dedupe by role id (left join may return nulls + the same role with multiple apps)
  const byRole = new Map<number, { role: typeof roles.$inferSelect; app: typeof applications.$inferSelect | null }>();
  for (const r of rows) {
    if (!byRole.has(r.role.id) || (r.app && !byRole.get(r.role.id)?.app)) {
      byRole.set(r.role.id, r);
    }
  }
  return Array.from(byRole.values());
}

export default async function DraftsPage() {
  const draftsView = await getDraftsView();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Drafts</div>
          <h1 className="admin-page-title">In progress</h1>
          <p className="admin-page-subtitle">
            Roles in active drafting or awaiting approval. Approve from the role detail page to queue for submission.
          </p>
        </div>
      </div>

      {draftsView.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-eyebrow">Empty</div>
            <div className="admin-empty-title">No drafts in progress</div>
            <div className="admin-empty-body">
              When you ask Claude to draft a cover letter, the draft will land here for review.
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {draftsView.map(({ role, app }) => (
            <Link key={role.id} href={`/admin/role/${role.id}/draft`} className="admin-card" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <TierBadge tier={role.tier} />
                    <StatusBadge status={role.status} />
                    <NarrativeBadge bucket={role.narrativeBucket} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 700, color: "var(--text-on-dark-primary)", marginBottom: 4 }}>
                    {role.company}
                  </h3>
                  <div style={{ fontSize: 13, color: "var(--text-on-dark-secondary)" }}>
                    {role.title} · {remoteLabel(role.remotePolicy)} · {formatSalary(role.salaryMin, role.salaryMax)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="admin-stat-label" style={{ marginBottom: 4 }}>Last touched</div>
                  <div className="is-mono" style={{ fontSize: 13, color: "var(--text-on-dark-secondary)" }}>{formatRelative(role.lastTouchedAt)}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
