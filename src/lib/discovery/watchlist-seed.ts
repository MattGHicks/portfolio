/**
 * Canonical discovery watchlist — companies with VERIFIED public Ashby/Greenhouse
 * boards (non-empty jobs array as of 2026-05). Slugs verified by hitting the
 * public board APIs. Companies on Lever/Workday/Avature (1Password, Atlassian,
 * GitHub, Plaid) are intentionally excluded — no public board the scraper supports.
 *
 * syncWatchlist() upserts these by name: sets platform + slug + priority + active,
 * and deactivates any previously-active company that no longer has a usable board.
 */
import { db } from "@/db";
import { watchlistCompanies } from "@/db/schema";
import { eq, sql, inArray } from "drizzle-orm";

export type WatchlistSeed = {
  name: string;
  atsPlatform: "ashby" | "greenhouse";
  slug: string;
  priority: "S" | "A" | "B";
};

export const WATCHLIST: WatchlistSeed[] = [
  // Tier S — bullseye AI/devtools + fintech
  { name: "OpenRouter", atsPlatform: "ashby", slug: "openrouter", priority: "S" },
  { name: "Ramp", atsPlatform: "ashby", slug: "ramp", priority: "S" },
  { name: "Linear", atsPlatform: "ashby", slug: "linear", priority: "S" },
  { name: "Vercel", atsPlatform: "greenhouse", slug: "vercel", priority: "S" },
  { name: "Figma", atsPlatform: "greenhouse", slug: "figma", priority: "S" },
  { name: "Supabase", atsPlatform: "ashby", slug: "supabase", priority: "S" },
  // Tier A — strong dev-tools / infra / fintech
  { name: "Railway", atsPlatform: "ashby", slug: "Railway", priority: "A" },
  { name: "Sentry", atsPlatform: "ashby", slug: "sentry", priority: "A" },
  { name: "Mixpanel", atsPlatform: "greenhouse", slug: "mixpanel", priority: "A" },
  { name: "Postman", atsPlatform: "greenhouse", slug: "postman", priority: "A" },
  { name: "Sourcegraph", atsPlatform: "greenhouse", slug: "sourcegraph91", priority: "A" },
  { name: "Reddit", atsPlatform: "greenhouse", slug: "reddit", priority: "A" },
  { name: "Automattic", atsPlatform: "greenhouse", slug: "automatticcareers", priority: "A" },
  // Tier B
  { name: "GitLab", atsPlatform: "greenhouse", slug: "gitlab", priority: "B" },
];

export async function syncWatchlist() {
  const upserted: string[] = [];
  for (const co of WATCHLIST) {
    await db
      .insert(watchlistCompanies)
      .values({
        name: co.name,
        atsPlatform: co.atsPlatform,
        atsBoardSlug: co.slug,
        priority: co.priority,
        active: true,
      })
      .onConflictDoUpdate({
        target: watchlistCompanies.name,
        set: {
          atsPlatform: co.atsPlatform,
          atsBoardSlug: co.slug,
          priority: co.priority,
          active: true,
        },
      });
    upserted.push(co.name);
  }

  // Deactivate watchlist rows that aren't in the canonical list (no usable board).
  const keepNames = WATCHLIST.map((c) => c.name);
  const deactivated = await db
    .update(watchlistCompanies)
    .set({ active: false })
    .where(sql`name NOT IN (${sql.join(keepNames.map((n) => sql`${n}`), sql`, `)}) AND active = true`)
    .returning({ name: watchlistCompanies.name });

  return { upserted, deactivated: deactivated.map((d) => d.name) };
}
