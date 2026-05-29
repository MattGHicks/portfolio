"use server";

import { db } from "@/db";
import { roles, applications, drafts, standingAnswers } from "@/db/schema";
import { desc, eq, and, gte, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { scoreAndDraftRole } from "@/lib/scoring-service";

export type ApplyResult = {
  ok: boolean;
  error?: string;
  applicationId?: number;
  dryRun?: boolean;
};

/**
 * True one-click apply.
 * Takes a role, ensures a draft + approved application exist, and fires the
 * submission webhook (GitHub Actions → Playwright, with a 15-min cancel window).
 * Collapses the old request-approval → approve → submit dance into a single action.
 *
 * Safe by construction: respects the daily submission cap, and while the GH
 * workflow runs DRY_RUN=true it only prefills + screenshots (no real submit).
 */
export async function applyNow(roleId: number): Promise<ApplyResult> {
  const [role] = await db.select().from(roles).where(eq(roles.id, roleId)).limit(1);
  if (!role) return { ok: false, error: "Role not found" };

  // --- Guardrail: daily submission cap -------------------------------------
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const capRow = await db
    .select({ value: standingAnswers.value })
    .from(standingAnswers)
    .where(eq(standingAnswers.key, "submission_cap_per_day"))
    .limit(1);
  const dailyCap = Number(capRow[0]?.value ?? 3);
  const [{ c: submittedToday }] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(applications)
    .where(and(eq(applications.status, "submitted"), gte(applications.submittedAt, startOfDay)));
  if (submittedToday >= dailyCap) {
    return { ok: false, error: `Daily cap reached (${submittedToday}/${dailyCap}). Try again tomorrow.` };
  }

  // --- Kill switch ----------------------------------------------------------
  const pausedRow = await db
    .select({ value: standingAnswers.value })
    .from(standingAnswers)
    .where(eq(standingAnswers.key, "system.paused"))
    .limit(1);
  if (pausedRow[0]?.value === "true") {
    return { ok: false, error: "Automation is paused — unpause in Settings to apply." };
  }

  // --- Ensure a draft exists (auto-generate if missing) --------------------
  let [draft] = await db.select().from(drafts).where(eq(drafts.roleId, roleId)).orderBy(desc(drafts.version)).limit(1);
  if (!draft) {
    await scoreAndDraftRole(roleId);
    [draft] = await db.select().from(drafts).where(eq(drafts.roleId, roleId)).orderBy(desc(drafts.version)).limit(1);
  }
  if (!draft) return { ok: false, error: "Could not generate a draft for this role." };

  // --- Upsert the application as approved ----------------------------------
  const [existing] = await db
    .select()
    .from(applications)
    .where(eq(applications.roleId, roleId))
    .orderBy(desc(applications.createdAt))
    .limit(1);

  const now = new Date();
  let applicationId: number;
  const reusable = existing && !["submitted", "submitting"].includes(existing.status);

  if (reusable) {
    applicationId = existing.id;
    await db
      .update(applications)
      .set({
        status: "approved",
        approvedAt: now,
        coverLetterMd: draft.coverLetterMd,
        customAnswers: draft.customAnswers,
        submissionLog: sql`COALESCE(submission_log, '[]'::jsonb) || ${JSON.stringify([
          { at: now.toISOString(), event: "approved_via_one_click" },
        ])}::jsonb`,
      })
      .where(eq(applications.id, applicationId));
  } else if (!existing) {
    const [created] = await db
      .insert(applications)
      .values({
        roleId,
        status: "approved",
        approvedAt: now,
        coverLetterMd: draft.coverLetterMd,
        customAnswers: draft.customAnswers,
        submissionLog: [{ at: now.toISOString(), event: "approved_via_one_click" }] as any,
      })
      .returning({ id: applications.id });
    applicationId = created.id;
  } else {
    return { ok: false, error: `Already ${existing.status} — open the role to retry.` };
  }

  await db.update(roles).set({ status: "approved", lastTouchedAt: now }).where(eq(roles.id, roleId));

  // --- Fire the submission webhook -----------------------------------------
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/applications/${applicationId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-secret": process.env.SESSION_SECRET ?? "" },
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { ok: false, error: body.error ?? `submit returned ${res.status}`, applicationId };
    }
  } catch (err) {
    return { ok: false, error: `Submission webhook failed: ${String(err)}`, applicationId };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath("/admin/applications");
  return { ok: true, applicationId };
}

/**
 * One-click "I applied on the site" for manual-apply platforms (Workday,
 * company pages, LinkedIn, etc.). Records a submitted application + flips the
 * role to submitted, without firing the auto-submit webhook.
 */
export async function markApplied(roleId: number): Promise<ApplyResult> {
  const [role] = await db.select().from(roles).where(eq(roles.id, roleId)).limit(1);
  if (!role) return { ok: false, error: "Role not found" };

  const now = new Date();
  const [existing] = await db
    .select()
    .from(applications)
    .where(eq(applications.roleId, roleId))
    .orderBy(desc(applications.createdAt))
    .limit(1);

  const logEntry = { at: now.toISOString(), event: "marked_applied_manually" };
  let applicationId: number;
  if (existing && !["submitted"].includes(existing.status)) {
    applicationId = existing.id;
    await db
      .update(applications)
      .set({
        status: "submitted",
        submittedAt: now,
        approvedAt: existing.approvedAt ?? now,
        submissionLog: sql`COALESCE(submission_log, '[]'::jsonb) || ${JSON.stringify([logEntry])}::jsonb`,
      })
      .where(eq(applications.id, applicationId));
  } else if (!existing) {
    const [created] = await db
      .insert(applications)
      .values({ roleId, status: "submitted", approvedAt: now, submittedAt: now, submissionLog: [logEntry] as any })
      .returning({ id: applications.id });
    applicationId = created.id;
  } else {
    return { ok: false, error: "Already submitted" };
  }

  await db.update(roles).set({ status: "submitted", lastTouchedAt: now }).where(eq(roles.id, roleId));
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath("/admin/applications");
  return { ok: true, applicationId };
}
