export type AwardLevel = "Gold" | "Silver" | "Bronze" | "Best in Category";
export type AwardRole = "designer-of-record" | "team";

export type Award = {
  year: number;
  level: AwardLevel;
  project: string;
  state: string;
  category: string;
  role: AwardRole;
};

export const awards: Award[] = [
  {
    year: 2024,
    level: "Gold",
    project: "City of Golden",
    state: "CO",
    category: "Towns & Municipalities",
    role: "designer-of-record",
  },
  {
    year: 2025,
    level: "Gold",
    project: "City of Waukesha",
    state: "WI",
    category: "Towns & Municipalities",
    role: "designer-of-record",
  },
  {
    year: 2025,
    level: "Gold",
    project: "City of Gardner",
    state: "KS",
    category: "Towns & Municipalities",
    role: "designer-of-record",
  },
  {
    year: 2025,
    level: "Best in Category",
    project: "City of St. George",
    state: "UT",
    category: "Towns & Municipalities",
    role: "designer-of-record",
  },
  {
    year: 2025,
    level: "Silver",
    project: "Iosco-Arenac District Library",
    state: "MI",
    category: "Government Agency",
    role: "designer-of-record",
  },
  {
    year: 2024,
    level: "Gold",
    project: "Pasco County",
    state: "FL",
    category: "Towns & Municipalities",
    role: "team",
  },
  {
    year: 2024,
    level: "Silver",
    project: "City of Conroe",
    state: "TX",
    category: "Towns & Municipalities",
    role: "team",
  },
  {
    year: 2024,
    level: "Silver",
    project: "Vineyard",
    state: "UT",
    category: "Towns & Municipalities",
    role: "team",
  },
  {
    year: 2024,
    level: "Best in Category",
    project: "Downtown Duluth",
    state: "GA",
    category: "Towns & Municipalities",
    role: "team",
  },
];

export const designerOfRecord = awards.filter((a) => a.role === "designer-of-record");
export const teamWins = awards.filter((a) => a.role === "team");

export const goldCount = designerOfRecord.filter((a) => a.level === "Gold").length;
export const totalDesignerOfRecord = designerOfRecord.length;
