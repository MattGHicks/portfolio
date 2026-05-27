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

  // Skip empty digests (nothing to report)
  const hasContent =
    digest.pendingApproval.length > 0 ||
    digest.newTierS.length > 0 ||
    digest.newTierA.length > 0 ||
    digest.recruiterMessages.length > 0 ||
    digest.unscored > 0 ||
    digest.unclassified > 0 ||
    digest.submittedToday > 0;

  if (!hasContent) {
    return NextResponse.json({ status: "skipped", reason: "no content" });
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
      subject: `Career Ops · ${digest.date}`,
      html,
      text,
    });
    return NextResponse.json({ status: "ok", emailId: result.id, digest });
  } catch (err) {
    console.error("[daily-digest] send failed:", err);
    return NextResponse.json({ status: "error", error: String(err) }, { status: 500 });
  }
}
