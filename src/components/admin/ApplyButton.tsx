"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { applyNow } from "@/app/admin/(app)/apply-action";

/**
 * One-click apply. Confirms, fires applyNow(), shows inline result.
 * `size="sm"` for inline list rows; default for the role detail page.
 */
export function ApplyButton({
  roleId,
  label = "Apply now",
  size,
}: {
  roleId: number;
  label?: string;
  size?: "sm";
}) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const router = useRouter();

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Apply to this role? This approves the draft and queues submission (15-min cancel window).")) return;
    startTransition(async () => {
      const r = await applyNow(roleId);
      if (r.ok) {
        setMsg({ ok: true, text: "Queued ✓ — 15-min cancel window" });
        router.refresh();
      } else {
        setMsg({ ok: false, text: r.error ?? "Failed" });
      }
      setTimeout(() => setMsg(null), 4000);
    });
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <button
        type="button"
        className={`admin-btn admin-btn--primary${size === "sm" ? " admin-btn--sm" : ""}`}
        onClick={handle}
        disabled={pending}
      >
        {pending ? "Queuing…" : label}
      </button>
      {msg && (
        <span style={{ fontSize: 12, color: msg.ok ? "var(--color-green)" : "var(--color-red, #e05a5a)" }}>
          {msg.text}
        </span>
      )}
    </span>
  );
}
