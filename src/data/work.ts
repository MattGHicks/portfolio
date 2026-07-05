// Unified work model. Flagships get deep, archetype-specific case studies;
// archive entries share the condensed treatment; systems are process pages.
// `blurb` is the full case-study framing; `hook` is the one-liner used on
// the homepage. `accent` is the client's brand color, applied per-study as
// --cs-accent (filled in as each study is restyled).

export type WorkTier = "flagship" | "archive" | "system";
export type WorkArchetype = "build" | "concept" | "craft" | "archive";

export interface WorkItem {
  slug: string;
  href: string;
  tier: WorkTier;
  archetype: WorkArchetype;
  title: string;
  meta: string;
  hook: string;
  blurb: string;
  tags: string[];
  poster: string;
  clip?: string;
  accent?: string;
}

export const work: WorkItem[] = [
  {
    slug: "poolpilot",
    href: "/case-study/poolpilot",
    tier: "flagship",
    archetype: "build",
    title: "PoolPilot",
    meta: "Shipped · IoT · Full-stack",
    hook: "A smart controller for a dumb pool pump — reverse-engineered protocol, hand-wired hardware, real-time app. It runs the family pool every day.",
    blurb:
      "A self-hosted smart controller for a “dumb” pool pump — reverse-engineered RS-485 protocol, hand-wired ESP32 bridge hardware, and a real-time mobile app with scheduling and energy analytics. Designed, engineered, and shipped end-to-end; it runs the family pool every day.",
    tags: ["Product Design", "Hardware", "Real-Time UI"],
    poster: "/images/cs/poolpilot/live.png",
  },
  {
    slug: "dr-dabber",
    href: "/case-study/dr-dabber",
    tier: "flagship",
    archetype: "concept",
    title: "Dr. Dabber",
    meta: "Concept · Interactive prototype",
    hook: "An unsolicited redesign of the companion app for the e-rig I own — heat-reactive glow, strain themes, and a simulated device you can drive live in the browser.",
    blurb:
      "An unsolicited, end-to-end redesign of the companion app for the Dr. Dabber e-rig I own — a heat-reactive “Aurora Core” that glows with the temperature, strain LED themes that recolor the entire UI, real heating modes, and a command-center home, all wired to a simulated device you can drive live in the browser.",
    tags: ["Product Design", "Interaction", "Motion", "Front-End"],
    poster: "/images/cs/dr-dabber/home.png",
  },
  {
    slug: "ai1",
    href: "/case-study/ai1",
    tier: "flagship",
    archetype: "concept",
    title: "AI1 — Orbital Intelligence",
    meta: "Concept · Cinematic reveal",
    hook: "A cinematic concept reveal for SpaceX's orbital AI data-center satellite — real spec sheet, invented mythology, live WebGL starfield.",
    blurb:
      "A cinematic concept reveal for SpaceX's AI1 orbital AI data-center satellite — the real spec sheet treated as cinema, with AI-generated Seedance film loops, a live WebGL starfield, scroll-driven lore, HUD telemetry, and a draggable orbit. Honest about every real fact versus invented bit of lore.",
    tags: ["Art Direction", "Motion / WebGL", "3D", "AI Film"],
    poster: "/images/cs/ai1/hero.jpg",
    clip: "/images/cs/ai1/hero.mp4",
  },
  {
    slug: "franklin",
    href: "/case-study/franklin",
    tier: "flagship",
    archetype: "craft",
    title: "City of Franklin, Indiana",
    meta: "Shipped · Brand identity",
    hook: "A full civic rebrand — new logo, palette, type, and website. Most municipal projects design around a brand; Franklin let us redefine it.",
    blurb:
      "A full rebrand for a historic Indiana city — new logo, new palette, new type pairing, new website. Most municipal projects design around an existing brand. Franklin let us redefine it: custom wordmark, abstract arch, four color families, two type families, one design system that ties everything together.",
    tags: ["Brand Identity", "Logo", "Color System", "Typography"],
    poster: "/images/cs/franklin/brand-guide.jpg",
  },
  {
    slug: "r6",
    href: "/case-study/r6",
    tier: "archive",
    archetype: "archive",
    title: "R6 Regional Council, Utah",
    meta: "Gov · Regional planning",
    hook: "Brand color palette from scratch and a mega menu that makes complex program offerings navigable.",
    blurb:
      "Complete website redesign for a Central Utah regional government body — building a brand color palette from scratch, crafting a clean Apple-inspired layout, and designing a mega menu that makes complex navigation feel simple.",
    tags: ["Brand Color", "Visual Design", "ADA"],
    poster: "/images/cs/r6/home.jpg",
  },
  {
    slug: "archbold",
    href: "/case-study/archbold",
    tier: "archive",
    archetype: "archive",
    title: "Archbold, Ohio",
    meta: "Gov · Visual design",
    hook: "A cluttered village site rebuilt around navy and gold, and the grid calendar residents actually asked for.",
    blurb:
      "Government website redesign for a small northwest Ohio village — transforming a cluttered, overlapping layout into a clean, confident design built around their navy and gold brand, a grid calendar their residents actually asked for, and navigation that doesn't require a map to use.",
    tags: ["Visual Design", "Calendar UX", "ADA"],
    poster: "/images/cs/archbold/home.jpg",
  },
  {
    slug: "south-fork",
    href: "/case-study/south-fork",
    tier: "archive",
    archetype: "archive",
    title: "South Fork Water, Oregon",
    meta: "Utility · Visual design",
    hook: "A water authority site designed around “simplicity is brilliant” and the Clackamas River headwaters.",
    blurb:
      "Website redesign for a wholesale water authority serving Oregon City and West Linn — designed around their “simplicity is brilliant” philosophy and the natural heritage of the Clackamas River headwaters. Pure water since 1915.",
    tags: ["Brand Guidelines", "Visual Design", "ADA"],
    poster: "/images/cs/south-fork/home.jpg",
  },
  {
    slug: "clive",
    href: "/case-study/clive",
    tier: "archive",
    archetype: "archive",
    title: "City of Clive, Iowa",
    meta: "Gov · Multi-site",
    hook: "Three distinct but cohesive sites — City Hall, Library, Parks & Rec — built around the Greenbelt trail.",
    blurb:
      "Multi-site redesign for a city whose identity is literally nature — three distinct but cohesive sites for City Hall, the Public Library, and Parks & Recreation built around the Greenbelt trail system that defines Clive.",
    tags: ["Multi-Site", "Visual Design", "Navigation"],
    poster: "/images/cs/clive/city-home.jpg",
  },
  {
    slug: "temple",
    href: "/case-study/temple",
    tier: "archive",
    archetype: "archive",
    title: "Temple, Texas",
    meta: "Gov · Visual design",
    hook: "A large-city redesign across three sub-sites and five revision cycles, exported mobile-first.",
    blurb:
      "Large city website redesign across three sub-sites — five revision cycles, mobile-first design exports, and coordinated design for City Hall, the Public Library, and Parks & Recreation. A masterclass in client iteration.",
    tags: ["Multi-Site", "Mobile", "Iteration"],
    poster: "/images/cs/temple/city-home.jpg",
  },
  {
    slug: "revize",
    href: "/system/revize",
    tier: "system",
    archetype: "archive",
    title: "Revize Design System",
    meta: "Design systems",
    hook: "The Figma component library behind 190+ government websites.",
    blurb:
      "The Figma component library behind 190+ government websites — built for consistency, speed, and the team's ability to scale without rebuilding from scratch every time.",
    tags: ["Variables", "Tokens", "Modes"],
    poster: "/images/cs/revize/system-overview.jpg",
  },
  {
    slug: "ai-workflow",
    href: "/system/ai-workflow",
    tier: "system",
    archetype: "archive",
    title: "AI-Augmented Design Workflow",
    meta: "AI · Workflow",
    hook: "Claude Code, Figma AI, MCP servers, and Make automations working in concert.",
    blurb:
      "Building a personal AI-native design system — Claude Code, Figma AI, MCP servers, and Make automations working in concert. Multi-hour tasks reduced to minutes.",
    tags: ["Claude Code", "Figma AI", "MCP"],
    poster: "/images/cs/ai-workflow/claude-code.png",
  },
];

export const flagships = work.filter((w) => w.tier === "flagship");
export const archive = work.filter((w) => w.tier === "archive");
