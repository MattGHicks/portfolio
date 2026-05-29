"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { applyNow, markApplied } from "@/app/admin/(app)/apply-action";
import { isAutoSubmittable } from "@/lib/ats";

/**
 * Adaptive apply control.
 * - Auto-submittable ATS (Ashby/Greenhouse/Lever): one-click "Apply" fires the
 *   Playwright pipeline (15-min cancel window).
 * - Manual platforms (Workday/company page/LinkedIn/etc.): "Apply on site ↗"
 *   opens the posting, and "Mark applied" logs it in one click — no misleading
 *   auto-submit button.
 */
export function ApplyButton({
  roleId,
  atsPlatform,
  sourceUrl,
  label = "Apply now",
  size,
}: {
  roleId: number;
  atsPlatform: string | null;
  sourceUrl: string | null;
  label?: string;
  size?: "sm";
}) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const router = useRouter();
  const sm = size === "sm" ? " admin-btn--sm" : "";
  const auto = isAutoSubmittable(atsPlatform);

  const flash = (ok: boolean, text: string) => {
    setMsg({ ok, text });
    setTimeout(() => setMsg(null), 4000);
  };

  const handleAuto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Apply to this role? This approves the draft and queues submission (15-min cancel window).")) return;
    startTransition(async () => {
      const r = await applyNow(roleId);
      if (r.ok) { flash(true, "Queued ✓ — 15-min cancel window"); router.refresh(); }
      else flash(false, r.error ?? "Failed");
    });
  };

  const handleMark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Mark this role as applied? (Use after you submit on the company's site.)")) return;
    startTransition(async () => {
      const r = await markApplied(roleId);
      if (r.ok) { flash(true, "Marked applied ✓"); router.refresh(); }
      else flash(false, r.error ?? "Failed");
    });
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      {auto ? (
        <button type="button" className={`admin-btn admin-btn--primary${sm}`} onClick={handleAuto} disabled={pending}>
          {pending ? "Queuing…" : label}
        </button>
      ) : (
        <>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`admin-btn admin-btn--primary${sm}`}
              onClick={(e) => e.stopPropagation()}
              title="This ATS can't be auto-submitted — apply on the company site"
            >
              Apply on site ↗
            </a>
          )}
          <button type="button" className={`admin-btn admin-btn--ghost${sm}`} onClick={handleMark} disabled={pending}>
            {pending ? "…" : "Mark applied"}
          </button>
        </>
      )}
      {msg && (
        <span style={{ fontSize: 12, color: msg.ok ? "var(--color-green)" : "var(--color-red, #e05a5a)" }}>{msg.text}</span>
      )}
    </span>
  );
}
