export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  /** Optional — omitted rather than guessed when not documented. */
  period?: string;
  location?: string;
  link?: string;
  coursework?: string[];
  gpa?: string | null;
};

export const education: EducationEntry[] = [
  {
    id: "nust",
    institution: "National University of Sciences and Technology (NUST), Pakistan",
    degree: "Bachelor of Engineering — Electrical Engineering",
    period: "Expected 2029",
    coursework: [
      "Programming",
      "Data Analysis",
      "Machine Learning",
      "Circuit Analysis",
      "Hardware Design",
    ],
    gpa: null,
  },
  {
    id: "fg-wah",
    institution: "F.G. Post Graduate College, Wah",
    degree: "FSc",
  },
];
