/**
 * Ashby public job board API.
 * Endpoint: https://api.ashbyhq.com/posting-api/job-board/{slug}
 * Returns: { apiVersion, jobs: [...] }
 */

export type AshbyJob = {
  id: string;
  title: string;
  departmentName: string | null;
  locationName: string | null;
  employmentType: string | null;
  isRemote: boolean;
  isListed: boolean;
  publishedAt: string | null;
  updatedAt: string | null;
  jobUrl: string;
  applyUrl: string;
  description?: string;
  descriptionHtml?: string;
  compensationTierSummary?: string;
};

export type AshbyBoard = {
  apiVersion: string;
  jobs: AshbyJob[];
};

export async function fetchAshbyBoard(slug: string): Promise<AshbyBoard> {
  const url = `https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(slug)}?includeCompensation=true`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) {
    throw new Error(`Ashby board ${slug} returned ${res.status}: ${await res.text().catch(() => "")}`);
  }
  return res.json();
}

export function isDesignRole(title: string): boolean {
  const t = title.toLowerCase();
  if (/(engineering manager|engineer\b|backend|front[- ]?end developer|sales|recruiter|account exec|legal|finance|customer success)/i.test(title)) {
    return false;
  }
  return /(designer|design)/.test(t);
}

export function parseCompensation(summary: string | undefined): { min?: number; max?: number } {
  if (!summary) return {};
  const matches = summary.match(/\$([\d,]+)(?:k|K)?\s*[-–—]\s*\$?([\d,]+)(?:k|K)?/);
  if (!matches) return {};
  const min = Number(matches[1].replace(/,/g, ""));
  const max = Number(matches[2].replace(/,/g, ""));
  if (Number.isNaN(min) || Number.isNaN(max)) return {};
  // Detect if values were in thousands shorthand
  return { min: min < 1000 ? min * 1000 : min, max: max < 1000 ? max * 1000 : max };
}
