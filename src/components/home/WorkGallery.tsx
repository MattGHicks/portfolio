"use client";

import { useState } from "react";
import Link from "next/link";
import Clip from "@/components/Clip";
import ArrowIcon from "@/components/ArrowIcon";
import Reveal from "./Reveal";
import { work, KIND_LABEL, type WorkKind } from "@/data/work";

const FILTERS: { label: string; value: "all" | WorkKind }[] = [
  { label: "All", value: "all" },
  { label: "Concepts", value: "concept" },
  { label: "Shipped", value: "shipped" },
  { label: "Systems", value: "system" },
];

export default function WorkGallery() {
  const [filter, setFilter] = useState<"all" | WorkKind>("all");
  const items = work.filter((w) => filter === "all" || w.kind === filter);

  // Alternate the side of standard panels (independent of lead panels).
  let standardSeen = 0;

  return (
    <section className="cin-work" id="work">
      <Reveal className="cin-work-head">
        <h2 className="cin-work-title">
          Selected Work <span>/ {work.length}</span>
        </h2>
        <p className="cin-work-sub">
          Shipped products, self-initiated concepts, and the systems behind
          them — shown as equals.
        </p>
      </Reveal>

      <div className="cin-filter" role="group" aria-label="Filter work by type">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="cin-panels">
        {items.map((w) => {
          const flip = w.scale === "standard" && standardSeen++ % 2 === 1;
          return (
            <Link
              key={w.slug}
              href={w.href}
              className={`cin-panel cin-panel--${w.scale} cin-panel--${w.kind}${
                flip ? " cin-panel--flip" : ""
              }`}
            >
              <div className="cin-media">
                {w.clip ? (
                  <Clip src={w.clip} poster={w.poster} />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={w.poster} alt={w.title} loading="lazy" />
                )}
              </div>
              <div className="cin-panel-body">
                <span className="cin-panel-eyebrow">
                  <span className={`cin-kind cin-kind--${w.kind}`}>
                    {KIND_LABEL[w.kind]}
                  </span>
                  {w.meta}
                </span>
                <h3 className="cin-panel-title">{w.title}</h3>
                <p className="cin-panel-blurb">{w.blurb}</p>
                <div className="cin-panel-tags">
                  {w.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <span className="cin-panel-cta">
                  View {w.kind === "system" ? "system" : "case study"}
                  <span className="arrow">
                    <ArrowIcon />
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
