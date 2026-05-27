/**
 * Gmail API client for the inbox poller.
 *
 * Authenticates via OAuth2 refresh token (migrated from ~/.hermes/google_token.json
 * on T630). Credentials live in Vercel env vars:
 *   GMAIL_CLIENT_ID
 *   GMAIL_CLIENT_SECRET
 *   GMAIL_REFRESH_TOKEN
 *   GMAIL_USER (the address whose inbox to poll)
 */
import { google, type gmail_v1 } from "googleapis";

export type GmailMessage = {
  id: string;
  threadId: string;
  fromEmail: string | null;
  fromName: string | null;
  subject: string | null;
  snippet: string | null;
  receivedAt: Date;
  bodyText: string | null;
  labelIds: string[];
};

function getOAuth2Client() {
  const clientId = process.env.GMAIL_CLIENT_ID;
  const clientSecret = process.env.GMAIL_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Gmail OAuth env vars not set (GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN)");
  }
  const client = new google.auth.OAuth2(clientId, clientSecret);
  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

export function getGmailClient(): gmail_v1.Gmail {
  const auth = getOAuth2Client();
  return google.gmail({ version: "v1", auth });
}

export function parseFromHeader(header: string | null | undefined): { email: string | null; name: string | null } {
  if (!header) return { email: null, name: null };
  // Format: "Name <email@example.com>" or just "email@example.com"
  const match = header.match(/^\s*(?:"?([^"<]+?)"?\s*)?<?([^<>\s]+@[^<>\s]+)>?\s*$/);
  if (!match) return { email: header.trim(), name: null };
  return {
    name: match[1]?.trim() || null,
    email: match[2]?.trim() ?? null,
  };
}

function getHeader(headers: gmail_v1.Schema$MessagePartHeader[] | undefined, name: string): string | null {
  if (!headers) return null;
  const h = headers.find((h) => h.name?.toLowerCase() === name.toLowerCase());
  return h?.value ?? null;
}

function extractPlainBody(payload: gmail_v1.Schema$MessagePart | undefined): string | null {
  if (!payload) return null;
  if (payload.mimeType === "text/plain" && payload.body?.data) {
    return Buffer.from(payload.body.data, "base64url").toString("utf-8");
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      const body = extractPlainBody(part);
      if (body) return body;
    }
  }
  return null;
}

export async function fetchMessagesSince(sinceUnix: number, max = 50): Promise<GmailMessage[]> {
  const gmail = getGmailClient();
  // Gmail search query: after:<unix>
  const list = await gmail.users.messages.list({
    userId: "me",
    q: `after:${sinceUnix}`,
    maxResults: max,
  });

  const ids = list.data.messages ?? [];
  if (ids.length === 0) return [];

  const messages: GmailMessage[] = [];
  for (const ref of ids) {
    if (!ref.id) continue;
    const msg = await gmail.users.messages.get({
      userId: "me",
      id: ref.id,
      format: "full",
    });

    const headers = msg.data.payload?.headers;
    const fromHeader = getHeader(headers, "From");
    const { email, name } = parseFromHeader(fromHeader);
    const subject = getHeader(headers, "Subject");
    const internalDate = msg.data.internalDate ? new Date(Number(msg.data.internalDate)) : new Date();
    const body = extractPlainBody(msg.data.payload ?? undefined);

    messages.push({
      id: msg.data.id ?? ref.id,
      threadId: msg.data.threadId ?? "",
      fromEmail: email,
      fromName: name,
      subject,
      snippet: msg.data.snippet ?? null,
      receivedAt: internalDate,
      bodyText: body,
      labelIds: msg.data.labelIds ?? [],
    });
  }

  return messages;
}

export async function archiveMessage(messageId: string) {
  const gmail = getGmailClient();
  await gmail.users.messages.modify({
    userId: "me",
    id: messageId,
    requestBody: {
      removeLabelIds: ["INBOX"],
    },
  });
}

export type GmailSendArgs = {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
};

/**
 * Send an email via the Gmail API as the authenticated user.
 * Requires the gmail.modify scope (which our refresh token has).
 * Encodes the message as multipart/alternative so the recipient
 * gets HTML if their client supports it, plain text as fallback.
 */
export async function sendEmail(args: GmailSendArgs): Promise<{ id: string }> {
  const gmail = getGmailClient();
  const boundary = `cdo_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;

  const headers = [
    `From: ${args.from}`,
    `To: ${args.to}`,
    `Subject: ${encodeSubject(args.subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ].join("\r\n");

  const body = [
    "",
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    args.text,
    "",
    `--${boundary}`,
    "Content-Type: text/html; charset=UTF-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    args.html,
    "",
    `--${boundary}--`,
    "",
  ].join("\r\n");

  const raw = Buffer.from(headers + "\r\n" + body, "utf-8").toString("base64url");

  const res = await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });

  if (!res.data.id) throw new Error("Gmail send returned no message id");
  return { id: res.data.id };
}

// RFC 2047 encode subject if it contains non-ASCII (for emoji / unicode chars)
function encodeSubject(subject: string): string {
  // eslint-disable-next-line no-control-regex
  if (/^[\x00-\x7F]*$/.test(subject)) return subject;
  return `=?UTF-8?B?${Buffer.from(subject, "utf-8").toString("base64")}?=`;
}
