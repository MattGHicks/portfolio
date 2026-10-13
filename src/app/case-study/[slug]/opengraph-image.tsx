import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { practice, practiceBySlug } from "@/data/practice";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Matt Hicks — case study";

export function generateStaticParams() {
  return practice.map((p) => ({ slug: p.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const p = practiceBySlug[params.slug];
  return ogImage({
    title: p?.title ?? "Case study",
    meta: p ? `Revize · ${p.meta.replace("Gov · ", "")} website` : "",
    accent: p?.accent,
  });
}
