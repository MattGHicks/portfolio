import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/db";
import { roles, applications, drafts, standingAnswers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { TierBadge, StatusBadge } from "@/components/admin/Badges";
import { DraftEditor } from "@/components/admin/DraftEditor";
import { remoteLabel, atsLabel, formatSalary } from "@/lib/format";

export const dynamic = "force-dynamic";

const STARTER_TEMPLATE = `Hi {{recruiter_name or "team"}},

I'm Matt Hicks — a Product Designer based in Tampa, FL. I lead design at Revize, where I've shipped 190+ government websites and earned 3× Gold, 1× Best in Category, and 1× Silver Horizon Interactive awards as designer-of-record across 2024–2025.

{{custom_hook}} — [why this specific role / company matters]

A few proof points that feel relevant to {{company}}:
• AI-native workflow: Claude Code + MCP + Figma AI as default fluency, not novelty
• Design-system contributor — variables/tokens/modes, accessibility (WCAG AA), handoff docs
• HTML/CSS + Next.js fluent — I built and ship digitalfish.io myself

Portfolio: https://digitalfish.io
Resume attached.

Happy to chat any time.

Matt
matt@digitalfish.io
`;

export default async function DraftPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) notFound();

  const [role] = await db.select().from(roles).where(eq(roles.id, id)).limit(1);
  if (!role) notFound();

  const draftRows = await db.select().from(drafts).where(eq(drafts.roleId, id)).orderBy(desc(drafts.version));
  const latestDraft = draftRows[0];

  const appRows = await db.select().from(applications).where(eq(applications.roleId, id)).orderBy(desc(applications.createdAt));
  const latestApp = appRows[0];

  const answers = await db.select().from(standingAnswers);
  const standing = Object.fromEntries(answers.map((a) => [a.key, a.value]));

  return (
    <>
      <div className="admin-page-header">
        <Link href={`/admin/role/${role.id}`} className="admin-detail-link" style={{ marginBottom: 12 }}>
          ← Back to role
        </Link>
        <div className="admin-page-header-row" style={{ alignItems: "flex-start" }}>
          <div>
            <div className="admin-page-eyebrow">{role.company} · Draft cover letter</div>
            <h1 className="admin-page-title">{role.title}</h1>
            <div className="admin-detail-meta" style={{ marginTop: 16 }}>
              <TierBadge tier={role.tier} />
              <StatusBadge status={role.status} />
              <span className="admin-detail-meta-item">{remoteLabel(role.remotePolicy)}</span>
              <span className="admin-detail-meta-item">{atsLabel(role.atsPlatform)}</span>
              {role.salaryMin || role.salaryMax ? (
                <span className="admin-detail-meta-item">{formatSalary(role.salaryMin, role.salaryMax)}</span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <DraftEditor
        roleId={role.id}
        initialCoverLetter={latestDraft?.coverLetterMd ?? STARTER_TEMPLATE.replace("{{company}}", role.company)}
        initialAnswers={(latestDraft?.customAnswers as Record<string, string>) ?? {}}
        draftVersion={latestDraft?.version ?? 0}
        existingAppStatus={latestApp?.status ?? null}
        applicationId={latestApp?.id ?? null}
        standingAnswers={standing}
        sourceUrl={role.sourceUrl}
        atsPlatform={role.atsPlatform}
      />
    </>
  );
}
