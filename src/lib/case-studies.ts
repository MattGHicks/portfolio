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
