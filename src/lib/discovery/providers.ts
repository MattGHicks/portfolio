/**
 * ATS provider registry.
 *
 * Each provider normalizes a platform's public board API into a common
 * NormalizedRole shape, so the discovery loop (run.ts) is platform-agnostic.
 * Adding a new Tier-1 platform = add a fetcher here + a watchlist entry.
 * Nothing in run.ts, the cron, or the scorer changes.
 *
 * `discoverable: true`  → has a public board API we can scrape.
 * `submittable: true`   → scripts/submit/submit.mjs has a form filler for it.
 *
 * Platforms without a public board API (Workday per-tenant, LinkedIn, Indeed,
 * bespoke company pages) are intentionally absent — roles from those arrive via
 * manual add / inbound, and submission falls through to the manual-apply path.
 */
import { fetchAshbyBoard, isDesignRole as ashbyDesign, parseCompensation } from "@/lib/discovery/ashby";
import { fetchGreenhouseBoard, isDesignRole as ghDesign, locationIsRemoteUS } from "@/lib/discovery/greenhouse";
import { fetchLeverBoard, isDesignRole as leverDesign, leverRemotePolicy } from "@/lib/discovery/lever";

export type NormalizedRole = {
  atsExternalId: string;
  title: string;
  sourceUrl: string | null;
  postedAt: Date | null;
  salaryMin: number | null;
  salaryMax: number | null;
  location: string | null;
  remotePolicy: string;
  jdText: string | null;
  jdSnippet: string | null;
};

export type Provider = {
  platform: "ashby" | "greenhouse" | "lever";
  discoverable: boolean;
  submittable: boolean;
  /** Fetch + filter to design roles, normalized. Throws on network/HTTP error. */
  fetchRoles: (slug: string) => Promise<NormalizedRole[]>;
};

const ashby: Provider = {
  platform: "ashby",
  discoverable: true,
  submittable: true,
  async fetchRoles(slug) {
    const board = await fetchAshbyBoard(slug);
    const out: NormalizedRole[] = [];
    for (const job of board.jobs) {
      if (!job.isListed || !ashbyDesign(job.title)) continue;
      const { min, max } = parseCompensation(job.compensationTierSummary);
      const remotePolicy = job.isRemote
        ? job.locationName?.toLowerCase().includes("us") || job.locationName?.toLowerCase().includes("america")
          ? "remote_us"
          : "remote_global"
        : "onsite";
      out.push({
        atsExternalId: `${slug}:${job.id}`,
        title: job.title,
        sourceUrl: job.jobUrl ?? job.applyUrl,
        postedAt: job.publishedAt ? new Date(job.publishedAt) : null,
        salaryMin: min ?? null,
        salaryMax: max ?? null,
        location: job.locationName ?? null,
        remotePolicy,
        jdText: job.description?.slice(0, 8000) ?? null,
        jdSnippet: job.description?.slice(0, 400) ?? null,
      });
    }
    return out;
  },
};

const greenhouse: Provider = {
  platform: "greenhouse",
  discoverable: true,
  submittable: true,
  async fetchRoles(slug) {
    const board = await fetchGreenhouseBoard(slug);
    const out: NormalizedRole[] = [];
    for (const job of board.jobs) {
      if (!ghDesign(job.title)) continue;
      const text = job.content?.replace(/<[^>]+>/g, " ");
      out.push({
        atsExternalId: `${slug}:${job.id}`,
        title: job.title,
        sourceUrl: job.absolute_url,
        postedAt: job.updated_at ? new Date(job.updated_at) : null,
        salaryMin: null,
        salaryMax: null,
        location: job.location?.name ?? null,
        remotePolicy: locationIsRemoteUS(job.location?.name) ? "remote_us" : "unknown",
        jdText: text?.slice(0, 8000) ?? null,
        jdSnippet: text?.slice(0, 400) ?? null,
      });
    }
    return out;
  },
};

const lever: Provider = {
  platform: "lever",
  discoverable: true,
  submittable: true,
  async fetchRoles(slug) {
    const postings = await fetchLeverBoard(slug);
    const out: NormalizedRole[] = [];
    for (const p of postings) {
      if (!leverDesign(p.text)) continue;
      const sal = p.salaryRange;
      out.push({
        atsExternalId: `${slug}:${p.id}`,
        title: p.text,
        sourceUrl: p.hostedUrl ?? p.applyUrl ?? null,
        postedAt: p.createdAt ? new Date(p.createdAt) : null,
        salaryMin: typeof sal?.min === "number" ? sal.min : null,
        salaryMax: typeof sal?.max === "number" ? sal.max : null,
        location: p.categories?.location ?? null,
        remotePolicy: leverRemotePolicy(p),
        jdText: p.descriptionPlain?.slice(0, 8000) ?? null,
        jdSnippet: p.descriptionPlain?.slice(0, 400) ?? null,
      });
    }
    return out;
  },
};

export const PROVIDERS: Record<string, Provider> = { ashby, greenhouse, lever };

export function getProvider(platform: string | null | undefined): Provider | null {
  if (!platform) return null;
  return PROVIDERS[platform] ?? null;
}
