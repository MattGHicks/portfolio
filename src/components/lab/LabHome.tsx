"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import HeroFilm from "@/components/lab/HeroFilm";
import RefinedCursor from "@/components/lab/RefinedCursor";
import CursorPops from "@/components/lab/CursorPops";
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
        .from(
          ".lab2-hero .reveal",
          { yPercent: 50, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.1 },
          "-=0.45"
        )
        .from(".lab2-nav", { opacity: 0, duration: 0.6 }, "-=0.6");
    },
    { scope: root }
  );

  return (
    <main className="lab2" ref={root}>
      <RefinedCursor />
      <CursorPops />

      <div className="lab-canvas">
        <HeroFilm />
      </div>

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

      <section className="lab2-hero">
        <p className="lab2-eyebrow reveal">Design Systems · AI-Augmented · WebGL</p>
        <h1 className="lab2-title">
          <span className="reveal" style={{ display: "block" }}>
            Designer who
          </span>
          <span className="reveal" style={{ display: "block" }}>
            builds <em>systems</em>.
          </span>
        </h1>
        <p className="lab2-sub reveal">
          <strong>Matt Hicks</strong> — UI/UX designer fluent in Figma. 190+
          shipped government websites, award-winning, and an AI-native workflow.
          Based in Tampa, FL.
        </p>
        <div className="lab2-actions reveal">
          <a href="#work" className="lab2-btn lab2-btn--solid">
            View Work
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="lab2-btn lab2-btn--ghost"
          >
            Résumé
          </a>
        </div>
        <div className="lab2-scroll">Scroll ↓</div>
      </section>

      <WorkIndex />
      <About />
      <Contact />
    </main>
  );
}
