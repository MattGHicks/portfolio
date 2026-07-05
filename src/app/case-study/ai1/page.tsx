'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import Clip from '@/components/Clip';
import LiveDemoBrowser from '@/components/LiveDemoBrowser';
import { AI1 } from '@/lib/case-studies';
import '@/styles/case-study.css';

const A = '/images/cs/ai1';

export default function CaseStudyAI1() {

  return (
    <>
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main className="cs-ai1">
        {/* Hero */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">Speculative Concept · Cinematic Reveal</p>
            <h1 className="cs-title">AI1</h1>
            <p className="cs-subtitle">
              A self-initiated concept reveal site for SpaceX&apos;s AI1 — the
              orbital AI data-center satellite unveiled in June 2026. The specs are
              real; the cinema and the mythology are mine. A live WebGL starfield,
              AI-generated film loops, scroll-driven lore, live HUD telemetry, and an
              interactive orbit you can drag. A love letter to the audacity of
              putting a mind in orbit — built, not mocked up.
            </p>

            <div className="cs-tags">
              <span className="cs-tag">Art Direction</span>
              <span className="cs-tag">Front-End</span>
              <span className="cs-tag">Motion / WebGL</span>
              <span className="cs-tag">3D</span>
              <span className="cs-tag">AI Film</span>
            </div>

            <p className="cs-private-note">
              A self-initiated concept, built because the idea floored me. Unofficial
              — not affiliated with, authorized by, or endorsed by SpaceX. &ldquo;SpaceX,&rdquo;
              &ldquo;Starlink,&rdquo; &ldquo;Starship&rdquo; and related marks belong to their owners.
              Verified specifications are drawn from public June 2026 reporting; all
              narrative &ldquo;lore&rdquo; is invented for this concept.
            </p>
          </div>
        </section>

        {/* Opportunity */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Opportunity</p>
              <h2 className="cs-section-title">A real announcement worth a real reveal.</h2>
              <p className="cs-paragraph">
                In June 2026 SpaceX unveiled AI1: a satellite that runs AI compute in
                orbit — 150 kilowatts of it, cooled by a 110 m² liquid radiator,
                parked at 600 km in perpetual sun, with a filing for up to a million
                of them. It&apos;s one of the most audacious ideas in years, and it
                deserved a reveal as cinematic as the ambition.
              </p>
              <p className="cs-paragraph">
                So I built the one I wished existed — a concept site that treats the
                real spec sheet as cinema, and is honest about exactly where the facts
                end and the mythology begins.
              </p>
            </div>
          </div>
        </section>

        {/* Cinematic hero clip */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">The Reveal / Generated Film</p>
            <div className="cs-ai1-clip cs-ai1-hero-clip animate-on-scroll">
              <Clip src={`${A}/hero.mp4`} poster={`${A}/hero.jpg`} />
              <span className="cs-ai1-clip-caption">AI1 in orbit — the full-bleed hero loop</span>
            </div>
          </div>
        </section>

        {/* Approach + decisions */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Approach</p>
              <h2 className="cs-section-title">Myth and spec sheet, interwoven — and labeled.</h2>
              <p className="cs-paragraph">
                The organizing idea: make the real engineering feel mythic, without
                ever blurring truth and fiction. Every claim on the page is tagged
                <strong> VERIFIED</strong> (a real, sourced spec) or <strong> LORE</strong>{' '}
                (invented for the concept). The instruments only ever show real
                numbers; the story is the connective tissue between them.
              </p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Real facts, live</span>
                  <span className="cs-decision-value">A persistent mission-control telemetry rail and HUD spec readouts run on the actual numbers — 120/150 kW compute, 110 m² radiator, 600 km LEO — with a program clock counting from the reveal, clearly marked SIM.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Fact / lore provenance</span>
                  <span className="cs-decision-value">A small tag system runs through the whole page so a reader always knows what&apos;s sourced and what&apos;s imagined — the honesty device that lets the mythology run wild without misleading anyone.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Generated film throughout</span>
                  <span className="cs-decision-value">A cinematic hero loop and five scroll-driven chapter films — generated in Seedance — carry the narrative from the cold-start fairing to a million-node lattice, all keyed to the same cyan / amber / violet palette.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">An orbit you can walk</span>
                  <span className="cs-decision-value">A real-time react-three-fiber constellation lets you drag around a glowing lattice of nodes — the interactive counterpoint to the pre-rendered film.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Instrument-grade system</span>
                  <span className="cs-decision-value">An inky-vacuum palette where color encodes the craft&apos;s thermal story — radiator-cyan, thermal-amber, an iridescent &ldquo;mind&rdquo; violet reserved for the core — plus corner-bracket HUD framing, scanlines, and kinetic display type.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Film grid */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">The Film / Three of Five Chapters / Seedance</p>
            <div className="cs-ai1-clip-grid animate-on-scroll">
              <div className="cs-ai1-clip">
                <Clip src={`${A}/chapter-first-light.mp4`} poster={`${A}/chapter-first-light.jpg`} />
                <span className="cs-ai1-clip-caption">First Light — the wings unfurl</span>
              </div>
              <div className="cs-ai1-clip">
                <Clip src={`${A}/chapter-choir.mp4`} poster={`${A}/chapter-choir.jpg`} />
                <span className="cs-ai1-clip-caption">The Choir of Radiators</span>
              </div>
              <div className="cs-ai1-clip">
                <Clip src={`${A}/chapter-constellation.mp4`} poster={`${A}/chapter-constellation.jpg`} />
                <span className="cs-ai1-clip-caption">The Constellation Remembers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Build */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Build</p>
              <h2 className="cs-section-title">Cinema that still scores green.</h2>
              <p className="cs-paragraph">
                The hard part of a video-rich site is keeping it fast. Posters are the
                LCP, every clip plays only while in view, all motion respects
                reduced-motion, and the heavy 3D is code-split — so the whole
                experience ships in about 5 MB of media and still builds clean.
              </p>

              <div className="cs-tools">
                <div className="cs-tool">
                  <div className="cs-tool-name">Next.js 16 + React 19</div>
                  <div className="cs-tool-desc">App Router, TypeScript, Tailwind v4 with a CSS-first token system. Deployed on Vercel.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Higgsfield · Seedance</div>
                  <div className="cs-tool-desc">Six cinematic AI film loops — one hero, five chapters — prompt-tuned to a single deep-space cyberpunk palette, then ffmpeg-compressed for the web.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">react-three-fiber</div>
                  <div className="cs-tool-desc">The interactive orbit visualizer — a point-cloud constellation with bloom, drag controls, and viewport-gated render loops.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Framer Motion + Lenis</div>
                  <div className="cs-tool-desc">Scroll-driven reveals, kinetic decrypt headlines, parallax, and smooth scroll — all disabled under reduced motion.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Canvas starfield + HUD</div>
                  <div className="cs-tool-desc">A throttled 2D particle starfield behind everything, plus a live telemetry rail and animated spec readouts.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Honest by construction</div>
                  <div className="cs-tool-desc">A typed FACT/LORE content model drives the provenance tags, so the line between sourced spec and invented story is enforced in code.</div>
                </div>
              </div>

              <div className="cs-callout">
                <div className="cs-callout-stat">~5MB</div>
                <div className="cs-callout-text">Total media for a fully video-driven, 3D-interactive site — six AI film loops, a WebGL starfield, and a real-time orbit, all gated to play only when seen. Cinematic and still lightweight.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Live */}
        <LiveDemoBrowser
          liveUrl={AI1.liveUrl}
          repoUrl={AI1.repoUrl}
          poster={`${A}/hero.jpg`}
          host="spcx-ai1.vercel.app"
        />

        {/* Next */}
        <section className="cs-next animate-on-scroll">
          <div className="cs-next-container">
            <p className="cs-next-label">Next Case Study</p>
            <Link href="/case-study/dr-dabber" className="cs-next-link">
              <span className="cs-next-title">Dr. Dabber</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
