'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import '@/styles/case-study.css';

export default function CaseStudyArchbold() {
  useEffect(() => {
    document.title = 'Village of Archbold, Ohio — Matt Hicks';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Government website redesign for a small northwest Ohio village — transforming a cluttered, overlapping layout into a clean, confident design built around their navy and gold brand, a grid calendar their residents actually asked for, and navigation that doesn\'t require a map to use.');
    }
  }, []);

  return (
    <>
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
              <p className="cs-paragraph">The Village of Archbold, Ohio came into the kickoff meeting with clear references, specific complaints about their existing site, and a list of concrete requirements. That kind of client engagement is a gift — it means the design brief is real, the feedback will be useful, and the path to approval is clearly marked.</p>
              <p className="cs-paragraph">The core problem was visual complexity: overlapping elements, a busy hero, and a navigation structure that had grown unwieldy over time. The redesign brief was essentially the inverse — simple, clean, easy to navigate. Their reference point was the City of Troy: clean hero, simple navigation bar, professional and easy to look at. That framing held for every decision from the first concept through Revision 2.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Process</p>
              <h2 className="cs-section-title">From cluttered to clean in two revisions</h2>
              <div className="cs-chips">
                <span className="cs-chip">Kickoff &amp; discovery brief</span>
                <span className="cs-chip">Brand color verification — navy + gold ADA pass</span>
                <span className="cs-chip">Initial concept — Home / Inner / Interactions</span>
                <span className="cs-chip">Grid calendar layout design</span>
                <span className="cs-chip">Client presentation &amp; feedback</span>
                <span className="cs-chip">Revision 1</span>
                <span className="cs-chip">Revision 2 — final approved</span>
                <span className="cs-chip">Developer handoff</span>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Design Decisions</p>
              <h2 className="cs-section-title">Navy, gold, and a calendar that actually works</h2>
              <p className="cs-paragraph">The visual language was already defined by the logo — navy blue and gold, with lighter blue as a secondary accent. The design system job was implementing those colors in a way that felt modern and clean rather than the dated treatment on their existing site. Every decision worked toward the same goal: reduce visual noise without reducing utility.</p>

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
            <p className="cs-showcase-label">Design Screens / Revision 2 (Final) / Desktop 1440px</p>
            <div className="cs-screens cs-screens--1 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/archbold/home.jpg" alt="Village of Archbold homepage — clean navy hero, gold quick links grid, grid calendar layout" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Homepage</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--2 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/archbold/inner.jpg" alt="Archbold interior page — clean content layout, sidebar navigation, heading hierarchy" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Interior Page</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/archbold/interactions.jpg" alt="Archbold interactions — mega menu expanded, button hover states, calendar interactions" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Mega Menu &amp; Interactions</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Accessibility */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Accessibility</p>
              <h2 className="cs-section-title">Brand colors that pass</h2>
              <p className="cs-paragraph">Navy and gold are classic government brand colors — but they don&apos;t automatically meet ADA contrast requirements at every size and weight. Each combination was verified before the first design was shown to the client. Accessibility compliance was treated as a baseline condition, not a final check.</p>

              <div className="cs-tools">
                <div className="cs-tool">
                  <p className="cs-tool-name">Color contrast</p>
                  <p className="cs-tool-desc">Navy backgrounds with white text verified at 4.5:1+. Gold used for icon backgrounds and accents — verified against the navy card backgrounds it&apos;s paired with throughout the quick links section.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">ADA module</p>
                  <p className="cs-tool-desc">Sticky accessibility widget added — the client&apos;s existing site had none. Floating button style, positioned to remain accessible without conflicting with emergency alerts or navigation on mobile.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Calendar accessibility</p>
                  <p className="cs-tool-desc">Grid calendar designed with visible date labels, clear event indicators, and sufficient contrast for users with visual impairments. No color-only event coding — labels carry the semantic meaning.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">News without image text</p>
                  <p className="cs-tool-desc">News cards use headline and excerpt text — no text embedded in images. This was already aligned with the dateless news approach: content that reads correctly in screen readers and doesn&apos;t rely on image alt-text to convey meaning.</p>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">Simple, approved, delivered</h2>
              <p className="cs-paragraph">The Village of Archbold approved the design at Revision 2. A small village with a clear brief, specific references, and the self-awareness to articulate what wasn&apos;t working about their current site — that combination makes for a smooth, high-quality project. The result is a site that looks like what they described at the kickoff: clean, professional, and easy to use.</p>

              <div className="cs-callout">
                <div className="cs-callout-stat">Rev 2</div>
                <div className="cs-callout-text">Approved at Revision 2. Clear brief, specific references, and a client who knew exactly what they wanted. Navy + gold brand, grid calendar, simplified navigation — delivered clean.</div>
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
