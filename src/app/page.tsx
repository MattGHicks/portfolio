"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollAnimations from "@/components/ScrollAnimations";
import ArrowIcon from "@/components/ArrowIcon";

export default function HomePage() {
  // Parallax hero effect + gradient drift on scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;

          // Hero parallax
          const hero = document.querySelector<HTMLElement>(".hero-container");
          if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.15}px)`;
            hero.style.opacity = String(1 - (scrolled / window.innerHeight) * 0.5);
          }

          // Gradient drift on scroll - subtle left/right movement
          const gradientOffset = Math.sin(scrolled * 0.003) * 30;
          document.documentElement.style.setProperty(
            "--gradient-offset",
            `${gradientOffset}px`
          );

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleClick = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleClick);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <>
      <ScrollAnimations />

      {/* Page Wrapper */}
      <div className="page-wrapper">
        {/* Global Blue Gradient */}
        <div className="global-gradient"></div>

        {/* Navigation */}
        <Navigation isHomepage />

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-badge">
              <div className="hero-badge-icon">
                <span>F</span>
              </div>
              <span className="hero-badge-text">PORTFOLIO &middot; 2026</span>
            </div>

            <div className="hero-status">
              <div className="status-dot"></div>
              <span className="status-text">
                This design was created from scratch in Figma using my own design
                system and implemented with Claude Code.{" "}
                <a
                  href="https://www.figma.com/design/3eLWiZoQFS1t1keE0nxsAv/Portfolio-Site?node-id=8-30198&t=TlOSSIcbf8FNlPwQ-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Here
                </a>
              </span>
            </div>

            <div className="hero-heading">
              <h1 className="hero-name">Matt</h1>
              <h1 className="hero-name">Hicks</h1>
            </div>

            <p className="hero-description">
              <strong>UI/UX Designer</strong>
              <span>
                {" "}
                fluent in Figma — design systems, AI-augmented workflows, and 170+
                shipped government websites. Based in Tampa, FL. Available remote.
              </span>
            </p>

            <div className="hero-actions">
              <a href="#work" className="btn btn-primary">
                View Work
              </a>
              <a href="#" className="btn btn-secondary">
                Download Resume
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="hero-scroll">
            <div className="scroll-line"></div>
            <span className="scroll-text">SCROLL</span>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects" id="work">
          <div className="projects-container">
            <div className="section-header animate-on-scroll">
              <span className="section-label">Selected Work</span>
              <span className="section-label">05 Case Studies</span>
            </div>

            <div className="projects-grid">
              {/* Featured Project */}
              <Link
                href="/case-study/r6"
                className="project-card project-card--full animate-on-scroll"
              >
                <div className="project-meta">
                  <span className="project-case">Case / 01</span>
                  <span className="project-type">Gov &middot; Regional Planning</span>
                </div>
                <h3 className="project-title">R6 Regional Council, Utah</h3>
                <p className="project-description">
                  Complete website redesign for a Central Utah regional government
                  body — building a brand color palette from scratch, crafting a clean
                  Apple-inspired layout, and designing a mega menu that makes complex
                  navigation feel simple.
                </p>
                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Brand Color</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Visual Design</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">ADA</span>
                  </div>
                  <div className="project-arrow">
                    <ArrowIcon stroke="#79746b" />
                  </div>
                </div>
              </Link>

              {/* Row 2 */}
              <Link
                href="/case-study/archbold"
                className="project-card animate-on-scroll stagger-1"
              >
                <div className="project-meta">
                  <span className="project-case">Case / 02</span>
                  <span className="project-type">Gov &middot; Visual Design</span>
                </div>
                <h3 className="project-title">Archbold, Ohio</h3>
                <p className="project-description">
                  Government website redesign for a small northwest Ohio village —
                  transforming a cluttered, overlapping layout into a clean, confident
                  design built around their navy and gold brand, a grid calendar their
                  residents actually asked for, and navigation that doesn&apos;t require a
                  map to use.
                </p>
                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Visual Design</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Calendar UX</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">ADA</span>
                  </div>
                  <div className="project-arrow">
                    <ArrowIcon stroke="#79746b" />
                  </div>
                </div>
              </Link>

              <Link
                href="/case-study/south-fork"
                className="project-card animate-on-scroll stagger-2"
              >
                <div className="project-meta">
                  <span className="project-case">Case / 03</span>
                  <span className="project-type">
                    Utility &middot; Visual Design
                  </span>
                </div>
                <h3 className="project-title">South Fork Water, Oregon</h3>
                <p className="project-description">
                  Website redesign for a wholesale water authority serving Oregon City
                  and West Linn — designed around their &quot;simplicity is
                  brilliant&quot; philosophy and the natural heritage of the Clackamas
                  River headwaters. Pure water since 1915.
                </p>
                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Brand Guidelines</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Visual Design</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">ADA</span>
                  </div>
                  <div className="project-arrow">
                    <ArrowIcon stroke="#79746b" />
                  </div>
                </div>
              </Link>

              {/* Row 3 */}
              <Link
                href="/case-study/clive"
                className="project-card animate-on-scroll stagger-1"
              >
                <div className="project-meta">
                  <span className="project-case">Case / 04</span>
                  <span className="project-type">Gov &middot; Multi-Site</span>
                </div>
                <h3 className="project-title">City of Clive, Iowa</h3>
                <p className="project-description">
                  Multi-site redesign for a city whose identity is literally nature —
                  three distinct but cohesive sites for City Hall, the Public Library,
                  and Parks &amp; Recreation built around the Greenbelt trail system
                  that defines Clive.
                </p>
                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Multi-Site</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Visual Design</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Navigation</span>
                  </div>
                  <div className="project-arrow">
                    <ArrowIcon stroke="#79746b" />
                  </div>
                </div>
              </Link>

              <Link
                href="/case-study/temple"
                className="project-card animate-on-scroll stagger-2"
              >
                <div className="project-meta">
                  <span className="project-case">Case / 05</span>
                  <span className="project-type">Gov &middot; Visual Design</span>
                </div>
                <h3 className="project-title">Temple, Texas</h3>
                <p className="project-description">
                  Large city website redesign across three sub-sites — five revision
                  cycles, mobile-first design exports, and coordinated design for City
                  Hall, the Public Library, and Parks &amp; Recreation. A masterclass
                  in client iteration.
                </p>
                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Multi-Site</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Mobile</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Iteration</span>
                  </div>
                  <div className="project-arrow">
                    <ArrowIcon stroke="#79746b" />
                  </div>
                </div>
              </Link>
            </div>

            {/* Systems Section */}
            <div className="section-header animate-on-scroll">
              <span className="section-label">Systems &amp; Process</span>
              <span className="section-label">02 Projects</span>
            </div>

            <div className="projects-grid">
              <Link
                href="/system/revize"
                className="project-card animate-on-scroll stagger-1"
              >
                <div className="project-meta">
                  <span className="project-case">System / 01</span>
                  <span className="project-type">Design Systems</span>
                </div>
                <h3 className="project-title">Revize Design System</h3>
                <p className="project-description">
                  The Figma component library behind 170+ government websites — built
                  for consistency, speed, and the team&apos;s ability to scale without
                  rebuilding from scratch every time.
                </p>
                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Variables</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Tokens</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Modes</span>
                  </div>
                  <div className="project-arrow">
                    <ArrowIcon stroke="#79746b" />
                  </div>
                </div>
              </Link>

              <Link
                href="/system/ai-workflow"
                className="project-card animate-on-scroll stagger-2"
              >
                <div className="project-meta">
                  <span className="project-case">System / 02</span>
                  <span className="project-type">AI &middot; Workflow</span>
                </div>
                <h3 className="project-title">
                  AI-Augmented Design Workflow
                </h3>
                <p className="project-description">
                  Building a personal AI-native design system — Claude Code, Figma AI,
                  MCP servers, and Make automations working in concert. Multi-hour
                  tasks reduced to minutes.
                </p>
                <div className="project-footer">
                  <div className="project-tags">
                    <span className="project-tag">Claude Code</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">Figma AI</span>
                    <span className="project-tag-sep">&middot;</span>
                    <span className="project-tag">MCP</span>
                  </div>
                  <div className="project-arrow">
                    <ArrowIcon stroke="#79746b" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about" id="about">
          <div className="about-container">
            <div className="about-content">
              <h2 className="about-heading animate-on-scroll">
                Design
                <br />
                that lives
                <br />
                <span>
                  inside
                  <br />
                  Figma
                </span>
              </h2>
              <p className="about-text animate-on-scroll stagger-1">
                I&apos;m a UI/UX designer who spends most of his day in Figma —
                building systems, not just screens. I design with{" "}
                <strong>variables</strong>, <strong>tokens</strong>, and{" "}
                <strong>modes</strong> baked in from the start so that the work is
                maintainable, scalable, and developer-ready.
              </p>
              <p className="about-text animate-on-scroll stagger-2">
                At Revize Software Systems, I led visual design across{" "}
                <strong>170+ government website projects</strong>, built and
                maintained the company&apos;s Figma component library, and overhauled
                how our team uses AI tools to move faster without losing quality.
              </p>
              <p className="about-text animate-on-scroll stagger-3">
                I&apos;m looking for a role where Figma is a first-class tool — on a
                product team that cares about design systems, accessibility, and
                shipping real work.
              </p>
              <div className="about-award animate-on-scroll stagger-4">
                <svg viewBox="0 0 11 10" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 0L6.7 3.8H10.7L7.5 6.2L8.7 10L5.5 7.6L2.3 10L3.5 6.2L0.3 3.8H4.3L5.5 0Z" />
                </svg>
                <span>
                  2024 Horizon Interactive Gold Award — City of Golden, CO
                </span>
              </div>
            </div>

            <div className="about-stats">
              <div className="stat-card animate-on-scroll stagger-1">
                <div className="stat-number">3+</div>
                <div className="stat-content">
                  <div className="stat-label">Years of experience in Figma</div>
                  <div className="stat-detail">
                    Design Systems &middot; Components &middot; Auto Layout &middot;
                    Dev Mode &middot; Variables &middot; Prototyping
                  </div>
                </div>
              </div>

              <div className="stat-card animate-on-scroll stagger-2">
                <div className="stat-number">170+</div>
                <div className="stat-content">
                  <div className="stat-label">Government websites shipped</div>
                  <div className="stat-detail">
                    From discovery through developer handoff
                  </div>
                </div>
              </div>

              <div className="stat-card animate-on-scroll stagger-3">
                <div className="stat-number">Gold</div>
                <div className="stat-content">
                  <div className="stat-label">
                    2024 Horizon Interactive Award
                  </div>
                  <div className="stat-detail">
                    City of Golden, CO — lead designer, end-to-end
                  </div>
                </div>
              </div>

              <div className="stat-card animate-on-scroll stagger-4">
                <div className="stat-number">4+</div>
                <div className="stat-content">
                  <div className="stat-label">AI tools in daily workflow</div>
                  <div className="stat-detail">
                    Claude &middot; Figma AI &middot; MCP &middot; Make
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <div className="contact-container">
            <div className="contact-content animate-on-scroll">
              <h2 className="contact-heading">
                Let&apos;s work
                <br />
                together.
              </h2>
              <p className="contact-subtext">
                Open to full-time product designer roles.
                <br />
                Remote preferred, Tampa area also open.
              </p>
            </div>

            <div className="contact-links">
              <a
                href="mailto:matt@digitalfish.io"
                className="contact-link animate-on-scroll stagger-1"
              >
                <span className="contact-link-label">Email</span>
                <span className="contact-link-value">matt@digitalfish.io</span>
              </a>
              <a
                href="https://linkedin.com/in/matthicksfl"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link animate-on-scroll stagger-2"
              >
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">
                  linkedin.com/in/matthicksfl
                </span>
              </a>
              <a
                href="https://www.instagram.com/matthks/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link animate-on-scroll stagger-3"
              >
                <span className="contact-link-label">Instagram</span>
                <span className="contact-link-value">instagram.com/matthks</span>
              </a>
              <a
                href="https://digitalfish.io"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link animate-on-scroll stagger-4"
              >
                <span className="contact-link-label">Site</span>
                <span className="contact-link-value">digitalfish.io</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
