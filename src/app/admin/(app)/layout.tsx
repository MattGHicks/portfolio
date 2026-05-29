import { Sidebar, MobileNav } from "@/components/admin/Sidebar";
import { getNavCounts, isSystemPaused } from "@/lib/nav";
import { logoutAction } from "../logout-action";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const [counts, paused] = await Promise.all([getNavCounts(), isSystemPaused()]);

  const navGroups = [
    {
      label: "Hunt",
      items: [
        { href: "/admin", label: "Opportunities", count: counts.open },
        { href: "/admin/applied", label: "Applied", count: counts.applied },
      ],
    },
    {
      label: "System",
      items: [
        { href: "/admin/watchlist", label: "Watchlist" },
        { href: "/admin/settings", label: "Settings" },
      ],
    },
  ];

  const mobileItems = navGroups.flatMap((g) => g.items);

  return (
    <div className="admin-root">
      <header className="admin-topbar">
        <div className="admin-topbar-left">
          <Link href="/admin" className="admin-topbar-brand">
            Career Ops
          </Link>
          <span
            className={`admin-topbar-status ${paused ? "admin-topbar-status--paused" : ""}`}
            title={paused ? "Automation paused" : "Automation live"}
          >
            <span className="admin-topbar-status-dot" />
            {paused ? "Paused" : "Live"}
          </span>
        </div>
        <div className="admin-topbar-right">
          <Link href="/" className="admin-topbar-link" target="_blank" rel="noopener noreferrer">
            View portfolio ↗
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="admin-topbar-button">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <MobileNav items={mobileItems} />
      <div className="admin-shell">
        <Sidebar groups={navGroups} />
        <main className="admin-main">
          <div className="admin-container">{children}</div>
        </main>
      </div>
    </div>
  );
}
