import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="wd-section contact" id="contact">
      <Reveal>
        <h2>Let&apos;s talk.</h2>
        <p className="contact-lede">
          The fastest way to reach me is email — I read everything.
        </p>
        <a href="mailto:matt@digitalfish.io" className="contact-email">
          matt@digitalfish.io
        </a>
        <div className="contact-links">
          <a
            href="https://linkedin.com/in/matthicksfl"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/matthks/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </Reveal>
    </section>
  );
}
