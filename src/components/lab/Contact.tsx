import Reveal from "@/components/home/Reveal";

const LINKS = [
  { label: "Email", value: "matt@digitalfish.io", href: "mailto:matt@digitalfish.io", external: false },
  { label: "LinkedIn", value: "linkedin.com/in/matthicksfl", href: "https://linkedin.com/in/matthicksfl", external: true },
  { label: "Instagram", value: "instagram.com/matthks", href: "https://www.instagram.com/matthks/", external: true },
  { label: "Site", value: "digitalfish.io", href: "https://digitalfish.io", external: true },
];

export default function Contact() {
  return (
    <section className="lab2-contact" id="contact">
      <Reveal className="lab2-contact-inner">
        <div className="lab2-contact-lead">
          <p className="lab2-eyebrow">Contact</p>
          <h2 className="lab2-contact-title">
            Let&apos;s build
            <br />
            something <em>real</em>.
          </h2>
          <p className="lab2-contact-sub">
            Open to full-time product designer roles. Remote preferred, Tampa
            area also open.
          </p>
        </div>

        <div className="lab2-contact-links">
          {LINKS.map((l) => (
            <a
              key={l.label}
              className="lab2-contact-link"
              href={l.href}
              data-cursor="open"
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span className="lab2-contact-link-label">{l.label}</span>
              <span className="lab2-contact-link-value">{l.value}</span>
              <span className="lab2-contact-link-arrow">↗</span>
            </a>
          ))}
        </div>
      </Reveal>

      <footer className="lab2-footer">
        <span>© 2026 Matt Hicks</span>
        <span>Art-directed by Matt · WebGL + Claude Code</span>
      </footer>
    </section>
  );
}
