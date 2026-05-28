/**
 * Greenhouse public job board API.
 * Endpoint: https://boards-api.greenhouse.io/v1/boards/{slug}/jobs?content=true
 */

export type GreenhouseJob = {
  id: number;
  internal_job_id: number;
  title: string;
  location: { name: string };
  absolute_url: string;
  updated_at: string;
  content?: string;
  departments?: Array<{ id: number; name: string }>;
  offices?: Array<{ id: number; name: string; location: string }>;
};

export type GreenhouseBoard = {
  jobs: GreenhouseJob[];
  meta: { total: number };
};

export async function fetchGreenhouseBoard(slug: string): Promise<GreenhouseBoard> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(slug)}/jobs?content=true`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) {
    throw new Error(`Greenhouse board ${slug} returned ${res.status}`);
  }
  return res.json();
}

export function isDesignRole(title: string): boolean {
  if (/(engineering manager|engineer\b|backend|front[- ]?end developer|sales|recruiter|account exec|legal|finance)/i.test(title)) {
    return false;
  }
  return /(designer|design)/i.test(title);
}

export function locationIsRemoteUS(name: string | undefined): boolean {
  if (!name) return false;
  return /remote.*(us|united states|usa|americas|north america)/i.test(name) || /\b(usa?|us)\s*[-–—]?\s*remote/i.test(name);
}
