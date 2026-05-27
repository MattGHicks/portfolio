import Link from "next/link";
import { listRoles } from "@/lib/queries";
import { TierBadge, StatusBadge, NarrativeBadge } from "@/components/admin/Badges";
import { FilterChips, SearchInput } from "@/components/admin/Filters";
import { formatSalary, formatRelative, remoteLabel, atsLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function PipelinePage({
  searchParams,
}: {
  searchParams: { tier?: string; status?: string; bucket?: string; q?: string };
}) {
  const tier = (searchParams.tier ?? "").split(",").filter(Boolean) as ("S" | "A" | "B" | "drop")[];
  const status = (searchParams.status ?? "").split(",").filter(Boolean);
  const bucket = (searchParams.bucket ?? "").split(",").filter(Boolean);
  const search = searchParams.q;

  const rolesList = await listRoles({ tier, status, bucket, search });

  return (
    <>
      <div className="admin-page-header">
        <div className="admin-page-header-row">
          <div>
            <div className="admin-page-eyebrow">Pipeline</div>
            <h1 className="admin-page-title">All roles</h1>
            <p className="admin-page-subtitle">
              {rolesList.length} role{rolesList.length === 1 ? "" : "s"} across the watchlist · sorted by tier and score.
            </p>
          </div>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-filters-group">
          <span className="admin-filters-label">Tier</span>
          <FilterChips
            param="tier"
            options={[
              { value: "S", label: "S" },
              { value: "A", label: "A" },
              { value: "B", label: "B" },
              { value: "drop", label: "Drop" },
            ]}
          />
        </div>
        <div className="admin-filters-group">
          <span className="admin-filters-label">Status</span>
          <FilterChips
            param="status"
            options={[
              { value: "unscored", label: "Unscored" },
              { value: "scored", label: "Scored" },
              { value: "drafting", label: "Drafting" },
              { value: "awaiting_approval", label: "Awaiting" },
              { value: "submitted", label: "Submitted" },
              { value: "responded", label: "Responded" },
              { value: "rejected", label: "Rejected" },
            ]}
          />
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

      {rolesList.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-eyebrow">No matches</div>
            <div className="admin-empty-title">Nothing here</div>
            <div className="admin-empty-body">Try clearing filters or adding a search term.</div>
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
                <th>Score</th>
                <th>Salary</th>
                <th>Bucket</th>
                <th>ATS</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {rolesList.map((r) => (
                <tr key={r.id}>
                  <td>
                    <Link href={`/admin/role/${r.id}`} className="admin-table-link" style={{ fontWeight: 500 }}>
                      {r.company}
                    </Link>
                  </td>
                  <td className="is-secondary" style={{ maxWidth: 280, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <Link href={`/admin/role/${r.id}`} className="admin-table-link is-secondary">
                      {r.title}
                    </Link>
                    <div style={{ fontSize: 11, color: "var(--text-on-dark-tertiary)", marginTop: 2 }}>{remoteLabel(r.remotePolicy)}</div>
                  </td>
                  <td><TierBadge tier={r.tier} /></td>
                  <td className="is-mono">{r.score ?? "—"}</td>
                  <td className="is-mono">{formatSalary(r.salaryMin, r.salaryMax)}</td>
                  <td><NarrativeBadge bucket={r.narrativeBucket} /></td>
                  <td className="is-mono is-secondary">{atsLabel(r.atsPlatform)}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td className="is-mono is-secondary" style={{ textAlign: "right" }}>{formatRelative(r.lastTouchedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
