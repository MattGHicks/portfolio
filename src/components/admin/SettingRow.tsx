"use client";

import { useState, useTransition } from "react";
import { updateStandingAnswer } from "@/app/admin/(app)/settings/actions";

export function SettingRow({ k, label, value: initial }: { k: string; label: string | null; value: string }) {
  const [value, setValue] = useState(initial);
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      await updateStandingAnswer(k, value);
      setEditing(false);
    });
  }

  return (
    <div className="admin-meta-row">
      <span className="admin-meta-row-label" style={{ minWidth: 200 }}>{label ?? k}</span>
      {editing ? (
        <div style={{ display: "flex", gap: 6, alignItems: "center", flex: 1, justifyContent: "flex-end" }}>
          <input
            type="text"
            className="admin-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ height: 28, padding: "0 10px", fontSize: 13, maxWidth: 280 }}
            autoFocus
          />
          <button type="button" className="admin-btn admin-btn--primary admin-btn--sm" onClick={save} disabled={pending}>
            Save
          </button>
          <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => { setValue(initial); setEditing(false); }}>
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="admin-meta-row-value is-mono"
          style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-on-dark-primary)", textAlign: "right" }}
        >
          {value || "—"}
        </button>
      )}
    </div>
  );
}
