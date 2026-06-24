import Reveal from "./Reveal";
import { stats } from "@/data/stats";
import { designerOfRecord, teamWins } from "@/data/awards";

function pillModifier(level: string) {
  if (level === "Silver") return "silver";
  if (level === "Gold") return "gold";
  return "best";
}

export default function About() {
  return (
    <section className="cin-about" id="about">
      <Reveal className="cin-about-inner">
        <div>
          <h2 className="cin-about-heading">
            Design that lives inside <span>Figma</span>
          </h2>
          <p className="cin-about-text">
            I&apos;m a UI/UX designer who spends most of his day in Figma —
            building systems, not just screens. I design with{" "}
            <strong>variables</strong>, <strong>tokens</strong>, and{" "}
            <strong>modes</strong> baked in from the start so that the work is
            maintainable, scalable, and developer-ready.
          </p>
          <p className="cin-about-text">
            At Revize Software Systems, I led visual design across{" "}
            <strong>190+ government website projects</strong>, built and
            maintained the company&apos;s Figma component library, and overhauled
            how our team uses AI tools to move faster without losing quality.
          </p>
          <p className="cin-about-text">
            I&apos;m looking for a role where Figma is a first-class tool — on a
            product team that cares about design systems, accessibility, and
            shipping real work.
          </p>
        </div>

        <div className="cin-stats">
          {stats.map((s) => (
            <div className="cin-stat" key={s.label}>
              <div className="cin-stat-num">{s.number}</div>
              <div>
                <div className="cin-stat-label">{s.label}</div>
                <div className="cin-stat-detail">{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="cin-awards">
          <div className="cin-awards-head">
            <svg viewBox="0 0 11 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 0L6.7 3.8H10.7L7.5 6.2L8.7 10L5.5 7.6L2.3 10L3.5 6.2L0.3 3.8H4.3L5.5 0Z" />
            </svg>
            2024 &amp; 2025 Horizon Interactive Awards · Designer of record
          </div>
          <ul className="cin-awards-list">
            {designerOfRecord.map((a) => (
              <li className="cin-award" key={`${a.year}-${a.project}`}>
                <span
                  className={`cin-award-pill cin-award-pill--${pillModifier(
                    a.level
                  )}`}
                >
                  {a.level}
                </span>
                <span className="cin-award-project">
                  {a.project}, {a.state}
                </span>
                <span className="cin-award-year">{a.year}</span>
              </li>
            ))}
          </ul>
          <p className="cin-awards-note">
            Plus {teamWins.length} additional team-win awards across the same
            categories — Pasco County FL (Gold), Conroe TX (Silver), Vineyard UT
            (Silver), Downtown Duluth GA (Best in Category).
          </p>
        </div>
      </Reveal>
    </section>
  );
}
