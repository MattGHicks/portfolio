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
import { roles, watchlistCompanies } from "@/db/schema";
import { and, eq, like, notInArray, sql } from "drizzle-orm";
import { getProvider } from "@/lib/discovery/providers";
import { scoreAndDraftRole } from "@/lib/scoring-service";

export type ScrapeResult = { company: string; platform: string; found: number; new: number; closed: number; errors: string[]; insertedIds: number[] };
export type DiscoveryResult = {
  status: "ok";
  companies: number;
  totalNew: number;
  totalScored: number;
  totalClosed: number;
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
  const result: ScrapeResult = { company: name, platform, found: 0, new: 0, closed: 0, errors: [], insertedIds: [] };
  const provider = getProvider(platform);
  if (!provider || !provider.discoverable) {
    result.errors.push(`no discoverable provider for platform '${platform}'`);
    return result;
  }
  try {
    const normalized = await provider.fetchRoles(slug);
    const seen = normalized.map((r) => r.atsExternalId);
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

    // Auto-archive: any OPEN role from this board that's no longer listed has
    // been taken down — archive it so the board never shows a dead apply link.
    // Guarded by a successful, non-empty scrape to avoid false positives on a
    // transient fetch hiccup. Only touches 'scored' (open) roles, never ones
    // you've applied to or dismissed.
    if (seen.length > 0) {
      const closed = await db
        .update(roles)
        .set({ status: "archived", lastTouchedAt: new Date() })
        .where(
          and(
            eq(roles.atsPlatform, platform as any),
            like(roles.atsExternalId, `${slug}:%`),
            eq(roles.status, "scored"),
            notInArray(roles.atsExternalId, seen)
          )
        )
        .returning({ id: roles.id });
      result.closed = closed.length;
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
  let totalClosed = 0;
  const allInserted: number[] = [];

  for (const co of companies) {
    if (!co.atsBoardSlug || !getProvider(co.atsPlatform)) continue;
    const r = await scrapeCompany(co.name, co.atsPlatform, co.atsBoardSlug);
    results.push(r);
    totalNew += r.new;
    totalClosed += r.closed;
    allInserted.push(...r.insertedIds);

    await db
      .update(watchlistCompanies)
      .set({
        lastScrapedAt: new Date(),
        lastScrapeResult: { found: r.found, new: r.new, errors: r.errors.length ? r.errors : undefined },
      })
      .where(eq(watchlistCompanies.id, co.id));
  }

  // Auto-score every newly discovered role (zero API).
  let totalScored = 0;
  for (const id of allInserted) {
    try {
      await scoreAndDraftRole(id);
      totalScored++;
    } catch (err) {
      console.error(`[discovery] auto-score failed for role ${id}:`, err);
    }
  }

  return {
    status: "ok",
    companies: results.length,
    totalNew,
    totalClosed,
    totalScored,
    results: results.map(({ insertedIds, ...rest }) => rest),
  };
}
