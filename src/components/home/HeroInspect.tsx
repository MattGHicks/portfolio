"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

// Figma-style hover inspection for the hero — a deliberate quotation of
// Figma's selection UI (blue frame, corner handles, layer tag, W×H pill)
// over elements tagged with data-inspect. The values shown are measured
// from the live DOM, in keeping with the annotations-are-true rule.
// Desktop pointers only.

type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
};

export default function HeroInspect({
  containerRef,
}: {
  containerRef: RefObject<HTMLElement>;
}) {
  const [box, setBox] = useState<Box | null>(null);
  const [on, setOn] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const update = (target: Element) => {
      const el = target.closest<HTMLElement>("[data-inspect]");
      if (!el) {
        setOn(false);
        return;
      }
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const c = container.getBoundingClientRect();
        setBox({
          x: r.left - c.left,
          y: r.top - c.top,
          w: Math.round(r.width),
          h: Math.round(r.height),
          name: el.dataset.inspect || "",
        });
        setOn(true);
      });
    };

    const onMove = (e: MouseEvent) => update(e.target as Element);
    const onLeave = () => setOn(false);

    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [containerRef]);

  return (
    <div className="inspect-layer" aria-hidden>
      <div
        className={`inspect-box${on ? " is-on" : ""}`}
        style={
          box
            ? {
                transform: `translate(${box.x}px, ${box.y}px)`,
                width: box.w,
                height: box.h,
              }
            : undefined
        }
      >
        {box && (
          <>
            <span className="inspect-tag">{box.name}</span>
            <i className="inspect-handle inspect-tl" />
            <i className="inspect-handle inspect-tr" />
            <i className="inspect-handle inspect-bl" />
            <i className="inspect-handle inspect-br" />
            <span className="inspect-size">
              {box.w} × {box.h}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
