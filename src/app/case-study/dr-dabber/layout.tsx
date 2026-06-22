import type { Metadata } from 'next';

// Unlisted concept — shared by direct link only, kept out of search engines.
export const metadata: Metadata = {
  title: 'Dr. Dabber — Matt Hicks',
  description:
    'An unofficial, speculative redesign of the Dr. Dabber companion app — a private interactive concept. Not affiliated with or endorsed by Dr. Dabber.',
  robots: { index: false, follow: false },
};

export default function DrDabberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
