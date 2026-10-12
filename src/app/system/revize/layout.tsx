import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Revize Design System — Matt Hicks",
  description:
    "The Figma component library behind 190+ government websites — built for consistency, speed, and the team's ability to scale without rebuilding from scratch every time.",
};

export default function RevizeSystemLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
