"use server";

import { db } from "@/db";
import { standingAnswers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateStandingAnswer(key: string, value: string) {
  await db
    .update(standingAnswers)
    .set({ value, lastUpdated: new Date() })
    .where(eq(standingAnswers.key, key));
  revalidatePath("/admin/settings");
  revalidatePath("/admin");
}
