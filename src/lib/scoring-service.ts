/**
 * Glue between the pure scoring/draft logic and the database.
 *
 * scoreAndDraftRole(roleId) — score a single role, write back tier/score/
 * reasoning/bucket, and generate a starter draft so it's apply-ready.
 * scoreUnscoredRoles()      — batch over every status=unscored role.
 *
 * Used by the discovery cron (auto-score on insert) and the manual
 * "Score now" trigger in the UI. Zero API cost — pure rules.
 */

import { db } from "@/db";
import { roles, drafts, standingAnswers } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { scoreRole } from "@/lib/scoring";
import { generateCoverLetter, defaultCustomAnswers } from "@/lib/autodraft";

export type ScoredSummary = {
  roleId: number;
  company: string;
  title: string;
  tier: string;
  score: number;
  draftCreated: boolean;
};

async function getStandingMap(): Promise<Record<string, string>> {
  const rows = await db.select().from(standingAnswers);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

/**
 * Score one role and (for actionable tiers) ensure a starter draft exists.
 * Returns null if the role doesn't exist.
 */
export async function scoreAndDraftRole(
  roleId: number,
  standing?: Record<string, string>
): Promise<ScoredSummary | null> {
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

  // Don't clobber a role that's already moved past triage.
  const advanced = ["drafting", "awaiting_approval", "approved", "submitted", "responded", "rejected"];
  const nextStatus = advanced.includes(role.status) ? role.status : result.tier === "drop" ? "dropped" : "scored";

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

  // Auto-draft for actionable tiers only, and only if no draft exists yet.
  let draftCreated = false;
  if (result.tier !== "drop") {
    const existing = await db.select({ id: drafts.id }).from(drafts).where(eq(drafts.roleId, roleId)).limit(1);
    if (existing.length === 0) {
      const standingMap = standing ?? (await getStandingMap());
      await db.insert(drafts).values({
        roleId,
        version: 1,
        coverLetterMd: generateCoverLetter({ company: role.company, title: role.title, bucket: result.bucket }),
        customAnswers: defaultCustomAnswers(standingMap),
        voiceAnchor: "auto",
        createdBy: "auto",
      });
      draftCreated = true;
    }
  }

  return {
    roleId,
    company: role.company,
    title: role.title,
    tier: result.tier,
    score: result.score,
    draftCreated,
  };
}

/** Batch-score every unscored role. Returns per-role summaries. */
export async function scoreUnscoredRoles(): Promise<ScoredSummary[]> {
  const unscored = await db.select({ id: roles.id }).from(roles).where(eq(roles.status, "unscored"));
  if (unscored.length === 0) return [];
  const standing = await getStandingMap();
  const out: ScoredSummary[] = [];
  for (const { id } of unscored) {
    const r = await scoreAndDraftRole(id, standing);
    if (r) out.push(r);
  }
  return out;
}
