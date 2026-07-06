# Portfolio

> Matt's personal design portfolio — case studies, design system work, and AI workflow showcases.

## Status
- **Stage:** live + actively updated
- **Deployed:** [digitalfish.io](https://digitalfish.io) on Vercel
- **Auto-deploy:** yes (push to `main` → Vercel)
- **Latest production deploy:** 2026-06-09 (`f586665` — PoolPilot case study + homepage "Designed & Built" section)

## What This Is
Matt's personal portfolio site **plus** the password-protected `/admin` Career Ops dashboard. Public side: case studies (Revize municipal sites — South Fork, Brewster, Clive, Archbold, R6, Franklin), design-system showcase, AI workflow section, awards list, resume PDF download. Admin side: end-to-end job-search pipeline (Postgres-backed pipeline, Gmail polling, daily digest, GitHub Actions auto-submit). See `DASHBOARD-DEPLOY.md` for the admin deploy notes and the Obsidian vault `career/system-design-v2.md` for the architecture.

## Stack
- **Frontend:** Next.js 14 (App Router), TypeScript, React 18 — no CSS framework (Tailwind removed 2026-07; tokens are hand-written CSS custom properties)
- **Design system ("Working Drawing," 2026-07 redesign):** tokens in `src/styles/tokens.css` (ink `#0d0f10`, hairlines, drafting-pen accent `#ff4b21`, per-case-study `--cs-accent`), Archivo (variable, `wdth` axis) + IBM Plex Mono via `next/font`, GSAP + Lenis (`SmoothScrollProvider`, `/admin` passthrough, reduced-motion kill)
- **Public portfolio:** static — no CMS, no backend; OG cards build-time rendered via `next/og` (`src/lib/og.tsx`)
- **/admin dashboard:** Drizzle ORM + Postgres (local for dev, Neon via Vercel Marketplace for prod), Gmail API (`googleapis`) for inbox poll + digest send, `jose` for session cookies, Vercel Cron for scheduled jobs, GitHub Actions + Playwright for submission
- **Deployment:** Vercel (auto-deploy on push to `main`)

## Project Structure
```
portfolio/
  src/
    app/
      case-study/         # 9 studies; each dir: page.tsx + layout.tsx (metadata) + opengraph-image.tsx
      system/             # design system / process pages (revize, ai-workflow)
    components/
      home/               # homepage sections (Hero, ProofLine, FlagshipWork, PracticeIndex, ...)
    data/
      work.ts             # unified work model: tier (flagship/archive/system), hooks, accents
      awards.ts           # Horizon awards (single source for proof line + About)
    styles/
      tokens.css          # Working Drawing tokens (single source of truth)
      base.css            # reset (carries former Tailwind preflight rules)
      chrome.css          # nav + footer
      home.css            # homepage sections
      case-study.css      # interior layout + Working Drawing cascade (bottom of file)
  public/
    images/cs/            # case study screenshots (organized by project)
  _html-source/           # original HTML mockups (reference only — don't edit)
```

## Key Conventions
- **Design first** — this is a design portfolio. Every page should look polished before shipping.
- **Images:** Case study images in `public/images/cs/[project-name]/`
- **Static only:** No server components needed — everything can be static/client
- **`_html-source/`:** Reference material only. Do not modify.

## Design Principles
- This IS the design showcase — it needs to be exceptional
- **Working Drawing direction:** the site presents itself as its own living spec — hero annotations show TRUE runtime-measured values (`getComputedStyle` after `fonts.ready`); annotations must stay true, never decorative
- Dark throughout; hairline rules, no rounded cards/shadows/glows; two faces (Archivo display + IBM Plex Mono for labels/data); one accent per page
- **No AI-tells:** no letterspaced all-caps labels, no chips/pills, no floating cards; mono sentence-case labels only
- Work tiers: 4 flagships (PoolPilot, Dr. Dabber, AI1, Franklin) get deep studies; 5 gov studies are condensed archive; concepts lead demo-first
- Mobile-responsive + `prefers-reduced-motion` first-class

## Active Work
- [ ] Watch first DRY-RUN submission complete (Hugging Face, app id 16, dispatched 2026-05-27) → verify screenshots → flip `DRY_RUN=false` in `.github/workflows/submit-application.yml`
- [ ] Add more case studies as Revize projects approve

## Off Limits
- Don't edit anything in `_html-source/` — it's a reference archive
- Don't add a backend to the **public** routes — keep them fully static. The `/admin` route group is the documented exception; do not bleed DB/server logic into public pages.

---

## Obsidian Vault Workflow

This project is connected to a persistent knowledge base via the Obsidian MCP server.

### End of Session Routine
When the session is wrapping up, or when asked to "update vault":
1. **Update project note** — Update `projects/portfolio.md` in the Obsidian vault with:
   - Current project status
   - What was built or changed this session
   - Any blockers or open questions
2. **Write session log** — Create or append to `logs/{YYYY-MM-DD}.md` in the vault with:
   - Project name
   - Summary of work done
   - Key decisions made
   - Time spent (if mentioned)
3. **Save patterns** — If a reusable technical pattern was discovered or a non-obvious solution was found, save it to `patterns/{descriptive-name}.md` in the vault with the problem, solution, and which project it came from
4. **Save decisions** — If a significant architecture or tool decision was made, save it to `decisions/{YYYY-MM-descriptive-name}.md` in the vault with the context, options considered, and rationale

### Cross-Project Context
If you need context from other projects or past sessions, query the Obsidian vault using the MCP tools. Check:
- `projects/` for other project summaries
- `patterns/` for reusable solutions
- `logs/` for recent session history
- `decisions/` for past architecture choices

### Skills & Conventions
Before starting work, check `skills/` in the Obsidian vault for cross-project conventions that apply to this project's stack.

At the end of each session:
- If a new reusable convention, pattern, or best practice was established, create a new skill file in `skills/` in the vault
- If an existing skill was refined, improved, or contradicted by something learned this session, update the relevant skill file in `skills/` in the vault
- If a project-specific skill becomes useful across projects, promote it from this CLAUDE.md to `skills/` in the vault
