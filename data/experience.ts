export type ExperienceItem = {
  id: string;
  organization: string;
  role: string;
  duration: string;
  status: "ongoing" | "completed";
  description: string;
  /** Only set when explicitly documented elsewhere — never inferred from `role`. */
  type?: string;
  location?: string;
  organizationUrl?: string;
  responsibilities?: string[];
  achievements?: string[];
  technologies?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "flyrank",
    organization: "FlyRank",
    role: "AI/ML Intern",
    duration: "2026 — Present",
    status: "ongoing",
    description:
      "Building and testing machine learning models as part of the AI/ML team.",
  },
  {
    id: "alkhidmat-foundation",
    organization: "Alkhidmat Foundation",
    role: "Welfare Intern",
    duration: "2026 — Present",
    status: "completed",
    description: "Contributing to welfare and community support initiatives.",
  },
];
