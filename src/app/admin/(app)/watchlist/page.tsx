import { listWatchlist } from "@/lib/queries";
import { atsLabel, formatRelative } from "@/lib/format";
import { WatchlistRow } from "@/components/admin/WatchlistRow";

export const dynamic = "force-dynamic";

export default async function WatchlistPage() {
  const list = await listWatchlist();

  return (
    <>
      <div className="admin-page-header">
        <div>
          <div className="admin-page-eyebrow">Watchlist</div>
          <h1 className="admin-page-title">Companies to scan</h1>
          <p className="admin-page-subtitle">
            Discovery cron scrapes these boards daily at 9am. Add or pause companies anytime.
          </p>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Priority</th>
              <th>ATS</th>
              <th>Board</th>
              <th>Last scrape</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <WatchlistRow
                key={c.id}
                id={c.id}
                name={c.name}
                priority={c.priority}
                atsLabel={atsLabel(c.atsPlatform)}
                atsBoardUrl={c.atsBoardUrl}
                lastScrapedAt={c.lastScrapedAt ? formatRelative(c.lastScrapedAt) : "Never"}
                active={c.active}
                notes={c.notes}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-card" style={{ marginTop: 24 }}>
        <div className="admin-section-label" style={{ marginBottom: 12 }}>How discovery works</div>
        <p style={{ fontSize: 14, color: "var(--text-on-dark-secondary)", lineHeight: 1.65 }}>
          Each morning at 9am, the discovery cron hits each company's ATS board (Ashby and Greenhouse currently supported)
          and inserts any new role postings into the pipeline with <code>status=unscored</code>. Open Claude Code and say{" "}
          <em>"score the unscored roles"</em> to run them through the rubric. New roles land in the Overview as a "Needs Claude" badge.
        </p>
      </div>
    </>
  );
}
