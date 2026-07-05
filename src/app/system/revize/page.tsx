'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/styles/case-study.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import NoiseOverlay from '@/components/NoiseOverlay';

export default function SystemRevize() {

  return (
    <>
      <NoiseOverlay />
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main id="main" className="cs-page">
        {/* Hero */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">System 01</p>
            <h1 className="cs-title">Revize Design<br />System</h1>
            <p className="cs-subtitle">The Figma component library behind 190+ government websites — built for consistency, speed, and the team&apos;s ability to scale without rebuilding from scratch every time.</p>

            <div className="cs-tags">
              <span className="cs-tag">Variables</span>
              <span className="cs-tag">Tokens</span>
              <span className="cs-tag">Modes</span>
              <span className="cs-tag">Component Library</span>
              <span className="cs-tag">Figma</span>
              <span className="cs-tag">Design Systems</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">A system that ships 190+ sites</h2>
              <p className="cs-paragraph">The Revize Design System is the component library I built and maintained at Revize Software Systems. It powers every government website our team ships — from small townships to mid-sized cities. The goal was never just consistency; it was speed without sacrifice.</p>
              <p className="cs-paragraph">Every component is built with Figma variables, design tokens, and mode switching baked in from the start. That means a designer can rebrand an entire template in minutes, swap between light and dark modes instantly, and hand off specs that developers can actually trust.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Architecture</p>
              <h2 className="cs-section-title">Variables, tokens, and modes</h2>
              <p className="cs-paragraph">The system is built on three layers: primitive tokens (raw color values), semantic tokens (what colors mean), and component tokens (how components use them). This separation means a single brand color change cascades through the entire system automatically.</p>
              <div className="cs-chips">
                <span className="cs-chip">Primitive tokens</span>
                <span className="cs-chip">Semantic tokens</span>
                <span className="cs-chip">Component tokens</span>
                <span className="cs-chip">Light / Dark modes</span>
                <span className="cs-chip">Responsive variants</span>
                <span className="cs-chip">Auto-layout</span>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">Design System / Component Library / Figma</p>
            <div className="cs-screens cs-screens--1 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/revize/system-overview.jpg" alt="Revize Design System overview — component library, variables panel, and token structure" width={1440} height={7571} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">System Overview</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--2 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/revize/components.jpg" alt="Component library — buttons, cards, navigation, forms, and layout components" width={1440} height={1150} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Component Library</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/revize/variables.jpg" alt="Variable structure — primitive, semantic, and component token layers" width={1441} height={1877} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Token Architecture</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Components */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Components</p>
              <h2 className="cs-section-title">Everything a government site needs</h2>
              <p className="cs-paragraph">The library includes every component a government website could need: navigation systems, hero sections, content blocks, card grids, calendars, forms, footers, and accessibility widgets. Each component is built with real constraints in mind — ADA compliance, mobile responsiveness, and CMS integration requirements.</p>
              <div className="cs-tools">
                <div className="cs-tool">
                  <p className="cs-tool-name">Navigation</p>
                  <p className="cs-tool-desc">Mega menus, mobile drawers, breadcrumbs, and skip links — all with keyboard navigation built in.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Content Blocks</p>
                  <p className="cs-tool-desc">Hero sections, text blocks, image galleries, accordions, and tabbed interfaces.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Cards &amp; Grids</p>
                  <p className="cs-tool-desc">News cards, event cards, department cards, and staff directories with flexible grid layouts.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Forms &amp; Inputs</p>
                  <p className="cs-tool-desc">Contact forms, search bars, filters, and input fields with validation states.</p>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Impact</p>
              <h2 className="cs-section-title">The numbers that matter</h2>
              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Sites shipped</span>
                  <span className="cs-decision-value">190+ government websites built on this system, from small townships to mid-sized cities.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Design time</span>
                  <span className="cs-decision-value">New project setup reduced from days to hours. Brand customization takes minutes instead of rebuilding from scratch.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Consistency</span>
                  <span className="cs-decision-value">Every site ships with the same component quality, accessibility standards, and responsive behavior.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Handoff</span>
                  <span className="cs-decision-value">Developers get pixel-perfect specs with real token values, not approximations. Less back-and-forth, faster builds.</span>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">A foundation that scales</h2>
              <p className="cs-paragraph">The Revize Design System isn&apos;t just a component library — it&apos;s the infrastructure that lets a small design team ship enterprise-quality work at scale. When every component is built right once, you stop fixing the same problems on every project and start solving new ones.</p>

              <div className="cs-figma-wrapper">
                <a href="https://www.figma.com/design/EAwoUKZDIZBUMX6C4F5quY/Design-System-V4?node-id=2002-5958&t=jeZoBB23Q8RsFIr7-1" target="_blank" rel="noopener" className="cs-figma-btn">
                  <svg width="20" height="30" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
                    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
                    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
                    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
                    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
                  </svg>
                  View Design System in Figma
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Next */}
        <section className="cs-next animate-on-scroll">
          <div className="cs-next-container">
            <p className="cs-next-label">Next System</p>
            <Link href="/system/ai-workflow" className="cs-next-link">
              <span className="cs-next-title">AI-Augmented Design Workflow</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
