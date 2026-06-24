"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/** A subtle professional cursor: a small accent dot + a lagging ring that
 *  scales over interactive elements. Disabled on touch. */
export default function RefinedCursor({ accent = "#4d8dff" }: { accent?: string }) {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    document.documentElement.classList.add("cursor-none");
    gsap.set([d, r], { xPercent: -50, yPercent: -50 });

    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.42, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.42, ease: "power3" });

    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest("a, button, [data-cursor]");
      gsap.to(r, {
        scale: el ? 2.5 : 1,
        borderColor: el ? accent : "rgba(255,255,255,0.35)",
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [accent]);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
