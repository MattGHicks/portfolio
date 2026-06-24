import Reveal from "@/components/home/Reveal";
import { stats } from "@/data/stats";
import { designerOfRecord, teamWins } from "@/data/awards";

function pillModifier(level: string) {
  if (level === "Silver") return "silver";
  if (level === "Gold") return "gold";
  return "best";
}

export default function About() {
  return (
    <section className="lab2-about" id="about">
      <Reveal className="lab2-about-grid">
        <div className="lab2-about-lead">
          <p className="lab2-eyebrow">About</p>
          <h2 className="lab2-about-title">
            Systems thinking, <em>shipped</em>.
          </h2>
          <p className="lab2-about-text">
            I&apos;m a UI/UX designer who spends most of his day in Figma —
            building systems, not just screens. I design with{" "}
            <strong>variables</strong>, <strong>tokens</strong>, and{" "}
            <strong>modes</strong> baked in from the start so the work is
            maintainable, scalable, and developer-ready.
          </p>
          <p className="lab2-about-text">
            At Revize Software Systems I led visual design across{" "}
            <strong>190+ government website projects</strong>, built and
            maintained the company&apos;s Figma component library, and overhauled
            how our team uses AI tools to move faster without losing quality.
          </p>
          <p className="lab2-about-text">
            I&apos;m looking for a role where Figma is a first-class tool — on a
            product team that cares about design systems, accessibility, and
            shipping real work.
          </p>
        </div>

        <div className="lab2-stats">
          {stats.map((s) => (
            <div className="lab2-stat" key={s.label}>
              <div className="lab2-stat-num">{s.number}</div>
              <div className="lab2-stat-label">{s.label}</div>
              <div className="lab2-stat-detail">{s.detail}</div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="lab2-awards">
        <div className="lab2-awards-head">
          <span className="lab2-awards-mark">★</span>
          2024 &amp; 2025 Horizon Interactive Awards · Designer of record
        </div>
        <ul className="lab2-awards-list">
          {designerOfRecord.map((a) => (
            <li className="lab2-award" key={`${a.year}-${a.project}`}>
              <span className={`lab2-award-pill lab2-award-pill--${pillModifier(a.level)}`}>
                {a.level}
              </span>
              <span className="lab2-award-project">
                {a.project}, {a.state}
              </span>
              <span className="lab2-award-year">{a.year}</span>
            </li>
          ))}
        </ul>
        <p className="lab2-awards-note">
          Plus {teamWins.length} additional team-win awards across the same
          categories — Pasco County FL (Gold), Conroe TX (Silver), Vineyard UT
          (Silver), Downtown Duluth GA (Best in Category).
        </p>
      </Reveal>
    </section>
  );
}
