"use client";

import { useState, useTransition } from "react";
import { updateRoleStatus, updateRoleTier, dropRole, archiveRole } from "@/app/admin/(app)/role/[id]/actions";

const STATUS_OPTIONS = [
  "unscored",
  "scored",
  "drafting",
  "awaiting_approval",
  "approved",
  "submitted",
  "responded",
  "rejected",
  "dropped",
  "archived",
] as const;

export function StatusSelect({ roleId, value }: { roleId: number; value: string }) {
  const [, startTransition] = useTransition();
  return (
    <select
      className="admin-select admin-select--inline"
      defaultValue={value}
      onChange={(e) => {
        const next = e.target.value as (typeof STATUS_OPTIONS)[number];
        startTransition(() => updateRoleStatus(roleId, next));
      }}
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s.replace(/_/g, " ")}
        </option>
      ))}
    </select>
  );
}

export function TierSelect({ roleId, value }: { roleId: number; value: string | null }) {
  const [, startTransition] = useTransition();
  return (
    <select
      className="admin-select admin-select--inline"
      defaultValue={value ?? ""}
      onChange={(e) => {
        startTransition(() => updateRoleTier(roleId, e.target.value as any));
      }}
    >
      <option value="">— Unranked</option>
      <option value="S">Tier S</option>
      <option value="A">Tier A</option>
      <option value="B">Tier B</option>
      <option value="drop">Drop</option>
    </select>
  );
}

export function DropButton({ roleId }: { roleId: number }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [pending, startTransition] = useTransition();

  if (!open) {
    return (
      <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setOpen(true)}>
        Drop role
      </button>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        type="text"
        className="admin-input"
        placeholder="Drop reason (e.g. comp below floor)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        autoFocus
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          className="admin-btn admin-btn--danger admin-btn--sm"
          disabled={pending || !reason.trim()}
          onClick={() => {
            startTransition(async () => {
              await dropRole(roleId, reason.trim());
              setOpen(false);
              setReason("");
            });
          }}
        >
          Confirm drop
        </button>
        <button type="button" className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export function ArchiveButton({ roleId }: { roleId: number }) {
  const [, startTransition] = useTransition();
  return (
    <button
      type="button"
      className="admin-btn admin-btn--ghost admin-btn--sm"
      onClick={() => startTransition(() => archiveRole(roleId))}
    >
      Archive
    </button>
  );
}
