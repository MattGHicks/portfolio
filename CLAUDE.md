# Portfolio

> Matt's personal design portfolio — case studies, design system work, and AI workflow showcases.

## Status
- **Stage:** planning / early build
- **Deployed:** no (not yet)
- **Auto-deploy:** no

## What This Is
Matt's personal portfolio site. Showcases UI/UX design work — primarily Revize municipal website case studies (South Fork, Brewster, Clive, Archbold, R6) and potentially DigitalFish freelance work. Also has a section for the AI workflow/ecosystem work.

## Stack
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Content:** Static — no CMS, no backend
- **Deployment:** TBD (Vercel likely)

## Project Structure
```
portfolio/
  src/
    app/
      case-study/         # individual case study pages
        south-fork/
        clive/
        archbold/
        r6/
        temple/
      system/             # design system / process pages
        revize/
        ai-workflow/
      components/         # shared UI
    styles/               # global styles
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
- Dark mode, refined typography, generous whitespace
- Case studies should tell a story — context → problem → solution → result
- Mobile-responsive — recruiters and clients view on all devices

## Active Work
- [ ] Finalize page structure and navigation
- [ ] Complete case study pages
- [ ] Add AI workflow section

## Off Limits
- Don't edit anything in `_html-source/` — it's a reference archive
- Don't add a backend — keep it fully static

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
