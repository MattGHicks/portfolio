import Image from "next/image";
import type { Screen } from "@/data/practice";

// A full-length design export shown inside a fixed-height, scrollable frame,
// so a 5000px homepage reads as a page you can scroll instead of a wall on
// the case study. data-lenis-prevent hands wheel events to the frame.
export default function PageFrame({
  screen,
  size = "secondary",
  priority = false,
  sizes,
}: {
  screen: Screen;
  size?: "primary" | "secondary";
  priority?: boolean;
  sizes: string;
}) {
  return (
    <figure className={`pf pf--${size}`}>
      <figcaption className="pf-bar">
        <span>{screen.caption}</span>
        <span className="num">
          {screen.width} × {screen.height}
        </span>
      </figcaption>
      <div
        className="pf-scroll"
        data-lenis-prevent
        tabIndex={0}
        role="region"
        aria-label={`${screen.caption} design, scrollable`}
      >
        <Image
          src={screen.src}
          alt={`${screen.caption} design`}
          width={screen.width}
          height={screen.height}
          sizes={sizes}
          priority={priority}
        />
      </div>
      <span className="pf-hint" aria-hidden>
        Scroll the page ↓
      </span>
    </figure>
  );
}
