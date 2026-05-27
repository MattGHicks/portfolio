import Link from "next/link";
import { listApplications } from "@/lib/queries";
import { TierBadge, StatusBadge } from "@/components/admin/Badges";
import { FilterChips } from "@/components/admin/Filters";
import { formatSalary, formatDate, formatRelative, atsLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = (searchParams.status ?? "").split(",").filter(Boolean);
  const apps = await listApplications({ status });

  const submitted = apps.filter((a) => a.status === "submitted").length;
  const responded = apps.filter((a) => a.status === "responded").length;
  const rejected = apps.filter((a) => a.status === "rejected").length;
  const pending = apps.filter((a) => a.status === "pending_approval").length;

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Applications</div>
          <h1 className="admin-page-title">Application tracker</h1>
          <p className="admin-page-subtitle">
            Every submission across the hunt — pending, submitted, rejected, or responded.
          </p>
        </div>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat">
          <div className="admin-stat-label">Submitted</div>
          <div className="admin-stat-value">{submitted}</div>
          <div className="admin-stat-sub">total this hunt</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Pending approval</div>
          <div className="admin-stat-value" style={{ color: pending > 0 ? "var(--status-pending-fg)" : undefined }}>{pending}</div>
          <div className="admin-stat-sub">in your queue</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Responded</div>
          <div className="admin-stat-value" style={{ color: responded > 0 ? "var(--color-green)" : undefined }}>{responded}</div>
          <div className="admin-stat-sub">recruiter / hiring manager</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat-label">Rejected</div>
          <div className="admin-stat-value">{rejected}</div>
          <div className="admin-stat-sub">{submitted > 0 ? `${Math.round((rejected / submitted) * 100)}% rate` : "—"}</div>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-filters-group">
          <span className="admin-filters-label">Status</span>
          <FilterChips
            param="status"
            options={[
              { value: "pending_approval", label: "Pending approval" },
              { value: "approved", label: "Approved" },
              { value: "submitting", label: "Submitting" },
              { value: "submitted", label: "Submitted" },
              { value: "failed", label: "Failed" },
              { value: "responded", label: "Responded" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
        </div>
      </div>

      {apps.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-eyebrow">No applications</div>
            <div className="admin-empty-title">Empty queue</div>
            <div className="admin-empty-body">Once roles get drafted and approved, applications land here.</div>
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
                <th>Salary</th>
                <th>ATS</th>
                <th>Status</th>
                <th>Submitted</th>
                <th style={{ textAlign: "right" }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id}>
                  <td>
                    <Link href={`/admin/role/${a.roleId}`} className="admin-table-link" style={{ fontWeight: 500 }}>
                      {a.company}
                    </Link>
                  </td>
                  <td className="is-secondary" style={{ maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.title}</td>
                  <td><TierBadge tier={a.tier} /></td>
                  <td className="is-mono">{formatSalary(a.salaryMin, a.salaryMax)}</td>
                  <td className="is-mono is-secondary">{atsLabel(a.atsPlatform)}</td>
                  <td><StatusBadge status={a.status} /></td>
                  <td className="is-mono is-secondary">{formatDate(a.submittedAt)}</td>
                  <td className="is-mono is-secondary" style={{ textAlign: "right" }}>{formatRelative(a.submittedAt ?? a.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
