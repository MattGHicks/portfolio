'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import '@/styles/case-study.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollAnimations from '@/components/ScrollAnimations';
import NoiseOverlay from '@/components/NoiseOverlay';

export default function SystemAIWorkflow() {
  useEffect(() => {
    document.title = 'AI-Augmented Design Workflow — Matt Hicks';
  }, []);

  return (
    <>
      <NoiseOverlay />
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

            <p className="cs-label">System 02</p>
            <h1 className="cs-title">AI-Augmented<br />Design Workflow</h1>
            <p className="cs-subtitle">Building a personal AI-native design system — Claude Code, Figma AI, MCP servers, and Make automations working in concert. Multi-hour tasks reduced to minutes.</p>

            <div className="cs-tags">
              <span className="cs-tag">Claude Code</span>
              <span className="cs-tag">Figma AI</span>
              <span className="cs-tag">MCP Servers</span>
              <span className="cs-tag">Make Automations</span>
              <span className="cs-tag">Workflow Design</span>
              <span className="cs-tag">AI Tools</span>
            </div>
          </div>
        </section>

        {/* Content: Overview */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Overview</p>
              <h2 className="cs-section-title">AI as a design multiplier</h2>
              <p className="cs-paragraph">This isn&apos;t about replacing design thinking — it&apos;s about removing the friction between thinking and doing. I&apos;ve built an AI-augmented workflow that handles the mechanical parts of design work so I can focus on the decisions that actually matter.</p>
              <p className="cs-paragraph">The system connects Claude Code, Figma&apos;s AI features, MCP servers, and Make automations into a cohesive workflow. Tasks that used to take hours — writing design documentation, generating content variations, building presentation decks — now take minutes.</p>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">The Stack</p>
              <h2 className="cs-section-title">Tools working in concert</h2>
              <p className="cs-paragraph">Each tool in the stack has a specific role. Claude Code handles code generation and complex reasoning. Figma AI assists with design variations and asset generation. MCP servers connect everything to external data sources. Make orchestrates the automations that tie it all together.</p>
              <div className="cs-tools">
                <div className="cs-tool">
                  <p className="cs-tool-name">Claude Code</p>
                  <p className="cs-tool-desc">Primary AI assistant for code generation, documentation writing, and complex multi-step reasoning tasks.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Figma AI</p>
                  <p className="cs-tool-desc">Design-specific AI for generating variations, suggesting improvements, and accelerating visual iteration.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">MCP Servers</p>
                  <p className="cs-tool-desc">Model Context Protocol servers that connect Claude to Figma files, project folders, and external APIs.</p>
                </div>
                <div className="cs-tool">
                  <p className="cs-tool-name">Make Automations</p>
                  <p className="cs-tool-desc">Workflow automation platform that orchestrates multi-step processes across tools and services.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Showcase */}
        <section className="cs-showcase">
          <div className="cs-showcase-container">
            <p className="cs-showcase-label animate-on-scroll">Workflow / Tools / Automations</p>
            <div className="cs-screens cs-screens--2 animate-on-scroll">
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/ai-workflow/claude-code.png" alt="Claude Code in VS Code — AI assistant generating code and making edits in real-time" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Claude Code in VS Code</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/ai-workflow/ai-tasks.png" alt="AI task management interface — organizing and executing multi-step design workflows" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">AI Task Management</figcaption>
              </figure>
            </div>
            <div className="cs-screens cs-screens--2 animate-on-scroll" style={{ marginTop: '24px' }}>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/ai-workflow/figma-ai.png" alt="Figma AI generating website designs — from prompt to visual in seconds" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Figma AI Generation</figcaption>
              </figure>
              <figure className="cs-screen">
                <div className="cs-screen-img">
                  <img src="/images/cs/ai-workflow/claude-docs.png" alt="Claude Code generating design documentation — automated specs and presentation content" loading="lazy" />
                </div>
                <figcaption className="cs-screen-caption">Documentation Generation</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* Content: Workflows */}
        <section className="cs-content">
          <div className="cs-content-container">
            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Workflows</p>
              <h2 className="cs-section-title">What actually gets automated</h2>
              <p className="cs-paragraph">The goal isn&apos;t to automate everything — it&apos;s to automate the right things. Repetitive tasks, boilerplate generation, and mechanical transformations are perfect candidates. Creative decisions, client communication, and strategic thinking stay human.</p>
              <div className="cs-chips">
                <span className="cs-chip">Design documentation</span>
                <span className="cs-chip">Content generation</span>
                <span className="cs-chip">Presentation decks</span>
                <span className="cs-chip">Asset export</span>
                <span className="cs-chip">Spec handoff</span>
                <span className="cs-chip">Code scaffolding</span>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Examples</p>
              <h2 className="cs-section-title">Real workflows, real time savings</h2>
              <div className="cs-decisions">
                <div className="cs-decision">
                  <span className="cs-decision-name">Design Docs</span>
                  <span className="cs-decision-value">Claude Code reads Figma files via MCP, generates comprehensive design documentation, and formats it for Redmine. 2+ hours → 10 minutes.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Presentations</span>
                  <span className="cs-decision-value">Design presentations with client-specific talking points, generated from the Figma file structure and project brief. 1 hour → 5 minutes.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Content Variants</span>
                  <span className="cs-decision-value">Generate multiple content variations for hero sections, CTAs, and page descriptions. Test different approaches without manual rewriting.</span>
                </div>
                <div className="cs-decision">
                  <span className="cs-decision-name">Code Export</span>
                  <span className="cs-decision-value">Export Figma designs to production-ready HTML/CSS with proper variable usage and responsive breakpoints baked in.</span>
                </div>
              </div>
            </div>

            <div className="cs-section animate-on-scroll">
              <p className="cs-section-label">Philosophy</p>
              <h2 className="cs-section-title">Augmentation, not replacement</h2>
              <p className="cs-paragraph">The point of this system isn&apos;t to remove the designer from the process — it&apos;s to remove the friction. When mechanical tasks take minutes instead of hours, there&apos;s more time for the work that actually requires human judgment: understanding client needs, making strategic decisions, and crafting experiences that connect with people.</p>
              <p className="cs-paragraph">AI tools are multipliers. They amplify what you can do, but they don&apos;t replace what you know. The designer who understands both the tools and the craft will always outperform the one who relies on either alone.</p>

              <div className="cs-callout">
                <span className="cs-callout-icon">&#9889;</span>
                <div className="cs-callout-content">
                  <h3 className="cs-callout-title">The meta example</h3>
                  <p className="cs-callout-text">This portfolio site was designed in Figma and implemented entirely with Claude Code. The case study pages, the animations, the responsive behavior — all generated through the same AI-augmented workflow described here.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next */}
        <section className="cs-next animate-on-scroll">
          <div className="cs-next-container">
            <p className="cs-next-label">View Case Studies</p>
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
