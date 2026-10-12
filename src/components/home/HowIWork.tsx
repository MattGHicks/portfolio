import Link from "next/link";
import Reveal from "./Reveal";

const beats = [
  {
    n: "01",
    title: "The tools",
    copy: (
      <>
        Claude Code, MCP servers, and Figma AI, wired into one workflow I
        architected myself. I build the systems rather than prompt at them.
      </>
    ),
  },
  {
    n: "02",
    title: "The gap",
    copy: (
      <>
        I design in Figma with variables, tokens, and modes, and I ship in
        Next.js and TypeScript. The distance between the file and the deployed
        thing is where most design dies. That distance is my job.
      </>
    ),
  },
  {
    n: "03",
    title: "The proof",
    copy: (
      <>
        This site is an artifact of the workflow: designed in my own Figma
        system, built with Claude Code. The AI-generated media here is
        ambiance. The client screenshots are real work.
      </>
    ),
  },
];

export default function HowIWork() {
  return (
    <section className="section" id="process">
      <div className="container">
        <header className="sec-head">
          <h2 className="serif">How I work</h2>
          <p className="sec-meta label">AI-native, honestly</p>
        </header>

        <Reveal stagger={0.1} className="beats">
          {beats.map((b) => (
            <div className="beat" key={b.n}>
              <span className="beat-n serif">{b.n}</span>
              <h3 className="beat-title serif">{b.title}</h3>
              <p className="beat-copy">{b.copy}</p>
            </div>
          ))}
        </Reveal>

        <p className="sec-more">
          <Link href="/system/ai-workflow" className="u-link">
            See the full workflow <span aria-hidden>→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
