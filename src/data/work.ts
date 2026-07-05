// Unified work gallery — shipped, concept, and system work as co-equal peers.
// Copy is lifted verbatim from the original homepage. Concepts lead the order
// (the equal-billing requirement); "lead" scale = a full-bleed hero panel.

export type WorkKind = "concept" | "shipped" | "system";

export interface WorkItem {
  slug: string;
  href: string;
  kind: WorkKind;
  title: string;
  meta: string;
  blurb: string;
  tags: string[];
  poster: string;
  clip?: string;
  scale: "lead" | "standard";
}

export const KIND_LABEL: Record<WorkKind, string> = {
  concept: "Concept",
  shipped: "Shipped",
  system: "System",
};

export const work: WorkItem[] = [
  {
    slug: "ai1",
    href: "/case-study/ai1",
    kind: "concept",
    title: "AI1 — Orbital Intelligence",
    meta: "Concept · Cinematic Reveal",
    blurb:
      "A cinematic concept reveal for SpaceX's AI1 orbital AI data-center satellite — the real spec sheet treated as cinema, with AI-generated Seedance film loops, a live WebGL starfield, scroll-driven lore, HUD telemetry, and a draggable orbit. Honest about every real fact versus invented bit of lore.",
    tags: ["Art Direction", "Motion / WebGL", "3D", "AI Film"],
    poster: "/images/cs/ai1/hero.jpg",
    clip: "/images/cs/ai1/hero.mp4",
    scale: "lead",
  },
  {
    slug: "dr-dabber",
    href: "/case-study/dr-dabber",
    kind: "concept",
    title: "Dr. Dabber",
    meta: "Concept · Interactive Prototype",
    blurb:
      "An unsolicited, end-to-end redesign of the companion app for the Dr. Dabber e-rig I own — a heat-reactive “Aurora Core” that glows with the temperature, strain LED themes that recolor the entire UI, real heating modes, and a command-center home, all wired to a simulated device you can drive live in the browser.",
    tags: ["Product Design", "Interaction", "Motion", "Front-End"],
    poster: "/images/cs/dr-dabber/home.png",
    scale: "lead",
  },
  {
    slug: "poolpilot",
    href: "/case-study/poolpilot",
    kind: "shipped",
    title: "PoolPilot",
    meta: "IoT · Full-Stack · Side Project",
    blurb:
      "A self-hosted smart controller for a “dumb” pool pump — reverse-engineered RS-485 protocol, hand-wired ESP32 bridge hardware, and a real-time mobile app with scheduling and energy analytics. Designed, engineered, and shipped end-to-end; it runs the family pool every day.",
    tags: ["Product Design", "Hardware", "Real-Time UI"],
    poster: "/images/cs/poolpilot/live.png",
    scale: "lead",
  },
  {
    slug: "franklin",
    href: "/case-study/franklin",
    kind: "shipped",
    title: "City of Franklin, Indiana",
    meta: "Brand · Identity System",
    blurb:
      "A full rebrand for a historic Indiana city — new logo, new palette, new type pairing, new website. Most municipal projects design around an existing brand. Franklin let us redefine it: custom wordmark, abstract arch, four color families, two type families, one design system that ties everything together.",
    tags: ["Brand Identity", "Logo", "Color System", "Typography"],
    poster: "/images/cs/franklin/brand-guide.jpg",
    clip: "/video/home/civic.mp4",
    scale: "standard",
  },
  {
    slug: "r6",
    href: "/case-study/r6",
    kind: "shipped",
    title: "R6 Regional Council, Utah",
    meta: "Gov · Regional Planning",
    blurb:
      "Complete website redesign for a Central Utah regional government body — building a brand color palette from scratch, crafting a clean Apple-inspired layout, and designing a mega menu that makes complex navigation feel simple.",
    tags: ["Brand Color", "Visual Design", "ADA"],
    poster: "/images/cs/r6/home.jpg",
    scale: "standard",
  },
  {
    slug: "archbold",
    href: "/case-study/archbold",
    kind: "shipped",
    title: "Archbold, Ohio",
    meta: "Gov · Visual Design",
    blurb:
      "Government website redesign for a small northwest Ohio village — transforming a cluttered, overlapping layout into a clean, confident design built around their navy and gold brand, a grid calendar their residents actually asked for, and navigation that doesn't require a map to use.",
    tags: ["Visual Design", "Calendar UX", "ADA"],
    poster: "/images/cs/archbold/home.jpg",
    scale: "standard",
  },
  {
    slug: "south-fork",
    href: "/case-study/south-fork",
    kind: "shipped",
    title: "South Fork Water, Oregon",
    meta: "Utility · Visual Design",
    blurb:
      "Website redesign for a wholesale water authority serving Oregon City and West Linn — designed around their “simplicity is brilliant” philosophy and the natural heritage of the Clackamas River headwaters. Pure water since 1915.",
    tags: ["Brand Guidelines", "Visual Design", "ADA"],
    poster: "/images/cs/south-fork/home.jpg",
    clip: "/video/home/water.mp4",
    scale: "standard",
  },
  {
    slug: "clive",
    href: "/case-study/clive",
    kind: "shipped",
    title: "City of Clive, Iowa",
    meta: "Gov · Multi-Site",
    blurb:
      "Multi-site redesign for a city whose identity is literally nature — three distinct but cohesive sites for City Hall, the Public Library, and Parks & Recreation built around the Greenbelt trail system that defines Clive.",
    tags: ["Multi-Site", "Visual Design", "Navigation"],
    poster: "/images/cs/clive/city-home.jpg",
    scale: "standard",
  },
  {
    slug: "temple",
    href: "/case-study/temple",
    kind: "shipped",
    title: "Temple, Texas",
    meta: "Gov · Visual Design",
    blurb:
      "Large city website redesign across three sub-sites — five revision cycles, mobile-first design exports, and coordinated design for City Hall, the Public Library, and Parks & Recreation. A masterclass in client iteration.",
    tags: ["Multi-Site", "Mobile", "Iteration"],
    poster: "/images/cs/temple/city-home.jpg",
    scale: "standard",
  },
  {
    slug: "revize",
    href: "/system/revize",
    kind: "system",
    title: "Revize Design System",
    meta: "Design Systems",
    blurb:
      "The Figma component library behind 190+ government websites — built for consistency, speed, and the team's ability to scale without rebuilding from scratch every time.",
    tags: ["Variables", "Tokens", "Modes"],
    poster: "/images/cs/revize/system-overview.jpg",
    clip: "/video/home/mesh.mp4",
    scale: "standard",
  },
  {
    slug: "ai-workflow",
    href: "/system/ai-workflow",
    kind: "system",
    title: "AI-Augmented Design Workflow",
    meta: "AI · Workflow",
    blurb:
      "Building a personal AI-native design system — Claude Code, Figma AI, MCP servers, and Make automations working in concert. Multi-hour tasks reduced to minutes.",
    tags: ["Claude Code", "Figma AI", "MCP"],
    poster: "/images/cs/ai-workflow/claude-code.png",
    clip: "/video/home/ai-workflow.mp4",
    scale: "standard",
  },
];
