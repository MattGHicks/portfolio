'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import '@/styles/case-study.css';

export default function CaseStudyArchbold() {

  return (
    <>
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main id="main" className="cs-page" style={{ "--cs-hero-bg": "url(/images/heroes/archbold.jpg)" } as React.CSSProperties}>
        {/* Hero Section */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">Case Study 03</p>
            <h1 className="cs-title">Village of Archbold,<br />Ohio</h1>
            <p className="cs-subtitle">Government website redesign for a small northwest Ohio village — transforming a cluttered, overlapping layout into a clean, confident design built around their navy and gold brand, a grid calendar their residents actually asked for, and navigation that doesn&apos;t require a map to use.</p>

            <div className="cs-tags">
              <span className="cs-tag">Visual Design</span>
              <span className="cs-tag">Government UX</span>
              <span className="cs-tag">ADA / WCAG</span>
              <span className="cs-tag">Calendar Design</span>
              <span className="cs-tag">Figma</span>
              <span className="cs-tag">Simplification</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">A village that knew exactly what it wanted</h2>
              <p className="cs-paragraph">The Village of Archbold came into the kickoff meeting with specific complaints about their existing site — overlapping elements, a busy hero, navigation that had grown unwieldy — and a clear reference in the City of Troy: clean hero, simple navigation bar, professional and easy to look at. The visual language was already defined by their logo&apos;s navy and gold, so my job was implementing those colors in a way that felt modern rather than dated, with every combination verified for ADA contrast before the first design was shown. The grid calendar was a direct resident request from the kickoff — monthly overview with event details in a side panel, replacing a multi-tab calendar. The village approved the design at Revision 2.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Grid calendar</span>
                  <span className="cs-decision-value">A specific client request from the kickoff meeting — monthly overview with dates and days of week visible, event details in a side panel. Inspired by the City of Troy example they shared. Replaces a multi-tab calendar with a single unified view.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Hero simplification</span>
                  <span className="cs-decision-value">Clean welcome message with navy overlay for legibility — specifically avoiding the busy, overlapping hero they described in their current site. Single CTA button. Community photography prominent, not buried under competing elements.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Quick links grid</span>
                  <span className="cs-decision-value">6-tile gold icon grid for fast service access — Online Payments, Employment, County Zoning, Ordinances, Vehicles &amp; Licenses. Built to be adjusted via Google Analytics data at launch to reflect what residents actually need most.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">News without dates</span>
                  <span className="cs-decision-value">Client explicitly asked to remove dates from news items — they don&apos;t post frequently, and visible dates create a &quot;stale content&quot; problem even when the content is still relevant. Cards without timestamps stay useful longer.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Navigation cleanup</span>
                  <span className="cs-decision-value">Simplified to 4–5 primary links, utility bar removed entirely, social icons placed subtly rather than prominently. Mega menu dropdown shows departments and services without requiring users to hunt through a crowded top bar.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label">The design</p>
            <div className="cs-screens cs-screens--1 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/archbold/home.jpg" alt="Village of Archbold homepage — clean navy hero, gold quick links grid, grid calendar layout" width={1440} height={3613} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Homepage</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--2 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/archbold/inner.jpg" alt="Archbold interior page — clean content layout, sidebar navigation, heading hierarchy" width={1440} height={2516} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Interior Page</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/archbold/interactions.jpg" alt="Archbold interactions — mega menu expanded, button hover states, calendar interactions" width={1440} height={3619} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Mega Menu &amp; Interactions</figcaption>
              </figure>
            </div>

            <div className="cs-figma-wrapper">
              <a href="https://www.figma.com/design/U5hUDd2zzELVnaEbPz0qED/Revision-2?node-id=8-30198&t=Be7BB6w9VAEC8wsV-1" target="_blank" rel="noopener" className="cs-figma-btn">
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
            <Link href="/case-study/south-fork" className="cs-next-link">
              <span className="cs-next-title">South Fork Water Board, Oregon</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
