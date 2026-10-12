import { ogImage, ogSize, ogContentType } from "@/lib/og";
import { work } from "@/data/work";

const item = work.find((w) => w.slug === "revize")!;

export const size = ogSize;
export const contentType = ogContentType;
export const alt = item.title;

export default function Image() {
  return ogImage({ title: item.title, meta: item.meta, accent: item.accent });
}
