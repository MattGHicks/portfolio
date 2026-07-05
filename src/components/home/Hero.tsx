"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroInspect from "./HeroInspect";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FIGMA_FILE =
  "https://www.figma.com/design/3eLWiZoQFS1t1keE0nxsAv/Portfolio-Site?node-id=8-30198&t=TlOSSIcbf8FNlPwQ-1";

const WDTH_MIN = 62;
const WDTH_MAX = 125;

/** Live values read off the rendered headline — the annotations are true, not decorative. */
type Spec = {
  width: number;
  fontSize: number;
  weight: string;
  stretch: string;
  ink: string;
};

export default function Hero() {
  const scope = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [spec, setSpec] = useState<Spec | null>(null);
  const measureRaf = useRef(0);

  const measure = useCallback(() => {
    const el = nameRef.current;
    if (!el) return;
    const cs = getComputedStyle(el);
    const ink = getComputedStyle(document.documentElement)
      .getPropertyValue("--text-1")
      .trim();
    setSpec({
      width: Math.round(el.getBoundingClientRect().width),
      fontSize: Math.round(parseFloat(cs.fontSize)),
      weight: cs.fontWeight,
      stretch: cs.fontStretch,
      ink,
    });
  }, []);

  const queueMeasure = useCallback(() => {
    cancelAnimationFrame(measureRaf.current);
    measureRaf.current = requestAnimationFrame(measure);
  }, [measure]);

  useEffect(() => {
    // Measure only once the display face is actually in use, or the numbers lie.
    document.fonts.ready.then(measure);
    window.addEventListener("resize", queueMeasure);
    return () => {
      window.removeEventListener("resize", queueMeasure);
      cancelAnimationFrame(measureRaf.current);
    };
  }, [measure, queueMeasure]);

  // The adjustable spec: drag the headline horizontally to scrub Archivo's
  // wdth axis; every annotation re-measures live. Double-click resets.
  // Fine pointers only — on touch this would fight scrolling.
  useEffect(() => {
    const el = nameRef.current;
    const hero = scope.current;
    if (!el || !hero) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let startX = 0;
    let startWdth = WDTH_MAX;
    let dragging = false;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      startX = e.clientX;
      startWdth = parseFloat(getComputedStyle(el).fontStretch) || WDTH_MAX;
      el.setPointerCapture(e.pointerId);
      hero.classList.add("is-adjusting");
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const wdth = Math.min(
        WDTH_MAX,
        Math.max(WDTH_MIN, startWdth + (e.clientX - startX) * 0.12)
      );
      el.style.fontStretch = `${wdth}%`;
      queueMeasure();
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      hero.classList.remove("is-adjusting");
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };
    const onReset = () => {
      el.style.fontStretch = "";
      queueMeasure();
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("dblclick", onReset);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("dblclick", onReset);
    };
  }, [queueMeasure]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.set(".anno", { opacity: 0 });
      gsap.from("[data-hero-beat]", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
      });
    },
    { scope }
  );

  // Draw-in runs ONCE (keyed on readiness, not the spec object) — resize only
  // updates the label text. Re-running tweens on resize compounds mid-flight
  // values and the lines erode toward scaleX(0).
  const ready = spec !== null;

  useGSAP(
    () => {
      if (!ready) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Draw the annotations in once real values exist.
      gsap.to(".anno", {
        opacity: 1,
        duration: 0.4,
        stagger: 0.12,
        delay: 0.45,
        ease: "power2.out",
      });
      gsap.from(".dim-line, .leader-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.55,
        stagger: 0.07,
        delay: 0.45,
        ease: "power3.out",
      });

      // Retract as the drawing scrolls away.
      gsap.fromTo(
        ".anno",
        { opacity: 1 },
        {
          opacity: 0,
          immediateRender: false,
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "35% top",
            scrub: true,
          },
        }
      );
    },
    { scope, dependencies: [ready] }
  );

  return (
    <section className="hero" ref={scope}>
      <p className="hero-status" data-hero-beat data-inspect="hero / status">
        <span className="status-dot" aria-hidden />
        Available — Tampa, FL · remote
      </p>

      <div className="hero-name-wrap" data-hero-beat>
        <h1
          className="hero-name"
          ref={nameRef}
          data-inspect="hero / name · drag ⟷ wdth"
        >
          Matt Hicks
        </h1>
        <span className="anno anno-dim" aria-hidden>
          <i className="dim-line" />
          <span className="anno-label">{spec ? `${spec.width}px` : ""}</span>
          <i className="dim-line" />
        </span>
        <span className="anno anno-leader anno-note" aria-hidden>
          <i className="leader-line" />
          <span className="anno-block">
            <span className="anno-label">
              {spec ? `Archivo ${spec.weight}` : ""}
            </span>
            <span className="anno-label">
              {spec ? `${spec.fontSize}px · wdth ${spec.stretch}` : ""}
            </span>
            <span className="anno-label anno-ink">
              <i className="swatch" />
              {spec ? `--text-1 · ${spec.ink}` : ""}
            </span>
          </span>
        </span>
      </div>

      <p
        className="hero-statement"
        data-hero-beat
        data-inspect="hero / statement"
      >
        Designer who ships. I build the tools I design with.
      </p>
      <p className="hero-sub" data-hero-beat data-inspect="hero / sub">
        Product designer and engineer — 190+ civic sites, an award shelf,
        hardware side projects, and an AI-native workflow I architected
        myself.
      </p>
      <div className="hero-links" data-hero-beat data-inspect="hero / links">
        <a href="#work">View the work</a>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>

      <p className="hero-provenance" data-hero-beat>
        Designed from scratch in my own Figma system, built with Claude Code —{" "}
        <a href={FIGMA_FILE} target="_blank" rel="noopener noreferrer">
          see the file
        </a>
      </p>

      <HeroInspect containerRef={scope} />
    </section>
  );
}
