"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

interface NavigationProps {
  isHomepage?: boolean;
}

export default function Navigation({ isHomepage = false }: NavigationProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const nav = navRef.current;
          if (!nav) {
            ticking = false;
            return;
          }

          const navBottom = nav.getBoundingClientRect().bottom;

          // Cinematic Noir is dark throughout; only elements that explicitly
          // opt in (data-section-light) flip the nav to its light treatment.
          const lightSections = document.querySelectorAll("[data-section-light]");
          let isOverLight = false;

          lightSections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (navBottom > rect.top && navBottom < rect.bottom) {
              isOverLight = true;
            }
          });

          if (isOverLight) {
            nav.classList.add("nav-light");
          } else {
            nav.classList.remove("nav-light");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const workHref = isHomepage ? "#work" : "/#work";
  const aboutHref = isHomepage ? "#about" : "/#about";

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Matt Hicks
        </Link>
        <div className="nav-links">
          <Link href={workHref} className="nav-link">
            Work
          </Link>
          <Link href={aboutHref} className="nav-link">
            About
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn"
          >
            Resume
            <ArrowIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
