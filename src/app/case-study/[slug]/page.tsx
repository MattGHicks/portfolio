import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import PageFrame from "@/components/PageFrame";
import { practice, practiceBySlug, contrastOnWhite } from "@/data/practice";
import "@/styles/case-study.css";

// Shared template for the recent Revize practice studies. Static folders
// under /case-study (poolpilot, franklin, ...) take precedence over this
// dynamic segment, so only the slugs in practice.ts render here.

export const dynamicParams = false;

export function generateStaticParams() {
  return practice.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = practiceBySlug[params.slug];
  if (!p) return {};
  return { title: `${p.title} — Matt Hicks`, description: p.subtitle };
}

function nextFor(slug: string) {
  const i = practice.findIndex((p) => p.slug === slug);
  const n = practice[i + 1];
  return n
    ? { href: `/case-study/${n.slug}`, title: n.title, label: "Next in the practice" }
    : { href: "/system/revize", title: "Revize Design System", label: "The system behind them" };
}

export default function PracticeStudyPage({ params }: { params: { slug: string } }) {
  const p = practiceBySlug[params.slug];
  if (!p) notFound();
  const next = nextFor(p.slug);
  const { primary, secondary } = p.screens;

  return (
    <>
      <Navigation />
      <ScrollAnimations />

      <main
        id="main"
        className="cs-page cs-practice"
        style={
          {
            "--cs-accent": p.accent,
          } as React.CSSProperties
        }
      >
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#practice" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to the practice
            </Link>
            <p className="cs-label">{p.label}</p>
            <h1 className="cs-title">{p.title}</h1>
            <p className="cs-subtitle">{p.subtitle}</p>
            <div className="cs-tags">
              {p.tags.map((t) => (
                <span className="cs-tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="cs-lead">
          <div className="cs-lead-container">
            <PageFrame
              screen={primary}
              size="primary"
              priority
              sizes="(max-width: 1400px) 100vw, 1216px"
            />
          </div>
        </section>

        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The brief</p>
              <h2 className="cs-section-title">{p.briefTitle}</h2>
              {p.brief.map((para, i) => (
                <p className="cs-paragraph" key={i}>
                  {para}
                </p>
              ))}
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The approach</p>
              <h2 className="cs-section-title">{p.approachTitle}</h2>
              <p className="cs-paragraph">{p.approach}</p>
              <div className="cs-decisions">
                {p.decisions.map((d) => (
                  <div className="cs-decision" key={d.name}>
                    <span className="cs-decision-name">{d.name}</span>
                    <span className="cs-decision-value">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {p.palette && (
              <div className="cs-section animate-on-scroll">
                <p className="cs-section-label">Palette · contrast measured against white</p>
                <ul className="cs-palette">
                  {p.palette.map((sw) => {
                    const ratio = contrastOnWhite(sw.hex);
                    const usage =
                      sw.role === "text"
                        ? `${ratio.toFixed(2)}:1 on white · ${ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "large text only"}`
                        : sw.role === "surface"
                          ? "Surface"
                          : `${ratio.toFixed(2)}:1 on white · accent`;
                    return (
                      <li className="swatch" key={sw.hex}>
                        <span className="swatch-chip" style={{ background: sw.hex }} />
                        <span className="swatch-name">{sw.name}</span>
                        <span className="num">{sw.hex.toUpperCase()}</span>
                        <span className="swatch-usage">{usage}</span>
                        {sw.note && <span className="swatch-note">{sw.note}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </section>

        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">
              The rest of the approved set · desktop, 1440px
            </p>
            <div className={`pf-grid pf-grid--${secondary.length}`}>
              {secondary.map((sc) => (
                <div className="animate-on-scroll" key={sc.src}>
                  <PageFrame
                    screen={sc}
                    sizes={`(max-width: 899px) 100vw, ${Math.round(1216 / secondary.length)}px`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">{p.outcome.title}</h2>
              <p className="cs-paragraph">{p.outcome.body}</p>
              <div className="cs-callout">
                <div className="cs-callout-stat">{p.outcome.stat}</div>
                <div className="cs-callout-text">{p.outcome.statText}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="cs-next">
          <div className="cs-next-container">
            <p className="cs-next-label">{next.label}</p>
            <Link href={next.href} className="cs-next-link">
              <span className="cs-next-title">{next.title}</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
