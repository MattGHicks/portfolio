import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal>
          <h2 className="contact-title serif">
            Let&apos;s make <em>something</em> that ships.
          </h2>
          <p className="contact-lede">
            Open to full-time product design roles. Fully remote, based in the
            Tampa area (Eastern Time). Email is fastest, and I read everything.
          </p>
          <a href="mailto:mattghicks@gmail.com" className="contact-email serif">
            mattghicks@gmail.com
          </a>
          <ul className="contact-links">
            <li>
              <a
                href="https://linkedin.com/in/matthicksfl"
                target="_blank"
                rel="noopener noreferrer"
                className="u-link"
              >
                LinkedIn <span aria-hidden>↗</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/matthks/"
                target="_blank"
                rel="noopener noreferrer"
                className="u-link"
              >
                Instagram <span aria-hidden>↗</span>
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
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
