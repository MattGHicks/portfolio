"use client";

import { useState, useTransition } from "react";
import { saveDraft, requestApproval, approveAndSubmit, rejectDraft } from "@/app/admin/(app)/role/[id]/draft/actions";

const DEFAULT_QUESTIONS = [
  { key: "linkedin", label: "LinkedIn URL", value: "https://linkedin.com/in/matthicksfl" },
  { key: "portfolio", label: "Portfolio", value: "https://digitalfish.io" },
  { key: "work_authorization", label: "Work authorization", value: "Yes — US citizen, no sponsorship needed now or in the future" },
  { key: "remote_only", label: "Remote-only", value: "Yes" },
  { key: "salary_expectation", label: "Salary expectation", value: "$140K–180K base (open to discussion based on total comp)" },
];

export function DraftEditor({
  roleId,
  initialCoverLetter,
  initialAnswers,
  draftVersion,
  existingAppStatus,
  applicationId,
  standingAnswers: standing,
  sourceUrl,
  atsPlatform,
}: {
  roleId: number;
  initialCoverLetter: string;
  initialAnswers: Record<string, string>;
  draftVersion: number;
  existingAppStatus: string | null;
  applicationId: number | null;
  standingAnswers: Record<string, string>;
  sourceUrl: string | null;
  atsPlatform: string;
}) {
  const [cover, setCover] = useState(initialCoverLetter);
  const [questions, setQuestions] = useState(() =>
    DEFAULT_QUESTIONS.map((q) => ({ ...q, value: initialAnswers[q.key] ?? q.value }))
  );
  const [pending, startTransition] = useTransition();
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  function getAnswers(): Record<string, string> {
    return Object.fromEntries(questions.map((q) => [q.key, q.value]));
  }

  const handleSave = () => {
    startTransition(async () => {
      const r = await saveDraft(roleId, cover, getAnswers());
      setSavedMessage(`Saved as v${r.version}`);
      setTimeout(() => setSavedMessage(null), 2200);
    });
  };

  const handleRequestApproval = () => {
    startTransition(async () => {
      await requestApproval(roleId, cover, getAnswers());
      setSavedMessage("Moved to approval queue");
      setTimeout(() => setSavedMessage(null), 2200);
    });
  };

  const handleApproveAndSubmit = () => {
    if (!applicationId) return;
    if (!confirm("Approve and queue for submission via GitHub Actions? This will trigger the Playwright submitter.")) return;
    startTransition(async () => {
      await approveAndSubmit(roleId, applicationId);
      setSavedMessage("Approved — submission queued");
      setTimeout(() => setSavedMessage(null), 2500);
    });
  };

  const handleReject = () => {
    if (!applicationId) return;
    startTransition(async () => {
      await rejectDraft(roleId, applicationId);
      setSavedMessage("Sent back to drafting");
      setTimeout(() => setSavedMessage(null), 2200);
    });
  };

  const isAwaitingApproval = existingAppStatus === "pending_approval";

  return (
    <div className="admin-detail">
      <div>
        <div className="admin-detail-section">
          <div className="admin-detail-section-title">
            <span>Cover letter</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-on-dark-tertiary)" }}>
              {draftVersion > 0 ? `v${draftVersion} saved` : "no draft yet"} · {cover.length} chars
            </span>
          </div>
          <textarea
            className="admin-textarea"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            style={{ minHeight: 480 }}
            placeholder="Cover letter (Markdown)…"
          />
        </div>

        <div className="admin-detail-section">
          <div className="admin-detail-section-title">
            <span>Custom answers</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-on-dark-tertiary)" }}>
              {questions.length} fields
            </span>
          </div>
          {questions.map((q, i) => (
            <div key={q.key} className="admin-form-group" style={{ marginBottom: 14 }}>
              <label className="admin-label">{q.label}</label>
              <input
                type="text"
                className="admin-input"
                value={q.value}
                onChange={(e) => {
                  const next = [...questions];
                  next[i] = { ...next[i], value: e.target.value };
                  setQuestions(next);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <aside className="admin-detail-side">
        <div className="admin-detail-section" style={{ position: "sticky", top: 76 }}>
          <div className="admin-detail-section-title">Actions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button type="button" className="admin-btn admin-btn--secondary" onClick={handleSave} disabled={pending}>
              {pending ? "Saving…" : "Save draft"}
            </button>

            {!isAwaitingApproval && (
              <button type="button" className="admin-btn admin-btn--primary" onClick={handleRequestApproval} disabled={pending}>
                Move to approval queue
              </button>
            )}

            {isAwaitingApproval && applicationId && (
              <>
                <button type="button" className="admin-btn admin-btn--primary" onClick={handleApproveAndSubmit} disabled={pending}>
                  Approve + submit
                </button>
                <button type="button" className="admin-btn admin-btn--ghost" onClick={handleReject} disabled={pending}>
                  Send back to drafting
                </button>
              </>
            )}

            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-btn admin-btn--ghost"
              >
                Open posting ↗
              </a>
            )}

            {savedMessage && (
              <div style={{ fontSize: 12, color: "var(--color-green)", padding: "8px 4px" }}>
                ✓ {savedMessage}
              </div>
            )}
          </div>
        </div>

        <div className="admin-detail-section">
          <div className="admin-detail-section-title">Standing answers</div>
          <div className="admin-meta-row">
            <span className="admin-meta-row-label">Email</span>
            <span className="admin-meta-row-value is-mono">{standing.email ?? "—"}</span>
          </div>
          <div className="admin-meta-row">
            <span className="admin-meta-row-label">Salary floor</span>
            <span className="admin-meta-row-value is-mono">${Number(standing.salary_floor_usd ?? 0).toLocaleString()}</span>
          </div>
          <div className="admin-meta-row">
            <span className="admin-meta-row-label">Target</span>
            <span className="admin-meta-row-value is-mono">
              ${Number(standing.salary_target_min_usd ?? 0).toLocaleString()}–${Number(standing.salary_target_max_usd ?? 0).toLocaleString()}
            </span>
          </div>
          <div className="admin-meta-row">
            <span className="admin-meta-row-label">Voice anchor</span>
            <span className="admin-meta-row-value">{standing.cover_letter_voice_anchor_primary ?? "openrouter"}</span>
          </div>
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--text-on-dark-tertiary)", lineHeight: 1.5 }}>
            Need Claude to draft from scratch? Open Claude Code and say{" "}
            <em>"draft a cover letter for role #{roleId} using the OpenRouter voice anchor"</em>.
          </div>
        </div>
      </aside>
    </div>
  );
}
