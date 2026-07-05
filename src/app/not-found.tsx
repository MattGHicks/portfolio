import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "@/styles/home.css";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main" className="hero" style={{ minHeight: "80vh" }}>
        <p className="hero-status">
          <span
            className="status-dot"
            style={{ background: "var(--accent)" }}
            aria-hidden
          />
          404 — not on the drawing
        </p>
        <div className="hero-name-wrap">
          <h1 className="hero-name">Not found</h1>
        </div>
        <p className="hero-sub">
          This page doesn&apos;t exist — or it was revised away. The work is
          still where it should be.
        </p>
        <div className="hero-links">
          <Link href="/">Back to the homepage</Link>
          <Link href="/#work">View the work</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
