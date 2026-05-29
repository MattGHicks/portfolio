import { db } from "@/db";
import { roles, standingAnswers } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export type NavCounts = {
  open: number;
  applied: number;
  unscored: number;
};

export async function getNavCounts(): Promise<NavCounts> {
  const [openRows, appliedRows, unscoredRows] = await Promise.all([
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "scored")),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "submitted")),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "unscored")),
  ]);
  return {
    open: openRows[0]?.c ?? 0,
    applied: appliedRows[0]?.c ?? 0,
    unscored: unscoredRows[0]?.c ?? 0,
  };
}

export async function isSystemPaused(): Promise<boolean> {
  const row = await db
    .select({ value: standingAnswers.value })
    .from(standingAnswers)
    .where(eq(standingAnswers.key, "system.paused"))
    .limit(1);
  return row[0]?.value === "true";
}
