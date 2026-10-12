'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import '@/styles/case-study.css';

export default function CaseStudyFranklin() {

  return (
    <>
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main id="main" className="cs-page" style={{ "--cs-accent": "#c9a158", "--cs-hero-bg": "url(/images/heroes/franklin.jpg)" } as React.CSSProperties}>
        {/* Hero Section */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">Case Study 07</p>
            <h1 className="cs-title">City of Franklin,<br />Indiana</h1>
            <p className="cs-subtitle">A full rebrand for a historic Indiana city — new logo, new color system, new type pairing, new website. Most municipal projects design <em>around</em> an existing brand. Franklin let us redefine it.</p>

            <div className="cs-tags">
              <span className="cs-tag">Brand Identity</span>
              <span className="cs-tag">Logo Design</span>
              <span className="cs-tag">Color System</span>
              <span className="cs-tag">Typography</span>
              <span className="cs-tag">Government UX</span>
              <span className="cs-tag">Figma</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">An unusual scope: redefine, don&apos;t redress</h2>
              <p className="cs-paragraph">Franklin is a small historic city south of Indianapolis — Romanesque Revival courthouse, restored Victorian brick downtown, an Artcraft Theatre marquee that&apos;s been lighting up Main Street since 1922, and a recently built downtown amphitheater that anchors a year-round festival calendar. Strong visual DNA, weak visual identity.</p>
              <p className="cs-paragraph">The brief was unusual for Revize: client wanted a new logo, a new palette, new typography, <em>and</em> a new website — all of it. Most municipal redesigns inherit a logo and brand they have to design around. Franklin invited a full rebrand. That changes the design problem from &ldquo;modernize what exists&rdquo; to &ldquo;decide what this city should look like next.&rdquo;</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Discovery</p>
              <h2 className="cs-section-title">Three directions, one decision</h2>
              <p className="cs-paragraph">For the kickoff I built three concrete brand directions instead of asking the client to describe what they wanted in the abstract. Each direction came with a palette, a reference project, and a one-line philosophy — Heritage Evolved (modernize the seal), Confident Civic (step away from heritage entirely), Distinctive &amp; Warm (lean into the brick downtown and Artcraft Americana).</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Direction A</span>
                  <span className="cs-decision-value">Heritage Evolved — Navy / Gold / Cream. Modernize the existing seal&apos;s vocabulary. Reference: Archbold, OH.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Direction B</span>
                  <span className="cs-decision-value">Confident Civic — Deep Teal / Warm Coral / Soft White. A modern middle, stepping away from heritage navy. Reference: Raymore, MO.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Direction C</span>
                  <span className="cs-decision-value">Distinctive &amp; Warm — Brick Red / Cream / Charcoal. Bold. Lean into the brick downtown and Artcraft Americana. Reference: Westmoreland, NH.</span>
                </div>
              </div>

              <p className="cs-paragraph" style={{ marginTop: 'var(--spacing-m)' }}>Client&apos;s answer was Direction A — but pushed further than I had drawn it. They wanted to keep the modernized civic feel, drop the gold entirely, and lean cooler: blue + teal as primary, with meadow/lime green and warmth as accents. The clock tower (which I had assumed would anchor the logo) was rejected — they felt it represented the county seat, not Franklin specifically. The amphitheater emerged as the strongest icon candidate.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Logo</p>
              <h2 className="cs-section-title">A wordmark first, an arch above, a date below</h2>
              <p className="cs-paragraph">The final mark is a custom geometric sans-serif wordmark, &ldquo;Franklin,&rdquo; with an abstract arch element above and the founding date &ldquo;1823&rdquo; small below. Stacked and horizontal lockups; full color and B&amp;W variants of each.</p>
              <p className="cs-paragraph">The arch is deliberately abstract. Insiders see the amphitheater. Outsiders see a graceful curve. That ambiguity is a feature, not a compromise — it scales for embroidery, prints in a single color, and stays meaningful even when the literal reference fades from public memory. The wordmark, not the icon, leads the identity.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Wordmark</span>
                  <span className="cs-decision-value">Custom geometric sans-serif. Modern proportions, even rhythm, slight character — drawn to feel contemporary without losing civic gravity.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">The arch</span>
                  <span className="cs-decision-value">Abstract amphitheater reference. Reads as architecture, gateway, or framing element depending on context. Designed for ambiguity.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">1823</span>
                  <span className="cs-decision-value">Founding date in modern sans, not a vintage serif. Anchors the identity in history without drifting into pastiche.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Lockups</span>
                  <span className="cs-decision-value">Stacked and horizontal versions, full color and B&amp;W. Tested for sign, vehicle, embroidery, and digital application.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label">Brand Guidelines / Logo, Palette, Typography</p>
            <div className="cs-screens cs-screens--1 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <Image src="/images/cs/franklin/brand-guide.jpg" alt="Franklin Brand and Logo Guide — full identity system showing logo lockups, color palette, and typography" width={1440} height={3707} sizes="(max-width: 768px) 100vw, 928px" />
                </div>
                <figcaption className="cs-screen-caption">Client-facing Brand Guidelines</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--2 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen" style={{ background: '#f3f0ea', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px', padding: '48px' }}>
                <img src="/images/cs/franklin/logo-stacked.svg" alt="Franklin stacked logo lockup, full color" style={{ maxWidth: '70%', maxHeight: '80%' }} />
              </figure>
              <figure className="cs-screen" style={{ background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '320px', padding: '48px' }}>
                <img src="/images/cs/franklin/logo-horizontal.svg" alt="Franklin horizontal logo lockup, full color on white" style={{ maxWidth: '90%', maxHeight: '50%' }} />
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Color System */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Color System</p>
              <h2 className="cs-section-title">Two cool primaries, two warm accents</h2>
              <p className="cs-paragraph">The locked palette is four families — not three, not five. Each runs Light / Main / Dark, giving the system enough range for a full website without sprawl. Blue and Teal carry the primary civic identity; Coral and Honey provide the warmth a small festival-driven city needs.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name" style={{ color: '#053656' }}>Blue · Primary</span>
                  <span className="cs-decision-value">#A8C7DA · #0E5278 · #053656 (Franklin Navy — wordmark color)</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name" style={{ color: '#3A8479' }}>Teal · Primary</span>
                  <span className="cs-decision-value">#97DBAC (Mint — lives in the arch) · #3A8479 · #1F4D45</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name" style={{ color: '#E76F51' }}>Coral · Accent</span>
                  <span className="cs-decision-value">#F5C5B5 · #E76F51 (Sunset Coral) · #B14A2E (Terracotta)</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name" style={{ color: '#B4830C' }}>Honey · Accent</span>
                  <span className="cs-decision-value">#F9E0A6 · #E8B341 · #B4830C — picks up the wood tones in the amphitheater&apos;s glulam beams</span>
                </div>
              </div>

              <p className="cs-paragraph" style={{ marginTop: 'var(--spacing-m)' }}>Coral is Teal&apos;s complement on the color wheel. Honey isn&apos;t arbitrary — it matches the actual wood color of the amphitheater the brand is built around. The system has reasons for itself, not just preferences.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Typography</p>
              <h2 className="cs-section-title">Bricolage Grotesque + DM Sans</h2>
              <p className="cs-paragraph">Heading: <strong>Bricolage Grotesque</strong> — modern grotesque with subtle distinctive character. Body: <strong>DM Sans</strong> — clean, civic-warm, highly readable. Both are Google Fonts, so the system stays accessible to the city&apos;s in-house team without licensing friction. The pairing was tested across hierarchy levels for two-track readability — display weight for festival event titles, regular for code-of-ordinances density.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">System Build</p>
              <h2 className="cs-section-title">Variables, modes, and a guide that updates itself</h2>
              <p className="cs-paragraph">The brand was built as a Figma design system from day one. Color variables grouped by family (<code>Color/Brand/blue-*</code>, <code>teal-*</code>, <code>coral-*</code>, <code>honey-*</code>); font-family variables for heading/body; text styles bound to those font variables. The client-facing Brand Guidelines page is wired into the same system — when a token changes, the guide updates with it. That&apos;s the difference between a brand presentation and a brand system: one is a deliverable, the other keeps working.</p>

              <div className="cs-tools">
                <div className="cs-tool">
                  <p className="cs-tool-name">Variables</p>
                  <p className="cs-tool-desc">Color and font-family variables tied to design system. Renamed mid-project from generic <code>primary/secondary</code> to family names <code>blue/teal/coral/honey</code> for clarity.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Text styles</p>
                  <p className="cs-tool-desc">Heading and body text styles re-bound to local font variables — three legacy library bindings (Inter via shared lib) caught and corrected during the build.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Brand Guidelines page</p>
                  <p className="cs-tool-desc">Client-facing four-section guide (Logo, Color, Typography, About). All values bound to design system tokens — guide stays accurate without manual updates.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Lockup exports</p>
                  <p className="cs-tool-desc">Master <code>.ai</code> source plus four SVG exports — Stacked / Horizontal × Full Color / B&amp;W. Ready for embroidery, signage, vehicle, and digital use.</p>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Status</p>
              <h2 className="cs-section-title">Branding locked. Site in development.</h2>
              <p className="cs-paragraph">The brand identity — logo, palette, typography, and design system — is locked. The website track is in active design, building on the same system. Calendar-before-news (Franklin is event-driven), large hero with featured background video, glass-blur quick links, footer with a phone-directory button instead of a single number, sticky horizontal nav with utility bar above. Target launch: end of 2026.</p>

              <div className="cs-callout">
                <div className="cs-callout-stat">4×</div>
                <div className="cs-callout-text">Four color families, two type families, four logo lockups, one design system that ties them together. Branding locked at first revision. Site track in active design — same system, same tokens, no rework.</div>
              </div>
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
