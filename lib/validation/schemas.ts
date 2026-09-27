import { z } from "zod";

// Shared building blocks -----------------------------------------------------

const slug = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only");

const optionalUrl = z
  .string()
  .trim()
  .url("Must be a valid URL")
  .optional()
  .or(z.literal("").transform(() => undefined));

const optionalText = z
  .string()
  .trim()
  .optional()
  .or(z.literal("").transform(() => undefined));

/** Textareas store one item per line in the form; this turns that into a clean string[]. */
const lineList = z
  .string()
  .optional()
  .transform((val) =>
    val
      ? val
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : []
  );

const optionalLineList = lineList.transform((arr) => (arr.length > 0 ? arr : undefined));

// Projects --------------------------------------------------------------------

export const projectSchema = z.object({
  slug,
  name: z.string().trim().min(1, "Name is required").max(120),
  shortDescription: z.string().trim().min(1, "Short description is required").max(300),
  category: z.string().trim().min(1, "Category is required").max(80),
  duration: z.string().trim().min(1, "Duration is required").max(60),
  status: optionalText,
  techStack: lineList,
  github: optionalUrl,
  liveDemo: optionalUrl,
  featured: z.coerce.boolean().default(false),
  published: z.coerce.boolean().default(true),
  problem: optionalText,
  solution: optionalText,
  features: optionalLineList,
  howItWorks: optionalText,
  challenges: optionalText,
  lessonsLearned: optionalText,
  image: optionalText,
  imageAlt: optionalText,
  sortOrder: z.coerce.number().int().default(0),
});

// GitHub import (Phase 10) ---------------------------------------------------
// Validates the data coming back from lib/github/client.ts before it's
// trusted enough to insert — repository names/descriptions/topics are
// untrusted external input (any GitHub user could set them to anything),
// so this is a real trust boundary, not a formality.

export const githubImportSchema = z.object({
  githubRepoId: z.coerce.number().int().positive(),
  githubOwner: z.string().trim().min(1).max(80),
  githubRepoName: z.string().trim().min(1).max(120),
  githubDefaultBranch: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(120),
  shortDescription: z.string().trim().max(300).optional().default(""),
  github: z.string().trim().url(),
  liveDemo: optionalUrl,
  techStack: z.array(z.string().trim().min(1).max(60)).max(20).default([]),
  force: z.coerce.boolean().default(false),
});

// Skill areas -------------------------------------------------------------

export const skillAreaSchema = z.object({
  slug,
  title: z.string().trim().min(1, "Title is required").max(120),
  description: optionalText,
  skills: lineList,
  sortOrder: z.coerce.number().int().default(0),
});

// Tool groups + tools -------------------------------------------------------

export const toolGroupSchema = z.object({
  slug,
  title: z.string().trim().min(1, "Title is required").max(120),
  sortOrder: z.coerce.number().int().default(0),
});

export const toolSchema = z.object({
  toolGroupId: z.string().uuid("Choose a tool group"),
  name: z.string().trim().min(1, "Name is required").max(120),
  projectSlugs: optionalLineList,
  sortOrder: z.coerce.number().int().default(0),
});

// Experience ------------------------------------------------------------------

export const experienceSchema = z.object({
  slug,
  organization: z.string().trim().min(1, "Organization is required").max(120),
  role: z.string().trim().min(1, "Role is required").max(120),
  duration: z.string().trim().min(1, "Duration is required").max(60),
  status: z.enum(["ongoing", "completed"]),
  description: z.string().trim().min(1, "Description is required").max(600),
  type: optionalText,
  location: optionalText,
  organizationUrl: optionalUrl,
  responsibilities: optionalLineList,
  achievements: optionalLineList,
  technologies: optionalLineList,
  sortOrder: z.coerce.number().int().default(0),
});

// Certifications ----------------------------------------------------------

export const certificationSchema = z.object({
  slug,
  title: z.string().trim().min(1, "Title is required").max(150),
  issuer: z.string().trim().min(1, "Issuer is required").max(150),
  date: z.string().trim().min(1, "Date is required").max(60),
  category: z.enum(["Professional Development", "Technical Training"]),
  credentialId: optionalText,
  credentialUrl: optionalUrl,
  certificateImage: optionalText,
  certificatePdf: optionalText,
  description: optionalText,
  skills: optionalLineList,
  sortOrder: z.coerce.number().int().default(0),
});

// Education -----------------------------------------------------------------

export const educationSchema = z.object({
  slug,
  institution: z.string().trim().min(1, "Institution is required").max(200),
  degree: z.string().trim().min(1, "Degree is required").max(200),
  period: optionalText,
  location: optionalText,
  link: optionalUrl,
  coursework: optionalLineList,
  gpa: optionalText,
  sortOrder: z.coerce.number().int().default(0),
});
