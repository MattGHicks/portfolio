import Reveal from "./Reveal";

export default function Thesis() {
  return (
    <section className="cin-thesis">
      <Reveal>
        <p className="cin-thesis-label">The Approach</p>
        <h2 className="cin-thesis-text">
          I build <span className="warm">design systems</span> — variables,
          tokens, and modes, baked in from the start.{" "}
          <span className="muted">
            This site is one of them: art-directed by me, its cinema generated
            with Higgsfield, and assembled with Claude Code.
          </span>
        </h2>
      </Reveal>
    </section>
  );
}
