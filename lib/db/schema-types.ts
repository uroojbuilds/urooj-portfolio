import type { InferSelectModel } from "drizzle-orm";
import {
  projects,
  skillAreas,
  toolGroups,
  tools,
  experience,
  certifications,
  education,
} from "@/lib/db/schema";

export type Project = InferSelectModel<typeof projects>;
export type SkillArea = InferSelectModel<typeof skillAreas>;
export type ToolGroup = InferSelectModel<typeof toolGroups>;
export type Tool = InferSelectModel<typeof tools>;
export type Experience = InferSelectModel<typeof experience>;
export type Certification = InferSelectModel<typeof certifications>;
export type Education = InferSelectModel<typeof education>;
