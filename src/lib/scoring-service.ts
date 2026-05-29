/**
 * Glue between the pure scorer and the database.
 *
 * scoreAndDraftRole(roleId) — score a role and write back tier/score/reasoning/
 *   bucket + set its board status. (Name kept for callers; no drafts anymore.)
 * scoreUnscoredRoles()      — batch over every status=unscored role.
 * rescoreAllRoles()         — re-apply the rubric to all non-terminal roles.
 *
 * Status model (simplified 2026-05-29 — "find + link to apply" board):
 *   unscored → freshly discovered (internal)
 *   scored   → OPEN opportunity (shown on the board)
 *   submitted→ APPLIED (Matt clicked Apply / marked applied)
 *   archived → DISMISSED (Matt hid it)
 *   dropped  → auto-filtered bad fit (hidden)
 * Scoring never overwrites a role Matt has already actioned.
 */

import { db } from "@/db";
import { roles } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { scoreRole } from "@/lib/scoring";

export type ScoredSummary = {
  roleId: number;
  company: string;
  title: string;
  tier: string;
  score: number;
};

// Statuses that reflect a human decision — never auto-overwrite these.
const TERMINAL = ["submitted", "responded", "rejected", "archived"];

export async function scoreAndDraftRole(roleId: number): Promise<ScoredSummary | null> {
  const [role] = await db.select().from(roles).where(eq(roles.id, roleId)).limit(1);
  if (!role) return null;

  const result = scoreRole({
    title: role.title,
    company: role.company,
    jdText: role.jdText,
    jdSnippet: role.jdSnippet,
    salaryMin: role.salaryMin,
    salaryMax: role.salaryMax,
    remotePolicy: role.remotePolicy,
    postedAt: role.postedAt,
    location: role.location,
  });

  const nextStatus = TERMINAL.includes(role.status)
    ? role.status
    : result.tier === "drop"
      ? "dropped"
      : "scored";

  await db
    .update(roles)
    .set({
      score: result.score,
      tier: result.tier,
      narrativeBucket: result.bucket,
      scoreReasoning: result.reasoning,
      status: nextStatus as typeof role.status,
      scoredAt: new Date(),
      lastTouchedAt: new Date(),
    })
    .where(eq(roles.id, roleId));

  return { roleId, company: role.company, title: role.title, tier: result.tier, score: result.score };
}

export async function scoreUnscoredRoles(): Promise<ScoredSummary[]> {
  const unscored = await db.select({ id: roles.id }).from(roles).where(eq(roles.status, "unscored"));
  const out: ScoredSummary[] = [];
  for (const { id } of unscored) {
    const r = await scoreAndDraftRole(id);
    if (r) out.push(r);
  }
  return out;
}

/** Re-apply the rubric to every non-terminal role. Also normalizes legacy
 *  statuses (drafting/awaiting_approval/approved) back to the open board. */
export async function rescoreAllRoles(): Promise<ScoredSummary[]> {
  const active = await db
    .select({ id: roles.id })
    .from(roles)
    .where(sql`status NOT IN ('rejected')`);
  const out: ScoredSummary[] = [];
  for (const { id } of active) {
    const r = await scoreAndDraftRole(id);
    if (r) out.push(r);
  }
  return out;
}
