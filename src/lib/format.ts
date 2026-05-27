export function formatSalary(min?: number | null, max?: number | null): string {
  if (!min && !max) return "—";
  const fmt = (n: number) => {
    if (n >= 1000) return `$${Math.round(n / 1000)}K`;
    return `$${n}`;
  };
  if (min && max && min !== max) return `${fmt(min)}–${fmt(max)}`;
  return fmt((min ?? max)!);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatRelative(date: Date | string | null | undefined): string {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = Date.now() - d.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffDay < 30) return `${Math.round(diffDay / 7)}w ago`;
  if (diffDay < 365) return `${Math.round(diffDay / 30)}mo ago`;
  return `${Math.round(diffDay / 365)}y ago`;
}

export function remoteLabel(policy: string | null | undefined): string {
  switch (policy) {
    case "remote_us":
      return "Remote US";
    case "remote_global":
      return "Remote global";
    case "remote_with_restrictions":
      return "Remote (restricted)";
    case "hybrid":
      return "Hybrid";
    case "onsite":
      return "Onsite";
    default:
      return "—";
  }
}

export function atsLabel(platform: string | null | undefined): string {
  switch (platform) {
    case "ashby":
      return "Ashby";
    case "greenhouse":
      return "Greenhouse";
    case "lever":
      return "Lever";
    case "workday":
      return "Workday";
    case "jazzhr":
      return "JazzHR";
    case "linkedin":
      return "LinkedIn";
    case "company_page":
      return "Company page";
    case "yc":
      return "YC";
    case "email":
      return "Email";
    default:
      return "Other";
  }
}
