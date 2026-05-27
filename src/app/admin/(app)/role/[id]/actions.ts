"use server";

import { db } from "@/db";
import { roles, applications, drafts } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateRoleStatus(roleId: number, status: typeof roles.$inferSelect.status) {
  await db
    .update(roles)
    .set({ status, lastTouchedAt: new Date() })
    .where(eq(roles.id, roleId));
  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
}

export async function updateRoleTier(roleId: number, tier: "S" | "A" | "B" | "drop" | "") {
  await db
    .update(roles)
    .set({ tier: tier === "" ? null : tier, lastTouchedAt: new Date() })
    .where(eq(roles.id, roleId));
  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath("/admin");
  revalidatePath("/admin/pipeline");
}

export async function updateRoleNotes(roleId: number, notes: string) {
  await db
    .update(roles)
    .set({ notes, lastTouchedAt: new Date() })
    .where(eq(roles.id, roleId));
  revalidatePath(`/admin/role/${roleId}`);
}

export async function dropRole(roleId: number, reason: string) {
  await db
    .update(roles)
    .set({
      status: "dropped",
      notes: sql`COALESCE(notes, '') || E'\n\nDROPPED: ' || ${reason}`,
      lastTouchedAt: new Date(),
    })
    .where(eq(roles.id, roleId));
  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath("/admin/pipeline");
}

export async function archiveRole(roleId: number) {
  await db
    .update(roles)
    .set({ status: "archived", lastTouchedAt: new Date() })
    .where(eq(roles.id, roleId));
  revalidatePath(`/admin/role/${roleId}`);
  revalidatePath("/admin/pipeline");
}
