import { formatDate } from "@/lib/format";

type LogEntry = {
  at?: string;
  event?: string;
  error?: string | null;
  confirmed?: boolean;
  missingRequired?: string[];
  runUrl?: string | null;
  cancelExpiresAt?: string;
};

const EVENT_META: Record<string, { label: string; tone: "ok" | "warn" | "bad" | "info" }> = {
  approved_via_one_click: { label: "Approved (one-click)", tone: "info" },
  approved_by_matt: { label: "Approved", tone: "info" },
  submission_scheduled: { label: "Queued for submission", tone: "info" },
  dry_run_passed: { label: "Test run — form prefilled (not submitted)", tone: "info" },
  dry_run_failed: { label: "Test run had issues", tone: "warn" },
  submission_incomplete: { label: "Not submitted — required fields need you", tone: "warn" },
  manual_apply_required: { label: "Manual apply required (ATS not auto-fillable)", tone: "warn" },
  submitted: { label: "Submitted", tone: "ok" },
  marked_applied_manually: { label: "Marked applied (by you)", tone: "ok" },
  submit_unconfirmed: { label: "Submit clicked — confirmation not detected, verify", tone: "warn" },
  submission_failed: { label: "Submission failed", tone: "bad" },
  dispatch_failed: { label: "Could not start submission run", tone: "bad" },
};

const TONE_COLOR: Record<string, string> = {
  ok: "var(--color-green)",
  warn: "var(--status-pending-fg, #d2a24c)",
  bad: "var(--color-red, #e05a5a)",
  info: "var(--text-on-dark-secondary)",
};

export function SubmissionRecord({ log }: { log: LogEntry[] | null | undefined }) {
  if (!log || log.length === 0) return null;
  const entries = [...log].reverse(); // newest first
  const latestRunUrl = [...log].reverse().find((e) => e.runUrl)?.runUrl ?? null;
  const latestMissing = [...log].reverse().find((e) => e.missingRequired && e.missingRequired.length)?.missingRequired;

  return (
    <div className="admin-detail-section">
      <div className="admin-detail-section-title">
        <span>Submission record</span>
        {latestRunUrl && (
          <a href={latestRunUrl} target="_blank" rel="noopener noreferrer" className="admin-detail-link">
            View run &amp; screenshots ↗
          </a>
        )}
      </div>

      {latestMissing && latestMissing.length > 0 && (
        <div
          style={{
            border: "1px solid var(--status-pending-fg, #d2a24c)",
            borderRadius: 8,
            padding: "10px 12px",
            marginBottom: 12,
            fontSize: 13,
            color: "var(--text-on-dark-primary)",
          }}
        >
          <strong style={{ color: "var(--status-pending-fg, #d2a24c)" }}>Auto-fill couldn’t complete these required fields:</strong>
          <div style={{ marginTop: 4, color: "var(--text-on-dark-secondary)" }}>{latestMissing.join(" · ")}</div>
          <div style={{ marginTop: 4 }}>Apply on the posting, then “Mark applied”.</div>
        </div>
      )}

      <div className="admin-timeline">
        {entries.map((e, i) => {
          const meta = EVENT_META[e.event ?? ""] ?? { label: e.event ?? "event", tone: "info" as const };
          return (
            <div key={i} className={`admin-timeline-item${i === 0 ? " is-current" : ""}`}>
              <div className="admin-timeline-date">{e.at ? formatDate(e.at) : "—"}</div>
              <div className="admin-timeline-title" style={{ color: TONE_COLOR[meta.tone] }}>
                {meta.label}
                {e.event === "submitted" && e.confirmed === false ? " (unconfirmed)" : ""}
              </div>
              {e.error && <div className="admin-timeline-sub">{e.error}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
