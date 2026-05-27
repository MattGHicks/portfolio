import { pgTable, serial, text, timestamp, integer, boolean, jsonb, pgEnum, uniqueIndex, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ============================================================================
// Enums
// ============================================================================

export const roleStatusEnum = pgEnum("role_status", [
  "unscored",
  "scored",
  "drafting",
  "awaiting_approval",
  "approved",
  "submitted",
  "responded",
  "rejected",
  "dropped",
  "archived",
]);

export const roleTierEnum = pgEnum("role_tier", ["S", "A", "B", "drop"]);

export const atsPlatformEnum = pgEnum("ats_platform", [
  "ashby",
  "greenhouse",
  "lever",
  "workday",
  "jazzhr",
  "linkedin",
  "company_page",
  "yc",
  "email",
  "other",
]);

export const remotePolicyEnum = pgEnum("remote_policy", [
  "remote_us",
  "remote_global",
  "remote_with_restrictions",
  "hybrid",
  "onsite",
  "unknown",
]);

export const narrativeBucketEnum = pgEnum("narrative_bucket", [
  "ai_devtools",
  "b2b_infra_fintech",
  "govtech_civic",
  "other",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "drafting",
  "pending_approval",
  "approved",
  "submitting",
  "submitted",
  "failed",
  "responded",
  "rejected",
]);

export const inboxClassificationEnum = pgEnum("inbox_classification", [
  "auto_ack",
  "rejection",
  "recruiter_screen",
  "interview_request",
  "outreach",
  "assessment",
  "scheduling",
  "ambiguous",
  "noise",
]);

export const inboxStatusEnum = pgEnum("inbox_status", [
  "unread",
  "triaged",
  "archived",
]);

export const outreachChannelEnum = pgEnum("outreach_channel", [
  "linkedin",
  "email",
  "cold",
  "warm_intro",
  "referral",
  "recruiter_inbound",
]);

export const watchlistPriorityEnum = pgEnum("watchlist_priority", ["S", "A", "B"]);

// ============================================================================
// Tables
// ============================================================================

export const roles = pgTable(
  "roles",
  {
    id: serial("id").primaryKey(),
    company: text("company").notNull(),
    title: text("title").notNull(),
    sourceUrl: text("source_url"),
    atsPlatform: atsPlatformEnum("ats_platform").notNull().default("other"),
    atsExternalId: text("ats_external_id"),
    postedAt: timestamp("posted_at", { withTimezone: true }),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    location: text("location"),
    remotePolicy: remotePolicyEnum("remote_policy").default("unknown"),
    jdText: text("jd_text"),
    jdSnippet: text("jd_snippet"),
    status: roleStatusEnum("status").notNull().default("unscored"),
    tier: roleTierEnum("tier"),
    score: integer("score"),
    scoreReasoning: text("score_reasoning"),
    narrativeBucket: narrativeBucketEnum("narrative_bucket"),
    glassdoorRating: text("glassdoor_rating"),
    notes: text("notes"),
    scoredAt: timestamp("scored_at", { withTimezone: true }),
    lastTouchedAt: timestamp("last_touched_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    statusIdx: index("roles_status_idx").on(table.status),
    tierIdx: index("roles_tier_idx").on(table.tier),
    companyIdx: index("roles_company_idx").on(table.company),
    uniqExternal: uniqueIndex("roles_uniq_external").on(table.atsPlatform, table.atsExternalId),
  })
);

export const applications = pgTable(
  "applications",
  {
    id: serial("id").primaryKey(),
    roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
    status: applicationStatusEnum("status").notNull().default("drafting"),
    coverLetterMd: text("cover_letter_md"),
    customAnswers: jsonb("custom_answers").$type<Record<string, string>>().default({}),
    resumeUrl: text("resume_url").default("/resume.pdf"),
    submissionLog: jsonb("submission_log").$type<Array<{ at: string; event: string; data?: unknown }>>().default([]),
    approvedAt: timestamp("approved_at", { withTimezone: true }),
    submittedAt: timestamp("submitted_at", { withTimezone: true }),
    responseReceivedAt: timestamp("response_received_at", { withTimezone: true }),
    cancelTokenExpiresAt: timestamp("cancel_token_expires_at", { withTimezone: true }),
    cancelToken: text("cancel_token"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (table) => ({
    statusIdx: index("apps_status_idx").on(table.status),
    roleIdx: index("apps_role_idx").on(table.roleId),
  })
);

export const drafts = pgTable("drafts", {
  id: serial("id").primaryKey(),
  roleId: integer("role_id").notNull().references(() => roles.id, { onDelete: "cascade" }),
  version: integer("version").notNull().default(1),
  coverLetterMd: text("cover_letter_md"),
  customAnswers: jsonb("custom_answers").$type<Record<string, string>>().default({}),
  voiceAnchor: text("voice_anchor"),
  createdBy: text("created_by").notNull().default("matt"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export const inboxMessages = pgTable(
  "inbox_messages",
  {
    id: serial("id").primaryKey(),
    messageId: text("message_id").notNull().unique(),
    threadId: text("thread_id"),
    fromEmail: text("from_email"),
    fromName: text("from_name"),
    subject: text("subject"),
    bodySnippet: text("body_snippet"),
    classification: inboxClassificationEnum("classification"),
    classificationConfidence: integer("classification_confidence"),
    linkedRoleId: integer("linked_role_id").references(() => roles.id),
    linkedApplicationId: integer("linked_application_id").references(() => applications.id),
    receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
    classifiedAt: timestamp("classified_at", { withTimezone: true }),
    status: inboxStatusEnum("status").notNull().default("unread"),
    gmailArchived: boolean("gmail_archived").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => ({
    classificationIdx: index("inbox_classification_idx").on(table.classification),
    statusIdx: index("inbox_status_idx").on(table.status),
    receivedIdx: index("inbox_received_idx").on(table.receivedAt),
  })
);

export const watchlistCompanies = pgTable("watchlist_companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  atsPlatform: atsPlatformEnum("ats_platform").notNull().default("other"),
  atsBoardUrl: text("ats_board_url"),
  atsBoardSlug: text("ats_board_slug"),
  priority: watchlistPriorityEnum("priority").notNull().default("A"),
  lastScrapedAt: timestamp("last_scraped_at", { withTimezone: true }),
  lastScrapeResult: jsonb("last_scrape_result").$type<{ found: number; new: number; errors?: string[] }>(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export const outreachLog = pgTable("outreach_log", {
  id: serial("id").primaryKey(),
  roleId: integer("role_id").references(() => roles.id, { onDelete: "set null" }),
  personName: text("person_name"),
  personTitle: text("person_title"),
  company: text("company"),
  channel: outreachChannelEnum("channel"),
  outcome: text("outcome"),
  occurredAt: timestamp("occurred_at", { withTimezone: true }).notNull().default(sql`now()`),
  notes: text("notes"),
});

export const standingAnswers = pgTable("standing_answers", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  label: text("label"),
  category: text("category"),
  lastUpdated: timestamp("last_updated", { withTimezone: true }).notNull().default(sql`now()`),
});

// ============================================================================
// Type helpers
// ============================================================================

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;
export type Draft = typeof drafts.$inferSelect;
export type InboxMessage = typeof inboxMessages.$inferSelect;
export type WatchlistCompany = typeof watchlistCompanies.$inferSelect;
export type StandingAnswer = typeof standingAnswers.$inferSelect;
