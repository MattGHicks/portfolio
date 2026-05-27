/**
 * Internal endpoint that the GitHub Actions Playwright submitter fetches
 * to get all the data it needs (role, application, standing answers).
 * Authenticated via the application's cancel_token.
 */
import { NextResponse } from "next/server";
import { db } from "@/db";
import { applications, roles, standingAnswers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const token = request.headers.get("x-cancel-token");
  const [app] = await db.select().from(applications).where(eq(applications.id, id)).limit(1);
  if (!app) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (app.cancelToken !== token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const [role] = await db.select().from(roles).where(eq(roles.id, app.roleId)).limit(1);
  const answers = await db.select().from(standingAnswers);
  const standing = Object.fromEntries(answers.map((a) => [a.key, a.value]));

  return NextResponse.json({
    application: {
      id: app.id,
      coverLetterMd: app.coverLetterMd,
      customAnswers: app.customAnswers,
      resumeUrl: app.resumeUrl,
    },
    role: {
      company: role?.company,
      title: role?.title,
      sourceUrl: role?.sourceUrl,
      atsPlatform: role?.atsPlatform,
    },
    standing,
  });
}
