"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface NavigationProps {
  isHomepage?: boolean;
}

export default function Navigation({ isHomepage = false }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);

  // Case-study pages still have light content sections until the M3/M4
  // restyle; flip the nav's palette while it floats over one. The homepage
  // is dark throughout, so this never fires there.
  useEffect(() => {
    if (isHomepage) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const nav = navRef.current;
        if (!nav) {
          ticking = false;
          return;
        }
        const navBottom = nav.getBoundingClientRect().bottom;
        let isOverLight = false;
        document.querySelectorAll(".cs-content").forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (navBottom > rect.top && navBottom < rect.bottom) {
            isOverLight = true;
          }
        });
        nav.classList.toggle("nav-light", isOverLight);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  const prefix = isHomepage ? "" : "/";

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Matt Hicks
        </Link>
        <div className="nav-links">
          <Link href={`${prefix}#work`} className="nav-link">
            Work
          </Link>
          <Link href={`${prefix}#process`} className="nav-link">
            Process
          </Link>
          <Link href={`${prefix}#about`} className="nav-link">
            About
          </Link>
          <Link href={`${prefix}#contact`} className="nav-link">
            Contact
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume"
          >
            <span className="nav-dot" aria-hidden />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
