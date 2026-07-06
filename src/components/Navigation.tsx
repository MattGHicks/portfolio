import Link from "next/link";

interface NavigationProps {
  isHomepage?: boolean;
}

export default function Navigation({ isHomepage = false }: NavigationProps) {
  const prefix = isHomepage ? "" : "/";

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          Matt Hicks
        </Link>
        <div className="nav-links">
          <Link href={`${prefix}#work`} className="nav-link">
            Work
          </Link>
          <Link href={`${prefix}#process`} className="nav-link">
            Process
          </Link>
          <Link href={`${prefix}#about`} className="nav-link">
            About
          </Link>
          <Link href={`${prefix}#contact`} className="nav-link">
            Contact
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume"
          >
            <span className="nav-dot" aria-hidden />
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
