import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "City of Clive, Iowa — Matt Hicks",
  description:
    "Multi-site redesign for a city whose identity is literally nature — three distinct but cohesive sites for City Hall, the Public Library, and Parks & Recreation, all built around the Greenbelt trail system that defines Clive.",
};

export default function CliveLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
