import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dr. Dabber — Matt Hicks',
  description:
    'A self-initiated, fully-interactive concept redesign of the Dr. Dabber companion app. Unofficial — not affiliated with or endorsed by Dr. Dabber.',
};

export default function DrDabberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
