'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/styles/case-study.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';

export default function CaseStudyTemple() {

  return (
    <>
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main id="main" className="cs-page">
        {/* Hero Section */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">Case Study 06</p>
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
              <p className="cs-paragraph">Temple, Texas is a mid-size city whose redesign scope covered three coordinated sites — City Hall, the Public Library, and Parks &amp; Recreation — plus full mobile exports at 375px alongside the standard 1440px desktop views, so responsive layout decisions were made in Figma rather than delegated to development. The project ran five revision cycles where most complete in 2–4, which demanded discipline: consolidated feedback before each round, documented scope, and 1–2 day turnarounds through a complex approval chain. The initial concept established the visual language, and revisions refined rather than rebuilt — adjusting proportions, clarifying navigation, and fine-tuning the coordinated look across all three sub-sites. The city approved at Revision 5 with a full mobile design package and two tile template variants for flexibility at launch.</p>

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
            <p className="cs-showcase-label">The design</p>
            <div className="cs-screens cs-screens--2 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/temple/city-home.jpg" alt="City of Temple, Texas main city homepage — final approved design after 5 revision cycles" width={1440} height={5603} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">City Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/temple/city-inner.jpg" alt="City of Temple interior page — full-width content layout with department navigation" width={1440} height={2657} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">City Interior Page</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--3 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/temple/library-home.jpg" alt="Temple Public Library homepage — library-branded sub-site within city design system" width={1440} height={3756} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Library Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/temple/parks-home.jpg" alt="Temple Parks and Recreation homepage — Parks sub-site with activity-focused design" width={1440} height={4648} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Parks &amp; Rec Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/temple/city-interactions.jpg" alt="City of Temple interactions page — navigation, hover states, dropdown menu" width={1440} height={5603} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Interactions</figcaption>
              </figure>
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
          </div>
        </section>

        {/* Next Case Study */}
        <section className="cs-next">
          <div className="cs-next-container">
            <p className="cs-next-label">Next Case Study</p>
            <Link href="/case-study/franklin" className="cs-next-link">
              <span className="cs-next-title">City of Franklin, Indiana</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
