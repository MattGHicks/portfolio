"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { awards, designerOfRecord, teamWins } from "@/data/awards";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const tierClass = (level: string) =>
  level === "Gold"
    ? "gold"
    : level === "Silver"
    ? "silver"
    : level === "Best in Category"
    ? "best"
    : "bronze";

const goldCount = designerOfRecord.filter((a) => a.level === "Gold").length;
const totalWins = awards.length;

/**
 * "Recognition" — an elaborate awards trophy case. Real medal-tier colors
 * (gold / silver / cyan Best-in-Category), medallions, count-up headline
 * numbers, and per-row hover. Mirrors the two-column rhythm of the About block
 * above it for cohesion. Reduced-motion → final values, no count/stagger.
 */
export default function Awards() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
        const target = Number(node.dataset.count || "0");
        const suffix = node.dataset.suffix || "";
        if (reduced) {
          node.textContent = `${target}${suffix}`;
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
          onUpdate: () => {
            node.textContent = `${Math.round(obj.v)}${suffix}`;
          },
        });
      });

      if (reduced) return;
      gsap.from(".award-row", {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".award-list", start: "top 82%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <div className="lab2-recognition" ref={root}>
      <div className="recognition-lead">
        <p className="recognition-eyebrow">
          <span className="recognition-star">★</span> Recognition
        </p>
        <h3 className="recognition-title">
          Award-winning,
          <br />
          on the record.
        </h3>
        <p className="recognition-meta">Horizon Interactive Awards · 2024–2025</p>

        <div className="recognition-counts">
          <div className="recognition-count recognition-count--gold">
            <span className="recognition-count-num" data-count={goldCount} data-suffix="×">
              0×
            </span>
            <span className="recognition-count-label">Gold, as designer of record</span>
          </div>
          <div className="recognition-count recognition-count--total">
            <span className="recognition-count-num" data-count={totalWins}>
              0
            </span>
            <span className="recognition-count-label">Total wins across two years</span>
          </div>
        </div>
      </div>

      <div className="award-list">
        {designerOfRecord.map((a) => (
          <div
            className={`award-row award-row--${tierClass(a.level)}`}
            key={`${a.year}-${a.project}`}
          >
            <span className="award-medal" aria-hidden="true">
              ★
            </span>
            <span className="award-main">
              <span className="award-project">
                {a.project}, {a.state}
              </span>
              <span className="award-cat">{a.category}</span>
            </span>
            <span className="award-tier">{a.level}</span>
            <span className="award-year">{a.year}</span>
          </div>
        ))}

        <div className="award-team">
          <span className="award-team-label">
            Team wins · {teamWins.length} more
          </span>
          <ul className="award-team-list">
            {teamWins.map((a) => (
              <li
                className={`award-team-chip award-team-chip--${tierClass(a.level)}`}
                key={`${a.year}-${a.project}`}
              >
                <span className="award-team-dot" />
                {a.project}, {a.state}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
