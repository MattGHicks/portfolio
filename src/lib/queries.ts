import { db } from "@/db";
import { roles, applications, drafts, inboxMessages, watchlistCompanies, outreachLog, standingAnswers } from "@/db/schema";
import { and, desc, eq, inArray, isNull, like, or, sql } from "drizzle-orm";

export type RoleListFilters = {
  tier?: ("S" | "A" | "B" | "drop")[];
  status?: string[];
  ats?: string[];
  search?: string;
  bucket?: string[];
};

export async function listRoles(filters: RoleListFilters = {}) {
  const where = [] as any[];

  if (filters.tier && filters.tier.length > 0) {
    where.push(inArray(roles.tier, filters.tier));
  }
  if (filters.status && filters.status.length > 0) {
    where.push(inArray(roles.status, filters.status as any));
  }
  if (filters.ats && filters.ats.length > 0) {
    where.push(inArray(roles.atsPlatform, filters.ats as any));
  }
  if (filters.bucket && filters.bucket.length > 0) {
    where.push(inArray(roles.narrativeBucket, filters.bucket as any));
  }
  if (filters.search) {
    const q = `%${filters.search}%`;
    where.push(or(like(roles.company, q), like(roles.title, q), like(roles.notes, q)));
  }

  const rows = await db
    .select()
    .from(roles)
    .where(where.length ? and(...where) : undefined)
    .orderBy(
      sql`CASE
        WHEN tier = 'S' THEN 1
        WHEN tier = 'A' THEN 2
        WHEN tier = 'B' THEN 3
        WHEN tier = 'drop' THEN 4
        ELSE 5
      END`,
      desc(roles.score),
      desc(roles.createdAt)
    );

  return rows;
}

export async function getRole(id: number) {
  const [role] = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
  if (!role) return null;

  const apps = await db
    .select()
    .from(applications)
    .where(eq(applications.roleId, id))
    .orderBy(desc(applications.createdAt));

  const draftRows = await db
    .select()
    .from(drafts)
    .where(eq(drafts.roleId, id))
    .orderBy(desc(drafts.createdAt));

  const linkedMessages = await db
    .select()
    .from(inboxMessages)
    .where(eq(inboxMessages.linkedRoleId, id))
    .orderBy(desc(inboxMessages.receivedAt));

  return { role, applications: apps, drafts: draftRows, messages: linkedMessages };
}

export async function listApplications(filters: { status?: string[] } = {}) {
  const where = [] as any[];
  if (filters.status && filters.status.length > 0) {
    where.push(inArray(applications.status, filters.status as any));
  }

  const rows = await db
    .select({
      id: applications.id,
      roleId: applications.roleId,
      status: applications.status,
      submittedAt: applications.submittedAt,
      approvedAt: applications.approvedAt,
      responseReceivedAt: applications.responseReceivedAt,
      createdAt: applications.createdAt,
      company: roles.company,
      title: roles.title,
      tier: roles.tier,
      sourceUrl: roles.sourceUrl,
      atsPlatform: roles.atsPlatform,
      salaryMin: roles.salaryMin,
      salaryMax: roles.salaryMax,
      narrativeBucket: roles.narrativeBucket,
    })
    .from(applications)
    .innerJoin(roles, eq(roles.id, applications.roleId))
    .where(where.length ? and(...where) : undefined)
    .orderBy(desc(applications.submittedAt), desc(applications.createdAt));

  return rows;
}

export async function listInboxMessages(filters: { status?: string[]; classification?: string[] } = {}) {
  const where = [] as any[];
  if (filters.status && filters.status.length > 0) {
    where.push(inArray(inboxMessages.status, filters.status as any));
  }
  if (filters.classification && filters.classification.length > 0) {
    if (filters.classification.includes("unclassified")) {
      where.push(or(isNull(inboxMessages.classification), inArray(inboxMessages.classification, filters.classification.filter((c) => c !== "unclassified") as any)));
    } else {
      where.push(inArray(inboxMessages.classification, filters.classification as any));
    }
  }

  return db
    .select()
    .from(inboxMessages)
    .where(where.length ? and(...where) : undefined)
    .orderBy(desc(inboxMessages.receivedAt))
    .limit(100);
}

export async function listWatchlist() {
  return db.select().from(watchlistCompanies).orderBy(
    sql`CASE
      WHEN priority = 'S' THEN 1
      WHEN priority = 'A' THEN 2
      WHEN priority = 'B' THEN 3
    END`,
    watchlistCompanies.name
  );
}

export async function getStandingAnswers() {
  return db.select().from(standingAnswers).orderBy(standingAnswers.category, standingAnswers.key);
}

export async function getStandingAnswer(key: string): Promise<string | null> {
  const [row] = await db.select().from(standingAnswers).where(eq(standingAnswers.key, key)).limit(1);
  return row?.value ?? null;
}

export async function getRoleOutreach(roleId: number) {
  return db
    .select()
    .from(outreachLog)
    .where(eq(outreachLog.roleId, roleId))
    .orderBy(desc(outreachLog.occurredAt));
}
