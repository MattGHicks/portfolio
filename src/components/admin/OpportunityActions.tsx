"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { markApplied, dismissRole, reopenRole } from "@/app/admin/(app)/actions";

/**
 * The whole product, distilled: open the posting to apply, then curate.
 * - open:      Apply ↗ (opens posting) · ✓ Applied · ✕ Dismiss
 * - applied:   "Applied" tag · Re-open
 * - dismissed: Re-open
 */
export function OpportunityActions({
  roleId,
  sourceUrl,
  variant = "open",
  size,
}: {
  roleId: number;
  sourceUrl: string | null;
  variant?: "open" | "applied" | "dismissed";
  size?: "sm";
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const sm = size === "sm" ? " admin-btn--sm" : "";
  const run = (fn: () => Promise<void>) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  };

  if (variant !== "open") {
    return (
      <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
        {sourceUrl && (
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className={`admin-btn admin-btn--ghost${sm}`} onClick={(e) => e.stopPropagation()}>
            View posting ↗
          </a>
        )}
        <button type="button" className={`admin-btn admin-btn--ghost${sm}`} onClick={run(() => reopenRole(roleId))} disabled={pending}>
          Re-open
        </button>
      </span>
    );
  }

  return (
    <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      {sourceUrl ? (
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`admin-btn admin-btn--primary${sm}`}
          onClick={(e) => e.stopPropagation()}
          title="Open the posting to apply"
        >
          Apply ↗
        </a>
      ) : (
        <span className="admin-meta-row-label">no link</span>
      )}
      <button type="button" className={`admin-btn admin-btn--ghost${sm}`} onClick={run(() => markApplied(roleId))} disabled={pending} title="Mark as applied">
        ✓ Applied
      </button>
      <button type="button" className={`admin-btn admin-btn--ghost${sm}`} onClick={run(() => dismissRole(roleId))} disabled={pending} title="Not interested">
        ✕
      </button>
    </span>
  );
}
