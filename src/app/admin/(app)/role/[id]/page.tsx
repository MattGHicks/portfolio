import Link from "next/link";
import { notFound } from "next/navigation";
import { getRole, getRoleOutreach } from "@/lib/queries";
import { TierBadge, StatusBadge, NarrativeBadge } from "@/components/admin/Badges";
import { StatusSelect, TierSelect, DropButton, ArchiveButton } from "@/components/admin/RoleActions";
import { ApplyButton } from "@/components/admin/ApplyButton";
import { formatSalary, formatDate, formatRelative, remoteLabel, atsLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function RoleDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();
  const data = await getRole(id);
  if (!data) notFound();

  const { role, applications: apps, drafts: draftRows, messages } = data;
  const outreach = await getRoleOutreach(id);

  const lastApp = apps[0];
  const lastDraft = draftRows[0];

  return (
    <>
      <div className="admin-page-header">
        <Link href="/admin/pipeline" className="admin-detail-link" style={{ marginBottom: 12 }}>
          ← All pipeline
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
              {role.salaryMin || role.salaryMax ? (
                <span className="admin-detail-meta-item">{formatSalary(role.salaryMin, role.salaryMax)}</span>
              ) : null}
              {role.score !== null && (
                <span className="admin-detail-meta-item">Score {role.score}</span>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            {role.sourceUrl && (
              <a
                href={role.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn--secondary"
              >
                Open posting ↗
              </a>
            )}
            {lastDraft && role.status !== "submitted" && (
              <Link href={`/admin/role/${role.id}/draft`} className="admin-btn admin-btn--secondary">
                Review draft
              </Link>
            )}
            {["scored", "drafting", "awaiting_approval", "approved"].includes(role.status) && role.tier !== "drop" && (
              <ApplyButton roleId={role.id} label="Apply now" />
            )}
          </div>
        </div>
      </div>

      <div className="admin-detail">
        <div className="admin-detail-main">
          {role.scoreReasoning && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">
                <span>Score reasoning</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--color-blue)" }}>{role.score ?? "—"}</span>
              </div>
              <div className="admin-detail-reasoning">{role.scoreReasoning}</div>
            </div>
          )}

          {role.notes && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">
                <span>Notes</span>
              </div>
              <div className="admin-detail-jd">{role.notes}</div>
            </div>
          )}

          {role.jdText && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">
                <span>Job description</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-on-dark-tertiary)" }}>{role.jdText.length} chars</span>
              </div>
              <div className="admin-detail-jd">{role.jdText}</div>
            </div>
          )}

          {lastDraft && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">
                <span>Latest draft (v{lastDraft.version})</span>
                <Link href={`/admin/role/${role.id}/draft`} className="admin-detail-link">
                  Edit →
                </Link>
              </div>
              {lastDraft.coverLetterMd ? (
                <div className="admin-detail-cover">{lastDraft.coverLetterMd}</div>
              ) : (
                <div className="admin-empty-body">No cover letter yet.</div>
              )}
            </div>
          )}

          <div className="admin-detail-section">
            <div className="admin-detail-section-title">
              <span>Activity timeline</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-on-dark-tertiary)" }}>{apps.length} application{apps.length === 1 ? "" : "s"}</span>
            </div>
            <div className="admin-timeline">
              <div className="admin-timeline-item is-current">
                <div className="admin-timeline-date">{formatDate(role.createdAt)}</div>
                <div className="admin-timeline-title">Added to pipeline</div>
                <div className="admin-timeline-sub">via {atsLabel(role.atsPlatform)}</div>
              </div>
              {role.scoredAt && (
                <div className="admin-timeline-item">
                  <div className="admin-timeline-date">{formatDate(role.scoredAt)}</div>
                  <div className="admin-timeline-title">Scored {role.score ?? "—"} → Tier {role.tier ?? "—"}</div>
                </div>
              )}
              {apps.map((app) => (
                <div key={app.id} className="admin-timeline-item">
                  <div className="admin-timeline-date">{formatDate(app.submittedAt ?? app.createdAt)}</div>
                  <div className="admin-timeline-title">
                    Application {app.status === "submitted" ? "submitted" : app.status.replace(/_/g, " ")}
                  </div>
                  {app.responseReceivedAt && (
                    <div className="admin-timeline-sub">Response {formatRelative(app.responseReceivedAt)}</div>
                  )}
                </div>
              ))}
              {messages.map((msg) => (
                <div key={msg.id} className="admin-timeline-item">
                  <div className="admin-timeline-date">{formatDate(msg.receivedAt)}</div>
                  <div className="admin-timeline-title">{msg.subject ?? "(no subject)"}</div>
                  <div className="admin-timeline-sub">{msg.fromName ?? msg.fromEmail} · {msg.classification ?? "unclassified"}</div>
                </div>
              ))}
              {outreach.map((o) => (
                <div key={o.id} className="admin-timeline-item">
                  <div className="admin-timeline-date">{formatDate(o.occurredAt)}</div>
                  <div className="admin-timeline-title">{o.personName} ({o.channel})</div>
                  {o.outcome && <div className="admin-timeline-sub">{o.outcome}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="admin-detail-side">
          <div className="admin-detail-section">
            <div className="admin-detail-section-title">Manage</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="admin-form-group">
                <label className="admin-label">Status</label>
                <StatusSelect roleId={role.id} value={role.status} />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Tier</label>
                <TierSelect roleId={role.id} value={role.tier} />
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <ArchiveButton roleId={role.id} />
                <DropButton roleId={role.id} />
              </div>
            </div>
          </div>

          <div className="admin-detail-section">
            <div className="admin-detail-section-title">Details</div>
            <div className="admin-meta-row">
              <span className="admin-meta-row-label">Company</span>
              <span className="admin-meta-row-value">{role.company}</span>
            </div>
            <div className="admin-meta-row">
              <span className="admin-meta-row-label">Salary</span>
              <span className="admin-meta-row-value is-mono">{formatSalary(role.salaryMin, role.salaryMax)}</span>
            </div>
            <div className="admin-meta-row">
              <span className="admin-meta-row-label">Remote</span>
              <span className="admin-meta-row-value">{remoteLabel(role.remotePolicy)}</span>
            </div>
            <div className="admin-meta-row">
              <span className="admin-meta-row-label">ATS</span>
              <span className="admin-meta-row-value">{atsLabel(role.atsPlatform)}</span>
            </div>
            {role.location && (
              <div className="admin-meta-row">
                <span className="admin-meta-row-label">Location</span>
                <span className="admin-meta-row-value">{role.location}</span>
              </div>
            )}
            {role.glassdoorRating && (
              <div className="admin-meta-row">
                <span className="admin-meta-row-label">Glassdoor</span>
                <span className="admin-meta-row-value is-mono">{role.glassdoorRating}★</span>
              </div>
            )}
            <div className="admin-meta-row">
              <span className="admin-meta-row-label">Created</span>
              <span className="admin-meta-row-value is-mono">{formatDate(role.createdAt)}</span>
            </div>
            <div className="admin-meta-row">
              <span className="admin-meta-row-label">Last touched</span>
              <span className="admin-meta-row-value is-mono">{formatRelative(role.lastTouchedAt)}</span>
            </div>
            {role.sourceUrl && (
              <div className="admin-meta-row">
                <span className="admin-meta-row-label">Source</span>
                <a
                  href={role.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-meta-row-value admin-detail-link"
                  style={{ display: "inline" }}
                >
                  Open ↗
                </a>
              </div>
            )}
          </div>

          {lastApp && (
            <div className="admin-detail-section">
              <div className="admin-detail-section-title">Latest application</div>
              <div className="admin-meta-row">
                <span className="admin-meta-row-label">Status</span>
                <span className="admin-meta-row-value"><StatusBadge status={lastApp.status} /></span>
              </div>
              {lastApp.submittedAt && (
                <div className="admin-meta-row">
                  <span className="admin-meta-row-label">Submitted</span>
                  <span className="admin-meta-row-value is-mono">{formatDate(lastApp.submittedAt)}</span>
                </div>
              )}
              {lastApp.responseReceivedAt && (
                <div className="admin-meta-row">
                  <span className="admin-meta-row-label">Response</span>
                  <span className="admin-meta-row-value is-mono">{formatRelative(lastApp.responseReceivedAt)}</span>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
