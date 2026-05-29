"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { scoreAllUnscored, runDiscoveryNow } from "@/app/admin/(app)/actions";

/**
 * Autonomous-action buttons for the overview. Replaces the old dead-end
 * "ask Claude to score" text with real one-click triggers.
 */
export function OverviewActions({ unscored }: { unscored: number }) {
  const [pending, startTransition] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();

  const score = () => {
    startTransition(async () => {
      const r = await scoreAllUnscored();
      const breakdown = Object.entries(r.tiers)
        .map(([t, n]) => `${n} ${t}`)
        .join(", ");
      setMsg(`Scored ${r.scored} role${r.scored === 1 ? "" : "s"}${breakdown ? ` (${breakdown})` : ""}`);
      router.refresh();
      setTimeout(() => setMsg(null), 5000);
    });
  };

  const discover = () => {
    startTransition(async () => {
      const r = await runDiscoveryNow();
      const closed = r.totalClosed > 0 ? `, ${r.totalClosed} closed` : "";
      setMsg(`Discovery: ${r.totalNew} new role${r.totalNew === 1 ? "" : "s"} across ${r.companies} boards${closed}`);
      router.refresh();
      setTimeout(() => setMsg(null), 6000);
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
      <button type="button" className="admin-btn admin-btn--primary admin-btn--sm" onClick={discover} disabled={pending}>
        {pending ? "Working…" : "Find new roles now"}
      </button>
      {unscored > 0 && (
        <button type="button" className="admin-btn admin-btn--secondary admin-btn--sm" onClick={score} disabled={pending}>
          Score {unscored} unscored
        </button>
      )}
      {msg && <span style={{ fontSize: 12, color: "var(--color-green)" }}>✓ {msg}</span>}
    </div>
  );
}
