"use client";

import { useTransition } from "react";
import { updateStandingAnswer } from "@/app/admin/(app)/settings/actions";

export function PauseToggle({ paused }: { paused: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={`admin-btn ${paused ? "admin-btn--danger" : "admin-btn--secondary"}`}
      disabled={pending}
      onClick={() => startTransition(() => updateStandingAnswer("system.paused", paused ? "false" : "true"))}
    >
      {paused ? "● System paused — resume" : "○ Live — pause automation"}
    </button>
  );
}
