import { designerOfRecord, teamWins } from "@/data/awards";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <header className="sec-head">
          <h2 className="serif">About</h2>
          <p className="sec-meta label">Tampa, FL · remote</p>
        </header>

        <div className="about">
          <Reveal className="about-narrative">
            <p className="about-lede serif">
              I&apos;m Matt, a product designer in Tampa who also builds.
            </p>
            <p>
              Three years and 190+ government websites at Revize taught me to
              design at volume without losing rigor: one design system, a
              399-item accessibility checklist, and nine Horizon Interactive
              awards along the way.
            </p>
            <p>
              PoolPilot runs my family&apos;s pool on hardware I wired and a
              protocol I reverse-engineered. This site is Next.js I wrote
              myself. AI is the newest tool in the gap between design and
              shipping, and I architected my own workflow around Claude Code,
              MCP, and Figma AI. Systems I built, not shortcuts I take.
            </p>
          </Reveal>

          <Reveal className="awards">
            <p className="label awards-head">
              Horizon Interactive Awards · designer of record
            </p>
            <ol>
              {designerOfRecord.map((a) => (
                <li className="award" key={`${a.project}-${a.year}`}>
                  <span className="num">{a.year}</span>
                  <span
                    className={`award-level${a.level === "Gold" ? " is-gold" : ""}`}
                  >
                    {a.level}
                  </span>
                  <span className="award-project serif">
                    {a.project}, {a.state}
                  </span>
                </li>
              ))}
            </ol>
            <p className="awards-foot label">
              Plus {teamWins.length} team wins:{" "}
              {teamWins
                .map((a) => `${a.project}, ${a.state} (${a.level})`)
                .join(" · ")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
