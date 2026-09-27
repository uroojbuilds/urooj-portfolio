"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { skillAreas, toolGroups, tools } from "@/lib/db/schema";
import { skillAreaSchema, toolGroupSchema, toolSchema } from "@/lib/validation/schemas";
import { requireAdminOrThrow } from "@/lib/auth/require-admin";
import type { ActionState } from "@/lib/actions/projects";

function revalidateSkillsRoutes() {
  revalidatePath("/");
  revalidatePath("/admin/skills");
}

// Skill areas -----------------------------------------------------------------

export async function createSkillArea(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = skillAreaSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    skills: formData.get("skills"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.insert(skillAreas).values(parsed.data);
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateSkillsRoutes();
  redirect("/admin/skills");
}

export async function updateSkillArea(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = skillAreaSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    description: formData.get("description"),
    skills: formData.get("skills"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.update(skillAreas).set({ ...parsed.data, updatedAt: new Date() }).where(eq(skillAreas.id, id));
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateSkillsRoutes();
  redirect("/admin/skills");
}

export async function deleteSkillArea(id: string) {
  await requireAdminOrThrow();
  await db.delete(skillAreas).where(eq(skillAreas.id, id));
  revalidateSkillsRoutes();
}

// Tool groups ------------------------------------------------------------------

export async function createToolGroup(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = toolGroupSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.insert(toolGroups).values(parsed.data);
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateSkillsRoutes();
  redirect("/admin/skills");
}

export async function updateToolGroup(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = toolGroupSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.update(toolGroups).set(parsed.data).where(eq(toolGroups.id, id));
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateSkillsRoutes();
  redirect("/admin/skills");
}

export async function deleteToolGroup(id: string) {
  await requireAdminOrThrow();
  await db.delete(toolGroups).where(eq(toolGroups.id, id));
  revalidateSkillsRoutes();
}

// Tools ---------------------------------------------------------------------

export async function createTool(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = toolSchema.safeParse({
    toolGroupId: formData.get("toolGroupId"),
    name: formData.get("name"),
    projectSlugs: formData.get("projectSlugs"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  await db.insert(tools).values(parsed.data);
  revalidateSkillsRoutes();
  redirect("/admin/skills");
}

export async function updateTool(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = toolSchema.safeParse({
    toolGroupId: formData.get("toolGroupId"),
    name: formData.get("name"),
    projectSlugs: formData.get("projectSlugs"),
    sortOrder: formData.get("sortOrder") || 0,
  });
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  await db.update(tools).set({ ...parsed.data, updatedAt: new Date() }).where(eq(tools.id, id));
  revalidateSkillsRoutes();
  redirect("/admin/skills");
}

export async function deleteTool(id: string) {
  await requireAdminOrThrow();
  await db.delete(tools).where(eq(tools.id, id));
  revalidateSkillsRoutes();
}
