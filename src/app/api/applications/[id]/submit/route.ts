/**
 * Trigger GitHub Actions submission workflow for an approved application.
 * Called from the approve-and-submit server action.
 */
import { NextResponse } from "next/server";
import { db } from "@/db";
import { applications, roles } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(_request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const [app] = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  if (!app) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (app.status !== "approved") {
    return NextResponse.json({ error: `cannot submit, status=${app.status}` }, { status: 409 });
  }

  const cancelToken = randomBytes(16).toString("hex");
  const cancelExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await db
    .update(applications)
    .set({
      cancelToken,
      cancelTokenExpiresAt: cancelExpiresAt,
      submissionLog: sql`COALESCE(submission_log, '[]'::jsonb) || ${JSON.stringify([
        { at: new Date().toISOString(), event: "submission_scheduled", cancelExpiresAt: cancelExpiresAt.toISOString() },
      ])}::jsonb`,
    })
    .where(eq(applications.id, id));

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? "MattGHicks/portfolio";
  const workflow = process.env.GITHUB_WORKFLOW_FILE ?? "submit-application.yml";

  if (!token) {
    return NextResponse.json({
      status: "skipped",
      reason: "GITHUB_TOKEN not set",
      hint: "In production, set GITHUB_TOKEN with workflow:write scope to enable auto-submit.",
    });
  }

  const dispatch = await fetch(`https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      ref: "main",
      inputs: {
        application_id: String(id),
        cancel_token: cancelToken,
      },
    }),
  });

  if (!dispatch.ok) {
    const text = await dispatch.text();
    await db
      .update(applications)
      .set({ status: "failed", submissionLog: sql`submission_log || ${JSON.stringify([{ at: new Date().toISOString(), event: "dispatch_failed", error: text }])}::jsonb` })
      .where(eq(applications.id, id));
    return NextResponse.json({ status: "error", error: text }, { status: 500 });
  }

  await db
    .update(applications)
    .set({ status: "submitting" })
    .where(eq(applications.id, id));

  return NextResponse.json({ status: "dispatched", cancelExpiresAt });
}
