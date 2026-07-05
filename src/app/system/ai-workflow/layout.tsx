import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AI-Augmented Design Workflow — Matt Hicks",
  description:
    "Building a personal AI-native design system — Claude Code, Figma AI, MCP servers, and Make automations working in concert. Multi-hour tasks reduced to minutes.",
};

export default function AIWorkflowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
