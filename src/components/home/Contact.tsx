import Clip from "@/components/Clip";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="cin-contact">
      <div className="cin-contact-media">
        <Clip src="/video/home/ambient.mp4" poster="/video/home/ambient.jpg" />
      </div>
      <Reveal className="cin-contact-inner">
        <div>
          <h2 className="cin-contact-heading">
            Let&apos;s work
            <br />
            together.
          </h2>
          <p className="cin-contact-sub">
            Open to full-time product designer roles. Remote preferred, Tampa
            area also open.
          </p>
        </div>
        <div className="cin-contact-links">
          <a className="cin-contact-link" href="mailto:matt@digitalfish.io">
            <span className="cin-contact-link-label">Email</span>
            <span className="cin-contact-link-value">matt@digitalfish.io</span>
          </a>
          <a
            className="cin-contact-link"
            href="https://linkedin.com/in/matthicksfl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cin-contact-link-label">LinkedIn</span>
            <span className="cin-contact-link-value">
              linkedin.com/in/matthicksfl
            </span>
          </a>
          <a
            className="cin-contact-link"
            href="https://www.instagram.com/matthks/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cin-contact-link-label">Instagram</span>
            <span className="cin-contact-link-value">instagram.com/matthks</span>
          </a>
          <a
            className="cin-contact-link"
            href="https://digitalfish.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="cin-contact-link-label">Site</span>
            <span className="cin-contact-link-value">digitalfish.io</span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
