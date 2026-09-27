export const profile = {
  name: "Urooj Fatima",
  displayName: "Urooj Fatima",
  headline: "Electrical Engineering Student @ NUST | AI/ML Developer",
  mission:
    "Building intelligent systems at the intersection of hardware and software.",
  bio: "I chose Electrical Engineering because my interest in both hardware and software made me curious about the world of robotics and AI. My long-term goal is to build things that run on core technologies — going deeper than the surface layer, toward systems I understand from the ground up.",
  // "Year" is preserved as stated content since nothing in the data layer
  // can safely derive it. Projects/Certifications counts are computed live
  // from data/projects.ts and data/certifications.ts in About.tsx instead of
  // being hardcoded here, so they can't silently go stale (Phase 1 finding).
  stats: [{ label: "Year", value: "2nd Year" }],
  location: "Pakistan",
  email: "Uroojbhatti35@gmail.com",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/uroojbuilds",
    linkedin: "https://www.linkedin.com/in/urooj-fatima-b52495342",
    medium: "https://medium.com/@uroojbhatti35",
    devto: "https://dev.to/codewithurooj",
    youtube: "https://youtube.com/@techwithuroojofficial",
  },
  youtubeStatus: "coming_soon" as const,
};
