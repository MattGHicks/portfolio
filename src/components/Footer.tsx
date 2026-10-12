import LocalTime from "./LocalTime";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <span>&copy; 2026 Matt Hicks</span>
        <span>
          Designed in Figma, built with{" "}
          <a
            href="https://claude.com/claude-code"
            target="_blank"
            rel="noopener noreferrer"
          >
            Claude Code
          </a>
        </span>
        <LocalTime />
      </div>
    </footer>
  );
}
