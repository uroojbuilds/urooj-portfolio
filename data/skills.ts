// Skill areas answer "what technical areas do I work in" — conceptual
// domains, not tool names. Tools (below) answer "what have I actually used."

export type SkillArea = {
  id: string;
  title: string;
  description: string;
  skills: string[];
};

export const skillAreas: SkillArea[] = [
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    description:
      "Core focus — from classical ML through generative and retrieval-based systems.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Generative AI",
      "NLP",
      "Computer Vision",
      "RAG",
    ],
  },
  {
    id: "software",
    title: "Software Development",
    description: "Languages and interfaces used to turn models into working apps.",
    skills: ["Python", "C++", "REST APIs"],
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering",
    // Sourced from data/education.ts coursework — not a separate claim.
    description: "The hardware foundation behind the degree at NUST.",
    skills: ["Circuit Analysis", "Hardware Design"],
  },
];

// Tools/technologies actually used — grouped, with project links only where
// a project's own documented techStack (data/projects.ts) supports it.
// Tools with no linked project are still real, existing stated skills; they
// just aren't tied to a specific documented project in this repository yet.
export type Tool = {
  id: string;
  name: string;
  /** Project slugs from data/projects.ts whose techStack documents this tool. */
  projectSlugs?: string[];
};

export type ToolGroup = {
  id: string;
  title: string;
  tools: Tool[];
};

export const toolGroups: ToolGroup[] = [
  {
    id: "languages",
    title: "Languages",
    tools: [
      {
        id: "python",
        name: "Python",
        projectSlugs: [
          "diabetescare-ai",
          "weapon-detection",
          "customer-churn-prediction",
          "movie-recommendation-system",
          "student-performance-prediction",
        ],
      },
      { id: "cpp", name: "C++" },
    ],
  },
  {
    id: "ai-ml-stack",
    title: "AI / ML Libraries & Platforms",
    tools: [
      { id: "scikit-learn", name: "Scikit-learn", projectSlugs: ["diabetescare-ai", "customer-churn-prediction"] },
      { id: "pandas", name: "Pandas" },
      { id: "numpy", name: "NumPy" },
      { id: "matplotlib", name: "Matplotlib" },
      { id: "seaborn", name: "Seaborn" },
      { id: "tensorflow", name: "TensorFlow / Keras" },
      { id: "opencv", name: "OpenCV", projectSlugs: ["weapon-detection"] },
      { id: "huggingface", name: "HuggingFace Embeddings", projectSlugs: ["docmind-ai"] },
      { id: "pinecone", name: "Pinecone", projectSlugs: ["docmind-ai"] },
      { id: "groq", name: "Groq (LLaMA 3.3 / Whisper)", projectSlugs: ["docmind-ai"] },
    ],
  },
  {
    id: "apps-deployment",
    title: "Frameworks & Deployment",
    tools: [
      { id: "fastapi", name: "FastAPI", projectSlugs: ["docmind-ai"] },
      { id: "streamlit", name: "Streamlit", projectSlugs: ["diabetescare-ai"] },
      { id: "rest-apis", name: "REST APIs", projectSlugs: ["docmind-ai"] },
      { id: "web-speech-api", name: "Web Speech API", projectSlugs: ["docmind-ai"] },
      { id: "netlify", name: "Netlify" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering Tools",
    tools: [
      { id: "autocad", name: "AutoCAD" },
      { id: "ltspice", name: "LTSpice" },
      { id: "proteus", name: "Proteus" },
    ],
  },
  {
    id: "workflow",
    title: "Workflow",
    tools: [
      { id: "git", name: "Git" },
      { id: "github", name: "GitHub" },
      { id: "vscode", name: "VS Code" },
    ],
  },
];

export const softSkills = [
  "Communication",
  "Presentation",
  "Data Storytelling",
  "Team Collaboration",
];
