import { db } from "@/db";
import { roles, applications, inboxMessages } from "@/db/schema";
import { and, desc, eq, gte, isNull, sql } from "drizzle-orm";

export type DigestPayload = {
  date: string;
  submittedToday: number;
  submittedThisWeek: number;
  pendingApproval: Array<{ company: string; title: string; appId: number }>;
  newTierS: Array<{ company: string; title: string; score: number | null; id: number }>;
  newTierA: Array<{ company: string; title: string; score: number | null; id: number }>;
  unscored: number;
  unclassified: number;
  recruiterMessages: Array<{ from: string; subject: string | null; classification: string }>;
  dailyCap: number;
  weeklyCap: number;
};

export async function buildDigest(): Promise<DigestPayload> {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const sinceYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [
    submittedTodayRows,
    submittedWeekRows,
    pendingRows,
    tierSRows,
    tierARows,
    unscoredRows,
    unclassifiedRows,
    recruiterMessageRows,
  ] = await Promise.all([
    db.select({ c: sql<number>`count(*)::int` }).from(applications).where(and(eq(applications.status, "submitted"), gte(applications.submittedAt, startOfDay))),
    db.select({ c: sql<number>`count(*)::int` }).from(applications).where(and(eq(applications.status, "submitted"), gte(applications.submittedAt, startOfWeek))),
    db
      .select({
        appId: applications.id,
        company: roles.company,
        title: roles.title,
      })
      .from(applications)
      .innerJoin(roles, eq(roles.id, applications.roleId))
      .where(eq(applications.status, "pending_approval"))
      .orderBy(desc(applications.createdAt))
      .limit(20),
    db
      .select({ id: roles.id, company: roles.company, title: roles.title, score: roles.score })
      .from(roles)
      .where(and(eq(roles.tier, "S"), gte(roles.scoredAt, sinceYesterday)))
      .orderBy(desc(roles.score))
      .limit(10),
    db
      .select({ id: roles.id, company: roles.company, title: roles.title, score: roles.score })
      .from(roles)
      .where(and(eq(roles.tier, "A"), gte(roles.scoredAt, sinceYesterday)))
      .orderBy(desc(roles.score))
      .limit(10),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "unscored")),
    db.select({ c: sql<number>`count(*)::int` }).from(inboxMessages).where(isNull(inboxMessages.classification)),
    db
      .select({
        from: inboxMessages.fromEmail,
        subject: inboxMessages.subject,
        classification: inboxMessages.classification,
      })
      .from(inboxMessages)
      .where(
        and(
          gte(inboxMessages.receivedAt, sinceYesterday),
          sql`classification IN ('recruiter_screen', 'interview_request', 'outreach')`
        )
      )
      .orderBy(desc(inboxMessages.receivedAt))
      .limit(10),
  ]);

  return {
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    submittedToday: submittedTodayRows[0]?.c ?? 0,
    submittedThisWeek: submittedWeekRows[0]?.c ?? 0,
    pendingApproval: pendingRows,
    newTierS: tierSRows,
    newTierA: tierARows,
    unscored: unscoredRows[0]?.c ?? 0,
    unclassified: unclassifiedRows[0]?.c ?? 0,
    recruiterMessages: recruiterMessageRows.map((r) => ({
      from: r.from ?? "—",
      subject: r.subject,
      classification: r.classification ?? "—",
    })),
    dailyCap: 3,
    weeklyCap: 10,
  };
}

export function renderDigestHtml(d: DigestPayload, baseUrl: string): string {
  const link = (path: string, text: string) =>
    `<a href="${baseUrl}${path}" style="color: #5b8feb; text-decoration: none;">${text}</a>`;

  const section = (label: string, body: string) => `
    <div style="margin-bottom: 32px;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #79746b; margin-bottom: 12px;">${label}</div>
      ${body}
    </div>
  `;

  const roleList = (rows: { company: string; title: string; score: number | null; id: number }[]) =>
    rows.length === 0
      ? `<div style="font-size: 14px; color: #b6b0a4;">None new since yesterday.</div>`
      : rows
          .map(
            (r) => `
            <div style="padding: 10px 0; border-bottom: 1px solid rgba(243,240,234,0.08);">
              <div style="font-size: 15px; color: #f3f0ea; font-weight: 500;">${r.company} — ${r.title} ${r.score ? `<span style="color: #c4a158; font-family: monospace; font-size: 12px;">(${r.score})</span>` : ""}</div>
              <div style="margin-top: 4px;">${link(`/admin/role/${r.id}`, "Open →")}</div>
            </div>
          `
          )
          .join("");

  return `
    <!doctype html>
    <html>
      <body style="margin: 0; padding: 24px; background: #1a1917; color: #f3f0ea; font-family: -apple-system, 'DM Sans', sans-serif;">
        <div style="max-width: 600px; margin: 0 auto;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #79746b; margin-bottom: 6px;">
            Career Ops · ${d.date}
          </div>
          <h1 style="font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #f3f0ea; margin: 0 0 32px; letter-spacing: -0.015em;">
            Daily brief
          </h1>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px;">
            <div style="padding: 16px; background: rgba(243,240,234,0.025); border: 1px solid rgba(243,240,234,0.08); border-radius: 8px;">
              <div style="font-family: monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #79746b;">Today / cap</div>
              <div style="font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #f3f0ea; margin-top: 4px;">${d.submittedToday} / ${d.dailyCap}</div>
            </div>
            <div style="padding: 16px; background: rgba(243,240,234,0.025); border: 1px solid rgba(243,240,234,0.08); border-radius: 8px;">
              <div style="font-family: monospace; font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #79746b;">Week / cap</div>
              <div style="font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; color: #f3f0ea; margin-top: 4px;">${d.submittedThisWeek} / ${d.weeklyCap}</div>
            </div>
          </div>

          ${
            d.pendingApproval.length > 0
              ? section(
                  `Awaiting your approval · ${d.pendingApproval.length}`,
                  d.pendingApproval
                    .map(
                      (a) => `
                  <div style="padding: 12px 14px; background: rgba(214,182,116,0.08); border: 1px solid rgba(214,182,116,0.3); border-radius: 8px; margin-bottom: 8px;">
                    <div style="font-size: 15px; color: #f3f0ea; font-weight: 500;">${a.company}</div>
                    <div style="font-size: 13px; color: #b6b0a4; margin-top: 2px;">${a.title}</div>
                    <div style="margin-top: 8px;">${link(`/admin/role/${a.appId}`, "Review draft →")}</div>
                  </div>
                `
                    )
                    .join("")
                )
              : ""
          }

          ${
            d.newTierS.length > 0
              ? section(`New Tier S · ${d.newTierS.length}`, roleList(d.newTierS))
              : ""
          }

          ${
            d.newTierA.length > 0
              ? section(`New Tier A · ${d.newTierA.length}`, roleList(d.newTierA))
              : ""
          }

          ${
            d.recruiterMessages.length > 0
              ? section(
                  `Recruiter / interview · ${d.recruiterMessages.length}`,
                  d.recruiterMessages
                    .map(
                      (m) => `
                  <div style="padding: 10px 0; border-bottom: 1px solid rgba(243,240,234,0.08);">
                    <div style="font-size: 14px; color: #f3f0ea;">${m.subject ?? "(no subject)"}</div>
                    <div style="font-size: 12px; color: #b6b0a4; margin-top: 2px;">${m.from} · ${m.classification}</div>
                  </div>
                `
                    )
                    .join("")
                )
              : ""
          }

          ${
            d.unscored > 0 || d.unclassified > 0
              ? section(
                  "Needs Claude",
                  `<div style="font-size: 14px; color: #b6b0a4; line-height: 1.6;">
                    ${d.unscored > 0 ? `<div>• <strong style="color: #c4a158;">${d.unscored}</strong> unscored role${d.unscored === 1 ? "" : "s"} — ask Claude to score</div>` : ""}
                    ${d.unclassified > 0 ? `<div>• <strong style="color: #c4a158;">${d.unclassified}</strong> unclassified message${d.unclassified === 1 ? "" : "s"} — ask Claude to classify</div>` : ""}
                  </div>`
                )
              : ""
          }

          <div style="margin-top: 48px; padding-top: 16px; border-top: 1px solid rgba(243,240,234,0.08); font-family: monospace; font-size: 11px; color: #79746b;">
            ${link("/admin", "Open dashboard →")}
          </div>
        </div>
      </body>
    </html>
  `;
}

export function renderDigestText(d: DigestPayload, baseUrl: string): string {
  const lines: string[] = [];
  lines.push(`CAREER OPS — Daily brief · ${d.date}`);
  lines.push("");
  lines.push(`Today: ${d.submittedToday} / ${d.dailyCap}    Week: ${d.submittedThisWeek} / ${d.weeklyCap}`);
  lines.push("");

  if (d.pendingApproval.length > 0) {
    lines.push(`AWAITING APPROVAL (${d.pendingApproval.length})`);
    d.pendingApproval.forEach((a) => {
      lines.push(`  • ${a.company} — ${a.title}`);
      lines.push(`    ${baseUrl}/admin/role/${a.appId}`);
    });
    lines.push("");
  }

  if (d.newTierS.length > 0) {
    lines.push(`NEW TIER S (${d.newTierS.length})`);
    d.newTierS.forEach((r) => lines.push(`  • ${r.company} — ${r.title} (${r.score ?? "—"})`));
    lines.push("");
  }

  if (d.newTierA.length > 0) {
    lines.push(`NEW TIER A (${d.newTierA.length})`);
    d.newTierA.forEach((r) => lines.push(`  • ${r.company} — ${r.title} (${r.score ?? "—"})`));
    lines.push("");
  }

  if (d.recruiterMessages.length > 0) {
    lines.push(`RECRUITER / INTERVIEW (${d.recruiterMessages.length})`);
    d.recruiterMessages.forEach((m) => lines.push(`  • ${m.subject ?? "(no subject)"} — ${m.from}`));
    lines.push("");
  }

  if (d.unscored > 0 || d.unclassified > 0) {
    lines.push("NEEDS CLAUDE");
    if (d.unscored > 0) lines.push(`  • ${d.unscored} unscored role${d.unscored === 1 ? "" : "s"} — ask Claude to score`);
    if (d.unclassified > 0) lines.push(`  • ${d.unclassified} unclassified message${d.unclassified === 1 ? "" : "s"}`);
    lines.push("");
  }

  lines.push(`${baseUrl}/admin`);
  return lines.join("\n");
}
