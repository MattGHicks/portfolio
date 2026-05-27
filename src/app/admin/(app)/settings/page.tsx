import { getStandingAnswers } from "@/lib/queries";
import { SettingRow } from "@/components/admin/SettingRow";
import { PauseToggle } from "@/components/admin/PauseToggle";

export const dynamic = "force-dynamic";

const CATEGORY_LABEL: Record<string, string> = {
  identity: "Identity",
  eligibility: "Work eligibility",
  eeoc: "EEOC / demographics",
  logistics: "Logistics",
  compensation: "Compensation",
  guardrails: "Guardrails",
  drafting: "Drafting",
};

export default async function SettingsPage() {
  const answers = await getStandingAnswers();
  const grouped = answers.reduce<Record<string, typeof answers>>((acc, a) => {
    const cat = a.category ?? "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(a);
    return acc;
  }, {});

  const paused = answers.find((a) => a.key === "system.paused")?.value === "true";

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Settings</div>
          <h1 className="admin-page-title">Standing answers</h1>
          <p className="admin-page-subtitle">
            Stable facts used to prefill applications and gate the automation. Updates apply immediately.
          </p>
        </div>
      </div>

      <div className="admin-detail-section" style={{ marginBottom: 32 }}>
        <div className="admin-detail-section-title">
          <span>System</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
          <div>
            <div style={{ fontSize: 14, color: "var(--text-on-dark-primary)", fontWeight: 500 }}>Kill switch</div>
            <div style={{ fontSize: 13, color: "var(--text-on-dark-secondary)", marginTop: 4 }}>
              {paused
                ? "All cron jobs and submissions are paused. Toggle off to resume."
                : "Automation is live. All cron jobs run on schedule."}
            </div>
          </div>
          <PauseToggle paused={paused} />
        </div>
      </div>

      {Object.entries(grouped)
        .filter(([cat]) => cat !== "guardrails")
        .map(([cat, items]) => (
          <div key={cat} className="admin-detail-section" style={{ marginBottom: 20 }}>
            <div className="admin-detail-section-title">
              <span>{CATEGORY_LABEL[cat] ?? cat}</span>
            </div>
            {items.map((item) => (
              <SettingRow key={item.key} k={item.key} label={item.label} value={item.value} />
            ))}
          </div>
        ))}

      {grouped["guardrails"] && (
        <div className="admin-detail-section" style={{ marginBottom: 20 }}>
          <div className="admin-detail-section-title">
            <span>Guardrails</span>
          </div>
          {grouped["guardrails"]
            .filter((i) => i.key !== "system.paused")
            .map((item) => (
              <SettingRow key={item.key} k={item.key} label={item.label} value={item.value} />
            ))}
        </div>
      )}
    </>
  );
}
