import Image from "next/image";
import Link from "next/link";
import { flagships } from "@/data/work";
import Reveal from "./Reveal";

export default function FlagshipWork() {
  return (
    <section className="wd-section" id="work">
      <header className="sec-head">
        <h2>Selected work</h2>
        <span className="sec-meta">
          {String(flagships.length).padStart(2, "0")} studies · more in the
          practice below
        </span>
      </header>

      {flagships.map((w, i) => (
        <Reveal key={w.slug}>
          <article
            className={`flag${i % 2 === 1 ? " flag-rev" : ""}${
              i === flagships.length - 1 ? " flag-last" : ""
            }`}
          >
            <Link href={w.href} className="flag-link">
              <div className="flag-media">
                {w.backdrop && w.shot ? (
                  <>
                    <Image
                      className="flag-backdrop"
                      src={w.backdrop}
                      alt=""
                      fill
                      sizes="(max-width: 899px) 100vw, 640px"
                      priority={i === 0}
                    />
                    <div
                      className={`flag-shot${w.shot.sheet ? " flag-shot--sheet" : ""}`}
                    >
                      <Image
                        src={w.shot.src}
                        alt={`${w.title} — the real interface`}
                        width={w.shot.width}
                        height={w.shot.height}
                        sizes="320px"
                      />
                    </div>
                  </>
                ) : (
                  <Image
                    src={w.poster}
                    alt={`${w.title} — case study preview`}
                    fill
                    sizes="(max-width: 899px) 100vw, 640px"
                    priority={i === 0}
                  />
                )}
              </div>
              <div className="flag-text">
                <p className="flag-meta">{w.meta}</p>
                <h3 className="flag-title">{w.title}</h3>
                <p className="flag-hook">{w.hook}</p>
                <p className="flag-tags">{w.tags.join(" · ")}</p>
                <span className="flag-cta">Read the case study</span>
              </div>
            </Link>
          </article>
        </Reveal>
      ))}
    </section>
  );
}
