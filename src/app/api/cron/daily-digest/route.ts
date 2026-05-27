/**
 * Daily digest cron — runs at 8am ET.
 * Builds a digest of pipeline state and emails Matt via Resend.
 */
import { NextResponse } from "next/server";
import { Resend } from "resend";
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://digitalfish.io";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ status: "skipped", reason: "RESEND_API_KEY not set", preview: text });
  }

  const resend = new Resend(apiKey);
  const from = process.env.NOTIFICATION_EMAIL_FROM ?? "career@digitalfish.io";
  const to = process.env.NOTIFICATION_EMAIL_TO ?? "matt@digitalfish.io";

  try {
    const result = await resend.emails.send({
      from,
      to,
      subject: `Career Ops · ${digest.date}`,
      html,
      text,
    });
    return NextResponse.json({ status: "ok", emailId: result.data?.id, digest });
  } catch (err) {
    console.error("[daily-digest] send failed:", err);
    return NextResponse.json({ status: "error", error: String(err) }, { status: 500 });
  }
}
