'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import '@/styles/case-study.css';

export default function CaseStudyPoolPilot() {

  return (
    <>
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main id="main" className="cs-page" style={{ "--cs-accent": "#3ecfd9" } as React.CSSProperties}>
        {/* Hero Section */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">Case Study 01 · Side Project</p>
            <h1 className="cs-title">PoolPilot</h1>
            <p className="cs-subtitle">A self-hosted smart controller for a &quot;dumb&quot; pool pump — reverse-engineered RS-485 protocol, hand-wired ESP32 bridge hardware, and a real-time mobile app with scheduling and energy analytics. Designed, engineered, and shipped end-to-end. It runs the family pool every day.</p>

            <div className="cs-tags">
              <span className="cs-tag">Product Design</span>
              <span className="cs-tag">IoT / Hardware</span>
              <span className="cs-tag">Real-Time UI</span>
              <span className="cs-tag">Full-Stack</span>
              <span className="cs-tag">Self-Hosted</span>
              <span className="cs-tag">AI-Augmented Build</span>
            </div>
          </div>
        </section>

        {/* Content: Overview + Challenge */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">A variable-speed pump with no app, no remote, no API</h2>
              <p className="cs-paragraph">The Pentair SuperFlo VST is a great variable-speed pool pump with one catch — it&apos;s the budget model. No app, no WiFi, no integration story. Control means walking to the equipment pad and pressing buttons on a tiny keypad. Even Pentair&apos;s own smart accessories can&apos;t drive it over its comm port.</p>
              <p className="cs-paragraph">The open-source alternative technically worked, but its dashboard felt like an industrial control panel from 2012 — and it couldn&apos;t actually command this pump. Pool software is a category where nobody has cared about design. That was the opportunity: build the thing I wished existed — consumer-product polish, real scheduling, energy analytics — on top of hardware I&apos;d have to crack open myself.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Challenge</p>
              <h2 className="cs-section-title">First, make the pump talk</h2>
              <p className="cs-paragraph">The pump&apos;s RS-485 protocol is proprietary and undocumented for this model. Getting two-way communication meant building the physical layer from scratch: a $20 aftermarket cable into the pump&apos;s comm port, an ESP32 microcontroller acting as a transparent WiFi-to-RS-485 bridge, and a lot of nights at the equipment pad with a logic probe mentality — sending candidate command frames and listening for anything to come back.</p>
              <p className="cs-paragraph">The bus stayed silent for days. The breakthrough was hardware, not software: the &quot;auto-direction&quot; RS-485 module everyone recommends never actually drove the transmit line. Swapping it for a MAX485 transceiver with an explicit flow-control pin — wired to a GPIO the firmware toggles around each write — brought the bus to life. The pump answered with its first status frame: <em>135 watts, 1,500 RPM</em>. From there I decoded the frame format, mapped the command registers, and wrote a full protocol reference — then ported it all into a typed, unit-tested TypeScript codec.</p>
            </div>
          </div>
        </section>

        {/* Showcase: hardware */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">The Hardware / ESP32 RS-485 Bridge / Wiring</p>
            <div className="cs-screens cs-screens--1 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/poolpilot/wiring-diagram.png" alt="Wiring diagram — ESP32 on expansion board connected to a MAX485 transceiver module with explicit flow-control pin, out to the Pentair pump cable's RS-485 pair" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">ESP32 ↔ MAX485 ↔ pump — the WiFi bridge that finally drove the bus</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Process + Design Decisions */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Process</p>
              <h2 className="cs-section-title">Pad to product</h2>
              <div className="cs-chips">
                <span className="cs-chip">Energy monitoring &amp; baseline analysis</span>
                <span className="cs-chip">RS-485 protocol research</span>
                <span className="cs-chip">ESP32 bridge build &amp; firmware</span>
                <span className="cs-chip">Bus probing — silent for days</span>
                <span className="cs-chip">MAX485 flow-control fix</span>
                <span className="cs-chip">Protocol reference &amp; TypeScript codec</span>
                <span className="cs-chip">Failsafe architecture</span>
                <span className="cs-chip">API + real-time service</span>
                <span className="cs-chip">Mobile-first UI design</span>
                <span className="cs-chip">Self-hosted deploy + CI</span>
              </div>
              <p className="cs-paragraph" style={{ marginTop: '24px' }}>The build was AI-augmented throughout — Claude Code as the engineering pair, me directing architecture, design, and every hardware session at the pad. Once the pump obeyed its first speed command, the entire application — protocol codec, API service, database, and the full UI — was designed, built, and deployed to my home server the same day.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Design Decisions</p>
              <h2 className="cs-section-title">A deep-water instrument panel</h2>
              <p className="cs-paragraph">Pool equipment lives in utility-software land — gray tables, tiny buttons, desktop layouts. PoolPilot went the other way: a dark, glowing, thumb-first instrument panel that feels closer to a premium EV dashboard than a sprinkler timer.</p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Signature control</span>
                  <span className="cs-decision-value">A radial RPM slider built for thumbs — drag the glowing arc, feel haptic ticks, and the setpoint applies on release after a short debounce. One gesture replaces the keypad&apos;s button-mashing.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Presets over numbers</span>
                  <span className="cs-decision-value">Eco, Clean, and Boost chips map pump speeds to intents. Nobody thinks in RPM — they think &quot;the pool guy is coming&quot; or &quot;party tomorrow.&quot;</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Schedule as a timeline</span>
                  <span className="cs-decision-value">The daily plan is a 24-hour color-coded bar — speed bands you can read at a glance, with a live cursor showing what the pump is doing right now. Editable presets (Summer, Maintenance, Vacation) switch with one tap.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Energy translated to dollars</span>
                  <span className="cs-decision-value">Telemetry is stored in a time-series database and surfaced as what owners actually ask: cost today, kWh this week, water turnovers, projected monthly bill — not raw watt logs.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Optimistic, honest UI</span>
                  <span className="cs-decision-value">Controls react instantly and the server&apos;s authoritative state confirms a beat later. The status pill never lies — Connected means a real socket to a real pump.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Fail back to dumb</span>
                  <span className="cs-decision-value">The pump&apos;s onboard schedule is the safe baseline. App overrides are transient, sustained only by a keep-alive heartbeat — if the app, server, or bridge dies, the pump reverts to its own schedule. The physical Start/Stop button always wins.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase: app screens */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">The Product / Production UI / iPhone</p>
            <div className="cs-screens cs-screens--phones animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/poolpilot/live.png" alt="PoolPilot Live screen — glowing radial RPM slider at 1,500 RPM, Eco/Clean/Boost presets, active Summer schedule card, and twin speed and power gauges" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Live — radial control + gauges</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/poolpilot/schedule.png" alt="PoolPilot Schedule screen — 24-hour color-coded timeline with live cursor, and Summer, Maintenance, and Vacation presets with one-tap Use buttons" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Schedule — timeline + presets</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/poolpilot/energy.png" alt="PoolPilot Energy screen — cost and kWh stat cards, power-draw area chart, and energy-per-hour bars" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Energy — cost &amp; turnover analytics</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/poolpilot/settings.png" alt="PoolPilot Settings screen — failsafe explainer, system poll and keep-alive readouts, bridge status, and pool volume and rate facts" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Settings — failsafe &amp; system</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Stack + Outcome */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Stack</p>
              <h2 className="cs-section-title">Hardware to pixels, all of it mine</h2>
              <div className="cs-tools">
                <div className="cs-tool">
                  <div className="cs-tool-name">ESP32 + ESPHome</div>
                  <div className="cs-tool-desc">Transparent WiFi-to-RS-485 bridge at the equipment pad — MAX485 transceiver with GPIO flow control, flashed over-the-air.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Pentair RS-485 Protocol</div>
                  <div className="cs-tool-desc">Reverse-engineered command and status frames, documented as a reference, implemented as a unit-tested TypeScript codec.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Fastify + Socket.IO</div>
                  <div className="cs-tool-desc">Node service that owns the bus — command queue, poller, scheduler, keep-alive engine, watchdog, and authenticated real-time telemetry. A tiny failover proxy holds the bridge connection so redeploys are invisible to the pump.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">TimescaleDB</div>
                  <div className="cs-tool-desc">Time-series Postgres for telemetry history — powers the energy charts, cost math, and turnover model. The app degrades gracefully without it.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Next.js + Tailwind</div>
                  <div className="cs-tool-desc">Mobile-first PWA with custom gauges, the radial slider, and motion-driven micro-interactions. Includes a full demo mode that simulates the pump.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Self-Hosted Deploy</div>
                  <div className="cs-tool-desc">Docker Compose on my home server behind Traefik with auto-SSL — push to main, and a self-hosted GitHub Actions runner triggers the rebuild.</div>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Outcome</p>
              <h2 className="cs-section-title">The daily driver for an actual pool</h2>
              <p className="cs-paragraph">PoolPilot has run our pool since the day it shipped — schedules executing on time, energy history accumulating, and pump control from anywhere on a phone. It replaced both the keypad ritual and the open-source dashboard, and it&apos;s the proof point I care most about as a designer: I can take a product from &quot;the hardware won&apos;t even talk&quot; to a polished, live, self-hosted app people actually use.</p>

              <div className="cs-callout">
                <div className="cs-callout-stat">5s</div>
                <div className="cs-callout-text">The keep-alive heartbeat that sustains every override. If the app, server, or bridge dies, the pump falls back to its onboard schedule on its own — no stuck states, no dead pool. Safety isn&apos;t a feature here; it&apos;s the architecture.</div>
              </div>

              <div className="cs-figma-wrapper">
                <a href="https://github.com/MattGHicks/pool-app" target="_blank" rel="noopener" className="cs-figma-btn cs-github-btn">
                  <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                  View the Code on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Next Case Study */}
        <section className="cs-next animate-on-scroll">
          <div className="cs-next-container">
            <p className="cs-next-label">Next Case Study</p>
            <Link href="/case-study/r6" className="cs-next-link">
              <span className="cs-next-title">R6 Regional Council, Utah</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
