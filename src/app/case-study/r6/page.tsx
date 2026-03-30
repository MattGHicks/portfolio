'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import ArrowIcon from '@/components/ArrowIcon';
import '@/styles/case-study.css';

export default function CaseStudyR6() {
  useEffect(() => {
    document.title = 'R6 Regional Council, Utah — Matt Hicks';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', 'Complete website redesign for a Central Utah regional government — brand palette built from scratch, Apple-inspired layout, mega menu for workforce and community services.');
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

            <p className="cs-label">Case Study 01</p>
            <h1 className="cs-title">R6 Regional<br />Council, Utah</h1>
            <p className="cs-subtitle">Complete website redesign for a Central Utah regional government body — building a brand color palette from scratch, crafting a clean Apple-inspired layout, and designing a mega menu that makes complex program offerings navigable.</p>

            <div className="cs-tags">
              <span className="cs-tag">Visual Design</span>
              <span className="cs-tag">Brand Color</span>
              <span className="cs-tag">Government UX</span>
              <span className="cs-tag">ADA / WCAG</span>
              <span className="cs-tag">Mega Menu</span>
              <span className="cs-tag">Figma</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">A regional government with no visual identity</h2>
              <p className="cs-paragraph">R6 Regional Council serves Central Utah communities through workforce development, aging services, community planning, and tax assistance programs. When they came to Revize for a complete redesign, there was no established web color palette — the designer had full creative latitude to build an identity from scratch.</p>
              <p className="cs-paragraph">The client&apos;s reference points were telling: Mapleton, St. George City, and Apple.com. Not other government sites. They wanted the simplicity and visual confidence of a product company, applied to a regional government context. That brief shaped every decision that followed.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Process</p>
              <h2 className="cs-section-title">Discovery through delivery</h2>
              <p className="cs-paragraph">The project followed Revize&apos;s eight-phase government website design process, from kickoff meeting through developer handoff. The target go-live date — July 1, 2026 — kept the timeline disciplined.</p>
              <div className="cs-chips">
                <span className="cs-chip">Kickoff &amp; discovery brief</span>
                <span className="cs-chip">Brand color development</span>
                <span className="cs-chip">Typography selection</span>
                <span className="cs-chip">Layout concepts (Home / Inner / Interactions)</span>
                <span className="cs-chip">Mega menu architecture</span>
                <span className="cs-chip">ADA compliance audit</span>
                <span className="cs-chip">Developer handoff</span>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Design Decisions</p>
              <h2 className="cs-section-title">Building a palette from the building itself</h2>
              <p className="cs-paragraph">R6 had recently moved into a new building with a gray and black interior aesthetic. That became the foundation. Rather than reaching for generic government blue, I built a palette around cool charcoal grays — then added Utah Sky Blue as the single accent color to provide warmth and interactivity without competing with the brand&apos;s understated tone.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Color system</span>
                  <span className="cs-decision-value">Cool charcoal primaries derived from their new building interior. Utah Sky Blue as the single accent for buttons and interactive elements — distinctive without being generic.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Typography</span>
                  <span className="cs-decision-value">Sans-serif pairing selected to complement the geometric style of the R6 logo. Both from Google Fonts — web performance and free licensing. Clean, modern, appropriate for regional government.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Mega menu</span>
                  <span className="cs-decision-value">Programs &amp; Services exposed through a mega menu showing all offerings at once — no confusing dropdowns within dropdowns. Inspired by Apple&apos;s approach, applied to a government services context.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Hero scale</span>
                  <span className="cs-decision-value">Deliberately smaller than their reference site (Mapleton). Client wanted visual appeal without an overwhelming hero — a subtle but important constraint that shaped the overall page hierarchy.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Quick links</span>
                  <span className="cs-decision-value">Card-style tiles for Programs &amp; Services, Tax Assistance, Workforce, Aging Services, and Contact Directory. Icon-based, scannable, touch-friendly — one click to the most accessed services.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">Design Screens / Revision 1 / Desktop 1440px</p>
            <div className="cs-screens cs-screens--2 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/r6/home.jpg" alt="R6 Regional Council homepage design — charcoal nav, Utah Sky Blue accents, card-style quick links" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Homepage</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/r6/inner.jpg" alt="R6 Regional Council interior page design — clean content layout with optional sidebar" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Interior Page</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--1 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/r6/interactions.jpg" alt="R6 Regional Council interactions page — mega menu expanded showing Programs and Services" loading="lazy" />
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
              <h2 className="cs-section-title">ADA compliance built in, not bolted on</h2>
              <p className="cs-paragraph">Government websites are required to meet ADA/WCAG accessibility standards. R6 serves community members across Central Utah — including older adults through their aging services programs — so accessibility wasn&apos;t an afterthought.</p>

              <div className="cs-tools">
                <div className="cs-tool">
                  <p className="cs-tool-name">Color contrast</p>
                  <p className="cs-tool-desc">All text and interactive elements verified at 4.5:1 minimum. The charcoal + sky blue combination was specifically chosen to achieve this without sacrificing the clean aesthetic.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Google Translate</p>
                  <p className="cs-tool-desc">Simplified English/Spanish toggle in the navigation — not the full dropdown list. Cleaner interface, covers the primary translation need for Central Utah communities.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Sticky navigation</p>
                  <p className="cs-tool-desc">Navigation remains visible on scroll — a specific client request based on their reference sites. Keeps menu access consistent without requiring users to scroll back to the top.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">ADA module</p>
                  <p className="cs-tool-desc">Persistent accessibility widget included as a sticky element — contrast adjustments, text sizing, and screen reader compatibility. Standard on all Revize government builds.</p>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">On track for July 2026 go-live</h2>
              <p className="cs-paragraph">The design was approved and handed off to Revize&apos;s development team. R6 Regional Council&apos;s site is scheduled to go live July 1, 2026 — on time, within the original design scope, and built around a brand identity that didn&apos;t exist when the project started.</p>

              <div className="cs-callout">
                <div className="cs-callout-stat">1:0</div>
                <div className="cs-callout-text">No existing brand identity at kickoff. One color palette, one typography system, one design direction — delivered from scratch. Go-live July 2026.</div>
              </div>

              <div className="cs-figma-wrapper">
                <a href="https://www.figma.com/design/krFP9equu6sXc826emaP3J/Revision-1?node-id=8-30198&t=Be7BB6w9VAEC8wsV-1" target="_blank" rel="noopener" className="cs-figma-btn">
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
            <Link href="/case-study/archbold" className="cs-next-link">
              <span className="cs-next-title">Village of Archbold, Ohio</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
