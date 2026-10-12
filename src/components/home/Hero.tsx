import { awards, goldCount } from "@/data/awards";

// The statement is the signature: three lines of Fraunces at display
// size, each revealed from behind a mask on load (CSS only — see
// .hero-line in home.css). Everything else in the hero is quiet.
export default function Hero() {
  const facts = [
    { n: "190+", label: "government websites shipped" },
    { n: String(awards.length), label: "Horizon Interactive awards" },
    { n: `${goldCount}×`, label: "Gold as designer of record" },
    { n: "1", label: "pool, run by hardware I wired" },
  ];

  return (
    <section className="hero">
      <div className="container">
        <p className="hero-kicker label">
          <span className="status-dot" aria-hidden />
          Matt Hicks — product designer &amp; engineer · fully remote, Tampa (ET) · available
        </p>

        <h1 className="hero-statement serif">
          <span className="hero-line">
            <span className="hero-line-in">I design things</span>
          </span>
          <span className="hero-line">
            <span className="hero-line-in">
              that <em>ship</em>, and build
            </span>
          </span>
          <span className="hero-line">
            <span className="hero-line-in">the tools I design with.</span>
          </span>
        </h1>

        <div className="hero-row">
          <p className="hero-lede">
            Three years and 190+ civic websites at Revize, nine Horizon
            Interactive awards, a smart pool controller I reverse-engineered
            and wired myself, and an AI-native design workflow I architected
            from scratch. The gap between the Figma file and the deployed
            thing is where most design dies. I work in that gap.
          </p>
          <ul className="hero-links">
            <li>
              <a href="#work" className="u-link">
                See the work <span aria-hidden>↓</span>
              </a>
            </li>
            <li>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="u-link"
              >
                Resume <span aria-hidden>↗</span>
              </a>
            </li>
            <li>
              <a href="mailto:mattghicks@gmail.com" className="u-link">
                mattghicks@gmail.com <span aria-hidden>↗</span>
              </a>
            </li>
          </ul>
        </div>

        <dl className="facts">
          {facts.map((f) => (
            <div className="fact" key={f.label}>
              <dt className="label">{f.label}</dt>
              <dd className="fact-n serif">{f.n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
