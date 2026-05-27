"use server";

import { db } from "@/db";
import { watchlistCompanies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleWatchlistActive(id: number, active: boolean) {
  await db.update(watchlistCompanies).set({ active }).where(eq(watchlistCompanies.id, id));
  revalidatePath("/admin/watchlist");
}
