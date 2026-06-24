"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The scroll-scrubbed cinematic hero. The film is paused and its currentTime is
 * driven frame-by-frame by scroll position while the section is pinned; content
 * "beats" fade through over the moving footage. Reduced-motion → static frame.
 */
export default function ScrubHero({
  src = "/video/home/hero-scrub.mp4",
  poster = "/video/home/hero-scrub.jpg",
}: {
  src?: string;
  poster?: string;
}) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      const video = videoRef.current;
      if (!section || !video) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // entrance
      gsap.from(".scrub-enter", {
        y: 42,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.15,
      });

      if (reduced) {
        video.pause();
        return;
      }
      video.pause();

      const state = { p: 0 };
      const seek = () => {
        if (video.duration) video.currentTime = state.p * video.duration;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2800",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // scrub the film across the whole pinned scroll (normalized 0..1)
      tl.to(state, { p: 1, duration: 1, ease: "none", onUpdate: seek }, 0);

      // intro title clears as the scrub begins
      tl.to(".scrub-title-block", { opacity: 0, y: -70, ease: "power2.in", duration: 0.16 }, 0.04);

      // content beats fade through over the moving footage
      const beat = (sel: string, at: number) => {
        tl.fromTo(sel, { opacity: 0, y: 44 }, { opacity: 1, y: 0, duration: 0.1, ease: "power3.out" }, at)
          .to(sel, { opacity: 0, y: -44, duration: 0.1, ease: "power2.in" }, at + 0.17);
      };
      beat(".scrub-beat-1", 0.27);
      beat(".scrub-beat-2", 0.52);
      tl.fromTo(".scrub-outro", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.12, ease: "power3.out" }, 0.78);

      const onMeta = () => ScrollTrigger.refresh();
      video.addEventListener("loadedmetadata", onMeta);
      return () => video.removeEventListener("loadedmetadata", onMeta);
    },
    { scope: root }
  );

  return (
    <section className="scrub" ref={root}>
      <div className="scrub-stage">
        <video
          ref={videoRef}
          className="scrub-video"
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="scrub-grade" aria-hidden="true" />

        <div className="scrub-overlays">
          <div className="scrub-title-block">
            <p className="lab2-eyebrow scrub-enter">Design Systems · AI-Augmented · Shipped</p>
            <h1 className="scrub-title scrub-enter">
              Designer who
              <br />
              builds <em>systems</em>.
            </h1>
            <p className="scrub-sub scrub-enter">
              <strong>Matt Hicks</strong> — UI/UX designer fluent in Figma. 190+
              shipped government websites, award-winning, and an AI-native
              workflow. Based in Tampa, FL.
            </p>
            <div className="scrub-actions scrub-enter">
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
          </div>

          <div className="scrub-beat scrub-beat-1">
            <span className="scrub-beat-num">190+</span>
            <span className="scrub-beat-label">Government websites shipped</span>
          </div>
          <div className="scrub-beat scrub-beat-2">
            <span className="scrub-beat-num">2024 · 2025</span>
            <span className="scrub-beat-label">
              Horizon Interactive Awards — designer of record
            </span>
          </div>

          <div className="scrub-outro">
            <span>Scroll to explore</span>
            <span className="scrub-outro-cue">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
