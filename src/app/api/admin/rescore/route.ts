/**
 * Maintenance: re-score every active role (re-applies the current rubric).
 * CRON_SECRET-protected. Use after a scoring-logic change.
 */
import { NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/cron-auth";
import { rescoreAllRoles } from "@/lib/scoring-service";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  const authError = verifyCronRequest(request);
  if (authError) return authError;
  const summaries = await rescoreAllRoles();
  const tiers = summaries.reduce<Record<string, number>>((acc, s) => {
    acc[s.tier] = (acc[s.tier] ?? 0) + 1;
    return acc;
  }, {});
  return NextResponse.json({ status: "ok", rescored: summaries.length, tiers });
}
