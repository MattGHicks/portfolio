"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import RefinedCursor from "@/components/lab/RefinedCursor";
import CursorPops from "@/components/lab/CursorPops";
import Hero from "@/components/lab/Hero";
import WorkIndex from "@/components/lab/WorkIndex";
import About from "@/components/lab/About";
import Contact from "@/components/lab/Contact";
import "@/styles/lab.css";

gsap.registerPlugin(useGSAP);

export default function LabHome() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(".lab-intro", { display: "none" });
        return;
      }
      const tl = gsap.timeline();
      tl.to(".lab-intro-word", {
        yPercent: -18,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        delay: 0.7,
      })
        .to(".lab-intro-sub", { opacity: 0, duration: 0.3 }, "<")
        .to(".lab-intro", { yPercent: -100, duration: 0.9, ease: "power4.inOut" })
        .from(".lab2-nav", { opacity: 0, duration: 0.6 }, "-=0.4");
    },
    { scope: root }
  );

  return (
    <main className="lab2" ref={root}>
      <RefinedCursor />
      <CursorPops />

      <div className="lab-intro">
        <span className="lab-intro-word">Matt Hicks</span>
        <span className="lab-intro-sub">Portfolio — 2026</span>
      </div>

      <nav className="lab2-nav">
        <a href="/">Matt Hicks</a>
        <div className="lab2-nav-links">
          <a href="#work" data-cursor="go">Work</a>
          <a href="#about" data-cursor="go">About</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor="open">
            Résumé
          </a>
        </div>
      </nav>

      <Hero />
      <WorkIndex />
      <About />
      <Contact />
    </main>
  );
}
