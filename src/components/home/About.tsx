import { designerOfRecord, teamWins } from "@/data/awards";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="wd-section" id="about">
      <header className="sec-head">
        <h2>About</h2>
        <span className="sec-meta">Tampa, FL</span>
      </header>

      <div className="about-body">
        <Reveal className="about-narrative">
          <p>
            I&apos;m Matt — a product designer in Tampa. Three years and 190+
            government websites at Revize taught me to{" "}
            <strong>design at volume without losing rigor</strong>: one design
            system, a 399-item accessibility checklist, and nine Horizon
            Interactive awards along the way.
          </p>
          <p>
            I also build. PoolPilot runs my family&apos;s pool on hardware I
            wired and a protocol I reverse-engineered. This site is Next.js I
            wrote myself.{" "}
            <strong>
              The gap between the Figma file and the deployed thing is where
              most design dies
            </strong>{" "}
            — I work in that gap.
          </p>
          <p>
            AI is the newest tool in that gap. I architected my own workflow
            around Claude Code, MCP, and Figma AI — systems I built, not
            shortcuts I take.
          </p>
        </Reveal>

        <Reveal>
          <div className="awards">
            <p className="awards-head">
              Horizon Interactive Awards · designer of record
            </p>
            {designerOfRecord.map((a) => (
              <div className="award-row" key={`${a.project}-${a.year}`}>
                <span className="award-year">{a.year}</span>
                <span
                  className={`award-level${a.level === "Gold" ? " is-gold" : ""}`}
                >
                  {a.level}
                </span>
                <span className="award-project">
                  {a.project}, {a.state}
                </span>
              </div>
            ))}
            <p className="awards-footnote">
              Plus {teamWins.length} team wins:{" "}
              {teamWins
                .map((a) => `${a.project} ${a.state} (${a.level})`)
                .join(" · ")}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
