"use client";

import { useTransition } from "react";
import { toggleWatchlistActive } from "@/app/admin/(app)/watchlist/actions";

export function WatchlistRow({
  id,
  name,
  priority,
  atsLabel,
  atsBoardUrl,
  lastScrapedAt,
  active,
  notes,
}: {
  id: number;
  name: string;
  priority: "S" | "A" | "B";
  atsLabel: string;
  atsBoardUrl: string | null;
  lastScrapedAt: string;
  active: boolean;
  notes: string | null;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <tr>
      <td>
        <div style={{ fontWeight: 500 }}>{name}</div>
        {notes && (
          <div style={{ fontSize: 11, color: "var(--text-on-dark-tertiary)", marginTop: 2, maxWidth: 320, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {notes}
          </div>
        )}
      </td>
      <td><span className={`admin-tier admin-tier--${priority}`}>{priority}</span></td>
      <td className="is-mono is-secondary">{atsLabel}</td>
      <td>
        {atsBoardUrl ? (
          <a href={atsBoardUrl} target="_blank" rel="noopener noreferrer" className="admin-detail-link">
            Open ↗
          </a>
        ) : (
          <span className="is-secondary" style={{ fontSize: 12 }}>—</span>
        )}
      </td>
      <td className="is-mono is-secondary">{lastScrapedAt}</td>
      <td>
        <button
          type="button"
          className={`admin-btn admin-btn--sm ${active ? "admin-btn--secondary" : "admin-btn--ghost"}`}
          disabled={pending}
          onClick={() => startTransition(() => toggleWatchlistActive(id, !active))}
        >
          {active ? "Active" : "Paused"}
        </button>
      </td>
    </tr>
  );
}
