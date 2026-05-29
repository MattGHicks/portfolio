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
    incomplete?: boolean;
    missingRequired?: string[];
    unconfirmed?: boolean;
    confirmed?: boolean;
    runUrl?: string | null;
  };
  const now = new Date();
  const runUrl = body.runUrl ?? null;
  const ev = (event: string, extra: Record<string, unknown> = {}) =>
    sql`submission_log || ${JSON.stringify([{ at: now.toISOString(), event, runUrl, ...extra }])}::jsonb`;

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
        submissionLog: ev("manual_apply_required", { error: body.error ?? null }),
      })
      .where(eq(applications.id, id));
    await db.update(roles).set({ status: "awaiting_approval", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
    return NextResponse.json({ status: "manual_apply_required" });
  }

  // Completeness gate tripped: auto-fill left required fields empty, so we did
  // NOT submit. Park as pending_approval with the exact missing fields so the
  // dashboard can say "apply on the site — these fields need you."
  if (body.incomplete) {
    await db
      .update(applications)
      .set({
        status: "pending_approval",
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: ev("submission_incomplete", { error: body.error ?? null, missingRequired: body.missingRequired ?? [] }),
      })
      .where(eq(applications.id, id));
    await db.update(roles).set({ status: "awaiting_approval", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
    return NextResponse.json({ status: "incomplete", missingRequired: body.missingRequired ?? [] });
  }

  // Dry-run that prefilled cleanly: NOT a real submission. Park back at
  // 'approved' and record the screenshot run + any required fields the fill missed.
  if (body.dryRun) {
    await db
      .update(applications)
      .set({
        status: "approved",
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: ev(body.ok ? "dry_run_passed" : "dry_run_failed", {
          error: body.error ?? null,
          missingRequired: body.missingRequired ?? [],
          log: body.log ?? null,
        }),
      })
      .where(eq(applications.id, id));
    await db.update(roles).set({ status: "approved", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
    return NextResponse.json({ status: "dry_run_recorded", ok: body.ok, missingRequired: body.missingRequired ?? [] });
  }

  if (body.ok) {
    await db
      .update(applications)
      .set({
        status: "submitted",
        submittedAt: now,
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: ev("submitted", { confirmed: body.confirmed ?? true, log: body.log ?? null }),
      })
      .where(eq(applications.id, id));

    await db.update(roles).set({ status: "submitted", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
  } else {
    // Real failure or unconfirmed click. Keep the role recoverable (drafting)
    // and record whether it was an outright error or just unconfirmed.
    await db
      .update(applications)
      .set({
        status: "failed",
        cancelToken: null,
        cancelTokenExpiresAt: null,
        submissionLog: ev(body.unconfirmed ? "submit_unconfirmed" : "submission_failed", { error: body.error ?? "unknown" }),
      })
      .where(eq(applications.id, id));

    await db.update(roles).set({ status: "drafting", lastTouchedAt: now }).where(eq(roles.id, app.roleId));
  }

  return NextResponse.json({ status: "ok" });
}
