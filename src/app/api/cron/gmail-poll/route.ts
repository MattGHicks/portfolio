/**
 * Gmail polling cron — runs every 30 minutes.
 * Fetches new messages since the cursor stored in standing_answers,
 * inserts them into inbox_messages with classification=null.
 */
import { NextResponse } from "next/server";
import { db } from "@/db";
import { inboxMessages, standingAnswers } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { fetchMessagesSince } from "@/lib/gmail";
import { verifyCronRequest, getKillSwitch } from "@/lib/cron-auth";

const CURSOR_KEY = "gmail.last_polled_unix";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const authError = verifyCronRequest(request);
  if (authError) return authError;

  if (await getKillSwitch()) {
    return NextResponse.json({ status: "paused" });
  }

  if (!process.env.GMAIL_REFRESH_TOKEN) {
    return NextResponse.json({ status: "skipped", reason: "GMAIL_REFRESH_TOKEN not configured" });
  }

  // Get cursor (default: 24h ago)
  const [cursorRow] = await db
    .select({ value: standingAnswers.value })
    .from(standingAnswers)
    .where(eq(standingAnswers.key, CURSOR_KEY))
    .limit(1);

  const fallback = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
  const sinceUnix = cursorRow ? Number(cursorRow.value) : fallback;

  let messages;
  try {
    messages = await fetchMessagesSince(sinceUnix, 50);
  } catch (err) {
    console.error("[gmail-poll] fetch failed:", err);
    return NextResponse.json({ status: "error", error: String(err) }, { status: 500 });
  }

  let inserted = 0;
  for (const m of messages) {
    try {
      await db
        .insert(inboxMessages)
        .values({
          messageId: m.id,
          threadId: m.threadId,
          fromEmail: m.fromEmail,
          fromName: m.fromName,
          subject: m.subject,
          bodySnippet: m.snippet ?? m.bodyText?.slice(0, 600) ?? null,
          receivedAt: m.receivedAt,
          status: "unread",
        })
        .onConflictDoNothing({ target: inboxMessages.messageId });
      inserted++;
    } catch (err) {
      console.error("[gmail-poll] insert failed for", m.id, err);
    }
  }

  const newCursor = Math.floor(Date.now() / 1000).toString();
  await db
    .insert(standingAnswers)
    .values({
      key: CURSOR_KEY,
      value: newCursor,
      label: "Gmail last polled (unix seconds)",
      category: "system",
    })
    .onConflictDoUpdate({
      target: standingAnswers.key,
      set: { value: newCursor, lastUpdated: sql`now()` },
    });

  return NextResponse.json({
    status: "ok",
    fetched: messages.length,
    inserted,
    sinceUnix,
    newCursor: Number(newCursor),
  });
}
