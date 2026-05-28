/**
 * Shared discovery routine — scrape watchlist ATS boards, insert new roles,
 * then auto-score + auto-draft each one. Called by the cron AND the manual
 * "Find new roles now" button so both paths behave identically.
 */
import { db } from "@/db";
import { roles, watchlistCompanies, standingAnswers } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { fetchAshbyBoard, isDesignRole as isAshbyDesign, parseCompensation } from "@/lib/discovery/ashby";
import { fetchGreenhouseBoard, isDesignRole as isGreenhouseDesign, locationIsRemoteUS } from "@/lib/discovery/greenhouse";
import { scoreAndDraftRole } from "@/lib/scoring-service";

export type ScrapeResult = { company: string; found: number; new: number; errors: string[]; insertedIds: number[] };
export type DiscoveryResult = {
  status: "ok";
  companies: number;
  totalNew: number;
  totalScored: number;
  results: Array<Omit<ScrapeResult, "insertedIds">>;
};

async function existingActiveRole(company: string, title: string): Promise<boolean> {
  const rows = await db
    .select({ id: roles.id })
    .from(roles)
    .where(and(eq(roles.company, company), eq(roles.title, title), sql`status NOT IN ('archived', 'dropped')`))
    .limit(1);
  return rows.length > 0;
}

async function scrapeAshby(name: string, slug: string): Promise<ScrapeResult> {
  const result: ScrapeResult = { company: name, found: 0, new: 0, errors: [], insertedIds: [] };
  try {
    const board = await fetchAshbyBoard(slug);
    for (const job of board.jobs) {
      if (!job.isListed) continue;
      if (!isAshbyDesign(job.title)) continue;
      result.found++;
      if (await existingActiveRole(name, job.title)) continue;
      const { min, max } = parseCompensation(job.compensationTierSummary);
      const remotePolicy = job.isRemote
        ? job.locationName?.toLowerCase().includes("us") || job.locationName?.toLowerCase().includes("america")
          ? "remote_us"
          : "remote_global"
        : "onsite";
      const inserted = await db
        .insert(roles)
        .values({
          company: name,
          title: job.title,
          sourceUrl: job.jobUrl ?? job.applyUrl,
          atsPlatform: "ashby",
          atsExternalId: `${slug}:${job.id}`,
          postedAt: job.publishedAt ? new Date(job.publishedAt) : null,
          salaryMin: min ?? null,
          salaryMax: max ?? null,
          location: job.locationName,
          remotePolicy: remotePolicy as any,
          jdText: job.description?.slice(0, 8000) ?? null,
          jdSnippet: job.description?.slice(0, 400) ?? null,
          status: "unscored",
        })
        .onConflictDoNothing({ target: [roles.atsPlatform, roles.atsExternalId] })
        .returning({ id: roles.id });
      if (inserted.length > 0) {
        result.new++;
        result.insertedIds.push(inserted[0].id);
      }
    }
  } catch (err) {
    result.errors.push(String(err));
  }
  return result;
}

async function scrapeGreenhouse(name: string, slug: string): Promise<ScrapeResult> {
  const result: ScrapeResult = { company: name, found: 0, new: 0, errors: [], insertedIds: [] };
  try {
    const board = await fetchGreenhouseBoard(slug);
    for (const job of board.jobs) {
      if (!isGreenhouseDesign(job.title)) continue;
      result.found++;
      if (await existingActiveRole(name, job.title)) continue;
      const remotePolicy = locationIsRemoteUS(job.location?.name) ? "remote_us" : "unknown";
      const inserted = await db
        .insert(roles)
        .values({
          company: name,
          title: job.title,
          sourceUrl: job.absolute_url,
          atsPlatform: "greenhouse",
          atsExternalId: `${slug}:${job.id}`,
          postedAt: job.updated_at ? new Date(job.updated_at) : null,
          location: job.location?.name ?? null,
          remotePolicy: remotePolicy as any,
          jdText: job.content?.replace(/<[^>]+>/g, " ")?.slice(0, 8000) ?? null,
          jdSnippet: job.content?.replace(/<[^>]+>/g, " ")?.slice(0, 400) ?? null,
          status: "unscored",
        })
        .onConflictDoNothing({ target: [roles.atsPlatform, roles.atsExternalId] })
        .returning({ id: roles.id });
      if (inserted.length > 0) {
        result.new++;
        result.insertedIds.push(inserted[0].id);
      }
    }
  } catch (err) {
    result.errors.push(String(err));
  }
  return result;
}

export async function runDiscovery(): Promise<DiscoveryResult> {
  const companies = await db.select().from(watchlistCompanies).where(eq(watchlistCompanies.active, true));
  const results: ScrapeResult[] = [];
  let totalNew = 0;
  const allInserted: number[] = [];

  for (const co of companies) {
    let r: ScrapeResult;
    if (co.atsPlatform === "ashby" && co.atsBoardSlug) {
      r = await scrapeAshby(co.name, co.atsBoardSlug);
    } else if (co.atsPlatform === "greenhouse" && co.atsBoardSlug) {
      r = await scrapeGreenhouse(co.name, co.atsBoardSlug);
    } else {
      continue;
    }
    results.push(r);
    totalNew += r.new;
    allInserted.push(...r.insertedIds);

    await db
      .update(watchlistCompanies)
      .set({
        lastScrapedAt: new Date(),
        lastScrapeResult: { found: r.found, new: r.new, errors: r.errors.length ? r.errors : undefined },
      })
      .where(eq(watchlistCompanies.id, co.id));
  }

  let totalScored = 0;
  if (allInserted.length > 0) {
    const standingRows = await db.select().from(standingAnswers);
    const standing = Object.fromEntries(standingRows.map((s) => [s.key, s.value]));
    for (const id of allInserted) {
      try {
        await scoreAndDraftRole(id, standing);
        totalScored++;
      } catch (err) {
        console.error(`[discovery] auto-score failed for role ${id}:`, err);
      }
    }
  }

  return {
    status: "ok",
    companies: results.length,
    totalNew,
    totalScored,
    results: results.map(({ insertedIds, ...rest }) => rest),
  };
}
