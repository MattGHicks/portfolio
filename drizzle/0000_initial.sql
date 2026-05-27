CREATE TYPE "public"."application_status" AS ENUM('drafting', 'pending_approval', 'approved', 'submitting', 'submitted', 'failed', 'responded', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."ats_platform" AS ENUM('ashby', 'greenhouse', 'lever', 'workday', 'jazzhr', 'linkedin', 'company_page', 'yc', 'email', 'other');--> statement-breakpoint
CREATE TYPE "public"."inbox_classification" AS ENUM('auto_ack', 'rejection', 'recruiter_screen', 'interview_request', 'outreach', 'assessment', 'scheduling', 'ambiguous', 'noise');--> statement-breakpoint
CREATE TYPE "public"."inbox_status" AS ENUM('unread', 'triaged', 'archived');--> statement-breakpoint
CREATE TYPE "public"."narrative_bucket" AS ENUM('ai_devtools', 'b2b_infra_fintech', 'govtech_civic', 'other');--> statement-breakpoint
CREATE TYPE "public"."outreach_channel" AS ENUM('linkedin', 'email', 'cold', 'warm_intro', 'referral', 'recruiter_inbound');--> statement-breakpoint
CREATE TYPE "public"."remote_policy" AS ENUM('remote_us', 'remote_global', 'remote_with_restrictions', 'hybrid', 'onsite', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."role_status" AS ENUM('unscored', 'scored', 'drafting', 'awaiting_approval', 'approved', 'submitted', 'responded', 'rejected', 'dropped', 'archived');--> statement-breakpoint
CREATE TYPE "public"."role_tier" AS ENUM('S', 'A', 'B', 'drop');--> statement-breakpoint
CREATE TYPE "public"."watchlist_priority" AS ENUM('S', 'A', 'B');--> statement-breakpoint
CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"status" "application_status" DEFAULT 'drafting' NOT NULL,
	"cover_letter_md" text,
	"custom_answers" jsonb DEFAULT '{}'::jsonb,
	"resume_url" text DEFAULT '/resume.pdf',
	"submission_log" jsonb DEFAULT '[]'::jsonb,
	"approved_at" timestamp with time zone,
	"submitted_at" timestamp with time zone,
	"response_received_at" timestamp with time zone,
	"cancel_token_expires_at" timestamp with time zone,
	"cancel_token" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drafts" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"cover_letter_md" text,
	"custom_answers" jsonb DEFAULT '{}'::jsonb,
	"voice_anchor" text,
	"created_by" text DEFAULT 'matt' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inbox_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"message_id" text NOT NULL,
	"thread_id" text,
	"from_email" text,
	"from_name" text,
	"subject" text,
	"body_snippet" text,
	"classification" "inbox_classification",
	"classification_confidence" integer,
	"linked_role_id" integer,
	"linked_application_id" integer,
	"received_at" timestamp with time zone NOT NULL,
	"classified_at" timestamp with time zone,
	"status" "inbox_status" DEFAULT 'unread' NOT NULL,
	"gmail_archived" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "inbox_messages_message_id_unique" UNIQUE("message_id")
);
--> statement-breakpoint
CREATE TABLE "outreach_log" (
	"id" serial PRIMARY KEY NOT NULL,
	"role_id" integer,
	"person_name" text,
	"person_title" text,
	"company" text,
	"channel" "outreach_channel",
	"outcome" text,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"company" text NOT NULL,
	"title" text NOT NULL,
	"source_url" text,
	"ats_platform" "ats_platform" DEFAULT 'other' NOT NULL,
	"ats_external_id" text,
	"posted_at" timestamp with time zone,
	"salary_min" integer,
	"salary_max" integer,
	"location" text,
	"remote_policy" "remote_policy" DEFAULT 'unknown',
	"jd_text" text,
	"jd_snippet" text,
	"status" "role_status" DEFAULT 'unscored' NOT NULL,
	"tier" "role_tier",
	"score" integer,
	"score_reasoning" text,
	"narrative_bucket" "narrative_bucket",
	"glassdoor_rating" text,
	"notes" text,
	"scored_at" timestamp with time zone,
	"last_touched_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "standing_answers" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"label" text,
	"category" text,
	"last_updated" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "watchlist_companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ats_platform" "ats_platform" DEFAULT 'other' NOT NULL,
	"ats_board_url" text,
	"ats_board_slug" text,
	"priority" "watchlist_priority" DEFAULT 'A' NOT NULL,
	"last_scraped_at" timestamp with time zone,
	"last_scrape_result" jsonb,
	"notes" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "watchlist_companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inbox_messages" ADD CONSTRAINT "inbox_messages_linked_role_id_roles_id_fk" FOREIGN KEY ("linked_role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inbox_messages" ADD CONSTRAINT "inbox_messages_linked_application_id_applications_id_fk" FOREIGN KEY ("linked_application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outreach_log" ADD CONSTRAINT "outreach_log_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "apps_status_idx" ON "applications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "apps_role_idx" ON "applications" USING btree ("role_id");--> statement-breakpoint
CREATE INDEX "inbox_classification_idx" ON "inbox_messages" USING btree ("classification");--> statement-breakpoint
CREATE INDEX "inbox_status_idx" ON "inbox_messages" USING btree ("status");--> statement-breakpoint
CREATE INDEX "inbox_received_idx" ON "inbox_messages" USING btree ("received_at");--> statement-breakpoint
CREATE INDEX "roles_status_idx" ON "roles" USING btree ("status");--> statement-breakpoint
CREATE INDEX "roles_tier_idx" ON "roles" USING btree ("tier");--> statement-breakpoint
CREATE INDEX "roles_company_idx" ON "roles" USING btree ("company");--> statement-breakpoint
CREATE UNIQUE INDEX "roles_uniq_external" ON "roles" USING btree ("ats_platform","ats_external_id");