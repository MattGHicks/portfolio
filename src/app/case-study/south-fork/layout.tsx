import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "South Fork Water Board, Oregon — Matt Hicks",
  description:
    "Website redesign for a wholesale water authority serving Oregon City and West Linn — designed around their 'simplicity is brilliant' philosophy and the natural heritage of the Clackamas River headwaters.",
};

export default function SouthForkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
