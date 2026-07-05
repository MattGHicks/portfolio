import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "City of Temple, Texas — Matt Hicks",
  description:
    "Large city website redesign across three sub-sites — five revision cycles, mobile-first design exports, and coordinated design for City Hall, the Public Library, and Parks & Recreation.",
};

export default function TempleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
