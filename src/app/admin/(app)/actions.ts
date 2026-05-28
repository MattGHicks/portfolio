"use server";

import { revalidatePath } from "next/cache";
import { scoreUnscoredRoles } from "@/lib/scoring-service";
import { runDiscovery } from "@/lib/discovery/run";

/** Score (and auto-draft) every unscored role. Replaces the old "ask Claude" step. */
export async function scoreAllUnscored() {
  const summaries = await scoreUnscoredRoles();
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  const tiers = summaries.reduce<Record<string, number>>((acc, s) => {
    acc[s.tier] = (acc[s.tier] ?? 0) + 1;
    return acc;
  }, {});
  return { scored: summaries.length, tiers };
}

/** Run discovery on demand (scrape watchlist boards → insert → auto-score). */
export async function runDiscoveryNow() {
  const result = await runDiscovery();
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  return { totalNew: result.totalNew, totalScored: result.totalScored, companies: result.companies };
}
