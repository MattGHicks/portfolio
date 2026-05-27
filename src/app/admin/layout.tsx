import "./admin.css";

export const metadata = {
  title: "Career Ops — digitalfish.io",
  description: "Private career operations dashboard for Matt Hicks.",
  robots: { index: false, follow: false },
};

export default function AdminOuterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
