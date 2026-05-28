/**
 * Discovery cron.
 * Scrapes Ashby + Greenhouse boards for watchlist companies, inserts new roles,
 * and auto-scores + auto-drafts each one (zero API). Dedupes by
 * (ats_platform, ats_external_id). Core logic lives in @/lib/discovery/run so
 * the manual "Find new roles" button shares the exact same path.
 */
import { NextResponse } from "next/server";
import { verifyCronRequest, getKillSwitch } from "@/lib/cron-auth";
import { runDiscovery } from "@/lib/discovery/run";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const authError = verifyCronRequest(request);
  if (authError) return authError;
  if (await getKillSwitch()) return NextResponse.json({ status: "paused" });

  const result = await runDiscovery();
  return NextResponse.json(result);
}
