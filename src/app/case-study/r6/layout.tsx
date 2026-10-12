import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "R6 Regional Council, Utah — Matt Hicks",
  description:
    "Complete website redesign for a Central Utah regional government — brand palette built from scratch, Apple-inspired layout, mega menu for workforce and community services.",
};

export default function R6Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
