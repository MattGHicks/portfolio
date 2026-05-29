import { db } from "@/db";
import { roles } from "@/db/schema";
import { and, desc, eq, gte, sql } from "drizzle-orm";
import { formatSalary, remoteLabel } from "@/lib/format";

export type DigestRole = {
  id: number;
  company: string;
  title: string;
  score: number | null;
  tier: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  remotePolicy: string | null;
  sourceUrl: string | null;
};

export type DigestPayload = {
  date: string;
  newRoles: DigestRole[]; // discovered in the last 24h, open
  openTotal: number;
};

export async function buildDigest(): Promise<DigestPayload> {
  const sinceYesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [newRoles, openTotalRows] = await Promise.all([
    db
      .select({
        id: roles.id,
        company: roles.company,
        title: roles.title,
        score: roles.score,
        tier: roles.tier,
        salaryMin: roles.salaryMin,
        salaryMax: roles.salaryMax,
        remotePolicy: roles.remotePolicy,
        sourceUrl: roles.sourceUrl,
      })
      .from(roles)
      .where(and(eq(roles.status, "scored"), gte(roles.scoredAt, sinceYesterday)))
      .orderBy(sql`CASE WHEN tier='S' THEN 1 WHEN tier='A' THEN 2 WHEN tier='B' THEN 3 ELSE 4 END`, desc(roles.score))
      .limit(25),
    db.select({ c: sql<number>`count(*)::int` }).from(roles).where(eq(roles.status, "scored")),
  ]);

  return {
    date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    newRoles,
    openTotal: openTotalRows[0]?.c ?? 0,
  };
}

export function renderDigestHtml(d: DigestPayload, baseUrl: string): string {
  const row = (r: DigestRole) => `
    <div style="padding: 14px 0; border-bottom: 1px solid rgba(243,240,234,0.08);">
      <div style="font-size: 16px; color: #f3f0ea; font-weight: 600;">
        ${r.company} ${r.tier ? `<span style="color:#c4a158;font-family:monospace;font-size:11px;">· ${r.tier}${r.score ? ` ${r.score}` : ""}</span>` : ""}
      </div>
      <div style="font-size: 14px; color: #b6b0a4; margin-top: 2px;">${r.title}</div>
      <div style="font-size: 12px; color: #79746b; margin-top: 4px;">${formatSalary(r.salaryMin, r.salaryMax)} · ${remoteLabel(r.remotePolicy)}</div>
      <div style="margin-top: 8px;">
        ${r.sourceUrl ? `<a href="${r.sourceUrl}" style="display:inline-block;background:#5b8feb;color:#fff;text-decoration:none;font-size:13px;font-weight:600;padding:7px 14px;border-radius:6px;">Apply ↗</a>` : ""}
        <a href="${baseUrl}/admin/role/${r.id}" style="color:#79746b;text-decoration:none;font-size:13px;margin-left:12px;">details</a>
      </div>
    </div>`;

  return `
    <!doctype html><html><body style="margin:0;padding:24px;background:#1a1917;color:#f3f0ea;font-family:-apple-system,'DM Sans',sans-serif;">
      <div style="max-width:600px;margin:0 auto;">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#79746b;margin-bottom:6px;">Career Ops · ${d.date}</div>
        <h1 style="font-family:'Syne',sans-serif;font-size:30px;font-weight:800;margin:0 0 8px;letter-spacing:-0.015em;">${d.newRoles.length} new opportunit${d.newRoles.length === 1 ? "y" : "ies"}</h1>
        <div style="font-size:14px;color:#b6b0a4;margin-bottom:28px;">Ranked by fit. Click Apply to go straight to the posting. ${d.openTotal} open in total.</div>
        ${d.newRoles.map(row).join("")}
        <div style="margin-top:40px;padding-top:16px;border-top:1px solid rgba(243,240,234,0.08);font-family:monospace;font-size:11px;color:#79746b;">
          <a href="${baseUrl}/admin" style="color:#79746b;text-decoration:none;">See all opportunities →</a>
        </div>
      </div>
    </body></html>`;
}

export function renderDigestText(d: DigestPayload, baseUrl: string): string {
  const lines = [`CAREER OPS · ${d.date}`, "", `${d.newRoles.length} new opportunities (${d.openTotal} open total)`, ""];
  d.newRoles.forEach((r) => {
    lines.push(`• ${r.company} — ${r.title} ${r.tier ? `[${r.tier}${r.score ? ` ${r.score}` : ""}]` : ""}`);
    lines.push(`  ${formatSalary(r.salaryMin, r.salaryMax)} · ${remoteLabel(r.remotePolicy)}`);
    if (r.sourceUrl) lines.push(`  Apply: ${r.sourceUrl}`);
    lines.push("");
  });
  lines.push(`${baseUrl}/admin`);
  return lines.join("\n");
}
