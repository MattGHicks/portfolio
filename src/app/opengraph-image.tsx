import { ogImage, ogSize, ogContentType } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Matt Hicks — Product Designer & Engineer";

export default function Image() {
  return ogImage({
    title: "Matt Hicks",
    meta: "Designer who ships — 190+ civic sites · 9 Horizon Interactive awards",
  });
}
