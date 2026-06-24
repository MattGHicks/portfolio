"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Clip from "@/components/Clip";
import ArrowIcon from "@/components/ArrowIcon";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Page-load entrance
      gsap.from(".cin-hero-title .line", {
        yPercent: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
        delay: 0.15,
      });
      gsap.from(
        [".cin-eyebrow", ".cin-hero-lede", ".cin-actions", ".cin-credit"],
        { opacity: 0, y: 22, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.55 }
      );

      // Scroll parallax: content drifts up + fades, film pushes in
      gsap.to(".cin-hero-inner", {
        yPercent: -16,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".cin-hero-media", {
        scale: 1.14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section className="cin-hero" ref={root}>
      <div className="cin-hero-media">
        <Clip src="/video/home/hero.mp4" poster="/video/home/hero.jpg" />
      </div>

      <div className="cin-hero-inner">
        <span className="cin-eyebrow">Portfolio · 2026</span>
        <h1 className="cin-hero-title">
          <span className="line">Matt</span>
          <span className="line">Hicks</span>
        </h1>
        <p className="cin-hero-lede">
          <strong>UI/UX Designer</strong> fluent in Figma — design systems,
          AI-augmented workflows, and 190+ shipped government websites. Based in
          Tampa, FL. Available remote.
        </p>
        <div className="cin-actions">
          <a href="#work" className="cin-btn cin-btn--primary">
            View Work
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cin-btn cin-btn--ghost"
          >
            Download Resume
            <ArrowIcon />
          </a>
        </div>
        <div className="cin-credit">
          <span className="dot" />
          <b>Art-directed by Matt</b> · Generated with Higgsfield · Built with
          Claude Code
        </div>
      </div>

      <div className="cin-scrollcue" aria-hidden="true">
        <span className="bar" />
        Scroll
      </div>
    </section>
  );
}
