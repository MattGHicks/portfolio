"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface NavigationProps {
  isHomepage?: boolean;
}

const links = [
  { href: "#work", label: "Work" },
  { href: "#practice", label: "Practice" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation({ isHomepage = false }: NavigationProps) {
  const prefix = isHomepage ? "" : "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the sheet on route change and lock the page behind it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`nav${scrolled || open ? " is-scrolled" : ""}${open ? " is-open" : ""}`}
      >
        <div className="nav-container">
          <Link href="/" className="nav-logo" aria-label="Matt Hicks — home">
            Matt Hicks<em>.</em>
          </Link>
          <span className="nav-center">Product designer &amp; engineer, Tampa</span>
          <div className="nav-links">
            {links.map((l) => (
              <Link key={l.href} href={`${prefix}${l.href}`} className="nav-link">
                {l.label}
              </Link>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume"
            >
              Resume
            </a>
          </div>
          <button
            type="button"
            className="nav-burger"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </nav>
      <div id="nav-sheet" className={`nav-sheet${open ? " is-open" : ""}`}>
        <div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={`${prefix}${l.href}`}
              className="sheet-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="sheet-link"
          >
            Resume
          </a>
        </div>
        <div className="sheet-foot">
          <span>mattghicks@gmail.com</span>
          <span>Tampa, FL</span>
        </div>
      </div>
    </>
  );
}
