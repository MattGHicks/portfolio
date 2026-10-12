import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "@/styles/home.css";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main" className="hero hero--404">
        <div className="container">
          <p className="hero-kicker label">404 · not in the index</p>
          <h1 className="hero-statement serif">
            <span className="hero-line">
              <span className="hero-line-in">
                Nothing <em>here</em>.
              </span>
            </span>
          </h1>
          <div className="hero-row">
            <p className="hero-lede">
              This page doesn&apos;t exist, or it was revised away. The work is
              still where it should be.
            </p>
            <ul className="hero-links">
              <li>
                <Link href="/" className="u-link">
                  Back to the homepage <span aria-hidden>→</span>
                </Link>
              </li>
              <li>
                <Link href="/#work" className="u-link">
                  See the work <span aria-hidden>→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
