import { NextResponse } from "next/server";

/**
 * Vercel Cron sends an Authorization: Bearer <CRON_SECRET> header.
 * Locally, calls without the header are allowed in dev.
 */
export function verifyCronRequest(request: Request): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (process.env.NODE_ENV !== "production") return null; // dev: allow

  if (!secret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 500 });
  }
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return null;
}

export async function getKillSwitch(): Promise<boolean> {
  const { db } = await import("@/db");
  const { standingAnswers } = await import("@/db/schema");
  const { eq } = await import("drizzle-orm");
  const [row] = await db
    .select({ value: standingAnswers.value })
    .from(standingAnswers)
    .where(eq(standingAnswers.key, "system.paused"))
    .limit(1);
  return row?.value === "true";
}
