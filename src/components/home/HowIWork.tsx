import Link from "next/link";
import Reveal from "./Reveal";

const beats = [
  {
    key: "the tools",
    copy: (
      <>
        Claude Code, MCP servers, and Figma AI — wired into{" "}
        <strong>one workflow I architected myself</strong>. I build the
        systems, not just prompt them.
      </>
    ),
  },
  {
    key: "the gap",
    copy: (
      <>
        I design in Figma with variables, tokens, and modes, and ship in
        Next.js and TypeScript.{" "}
        <strong>
          The gap between the file and the deployed thing is where most design
          dies.
        </strong>{" "}
        I work in that gap.
      </>
    ),
  },
  {
    key: "the proof",
    copy: (
      <>
        This site is an artifact of the workflow — designed in my own Figma
        system, built with Claude Code, and{" "}
        <strong>annotated with its own live values</strong>. The AI-generated
        media here is ambiance; the client screenshots are real work.
      </>
    ),
  },
];

export default function HowIWork() {
  return (
    <section className="wd-section" id="process">
      <header className="sec-head">
        <h2>How I work</h2>
        <span className="sec-meta">AI-native, honestly</span>
      </header>

      <Reveal stagger={0.12}>
        {beats.map((b) => (
          <div className="hw-row" key={b.key}>
            <span className="hw-key">{b.key}</span>
            <p className="hw-copy">{b.copy}</p>
          </div>
        ))}
      </Reveal>

      <Link href="/system/ai-workflow" className="hw-more">
        See the full workflow
      </Link>
    </section>
  );
}
