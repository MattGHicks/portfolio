/**
 * Daily digest cron — runs at 8am ET.
 * Builds a digest of pipeline state and emails it via Gmail
 * (using the same OAuth refresh token as the inbox poller).
 * No third-party email service needed.
 */
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";
import { buildDigest, renderDigestHtml, renderDigestText } from "@/lib/digest";
import { verifyCronRequest, getKillSwitch } from "@/lib/cron-auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const authError = verifyCronRequest(request);
  if (authError) return authError;

  if (await getKillSwitch()) {
    return NextResponse.json({ status: "paused" });
  }

  const digest = await buildDigest();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.digitalfish.io";

  const html = renderDigestHtml(digest, baseUrl);
  const text = renderDigestText(digest, baseUrl);

  // Skip empty digests (no new roles found in the last 24h)
  if (digest.newRoles.length === 0) {
    return NextResponse.json({ status: "skipped", reason: "no new roles" });
  }

  if (!process.env.GMAIL_REFRESH_TOKEN) {
    return NextResponse.json({
      status: "skipped",
      reason: "GMAIL_REFRESH_TOKEN not set",
      preview: text,
    });
  }

  const from = process.env.NOTIFICATION_EMAIL_FROM ?? "matt@digitalfish.io";
  const to = process.env.NOTIFICATION_EMAIL_TO ?? "matt@digitalfish.io";

  try {
    const result = await sendEmail({
      from,
      to,
      subject: `${digest.newRoles.length} new ${digest.newRoles.length === 1 ? "opportunity" : "opportunities"} · ${digest.date}`,
      html,
      text,
    });
    return NextResponse.json({ status: "ok", emailId: result.id, digest });
  } catch (err) {
    console.error("[daily-digest] send failed:", err);
    return NextResponse.json({ status: "error", error: String(err) }, { status: 500 });
  }
}
