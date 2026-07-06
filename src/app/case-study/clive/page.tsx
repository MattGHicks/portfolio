'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/styles/case-study.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';

export default function CaseStudyClive() {

  return (
    <>
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main id="main" className="cs-page" style={{ "--cs-hero-bg": "url(/images/heroes/clive.jpg)" } as React.CSSProperties}>
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
            <h1 className="cs-title">City of Clive, Iowa</h1>
            <p className="cs-subtitle">Multi-site redesign for a city whose identity is literally nature — three distinct but cohesive sites for City Hall, the Public Library, and Parks &amp; Recreation, all built around the Greenbelt trail system that defines Clive.</p>

            <div className="cs-tags">
              <span className="cs-tag">Visual Design</span>
              <span className="cs-tag">Multi-Site</span>
              <span className="cs-tag">Government UX</span>
              <span className="cs-tag">ADA / WCAG</span>
              <span className="cs-tag">Parks &amp; Rec</span>
              <span className="cs-tag">Figma</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">&ldquo;Distinct by Nature&rdquo; — and they mean it</h2>
              <p className="cs-paragraph">Clive, Iowa defines itself by its Greenbelt — a trail system woven through residential neighborhoods connecting parks and gathering points across the city — and the redesign needed to carry that identity across three coordinated sites: the main city site, a Public Library sub-site, and a Parks &amp; Recreation sub-site. The client was clear from the start about dark green, so PMS 350 (#284E36) became the anchor for navigation, headings, and borders, with PMS 636 sky blue (#90D7E7) as relief — every combination across all three sites verified at 4.5:1 contrast before delivery. Each sub-site got its own branded header and department logo variant within the shared system, so visitors always know where they are. Three revision cycles and nine full-page exports later, the result is one cohesive &ldquo;Distinct by Nature&rdquo; identity across all three experiences.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Primary green</span>
                  <span className="cs-decision-value">PMS 350 (#284E36) — deep forest green selected by the client, verified for ADA compliance with white text. Used for navigation, headings, and borders across all three sites.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Blue accent</span>
                  <span className="cs-decision-value">PMS 636 sky blue (#90D7E7) for sidebar backgrounds and interactive accents. Provides visual relief from the dominant green while staying within the city&apos;s brand palette.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Sub-site headers</span>
                  <span className="cs-decision-value">Parks &amp; Rec and Library each have unique branded headers with their own department logo variant. Visitors always know which site they&apos;re on — clear identity without breaking the unified system.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Mega menu</span>
                  <span className="cs-decision-value">Four primary categories — Government, City Services, Residents, Businesses — organized under a mega menu that doesn&apos;t become unwieldy on mobile. Modeled after the Des Moines reference site the client referenced.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Card-style quick links</span>
                  <span className="cs-decision-value">Actionable cards — &ldquo;Pay Now,&rdquo; &ldquo;View Agendas,&rdquo; &ldquo;Make a Request&rdquo; — with icon-based labels. Touch-friendly, ADA-accessible, and specific enough to tell residents exactly what will happen when they click.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">The design</p>
            <div className="cs-screens cs-screens--2 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/clive/city-home.jpg" alt="City of Clive main city homepage — dark forest green nav, Greenbelt trail imagery, card-style quick links" width={1440} height={4386} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">City Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/clive/parks-home.jpg" alt="Clive Parks and Recreation homepage — department-branded header, activity-focused design" width={1440} height={4134} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Parks &amp; Rec Homepage</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--2 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/clive/library-home.jpg" alt="Clive Public Library homepage — library-branded header, community-focused warmth within city palette" width={1440} height={4134} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Library Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/clive/city-inner.jpg" alt="City of Clive interior page — full-width content layout, breadcrumb navigation, minimal sidebar" width={1440} height={2646} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">City Interior Page</figcaption>
              </figure>
            </div>

            <div className="cs-figma-wrapper">
              <a href="https://www.figma.com/design/JxSF9VA7Dx1hDGYxNymVs8/Revision-3?node-id=8-30198&t=Be7BB6w9VAEC8wsV-1" target="_blank" rel="noopener" className="cs-figma-btn">
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
        <section className="cs-next animate-on-scroll">
          <div className="cs-next-container">
            <p className="cs-next-label">Next Case Study</p>
            <Link href="/case-study/temple" className="cs-next-link">
              <span className="cs-next-title">City of Temple, Texas</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
