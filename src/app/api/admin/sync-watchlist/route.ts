/**
 * One-shot (idempotent) watchlist sync — applies the canonical verified
 * Ashby/Greenhouse board slugs. CRON_SECRET-protected so it can be run from a
 * terminal without the Neon connection string. Safe to re-run any time.
 */
import { NextResponse } from "next/server";
import { verifyCronRequest } from "@/lib/cron-auth";
import { syncWatchlist } from "@/lib/discovery/watchlist-seed";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  const authError = verifyCronRequest(request);
  if (authError) return authError;
  const result = await syncWatchlist();
  return NextResponse.json({ status: "ok", ...result });
}
