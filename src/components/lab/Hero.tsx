"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Type-led editorial hero (dark, refined). No video — the impression comes from
 * a clip-reveal headline, a magnetic primary CTA, the custom cursor, a restrained
 * ambient glow, and an honest "designed in Figma / built with Claude Code" credit.
 * Reduced-motion → everything renders statically, no entrance, no parallax.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const magnetic = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(
          ".hero-line-inner, .hero-eyebrow, .hero-sub, .hero-chip, .hero-actions, .hero-foot",
          { y: 0, yPercent: 0, opacity: 1 }
        );
        return;
      }

      // entrance — sequenced to land just as the intro curtain finishes clearing
      const tl = gsap.timeline({ delay: 1.55, defaults: { ease: "power4.out" } });
      tl.from(".hero-eyebrow", { y: 18, opacity: 0, duration: 0.7 })
        .from(
          ".hero-line-inner",
          { yPercent: 112, duration: 1.05, stagger: 0.12, ease: "power4.out" },
          "-=0.35"
        )
        .from(".hero-sub", { y: 22, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(
          ".hero-chip",
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.07 },
          "-=0.5"
        )
        .from(".hero-actions", { y: 18, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-foot", { opacity: 0, duration: 0.9 }, "-=0.3");

      // gentle scroll parallax: drift the ambient, lift + fade the content out
      gsap.to(".hero-bg", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-inner", {
        yPercent: -8,
        opacity: 0.18,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });

      // magnetic primary CTA
      const btn = magnetic.current;
      if (btn) {
        const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          const mx = e.clientX - (r.left + r.width / 2);
          const my = e.clientY - (r.top + r.height / 2);
          const radius = 110;
          if (Math.hypot(mx, my) < radius) {
            xTo(mx * 0.4);
            yTo(my * 0.4);
          } else {
            xTo(0);
            yTo(0);
          }
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
      }
    },
    { scope: root }
  );

  return (
    <section className="hero" ref={root}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-inner">
        <p className="hero-eyebrow">
          <span className="hero-status" />
          UI/UX &amp; Product Designer
          <span className="hero-eyebrow-sep" />
          Tampa, FL · Open to work
        </p>

        <h1 className="hero-title">
          <span className="hero-line">
            <span className="hero-line-inner">I design systems.</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-inner">
              And&nbsp;I <em>build</em> them.
            </span>
          </span>
        </h1>

        <p className="hero-sub">
          <strong>Matt Hicks</strong> — UI/UX &amp; product designer fluent in
          Figma. 190+ government websites shipped and award-winning, plus product
          concepts taken from idea to production with an AI-native workflow.
        </p>

        <ul className="hero-chips" aria-label="Disciplines">
          <li className="hero-chip">Design Systems</li>
          <li className="hero-chip">Figma</li>
          <li className="hero-chip">Front-End</li>
          <li className="hero-chip">AI-Augmented</li>
        </ul>

        <div className="hero-actions">
          <a ref={magnetic} href="#work" className="hero-btn hero-btn--solid" data-cursor="go">
            View Work
            <span className="hero-btn-arrow">↘</span>
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn--ghost"
            data-cursor="open"
          >
            Résumé
          </a>
        </div>
      </div>

      <div className="hero-foot">
        <span className="hero-credit">
          This very site — designed in Figma, built with Claude&nbsp;Code.
        </span>
        <a href="#work" className="hero-scroll" data-cursor="go" aria-label="Scroll to work">
          <span>Scroll</span>
          <span className="hero-scroll-cue">↓</span>
        </a>
      </div>
    </section>
  );
}
