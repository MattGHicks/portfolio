import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "City of Franklin, Indiana — Matt Hicks",
  description:
    "A full rebrand for a historic Indiana city — new logo, new palette, new typography, new website. Most municipal projects design around an existing brand. Franklin let us redefine it.",
};

export default function FranklinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
