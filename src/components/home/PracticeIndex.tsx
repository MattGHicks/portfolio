"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { work } from "@/data/work";

const rows = work.filter((w) => w.tier === "archive" || w.tier === "system");

// An index of the practice. On fine pointers a floating plate follows the
// cursor with the hovered row's poster; on touch each row carries its own.
export default function PracticeIndex() {
  const [active, setActive] = useState<string | null>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
    };
    const loop = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * 0.14;
      p.y += (p.ty - p.y) * 0.14;
      if (ghost.current) {
        ghost.current.style.transform = `translate3d(${p.x + 24}px, ${p.y - 110}px, 0)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const current = rows.find((r) => r.slug === active);

  return (
    <section className="section" id="practice">
      <div className="container">
        <header className="sec-head">
          <h2 className="serif">The practice</h2>
          <p className="sec-meta label">Revize · 2023 — now · newest first</p>
        </header>

        <p className="practice-lede serif">
          Three years at Revize and 190+ government websites: one Figma
          design system, one 399-item accessibility checklist, every site
          checked against WCAG 2.1 before it ships. Six recent approvals, and
          the systems underneath them.
        </p>

        <ol className="index" onMouseLeave={() => setActive(null)}>
          {rows.map((w, i) => (
            <li key={w.slug}>
              <Link
                href={w.href}
                className={`index-row${w.tier === "system" ? " is-system" : ""}`}
                onMouseEnter={() => setActive(w.slug)}
                onFocus={() => setActive(w.slug)}
                onBlur={() => setActive(null)}
              >
                <span className="num index-num">
                  {String(i + 5).padStart(2, "0")}
                </span>
                <span className="index-thumb" aria-hidden>
                  <Image src={w.poster} alt="" fill sizes="120px" />
                </span>
                <span className="index-title serif">{w.title}</span>
                <span className="index-meta label">{w.meta}</span>
                <span className="index-tags label">{w.tags.join(", ")}</span>
                <span className="index-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <div
          ref={ghost}
          className={`index-ghost${current ? " is-on" : ""}`}
          aria-hidden
        >
          {current && (
            <Image
              key={current.slug}
              src={current.poster}
              alt=""
              fill
              sizes="340px"
            />
          )}
        </div>
      </div>
    </section>
  );
}
