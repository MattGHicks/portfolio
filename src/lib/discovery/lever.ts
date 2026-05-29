/**
 * Lever public postings API.
 * Endpoint: https://api.lever.co/v0/postings/{slug}?mode=json
 * Returns a flat array of postings.
 */

export type LeverPosting = {
  id: string;
  text: string; // title
  hostedUrl: string;
  applyUrl: string;
  workplaceType?: "remote" | "hybrid" | "onsite" | "unspecified";
  country?: string;
  createdAt?: number; // epoch ms
  descriptionPlain?: string;
  categories?: { location?: string; commitment?: string; team?: string; allLocations?: string[] };
  salaryRange?: { min?: number; max?: number; currency?: string; interval?: string };
};

export async function fetchLeverBoard(slug: string): Promise<LeverPosting[]> {
  const url = `https://api.lever.co/v0/postings/${encodeURIComponent(slug)}?mode=json`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) {
    throw new Error(`Lever board ${slug} returned ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export function isDesignRole(title: string): boolean {
  if (/(engineering manager|engineer\b|backend|front[- ]?end developer|sales|recruiter|account exec|legal|finance|data scientist|program manager)/i.test(title)) {
    return false;
  }
  return /(designer|design)/i.test(title);
}

export function leverRemotePolicy(p: LeverPosting): string {
  const loc = (p.categories?.location ?? "") + " " + (p.categories?.allLocations?.join(" ") ?? "");
  if (p.workplaceType === "remote") {
    if (/\b(us|united states|usa|americas|north america)\b/i.test(loc) || p.country === "US") return "remote_us";
    return "remote_global";
  }
  if (p.workplaceType === "hybrid") return "hybrid";
  if (p.workplaceType === "onsite") return "onsite";
  // workplaceType unspecified: infer from location text
  if (/\bremote\b/i.test(loc)) return /\b(us|united states|usa|americas)\b/i.test(loc) ? "remote_us" : "remote_global";
  return "unknown";
}
