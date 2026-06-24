# Portfolio Redesign — Working Notes (resume-here)

> Scratch/handoff doc for the in-progress redesign on branch `redesign`.
> **Delete before merging to `main`.** Last updated: 2026-06-24.

## TL;DR — where we are
Rebuilding digitalfish.io as a **scroll-driven cinematic motion site**. The signature
technique (reverse-engineered from Matt's two Higgsfield+Claude YouTube videos via the
Higgsfield `video_analysis` tool): **a Higgsfield film whose `currentTime` is scrubbed
frame-by-frame by scroll while the hero is pinned, with content "beats" choreographed over
it** (the "BurgerLab" mechanic). Aesthetic: dark charcoal `#0a0c12` + cool electric blue
`#4d8dff`, Bricolage Grotesque display type, glassmorphism, GSAP + Lenis.

**Status:** homepage hero + sections built and working on the `redesign` branch. Matt is
reviewing the latest hero (premium liquid-chrome scrub film, commit `bd35bc5`). NOT merged.

## Safety / git
- Branch `redesign` (pushed to origin). `main` = live prod (Vercel `digitalfish.io`), **untouched**.
- Backup tag: `pre-redesign-2026-06-23`. Rollback via tag or Vercel "promote previous deploy".
- Recent commits: `bd35bc5` chrome scrub hero + legibility · `dcd2b06` scroll-scrubbed hero ·
  `27e1b7f` WebGL homepage promoted to `/` · `5958819` interior cool-blue cascade.

## The direction (after several pivots — DON'T revisit the rejected ones)
Rejected: (1) warm "Cinematic Noir" — felt templated. (2) pixel-art/arcade + pixel cursor —
too playful. (3) abstract WebGL point-field hero — competent, not impressive. (4) looping
liquid-chrome WebGL shader hero — better but "a layout, not an experience."
**Accepted: scroll-scrubbed cinematic motion (current).**

### What the videos actually show (from video_analysis)
- Single-page scroll-driven sites. BurgerLab: background burger video **scrubbed by scroll**,
  explodes into layers, text/number beats + cards fade in over it → menu → CTA. React+GSAP+ScrollTrigger.
- "Grassy hero": full-screen cinematic video, **negative space in top ⅔ for text**, glassmorphism,
  one example where **the video follows the cursor**. Image (Nano Banana) → video (Kling, start-frame) →
  ping-pong/seamless loop → Claude Design/Code builds it.

## Live architecture (what renders now)
- `src/app/page.tsx` and `src/app/lab/page.tsx` both render `<LabHome/>`. `/lab` is noindexed
  (`src/app/lab/layout.tsx`). Root layout `src/app/layout.tsx` loads Bricolage Grotesque
  (`--font-display`) + Syne/DM Sans/JetBrains, mounts `SmoothScrollProvider`.
- **`src/components/lab/LabHome.tsx`** — composition: intro curtain → fixed nav → `ScrubHero`
  → `WorkIndex` → `About` → `Contact`, plus `RefinedCursor` + `CursorPops`.
- **`src/components/lab/ScrubHero.tsx`** ⭐ centerpiece. Pinned section; GSAP ScrollTrigger
  `pin:true, scrub:1, end:"+=2800"`; tweens a proxy 0→1 and sets `video.currentTime = p*duration`.
  Beats choreographed by timeline position (title clears ~0.05; `.scrub-beat-1` "190+" ~0.27;
  `.scrub-beat-2` "2024·2025 awards" ~0.52; `.scrub-outro` ~0.78). Film: `/video/home/hero-scrub.mp4`
  (liquid chrome wave, encoded all-intra `keyint=2`, 1920px, crf21, ~8MB) + poster `hero-scrub.jpg`.
  Reduced-motion → static first frame, no pin.
- **`src/components/lab/WorkIndex.tsx`** — editorial list from `src/data/work.ts`; hover swaps a
  cool-blue **duotone** preview pane; click = **GSAP Flip dimensional expand** into a detail panel
  with "View full case study" → `/case-study/<slug>`.
- `src/components/lab/About.tsx` / `Contact.tsx` — use `src/data/stats.ts`, `src/data/awards.ts`;
  reuse `src/components/home/Reveal.tsx` (GSAP scroll reveal). Verbatim copy preserved.
- `src/components/lab/RefinedCursor.tsx` (dot + lagging ring) + `CursorPops.tsx` (sporadic
  color-pop canvas bursts on move/click).
- **`src/styles/lab.css`** — ALL homepage styles. Tokens: `--bg:#0a0c12 --accent:#4d8dff`.
  Key selectors: `.lab2`, `.scrub*` (hero), `.work-*` (index/expand), `.lab2-about/-contact`,
  `.cursor-*`, `.lab-intro`, `.lab2-nav` (fixed).
- **Interiors:** `src/app/case-study/*` + `src/system/*` share `src/styles/case-study.css`,
  cascaded to the `--cin-*` tokens in `src/app/globals.css` (retuned cool-blue) + Bricolage
  (`var(--font-display)`). AI1/Dr.Dabber keep cyan per-page accents.
- `src/components/SmoothScrollProvider.tsx` — Lenis on GSAP ticker; **`/admin` passthrough**;
  reduced-motion kill-switch. Mounted in root layout.

### Stack added
`gsap @gsap/react lenis three @react-three/fiber @react-three/drei`. (three/r3f now only used by
the **unused** `HeroFilm.tsx`; live hero is a plain `<video>` scrub.)

## Dead/unused (clean up before merge)
`src/components/home/*` (old cinematic homepage: Hero, Thesis, WorkGallery, About, Contact) +
`src/styles/home.css`; `src/components/lab/HeroFilm.tsx`, `HeroWebGL.tsx`. Unused videos in
`public/video/home/`: hero.mp4, hero-film.mp4, mesh, ai-workflow, water, civic, ambient (+jpgs);
several untracked in git. Keep `Reveal.tsx`, `work.ts`, `Clip.tsx`.

## Constraints (must hold)
Preserve every public URL + content verbatim. Do NOT touch `/admin`, `/api`, `middleware.ts`,
Drizzle/Gmail/cron, `vercel.json`. Mobile-responsive + `prefers-reduced-motion`. Honesty guardrail:
AI-generated media = ambiance/concepts; real client screenshots are the substance.

## Known issues / gotchas
- Preview screenshots intermittently render small when video/canvas is on-page — a capture
  artifact, NOT a layout bug (DOM verified full-width). Real browser is full-size.
- Dev preview server port changes on restart and sometimes stops. Restart: `preview_start "portfolio"`
  (autoPort; `.claude/launch.json`). It runs on a random port (was 52295). Matt's own `localhost:3000`
  is a DIFFERENT app — give him the preview port URL.
- Editing client components sometimes wedges Fast Refresh ("X is not defined" stale) → restart preview.
- Higgsfield: `generate_video` (kling3_0_turbo, ~10cr/5s), `video_analysis_create(youtube_url)` for
  transcripts/scenes, `balance` for credits. Some prompts trigger an "IN THE DARK" preset notice →
  retry with `declined_preset_id`.

## Next steps
1. Await Matt's reaction to the chrome scrub hero (`bd35bc5`).
2. If approved: carry the scroll-scrub/cinematic treatment into flagship case studies so interiors match.
3. Polish: mobile pass on the pinned scrub (pin behavior + lighter mobile hero video — 8MB is heavy),
   perf/Lighthouse, delete dead files, full QA of all URLs + `/admin/login`.
4. Launch gate: PR `redesign` → `main`, confirm zero changes under admin/api/middleware, merge → Vercel.
