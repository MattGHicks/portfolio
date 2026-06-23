import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI1 — Matt Hicks',
  description:
    "A self-initiated cinematic concept reveal for SpaceX's AI1 orbital AI data-center satellite. Real specs, invented mythology. Unofficial — not affiliated with or endorsed by SpaceX.",
};

export default function AI1Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
