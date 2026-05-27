import type { roleTierEnum, roleStatusEnum, applicationStatusEnum } from "@/db/schema";

export type Tier = (typeof roleTierEnum.enumValues)[number] | null | undefined;
export type RoleStatus = (typeof roleStatusEnum.enumValues)[number];
export type AppStatus = (typeof applicationStatusEnum.enumValues)[number];

export function TierBadge({ tier }: { tier: Tier }) {
  if (!tier) return <span className="admin-tier admin-tier--none">—</span>;
  return <span className={`admin-tier admin-tier--${tier}`}>{tier === "drop" ? "✕" : tier}</span>;
}

const STATUS_LABEL: Record<string, string> = {
  unscored: "Unscored",
  scored: "Scored",
  drafting: "Drafting",
  awaiting_approval: "Awaiting approval",
  pending_approval: "Pending approval",
  approved: "Approved",
  submitting: "Submitting",
  submitted: "Submitted",
  responded: "Responded",
  rejected: "Rejected",
  failed: "Failed",
  dropped: "Dropped",
  archived: "Archived",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`admin-status admin-status--${status}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export function NarrativeBadge({ bucket }: { bucket: string | null | undefined }) {
  if (!bucket) return null;
  const label =
    bucket === "ai_devtools"
      ? "AI / devtools"
      : bucket === "b2b_infra_fintech"
        ? "B2B · fintech"
        : bucket === "govtech_civic"
          ? "Govtech"
          : "Other";
  return <span className="admin-status admin-status--scored">{label}</span>;
}
