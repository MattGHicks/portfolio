'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '@/styles/case-study.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import NoiseOverlay from '@/components/NoiseOverlay';

export default function CaseStudyTemple() {
  useEffect(() => {
    document.title = 'City of Temple, Texas — Matt Hicks';
  }, []);

  return (
    <>
      <NoiseOverlay />
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main>
        {/* Hero Section */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">Case Study 05</p>
            <h1 className="cs-title">City of Temple,<br />Texas</h1>
            <p className="cs-subtitle">Large city website redesign across three sub-sites — five revision cycles, mobile-first design exports, and coordinated design for City Hall, the Public Library, and Parks &amp; Recreation. A masterclass in client iteration.</p>

            <div className="cs-tags">
              <span className="cs-tag">Visual Design</span>
              <span className="cs-tag">Multi-Site</span>
              <span className="cs-tag">Mobile-First</span>
              <span className="cs-tag">Client Iteration</span>
              <span className="cs-tag">Government UX</span>
              <span className="cs-tag">ADA / WCAG</span>
              <span className="cs-tag">Figma</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">A large city with complex needs</h2>
              <p className="cs-paragraph">Temple, Texas is a mid-size city with a full range of municipal services, a dedicated public library system, and an active parks and recreation department — each requiring its own coordinated web presence. The redesign scope covered all three: a primary city site, a library sub-site, and a Parks &amp; Rec sub-site, all designed to function as a unified digital experience while maintaining distinct departmental identity.</p>
              <p className="cs-paragraph">Temple also required mobile-first design artifacts — full mobile exports at 375px alongside the standard 1440px desktop views. Mobile wasn&apos;t treated as an afterthought or a development-phase concern. It was part of the design deliverables from day one.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Challenge</p>
              <h2 className="cs-section-title">Five revision cycles. Still standing.</h2>
              <p className="cs-paragraph">Most government website projects complete in 2–4 revision cycles. Temple went to five. That&apos;s not unusual for a large city with multiple decision-makers and a complex service hierarchy — but it demands a different kind of discipline from the designer. Each revision needed to be precise, documented, and efficient. Scope had to stay controlled. Client feedback had to be consolidated and addressed systematically.</p>
              <p className="cs-paragraph">Five revisions also means five opportunities to improve. The final delivered design is stronger than an initial concept could ever be — shaped by a client who was engaged enough to articulate exactly what they needed across multiple rounds of feedback.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Process</p>
              <h2 className="cs-section-title">From initial concept to Revision 5</h2>
              <div className="cs-chips">
                <span className="cs-chip">Kickoff &amp; discovery brief</span>
                <span className="cs-chip">Initial design concept — all three sites</span>
                <span className="cs-chip">Revision 1 — consolidated feedback</span>
                <span className="cs-chip">Revision 2</span>
                <span className="cs-chip">Revision 3</span>
                <span className="cs-chip">Revision 4</span>
                <span className="cs-chip">Revision 5 — final approval</span>
                <span className="cs-chip">Mobile exports — 375px (Home + Interior)</span>
                <span className="cs-chip">Tile template variants</span>
                <span className="cs-chip">ADA audit — all sites</span>
                <span className="cs-chip">Developer handoff</span>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Design Decisions</p>
              <h2 className="cs-section-title">Built for scale, refined through iteration</h2>
              <p className="cs-paragraph">The initial design concept established the visual language — color, typography, layout hierarchy, and component patterns — that carried through all five revision cycles. Revisions refined rather than rebuilt: adjusting proportions, clarifying navigation structures, and fine-tuning the coordinated look across City Hall, Library, and Parks sub-sites.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Three-site system</span>
                  <span className="cs-decision-value">City Hall, Public Library, and Parks &amp; Recreation each designed with coordinated visual DNA — shared type system and color palette — with distinct sub-site headers and imagery that give each department its own character.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Mobile exports</span>
                  <span className="cs-decision-value">Full 375px mobile designs delivered alongside desktop — Homepage and Interior page at mobile width. Mobile layout decisions made in Figma, not delegated to development. Ensures the responsive experience is intentional.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Tile templates</span>
                  <span className="cs-decision-value">Two tile template variants designed for the service quick-access section — different layout proportions tested and approved. Gives the city flexibility in how they organize and prioritize services at launch.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Navigation dropdown</span>
                  <span className="cs-decision-value">Mobile dropdown navigation designed and exported as a standalone screen — the mobile navigation pattern is one of the most important interactions to get right on a city website with dozens of service categories.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Revision discipline</span>
                  <span className="cs-decision-value">Each of the five revision cycles was documented, scoped, and delivered with a 1–2 day turnaround. Client feedback was consolidated before revisions began — preventing scope creep and keeping the project moving through a complex approval chain.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label">Design Screens / Revision 5 (Final) / Desktop 1440px + Mobile 375px</p>
            <div className="cs-screens cs-screens--2 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/temple/city-home.jpg" alt="City of Temple, Texas main city homepage — final approved design after 5 revision cycles" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">City Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/temple/city-inner.jpg" alt="City of Temple interior page — full-width content layout with department navigation" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">City Interior Page</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--3 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/temple/library-home.jpg" alt="Temple Public Library homepage — library-branded sub-site within city design system" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Library Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/temple/parks-home.jpg" alt="Temple Parks and Recreation homepage — Parks sub-site with activity-focused design" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Parks &amp; Rec Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/temple/city-interactions.jpg" alt="City of Temple interactions page — navigation, hover states, dropdown menu" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Interactions</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Accessibility */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Accessibility</p>
              <h2 className="cs-section-title">ADA compliance across three sites</h2>
              <p className="cs-paragraph">Three sub-sites means three separate accessibility audits. Every color combination, interactive element, and touch target was verified across City Hall, Library, and Parks &amp; Rec before the final revision was delivered. Large cities have diverse populations — accessibility isn&apos;t optional.</p>

              <div className="cs-tools">
                <div className="cs-tool">
                  <p className="cs-tool-name">Color contrast</p>
                  <p className="cs-tool-desc">All text and interactive elements audited at 4.5:1 minimum across all three site palettes. Sub-site color variations each verified independently — a coordinated system doesn&apos;t mean shared color passes.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Mobile touch targets</p>
                  <p className="cs-tool-desc">44x44px minimum touch targets enforced in the mobile designs — the 375px exports make this explicit. Navigation items, service cards, and footer links all sized for real-world thumb interaction.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">ADA module</p>
                  <p className="cs-tool-desc">Persistent accessibility widget positioned consistently across all three sub-sites — contrast, text sizing, and screen reader support available from every page.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Emergency alerts</p>
                  <p className="cs-tool-desc">Alert banner module styled and positioned for all three sites — critical for a city this size. Toggle-enabled through the CMS so staff can activate without a developer.</p>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">Five cycles to the final approval</h2>
              <p className="cs-paragraph">The City of Temple approved the design after Revision 5. What started as a complex multi-site brief became a coordinated visual system — three distinct but cohesive experiences, a full mobile design package, and two tile template variants for the city&apos;s flexibility at launch.</p>

              <div className="cs-callout">
                <div className="cs-callout-stat">5x</div>
                <div className="cs-callout-text">Five full revision cycles across three sub-sites — City, Library, Parks &amp; Rec. Mobile exports included from day one. Final approved design delivers a coordinated system built for scale.</div>
              </div>

              <div className="cs-figma-wrapper">
                <a href="https://www.figma.com/design/8MucveJq3brv2Tp980RRaI/Revision-5?node-id=8-30198&t=Be7BB6w9VAEC8wsV-1" target="_blank" rel="noopener" className="cs-figma-btn">
                  <svg width="20" height="30" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                  </svg>
                  View Design in Figma
                </a>
              </div>

              <p className="cs-paragraph" style={{ marginTop: 'var(--spacing-l)' }}>The number of revision cycles isn&apos;t a failure metric — it&apos;s a collaboration metric. A client engaged enough to give five rounds of precise feedback cares deeply about the outcome. That engagement produces better work.</p>
            </div>
          </div>
        </section>

        {/* Next Case Study */}
        <section className="cs-next">
          <div className="cs-next-container">
            <p className="cs-next-label">Back to All Work</p>
            <Link href="/#work" className="cs-next-link">
              <span className="cs-next-title">View all case studies</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
