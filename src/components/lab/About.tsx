import Reveal from "@/components/home/Reveal";
import { stats } from "@/data/stats";
import Awards from "@/components/lab/Awards";

export default function About() {
  return (
    <section className="lab2-about" id="about">
      <Reveal className="lab2-about-grid">
        <div className="lab2-about-lead">
          <p className="lab2-eyebrow">About</p>
          <h2 className="lab2-about-title">
            Systems thinking, <em>shipped</em>.
          </h2>
          <p className="lab2-about-text lab2-about-text--lead">
            A UI/UX designer who lives in Figma — building{" "}
            <strong>systems</strong>, not just screens.
          </p>
          <p className="lab2-about-text">
            190+ government sites shipped at Revize, the component library behind
            them, and an AI-native workflow. Open to product roles where design
            systems matter.
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

      <Reveal>
        <Awards />
      </Reveal>
    </section>
  );
}
