/**
 * Shared discovery routine — scrape every watchlist board via the provider
 * registry, insert new roles, then auto-score + auto-draft each one. Called by
 * the cron AND the manual "Find new roles now" button so both behave identically.
 *
 * Platform-agnostic: it asks the registry for a provider by the watchlist row's
 * ats_platform and trusts the normalized output. Adding a platform touches only
 * providers.ts — never this file.
 */
import { db } from "@/db";
import { roles, watchlistCompanies, standingAnswers } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { getProvider } from "@/lib/discovery/providers";
import { scoreAndDraftRole } from "@/lib/scoring-service";

export type ScrapeResult = { company: string; platform: string; found: number; new: number; errors: string[]; insertedIds: number[] };
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

async function scrapeCompany(name: string, platform: string, slug: string): Promise<ScrapeResult> {
  const result: ScrapeResult = { company: name, platform, found: 0, new: 0, errors: [], insertedIds: [] };
  const provider = getProvider(platform);
  if (!provider || !provider.discoverable) {
    result.errors.push(`no discoverable provider for platform '${platform}'`);
    return result;
  }
  try {
    const normalized = await provider.fetchRoles(slug);
    for (const r of normalized) {
      result.found++;
      if (await existingActiveRole(name, r.title)) continue;
      const inserted = await db
        .insert(roles)
        .values({
          company: name,
          title: r.title,
          sourceUrl: r.sourceUrl,
          atsPlatform: platform as any,
          atsExternalId: r.atsExternalId,
          postedAt: r.postedAt,
          salaryMin: r.salaryMin,
          salaryMax: r.salaryMax,
          location: r.location,
          remotePolicy: r.remotePolicy as any,
          jdText: r.jdText,
          jdSnippet: r.jdSnippet,
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
    if (!co.atsBoardSlug || !getProvider(co.atsPlatform)) continue;
    const r = await scrapeCompany(co.name, co.atsPlatform, co.atsBoardSlug);
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

  // Auto-score + auto-draft every newly discovered role (zero API).
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
