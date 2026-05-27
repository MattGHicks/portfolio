"use server";

import { db } from "@/db";
import { roles, applications, drafts } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function saveDraft(
  roleId: number,
  coverLetterMd: string,
  customAnswers: Record<string, string>
) {
  const existing = await db.select().from(drafts).where(eq(drafts.roleId, roleId)).orderBy(desc(drafts.version)).limit(1);
  const nextVersion = (existing[0]?.version ?? 0) + 1;

  await db.insert(drafts).values({
    roleId,
    version: nextVersion,
    coverLetterMd,
    customAnswers,
    voiceAnchor: "openrouter",
    createdBy: "matt",
  });

  // Update role status if currently unscored / scored / drafting
  await db
    .update(roles)
    .set({ status: "drafting", lastTouchedAt: new Date() })
    .where(and(eq(roles.id, roleId), eq(roles.status, "scored")));

  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath(`/admin/role/${roleId}/draft`);
  revalidatePath("/admin/drafts");

  return { version: nextVersion };
}

export async function requestApproval(roleId: number, coverLetterMd: string, customAnswers: Record<string, string>) {
  // Save the draft first
  const { version } = await saveDraft(roleId, coverLetterMd, customAnswers);

  // Create or update the application row
  const existing = await db
    .select()
    .from(applications)
    .where(eq(applications.roleId, roleId))
    .orderBy(desc(applications.createdAt))
    .limit(1);

  if (existing[0] && ["drafting", "pending_approval"].includes(existing[0].status)) {
    await db
      .update(applications)
      .set({ status: "pending_approval", coverLetterMd, customAnswers })
      .where(eq(applications.id, existing[0].id));
  } else if (!existing[0] || ["failed", "rejected"].includes(existing[0].status)) {
    await db.insert(applications).values({
      roleId,
      status: "pending_approval",
      coverLetterMd,
      customAnswers,
    });
  }

  await db
    .update(roles)
    .set({ status: "awaiting_approval", lastTouchedAt: new Date() })
    .where(eq(roles.id, roleId));

  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath(`/admin/role/${roleId}/draft`);
  revalidatePath("/admin");
  revalidatePath("/admin/applications");
  return { version };
}

export async function approveAndSubmit(roleId: number, applicationId: number) {
  // Mark approved
  const now = new Date();
  await db
    .update(applications)
    .set({
      status: "approved",
      approvedAt: now,
      submissionLog: [
        { at: now.toISOString(), event: "approved_by_matt" },
      ] as any,
    })
    .where(eq(applications.id, applicationId));

  await db
    .update(roles)
    .set({ status: "approved", lastTouchedAt: now })
    .where(eq(roles.id, roleId));

  // Trigger the submission webhook → GitHub Actions
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    await fetch(`${baseUrl}/api/applications/${applicationId}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-secret": process.env.SESSION_SECRET ?? "" },
    });
  } catch (err) {
    console.error("[approveAndSubmit] webhook failed:", err);
  }

  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/applications");
}

export async function rejectDraft(roleId: number, applicationId: number) {
  await db
    .update(applications)
    .set({ status: "drafting" })
    .where(eq(applications.id, applicationId));
  await db
    .update(roles)
    .set({ status: "drafting", lastTouchedAt: new Date() })
    .where(eq(roles.id, roleId));
  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath(`/admin/role/${roleId}/draft`);
}
