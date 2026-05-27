import Link from "next/link";
import { listInboxMessages } from "@/lib/queries";
import { StatusBadge } from "@/components/admin/Badges";
import { FilterChips } from "@/components/admin/Filters";
import { formatDate, formatRelative } from "@/lib/format";

export const dynamic = "force-dynamic";

const CLASSIFICATION_LABEL: Record<string, string> = {
  auto_ack: "Auto-ack",
  rejection: "Rejection",
  recruiter_screen: "Recruiter screen",
  interview_request: "Interview request",
  outreach: "Outreach",
  assessment: "Assessment",
  scheduling: "Scheduling",
  ambiguous: "Ambiguous",
  noise: "Noise",
};

export default async function InboxPage({ searchParams }: { searchParams: { status?: string; classification?: string } }) {
  const status = (searchParams.status ?? "").split(",").filter(Boolean);
  const classification = (searchParams.classification ?? "").split(",").filter(Boolean);
  const messages = await listInboxMessages({ status, classification });

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Inbox</div>
          <h1 className="admin-page-title">Career inbox</h1>
          <p className="admin-page-subtitle">
            Messages from <span style={{ color: "var(--text-on-dark-primary)" }}>matt@digitalfish.io</span>. Auto-polled every 30 minutes.
            Classification done by Claude on demand.
          </p>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-filters-group">
          <span className="admin-filters-label">Status</span>
          <FilterChips
            param="status"
            options={[
              { value: "unread", label: "Unread" },
              { value: "triaged", label: "Triaged" },
              { value: "archived", label: "Archived" },
            ]}
          />
        </div>
        <div className="admin-filters-group">
          <span className="admin-filters-label">Type</span>
          <FilterChips
            param="classification"
            options={[
              { value: "unclassified", label: "Unclassified" },
              { value: "recruiter_screen", label: "Recruiter" },
              { value: "interview_request", label: "Interview" },
              { value: "rejection", label: "Rejection" },
              { value: "auto_ack", label: "Auto-ack" },
              { value: "noise", label: "Noise" },
            ]}
          />
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-eyebrow">Empty</div>
            <div className="admin-empty-title">No messages yet</div>
            <div className="admin-empty-body">
              Once Gmail polling is wired up and credentials are set, new messages will land here.
              Until then, ask Claude to "poll inbox" if you want a manual sweep.
            </div>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Classification</th>
                <th>Linked</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Received</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{m.fromName ?? "—"}</div>
                    <div className="is-mono" style={{ fontSize: 11, color: "var(--text-on-dark-tertiary)" }}>{m.fromEmail}</div>
                  </td>
                  <td className="is-secondary" style={{ maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {m.subject ?? "(no subject)"}
                  </td>
                  <td>
                    {m.classification ? (
                      <span className={`admin-status admin-status--${m.classification === "rejection" ? "rejected" : m.classification === "recruiter_screen" || m.classification === "interview_request" ? "submitted" : "scored"}`}>
                        {CLASSIFICATION_LABEL[m.classification]}
                      </span>
                    ) : (
                      <span className="admin-status admin-status--awaiting_approval">Unclassified</span>
                    )}
                  </td>
                  <td>
                    {m.linkedRoleId ? (
                      <Link href={`/admin/role/${m.linkedRoleId}`} className="admin-detail-link">
                        Role #{m.linkedRoleId} →
                      </Link>
                    ) : (
                      <span className="is-secondary" style={{ fontSize: 12 }}>—</span>
                    )}
                  </td>
                  <td><StatusBadge status={m.status} /></td>
                  <td className="is-mono is-secondary" style={{ textAlign: "right", whiteSpace: "nowrap" }}>{formatRelative(m.receivedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
