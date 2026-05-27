import { db } from "@/db";
import { roles, applications, inboxMessages } from "@/db/schema";
import { and, eq, gte, sql } from "drizzle-orm";

export type NavCounts = {
  pipeline: number;
  inbox: number;
  drafts: number;
  watchlist: number;
  awaitingApproval: number;
  submittedToday: number;
  submittedThisWeek: number;
};

export async function getNavCounts(): Promise<NavCounts> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const [
    pipelineCount,
    unreadInbox,
    draftingRoles,
    watchlistActive,
    awaitingApprovalCount,
    todayCount,
    weekCount,
  ] = await Promise.all([
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(roles)
      .where(sql`status NOT IN ('archived', 'dropped')`),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(inboxMessages)
      .where(eq(inboxMessages.status, "unread")),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(roles)
      .where(eq(roles.status, "drafting")),
    db.execute<{ c: number }>(sql`SELECT COUNT(*)::int as c FROM watchlist_companies WHERE active = true`),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(applications)
      .where(eq(applications.status, "pending_approval")),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(applications)
      .where(and(eq(applications.status, "submitted"), gte(applications.submittedAt, startOfDay))),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(applications)
      .where(and(eq(applications.status, "submitted"), gte(applications.submittedAt, startOfWeek))),
  ]);

  return {
    pipeline: pipelineCount[0]?.c ?? 0,
    inbox: unreadInbox[0]?.c ?? 0,
    drafts: draftingRoles[0]?.c ?? 0,
    watchlist: (watchlistActive as unknown as Array<{ c: number }>)[0]?.c ?? 0,
    awaitingApproval: awaitingApprovalCount[0]?.c ?? 0,
    submittedToday: todayCount[0]?.c ?? 0,
    submittedThisWeek: weekCount[0]?.c ?? 0,
  };
}

export async function isSystemPaused(): Promise<boolean> {
  const { standingAnswers } = await import("@/db/schema");
  const row = await db
    .select({ value: standingAnswers.value })
    .from(standingAnswers)
    .where(eq(standingAnswers.key, "system.paused"))
    .limit(1);
  return row[0]?.value === "true";
}
