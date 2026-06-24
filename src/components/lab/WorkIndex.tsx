"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { work, KIND_LABEL } from "@/data/work";

gsap.registerPlugin(Flip);

export default function WorkIndex() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const openItem = work.find((w) => w.slug === open) ?? null;

  const expand = (idx: number) => {
    if (open) return;
    setActive(idx);
    flipState.current = Flip.getState(previewRef.current, { props: "borderRadius" });
    setOpen(work[idx].slug);
  };
  const close = () => {
    if (!open) return;
    flipState.current = Flip.getState(previewRef.current, { props: "borderRadius" });
    setOpen(null);
  };

  useLayoutEffect(() => {
    if (flipState.current) {
      Flip.from(flipState.current, {
        duration: 0.7,
        ease: "power3.inOut",
        absolute: true,
      });
      flipState.current = null;
    }
    if (open) {
      gsap.fromTo(
        ".work-detail > *",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, delay: 0.28 }
      );
    }
  }, [open]);

  useLayoutEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <section className="lab2-work" id="work">
      <div className="lab2-work-head">
        <h2>Selected Work</h2>
        <p>Hover to preview · click to expand</p>
      </div>

      {open && (
        <div
          className="lab-backdrop"
          style={{ opacity: 1 }}
          onClick={close}
        />
      )}

      <div className="work-index">
        <ul className="work-list">
          {work.map((w, i) => (
            <li
              key={w.slug}
              className="work-row"
              onMouseEnter={() => !open && setActive(i)}
              onClick={() => expand(i)}
              data-cursor="expand"
            >
              <span className="work-row-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="work-row-title">{w.title}</span>
              <span className="work-row-kind">{KIND_LABEL[w.kind]}</span>
              <span className="work-row-arrow">↗</span>
            </li>
          ))}
        </ul>

        <div
          className={`work-preview${open ? " work-preview--open" : ""}`}
          ref={previewRef}
        >
          <div className="work-preview-media">
            {work.map((w, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={w.slug}
                src={w.poster}
                alt={w.title}
                className={(open ? w.slug === open : i === active) ? "is-active" : ""}
              />
            ))}
          </div>

          {openItem && (
            <div className="work-detail">
              <p className="lab-detail-tag">
                {KIND_LABEL[openItem.kind]} · {openItem.meta}
              </p>
              <h3 className="lab-detail-title">{openItem.title}</h3>
              <p className="lab-detail-blurb">{openItem.blurb}</p>
              <div className="lab-detail-actions">
                <Link href={openItem.href} className="lab2-btn lab2-btn--solid">
                  View full case study
                </Link>
              </div>
            </div>
          )}

          {open && (
            <button
              className="lab-close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
