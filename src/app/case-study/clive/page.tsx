'use client';

import Link from 'next/link';
import Image from 'next/image';
import '@/styles/case-study.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import NoiseOverlay from '@/components/NoiseOverlay';

export default function CaseStudyClive() {

  return (
    <>
      <NoiseOverlay />
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
              <p className="cs-paragraph">Clive, Iowa is known for its Greenbelt — a trail system woven through residential neighborhoods that connects parks, open spaces, and community gathering points across the city. Residents don&apos;t just use the trails. They define themselves by them. &ldquo;Distinct by Nature&rdquo; isn&apos;t marketing language; it&apos;s accurate.</p>
              <p className="cs-paragraph">The website redesign needed to carry that identity across three separate but coordinated sites: the main city site, a public library sub-site, and a Parks &amp; Recreation sub-site. Each needed its own branded header and distinct feel, while still being recognizably part of the same city.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Challenge</p>
              <h2 className="cs-section-title">One brand system, three distinct experiences</h2>
              <p className="cs-paragraph">Designing a single site is one challenge. Designing three that share a visual DNA without feeling identical is another. The city site needed to feel authoritative and comprehensive. The library needed a community-focused, welcoming warmth. Parks &amp; Rec needed energy and activity. All three needed to work within the same dark green palette without becoming monotonous.</p>
              <p className="cs-paragraph">The solution was individual header branding — each sub-site gets its own logo variant and department identity at the top level, with shared colors, type, and component patterns beneath. Same system, different personality.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Process</p>
              <h2 className="cs-section-title">Discovery through three-site delivery</h2>
              <div className="cs-chips">
                <span className="cs-chip">Kickoff &amp; discovery brief</span>
                <span className="cs-chip">Color system development (PMS 350 green + blue accents)</span>
                <span className="cs-chip">City site — Home / Inner / Interactions</span>
                <span className="cs-chip">Library sub-site — branded header + templates</span>
                <span className="cs-chip">Parks &amp; Rec sub-site — branded header + templates</span>
                <span className="cs-chip">ADA compliance audit (all three sites)</span>
                <span className="cs-chip">Revision cycle x3</span>
                <span className="cs-chip">Developer handoff</span>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Design Decisions</p>
              <h2 className="cs-section-title">Dark green as the anchor</h2>
              <p className="cs-paragraph">The client was clear from the start: dark green. Clive is known for its trails and natural spaces, and the color needed to reflect that. PMS 350 — a deep, rich forest green — became the primary color for navigation, headings, and borders across all three sites.</p>

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
                  <span className="cs-decision-name">Chatbot integration</span>
                  <span className="cs-decision-value">City Bot chatbot kept prominent on the right side — client&apos;s preferred tool for resident assistance. Positioned not to conflict with the ADA module or emergency alert box on mobile.</span>
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
            <p className="cs-showcase-label animate-on-scroll">Design Screens / Revision 3 / Desktop 1440px / Three Sub-Sites</p>
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
          </div>
        </section>

        {/* Content: Accessibility */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Accessibility</p>
              <h2 className="cs-section-title">Dark green done right</h2>
              <p className="cs-paragraph">Dark backgrounds with white text can fail accessibility audits when the green isn&apos;t dark enough — or when the blue accents are used as text colors. Every color combination across all three sites was verified at 4.5:1 minimum contrast before any client delivery.</p>

              <div className="cs-tools">
                <div className="cs-tool">
                  <p className="cs-tool-name">PMS 350 verification</p>
                  <p className="cs-tool-desc">Deep forest green verified for white text at 4.5:1 minimum contrast. The client&apos;s preference for dark green backgrounds with white text — Pete specifically cited better contrast — was both aesthetically and technically correct.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Blue accent use</p>
                  <p className="cs-tool-desc">PMS 636 sky blue used for backgrounds only — never as text color without sufficient contrast treatment. Prevents the common mistake of using brand colors without verifying they work for typography.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Touch targets</p>
                  <p className="cs-tool-desc">Card quick links and mega menu items sized for mobile thumbs — the client specifically cited making the mobile navigation easy to tap. 44x44px minimum enforced across all interactive elements.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">ADA module placement</p>
                  <p className="cs-tool-desc">Positioned to avoid conflict with the City Bot chatbot and emergency alert banner on mobile — a three-way conflict that required careful z-index and position planning across device widths.</p>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">Three sites, one system, 3 revision cycles</h2>
              <p className="cs-paragraph">Nine complete design exports across three sub-sites — city, library, and parks — all sharing a visual DNA while maintaining distinct identity. Three revision cycles refined the layouts based on consolidated stakeholder feedback from Communications lead Molly Elder and city staff.</p>

              <div className="cs-callout">
                <div className="cs-callout-stat">3x</div>
                <div className="cs-callout-text">Three sub-sites — City, Library, Parks &amp; Rec — designed as a unified system. 9 full-page exports, 3 revision cycles, one cohesive &ldquo;Distinct by Nature&rdquo; identity across all of them.</div>
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
