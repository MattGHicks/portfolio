import Image from "next/image";
import Link from "next/link";
import { flagships } from "@/data/work";
import Reveal from "./Reveal";
import Plate from "./Plate";

// Magazine rhythm: full plate, a pair, full plate. The two concept
// studies share the pair; the two shipped things get the full width.
const layout: Array<"full" | "half"> = ["full", "half", "half", "full"];

export default function FlagshipWork() {
  return (
    <section className="section" id="work">
      <div className="container">
        <header className="sec-head">
          <h2 className="serif">Selected work</h2>
          <p className="sec-meta label">
            Four studies · two shipped, two concepts
          </p>
        </header>

        <div className="plates">
          {flagships.map((w, i) => {
            const size = layout[i] ?? "full";
            return (
              <Reveal key={w.slug} className={`plate plate--${size}`}>
                <Link
                  href={w.href}
                  className="plate-link"
                  style={{ "--plate-accent": w.accent } as React.CSSProperties}
                >
                  <Plate className="plate-media">
                    <Image
                      src={w.poster}
                      alt={`${w.title} — case study preview`}
                      fill
                      sizes={
                        size === "full"
                          ? "(max-width: 1400px) 100vw, 1360px"
                          : "(max-width: 899px) 100vw, 680px"
                      }
                      priority={i === 0}
                    />
                  </Plate>
                  <div className="plate-caption">
                    <span className="num plate-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="plate-text">
                      <h3 className="plate-title serif">{w.title}</h3>
                      <p className="plate-hook">{w.hook}</p>
                    </div>
                    <div className="plate-side">
                      <p className="label">{w.meta}</p>
                      <p className="label plate-tags">{w.tags.join(", ")}</p>
                      <span className="plate-cta">
                        Read the study <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
