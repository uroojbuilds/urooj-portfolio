export type Project = {
  slug: string;
  name: string;
  category: string;
  featured: boolean;
  duration: string;
  /** Only set if explicitly documented — not inferred from `duration`. */
  status?: string;
  shortDescription: string;
  problem?: string;
  solution?: string;
  /** Plain-language walkthrough of the architecture/workflow, if documented. */
  howItWorks?: string;
  techStack: string[];
  features?: string[];
  challenges?: string;
  lessonsLearned?: string;
  github?: string;
  liveDemo?: string;
  /** Real screenshot path, only if one exists in /public. None do yet — every
   *  project currently renders the generated fallback visual instead. */
  image?: string;
  imageAlt?: string;
};

export const projects: Project[] = [
  {
    slug: "docmind-ai",
    name: "DocMind AI",
    category: "Generative AI / NLP",
    featured: true,
    duration: "2024 — 2025",
    shortDescription:
      "A Retrieval-Augmented Generation (RAG) chatbot that answers questions from uploaded documents, with voice input and output support.",
    problem:
      "Finding specific information inside long documents is slow — people either read the whole thing or search blindly with Ctrl+F.",
    solution:
      "An end-to-end NLP pipeline that ingests a document, chunks and embeds it, and uses an LLM to generate grounded answers to natural-language questions — including by voice.",
    techStack: [
      "FastAPI",
      "Groq LLaMA 3.3",
      "Pinecone",
      "HuggingFace Embeddings",
      "Groq Whisper",
      "Web Speech API",
    ],
    features: [
      "Document ingestion, chunking, and embedding pipeline",
      "LLM-based response generation grounded in the uploaded document",
      "Voice input and output (Groq Whisper + Web Speech API)",
      "Agent routing layer: falls back to web search when the document doesn't contain the answer",
    ],
    challenges:
      "Getting retrieval to reliably ground answers in the right chunks, and routing between document search and web fallback without confusing the two.",
    lessonsLearned:
      "Hands-on experience building a full RAG pipeline end to end, from ingestion through generation, and adding an agent layer on top of a simple Q&A system.",
    github: "https://github.com/uroojbuilds/Docmind-Ai",
    liveDemo: "https://docmindaichatbot.netlify.app",
  },
  {
    slug: "diabetescare-ai",
    name: "DiabetesCare AI",
    category: "Machine Learning / Health",
    featured: true,
    duration: "2024 — 2025",
    shortDescription:
      "A full-stack AI health assistant where users input lab values or paste reports and receive diabetes risk predictions.",
    problem:
      "Understanding diabetes risk from lab reports usually requires a doctor's interpretation, which isn't always immediately accessible.",
    solution:
      "A Logistic Regression model trained on health data, wrapped in a bilingual (English/Urdu) Streamlit app that takes lab values and returns a risk prediction.",
    techStack: ["Python", "Streamlit", "Scikit-learn", "Logistic Regression"],
    features: [
      "Manual lab value entry or pasted report input",
      "Full preprocessing pipeline: EDA, feature engineering, model evaluation",
      "Bilingual UI (English/Urdu)",
      "Deployed as a live public web app",
    ],
    challenges:
      "Building a clean preprocessing pipeline that handles messy, inconsistently formatted lab report input.",
    lessonsLearned:
      "Practical experience taking a model from training through deployment as an actual usable product, not just a notebook.",
    github: "https://github.com/uroojbuilds/Diabetes-Care-Ai",
    liveDemo:
      "https://your-health-assistent-c5bgjggd7xtabmvozv3qxt.streamlit.app",
  },
  {
    slug: "weapon-detection",
    name: "Weapon Detection System",
    category: "Computer Vision",
    featured: true,
    duration: "2024",
    shortDescription:
      "A real-time weapon detection model built with deep learning and computer vision techniques.",
    problem:
      "Manually monitoring video feeds for weapons is slow and error-prone.",
    solution:
      "A deep learning object detection model trained on custom datasets to identify weapons in real time.",
    techStack: ["Python", "OpenCV", "Deep Learning", "Object Detection"],
    features: [
      "Real-time detection pipeline",
      "Image preprocessing and augmentation",
      "Model fine-tuning and evaluation on custom datasets",
    ],
    challenges:
      "Working with limited custom dataset size while keeping the model accurate and fast enough for real-time use.",
    lessonsLearned:
      "Deepened understanding of the full computer vision workflow: data prep, training, fine-tuning, and evaluation.",
    github: "https://github.com/uroojbuilds/Computer-Vision",
  },
  {
    slug: "customer-churn-prediction",
    name: "Customer Churn Prediction",
    category: "Machine Learning",
    featured: false,
    duration: "2024",
    shortDescription:
      "A classification model predicting customer churn using feature selection and ensemble methods, tuned via cross-validation.",
    techStack: ["Python", "Scikit-learn", "Classification"],
  },
  {
    slug: "movie-recommendation-system",
    name: "Movie Recommendation System",
    category: "NLP / Recommender Systems",
    featured: false,
    duration: "2024",
    shortDescription:
      "A content-based and collaborative filtering recommendation engine, with NLP-based review analysis for sentiment-driven recommendations.",
    techStack: ["Python", "Collaborative Filtering", "NLP"],
  },
  {
    slug: "student-performance-prediction",
    name: "Student Performance Prediction",
    category: "Data Analysis",
    featured: false,
    duration: "2024",
    shortDescription:
      "Regression models analyzing academic performance factors, with a full data cleaning and EDA pipeline.",
    techStack: ["Python", "Regression", "Data Analysis"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
