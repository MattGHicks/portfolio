"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  href: string;
  label: string;
  count?: number;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

export function Sidebar({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="admin-sidebar-group-label">{group.label}</div>
          {group.items.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-sidebar-link ${isActive ? "is-active" : ""}`}
              >
                <span>{item.label}</span>
                {typeof item.count === "number" && item.count > 0 && (
                  <span className="admin-sidebar-count">{item.count}</span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <div className="admin-mobile-nav">
      {items.map((item) => {
        const isActive =
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-mobile-nav-link ${isActive ? "is-active" : ""}`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
