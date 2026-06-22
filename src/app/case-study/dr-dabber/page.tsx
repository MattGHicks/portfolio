'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import PhoneMock from '@/components/PhoneMock';
import LiveDemo from '@/components/LiveDemo';
import { DR_DABBER } from '@/lib/case-studies';
import '@/styles/case-study.css';

export default function CaseStudyDrDabber() {
  useEffect(() => {
    document.title = 'Dr. Dabber — Matt Hicks';
  }, []);

  return (
    <>
      <Navigation isHomepage={false} />
      <ScrollAnimations />

      <main>
        {/* Hero */}
        <section className="cs-hero">
          <div className="cs-hero-container">
            <Link href="/#work" className="cs-back">
              <svg viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to work
            </Link>

            <p className="cs-label">Speculative Concept · Unsolicited Redesign</p>
            <h1 className="cs-title">Dr. Dabber</h1>
            <p className="cs-subtitle">
              A speculative redesign of the companion app for the Dr. Dabber e-rig
              I actually own. I love the hardware, so I explored how the app could
              lean even harder into what makes it special — light. A living Aurora
              Core that glows with the heat, strain LED themes that recolor the
              entire UI, real heating modes, and a command-center home — all wired
              to a simulated device you can drive in the browser. A concept and a
              love letter, not client work.
            </p>

            <div className="cs-tags">
              <span className="cs-tag">Product Design</span>
              <span className="cs-tag">Interaction Design</span>
              <span className="cs-tag">Brand</span>
              <span className="cs-tag">Front-End</span>
              <span className="cs-tag">Motion</span>
            </div>

            <p className="cs-private-note">
              Private concept — shared directly with the Dr. Dabber team, not
              published on my public site. Unofficial; not affiliated with or
              endorsed by Dr. Dabber.
            </p>
          </div>
        </section>

        {/* Opportunity + Problems */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Opportunity</p>
              <h2 className="cs-section-title">
                I love this device — and saw room to dream.
              </h2>
              <p className="cs-paragraph">
                The Dr. Dabber is a genuinely premium piece of hardware — sharp
                industrial design, a gorgeous programmable LED light ring, and a brand
                with real polish. I use mine constantly. This is a love letter to it:
                an exploration of how far the companion experience{' '}
                <em>could</em> go if it leaned all the way into what makes the device
                special — the version I&apos;d be thrilled to find in the box.
              </p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Where I Focused</p>
              <h2 className="cs-section-title">
                Three ways to let the app shine as bright as the device.
              </h2>
              <p className="cs-paragraph">
                I zeroed in on three opportunities. The home screen — a beautiful
                product shot today — could double as a living command center with
                live status and one-tap control. A few favorite controls sit a swipe
                away, so I brought them front-and-center to make them easy to reach.
                And the cinematic, electric-cyan world of drdabber.com could carry all
                the way into the app, so the software feels as premium as the site and
                the hardware.
              </p>
              <p className="cs-paragraph">
                None of this is a knock on what&apos;s there — it&apos;s about
                amplifying a product I already love.
              </p>
            </div>
          </div>
        </section>

        {/* Hero trio */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">The Concept / Aurora Core / Dynamic LED Theming</p>
            <div className="cs-phone-hero animate-on-scroll">
              <PhoneMock variant="left" src="/images/cs/dr-dabber/session.png" alt="Session screen — the Aurora Core mid-heat with a live temperature ring climbing toward the setpoint and a Dab Now countdown" />
              <PhoneMock variant="center" src="/images/cs/dr-dabber/home.png" alt="Home command center — the living Aurora Core orb, one-tap start, live status, a quick-start profile row, and usage stats" />
              <PhoneMock variant="right" src="/images/cs/dr-dabber/light-studio.png" alt="Light Studio — strain LED themes; selecting one washes the entire app in its color" />
            </div>
          </div>
        </section>

        {/* Approach + Design Decisions */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Approach</p>
              <h2 className="cs-section-title">Make the light the soul of the app.</h2>
              <p className="cs-paragraph">
                The device&apos;s defining feature is its glowing LED ring — so I made
                glow the organizing idea of the whole experience, then pulled the
                brand straight off drdabber.com so the app reads as a true extension
                of the product, not a different one.
              </p>

              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Aurora Core</span>
                  <span className="cs-decision-value">A living, breathing orb of light is the home hero. Live temperature drives its color and intensity in real time — cool brand-cyan at rest, ramping to white-hot, amber, then ember at peak — and it morphs into the session view as you heat up.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Dynamic LED theming</span>
                  <span className="cs-decision-value">Pick a strain theme in Light Studio — Cali Sunset, Purple Haze, Miami Vice — and the entire app washes into that color. The signature feature of the hardware becomes the signature feature of the interface.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Heating modes</span>
                  <span className="cs-decision-value">Each vapor profile carries a heating curve — Descent, Steady, Ascent, Hill, Valley — drawn as its own icon. You pick an intent, not a single setpoint, and the device ramps on a tuned profile.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">A real home + real navigation</span>
                  <span className="cs-decision-value">A command center with one-tap start, live status, and a quick-start profile row replaces the static photo. A persistent bottom tab bar replaces the swipe-up sheet — every screen is one thumb-tap away.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Brand-exact</span>
                  <span className="cs-decision-value">Pulled from drdabber.com: the exact electric cyan (#00E2ED), a wide Druk-style display face, sharp flat geometry, and cinematic darkness. The app finally looks like it belongs to the product.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Device grid */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">The Product / Seven Screens / iPhone</p>
            <div className="cs-screens cs-screens--devices animate-on-scroll">
              <PhoneMock src="/images/cs/dr-dabber/connect.png" alt="Connect screen — pairing the device with the Aurora Core and a Bluetooth glyph" caption="Connect — pairing" />
              <PhoneMock src="/images/cs/dr-dabber/profiles.png" alt="Vapor Profiles — editable temperature, hold-time, and heating-mode presets" caption="Profiles — editable presets" />
              <PhoneMock src="/images/cs/dr-dabber/stats.png" alt="Stats — usage analytics with session trends and a temperature breakdown" caption="Stats — usage analytics" />
              <PhoneMock src="/images/cs/dr-dabber/device.png" alt="Device — settings, battery, firmware, serial, and preferences" caption="Device — settings & status" />
            </div>
          </div>
        </section>

        {/* Build / Stack */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Build</p>
              <h2 className="cs-section-title">A simulated device you can actually drive.</h2>
              <p className="cs-paragraph">
                To make a concept feel real, I built a working device simulation — no
                Bluetooth, no backend, but a model that heats, cools, drains battery,
                and runs sessions in real time. Everything on the page is live.
              </p>

              <div className="cs-tools">
                <div className="cs-tool">
                  <div className="cs-tool-name">Next.js + React</div>
                  <div className="cs-tool-desc">App Router, TypeScript, deployed on Vercel. Full-bleed on a phone, device-framed on desktop.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Framer Motion</div>
                  <div className="cs-tool-desc">Drives the Aurora Core, the screen transitions, and the shared-element morph from the home orb into the session view.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Zustand + rAF tick loop</div>
                  <div className="cs-tool-desc">A single store models the simulated device; a requestAnimationFrame loop ramps temperature, drains battery, and runs sessions frame by frame.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Recharts</div>
                  <div className="cs-tool-desc">Powers the usage analytics — session history over time and a temperature distribution.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Brand-exact tokens</div>
                  <div className="cs-tool-desc">Color, type, and geometry lifted from drdabber.com and expressed as a dark-mode design system.</div>
                </div>
                <div className="cs-tool">
                  <div className="cs-tool-name">Archivo + Inter</div>
                  <div className="cs-tool-desc">Free stand-ins for the brand&apos;s licensed Druk Wide / Aeonik Pro — swap to the licensed faces for a pixel-perfect match.</div>
                </div>
              </div>

              <div className="cs-callout">
                <div className="cs-callout-stat">7</div>
                <div className="cs-callout-text">Fully-built, interactive screens — Connect, Home, Session, Vapor Profiles, Light Studio, Stats, and Device — all driven by one simulated device model. A concept you can use, not a slideshow.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Live */}
        <LiveDemo
          liveUrl={DR_DABBER.liveUrl}
          repoUrl={DR_DABBER.repoUrl}
          poster="/images/cs/dr-dabber/home.png"
        />

        {/* Next */}
        <section className="cs-next animate-on-scroll">
          <div className="cs-next-container">
            <p className="cs-next-label">Next Case Study</p>
            <Link href="/case-study/poolpilot" className="cs-next-link">
              <span className="cs-next-title">PoolPilot</span>
              <span className="cs-next-arrow">&#8599;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
