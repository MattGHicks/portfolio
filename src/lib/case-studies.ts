// Live URLs + repo links for interactive case studies.
// NOTE: the app is live at drdabber.vercel.app today. The custom subdomain
// drdabber.digitalfish.io is attached in Vercel but pending a DNS A-record
// (drdabber → 76.76.21.21) on the digitalfish.io zone. Once that resolves,
// swap liveUrl to "https://drdabber.digitalfish.io" — this one constant feeds
// the QR code, the embedded iframe, and the "Open live app" button.
export const DR_DABBER = {
  liveUrl: "https://drdabber.vercel.app",
  repoUrl: "https://github.com/MattGHicks/drdabber",
} as const;

// AI1 — speculative cinematic concept site for SpaceX's AI1 orbital data-center
// satellite. The production alias is public; the per-deploy URL is 401-gated.
// NOTE: the repo is private — make MattGHicks/spcx-ai1 public for the
// "View the Code" link to resolve for visitors.
export const AI1 = {
  liveUrl: "https://spcx-ai1.vercel.app",
  repoUrl: "https://github.com/MattGHicks/spcx-ai1",
} as const;
