"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { archive } from "@/data/work";

export default function PracticeIndex() {
  const [preview, setPreview] = useState(archive[0]);

  return (
    <section className="wd-section">
      <header className="sec-head">
        <h2>The practice</h2>
        <span className="sec-meta">Revize · 2023—now</span>
      </header>

      <p className="practice-intro">
        Three years at Revize, 190+ government websites — one Figma design
        system, one 399-item accessibility checklist, every site verified
        against WCAG 2.1 before it ships. A few that stand for the rest:
      </p>

      <div className="practice-body">
        <ul className="ledger">
          {archive.map((w) => (
            <li key={w.slug}>
              <Link
                href={w.href}
                className="ledger-row"
                onMouseEnter={() => setPreview(w)}
                onFocus={() => setPreview(w)}
              >
                <span className="lg-title">{w.title}</span>
                <span className="lg-meta">{w.meta}</span>
                <span className="lg-arrow" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="ledger-preview" aria-hidden>
          {preview && (
            <Image
              key={preview.slug}
              src={preview.poster}
              alt=""
              fill
              sizes="360px"
              className="is-visible"
            />
          )}
        </div>
      </div>

      <Link href="/system/revize" className="practice-more">
        The design system behind them
      </Link>
    </section>
  );
}
