import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Village of Archbold, Ohio — Matt Hicks",
  description:
    "Government website redesign for a small northwest Ohio village — transforming a cluttered, overlapping layout into a clean, confident design built around their navy and gold brand, a grid calendar their residents actually asked for, and navigation that doesn't require a map to use.",
};

export default function ArchboldLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
