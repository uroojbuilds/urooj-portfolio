export type Certification = {
  id: string;
  title: string;
  /** Optional — left unset when not yet documented, rather than guessed. */
  issuer?: string;
  date?: string;
  category?: "Professional Development" | "Technical Training";
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  certificatePdf?: string;
  description?: string;
  skills?: string[];
};

export const certifications: Certification[] = [
  {
    id: "freelancing",
    title: "Freelancing",
    issuer: "DigiSkills.pk / Ignite / Virtual University",
    date: "Aug – Nov 2025",
    category: "Technical Training",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    issuer: "DigiSkills.pk / Ignite / Virtual University",
    date: "Aug – Nov 2025",
    category: "Technical Training",
  },
  {
    id: "idea-to-execution",
    title: "From Idea to Execution",
    issuer: "The Foundry Club, NIC Islamabad (IST Chapter)",
    date: "Jan 2026",
    category: "Professional Development",
  },
  {
    id: "gratitude-journalling",
    title: "Gratitude & Journalling",
    issuer: "Buraaq Psychology Hub",
    date: "Feb 2026",
    category: "Professional Development",
  },
  {
    id: "wordpress-uiux",
    title: "WordPress + UI/UX",
    // Issuer, date, and credential details are not yet documented — left
    // unset rather than guessed, per explicit instruction.
  },
];

export const certificationsNote =
  "More certifications will be added as my learning journey continues.";
