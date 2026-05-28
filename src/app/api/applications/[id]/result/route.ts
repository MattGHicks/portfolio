/**
 * Callback from GitHub Actions Playwright submitter.
 * Body: { ok: boolean, error?: string, screenshotUrl?: string, log?: object }
 * Header: x-cancel-token must match applications.cancel_token
 */
import { NextResponse } from "next/server";
import { db } from "@/db";
import { applications, roles } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const token = request.headers.get("x-cancel-token");
  const [app] = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  if (!app) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (app.cancelToken !== token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = (await request.json()) as {
    ok: boolean;
    error?: string;
    log?: unknown;
    dryRun?: boolean;
    manualRequired?: boolean;
  };
  const now = new Date();

  // Not an auto-fillable ATS (company page / LinkedIn / Glassdoor link). Keep the
  // application actionable as 'pending_approval' with a clear note rather than
  // mislabeling it failed — Matt applies via the posting link, then marks it done.
  if (body.manualRequired) {
    await db
      .update(applications)
      .set({
        status: "pending_approval",
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: sql`submission_log || ${JSON.stringify([
          { at: now.toISOString(), event: "manual_apply_required", error: body.error ?? null },
        ])}::jsonb`,
      })
      .where(eq(applications.id, id));
    await db.update(roles).set({ status: "awaiting_approval", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
    return NextResponse.json({ status: "manual_apply_required" });
  }

  // Dry-run that prefilled cleanly: NOT a real submission. Park the application
  // back at 'approved' (ready for the real submit once DRY_RUN=false) and record
  // a clear event + screenshots, rather than mislabeling it submitted or failed.
  if (body.dryRun) {
    await db
      .update(applications)
      .set({
        status: "approved",
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: sql`submission_log || ${JSON.stringify([
          { at: now.toISOString(), event: body.ok ? "dry_run_passed" : "dry_run_failed", error: body.error ?? null, log: body.log ?? null },
        ])}::jsonb`,
      })
      .where(eq(applications.id, id));
    await db.update(roles).set({ status: "approved", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
    return NextResponse.json({ status: "dry_run_recorded", ok: body.ok });
  }

  if (body.ok) {
    await db
      .update(applications)
      .set({
        status: "submitted",
        submittedAt: now,
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: sql`submission_log || ${JSON.stringify([{ at: now.toISOString(), event: "submitted", log: body.log ?? null }])}::jsonb`,
      })
      .where(eq(applications.id, id));

    await db.update(roles).set({ status: "submitted", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
  } else {
    await db
      .update(applications)
      .set({
        status: "failed",
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: sql`submission_log || ${JSON.stringify([{ at: now.toISOString(), event: "submission_failed", error: body.error ?? "unknown" }])}::jsonb`,
      })
      .where(eq(applications.id, id));

    await db.update(roles).set({ status: "drafting", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
  }

  return NextResponse.json({ status: "ok" });
}
