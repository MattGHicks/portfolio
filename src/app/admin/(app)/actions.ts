"use server";

import { db } from "@/db";
import { roles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { scoreUnscoredRoles } from "@/lib/scoring-service";
import { runDiscovery } from "@/lib/discovery/run";

function revalidateBoard(roleId?: number) {
  revalidatePath("/admin");
  revalidatePath("/admin/applied");
  if (roleId) revalidatePath(`/admin/role/${roleId}`);
}

/** Score (and rank) every unscored role. */
export async function scoreAllUnscored() {
  const summaries = await scoreUnscoredRoles();
  revalidateBoard();
  const tiers = summaries.reduce<Record<string, number>>((acc, s) => {
    acc[s.tier] = (acc[s.tier] ?? 0) + 1;
    return acc;
  }, {});
  return { scored: summaries.length, tiers };
}

/** Run discovery on demand (scrape watchlist boards → insert → auto-score). */
export async function runDiscoveryNow() {
  const result = await runDiscovery();
  revalidateBoard();
  return { totalNew: result.totalNew, totalScored: result.totalScored, companies: result.companies };
}

/** Mark an opportunity as applied (you clicked through and applied on the site). */
export async function markApplied(roleId: number) {
  await db.update(roles).set({ status: "submitted", lastTouchedAt: new Date() }).where(eq(roles.id, roleId));
  revalidateBoard(roleId);
}

/** Dismiss an opportunity (not interested) — hides it from the board. */
export async function dismissRole(roleId: number) {
  await db.update(roles).set({ status: "archived", lastTouchedAt: new Date() }).where(eq(roles.id, roleId));
  revalidateBoard(roleId);
}

/** Re-open a previously applied/dismissed role back onto the board. */
export async function reopenRole(roleId: number) {
  await db.update(roles).set({ status: "scored", lastTouchedAt: new Date() }).where(eq(roles.id, roleId));
  revalidateBoard(roleId);
}
