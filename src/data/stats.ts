import { goldCount, totalDesignerOfRecord } from "./awards";

export type Stat = {
  number: string;
  label: string;
  detail: string;
};

export const stats: Stat[] = [
  {
    number: "3+",
    label: "Years of experience in Figma",
    detail:
      "Design Systems · Components · Auto Layout · Dev Mode · Variables · Prototyping",
  },
  {
    number: "190+",
    label: "Government websites shipped",
    detail: "From discovery through developer handoff",
  },
  {
    number: `${goldCount}×`,
    label: "Gold Horizon Awards as designer of record",
    detail: `${totalDesignerOfRecord} total wins across 2024–2025 · plus 4 team wins`,
  },
  {
    number: "4+",
    label: "AI tools in daily workflow",
    detail: "Claude · Figma AI · MCP · Make",
  },
];
