'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import '@/styles/case-study.css';

export default function CaseStudySouthFork() {

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

            <p className="cs-label">Case Study 04</p>
            <h1 className="cs-title">South Fork<br />Water Board</h1>
            <p className="cs-subtitle">Website redesign for a wholesale water authority serving Oregon City and West Linn — designed around their &quot;simplicity is brilliant&quot; philosophy and the natural heritage of the Clackamas River headwaters. Pure water since 1915.</p>

            <div className="cs-tags">
              <span className="cs-tag">Visual Design</span>
              <span className="cs-tag">Brand Guidelines</span>
              <span className="cs-tag">Utility / Special District</span>
              <span className="cs-tag">ADA / WCAG</span>
              <span className="cs-tag">Nature-Focused</span>
              <span className="cs-tag">Figma</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">A water utility that isn&apos;t about water treatment</h2>
              <p className="cs-paragraph">South Fork Water Board has supplied pure water to partner cities Oregon City and West Linn since 1915. They&apos;re a wholesale authority — they don&apos;t serve individual residents directly — which shapes everything about how the site needed to communicate. Their audience is informed, their organization is small, and their philosophy is clear: &quot;simplicity is brilliant.&quot;</p>
              <p className="cs-paragraph">The brief was to design a site that felt like their water source — the pristine headwaters of the Clackamas River — not like a mechanical treatment facility. Nature over infrastructure. Clarity over complexity. Heritage over modernity for its own sake.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Challenge</p>
              <h2 className="cs-section-title">Designing within an existing brand</h2>
              <p className="cs-paragraph">South Fork had established brand guidelines — logo, colors, and visual identity — before the web project began. Unlike projects where the designer builds from scratch, this one required working faithfully within an existing system while still creating something visually distinctive and web-appropriate.</p>
              <p className="cs-paragraph">The brand&apos;s forest green and light blue palette was already defined. The task was implementing it in a way that felt purposeful on the web — not just technically compliant, but genuinely expressive of what the organization is about.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Process</p>
              <h2 className="cs-section-title">Brand guidelines first, layout second</h2>
              <div className="cs-chips">
                <span className="cs-chip">Brand guidelines review</span>
                <span className="cs-chip">Kickoff &amp; discovery brief</span>
                <span className="cs-chip">Nature-first design concept</span>
                <span className="cs-chip">Hero imagery selection — Clackamas River headwaters</span>
                <span className="cs-chip">Homepage / Interior / Interactions</span>
                <span className="cs-chip">ADA contrast verification</span>
                <span className="cs-chip">Revision cycle</span>
                <span className="cs-chip">Developer handoff</span>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Design Decisions</p>
              <h2 className="cs-section-title">Nature over mechanics</h2>
              <p className="cs-paragraph">Every visual choice reinforced the same idea: South Fork&apos;s value is their water source, not their infrastructure. Imagery, language, and color all pointed toward the Clackamas River rather than pipes and pumps.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Hero imagery</span>
                  <span className="cs-decision-value">Pristine headwaters of the Clackamas River — not a treatment facility, reservoir, or equipment photo. The visual first impression communicates purity and source, not process.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Heritage messaging</span>
                  <span className="cs-decision-value">&quot;Pure Water Since 1915&quot; integrated into the hero — 110+ years of service establishes trust without needing to explain it. The number does the work.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Color application</span>
                  <span className="cs-decision-value">Forest green and light blue from the brand guidelines applied with restraint — accents and hover states, not heavy fills. The brand colors enhance, not dominate, the natural imagery.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Navigation simplicity</span>
                  <span className="cs-decision-value">Wholesale board structure, not a full citizen services menu. Board Meetings, Active Projects, Water Quality, Master Plan — four links to four things that matter to this organization&apos;s actual audience.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Newsletter integration</span>
                  <span className="cs-decision-value">&quot;Water Connections&quot; newsletter prominently featured — their primary community communication tool. Card-based layout designed for easy CMS updates by a small team.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">Design Screens / Revision 1 / Desktop 1440px</p>
            <div className="cs-screens cs-screens--1 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/south-fork/home.jpg" alt="South Fork Water Board homepage — Clackamas River hero, forest green accents, pure water heritage messaging" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Homepage</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--2 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/south-fork/inner.jpg" alt="South Fork interior page — clean content layout, optional sidebar, board meeting documents" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Interior Page</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/south-fork/interactions.jpg" alt="South Fork interactions page — navigation hover states and interactive elements" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Interactions</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Outcome */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">Simplicity delivered</h2>
              <p className="cs-paragraph">The finished design reflects exactly what South Fork asked for — a site that feels like their water source, not their equipment. Clean structure, natural imagery, established heritage, and a content management setup that a small wholesale board can actually maintain. Simplicity, as requested, is brilliant.</p>

              <div className="cs-callout">
                <div className="cs-callout-stat">1915</div>
                <div className="cs-callout-text">Pure Water Since 1915 — 110+ years of service distilled into a site that communicates trust through restraint. Nature-first design working within established brand guidelines.</div>
              </div>

              <div className="cs-figma-wrapper">
                <a href="https://www.figma.com/design/zzLpejdpP5mgJD6TGNQP4L/Revision-1?node-id=0-1&t=Be7BB6w9VAEC8wsV-1" target="_blank" rel="noopener" className="cs-figma-btn">
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
        <section className="cs-next animate-on-scroll">
          <div className="cs-next-container">
            <p className="cs-next-label">Next Case Study</p>
            <Link href="/case-study/clive" className="cs-next-link">
              <span className="cs-next-title">City of Clive, Iowa</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
