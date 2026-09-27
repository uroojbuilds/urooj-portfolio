"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { projectSchema } from "@/lib/validation/schemas";
import { requireAdminOrThrow } from "@/lib/auth/require-admin";

export type ActionState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};

function parseForm(formData: FormData) {
  return projectSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    shortDescription: formData.get("shortDescription"),
    category: formData.get("category"),
    duration: formData.get("duration"),
    status: formData.get("status"),
    techStack: formData.get("techStack"),
    github: formData.get("github"),
    liveDemo: formData.get("liveDemo"),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    problem: formData.get("problem"),
    solution: formData.get("solution"),
    features: formData.get("features"),
    howItWorks: formData.get("howItWorks"),
    challenges: formData.get("challenges"),
    lessonsLearned: formData.get("lessonsLearned"),
    image: formData.get("image"),
    imageAlt: formData.get("imageAlt"),
    sortOrder: formData.get("sortOrder") || 0,
  });
}

function revalidateProjectRoutes() {
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function createProject(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await db.insert(projects).values(parsed.data);
  } catch (err) {
    // Never leak raw DB error text (e.g. constraint internals) to the admin UI.
    const message =
      err instanceof Error && err.message.includes("unique")
        ? "That slug is already in use."
        : "Could not save the project. Please try again.";
    return { success: false, message };
  }

  revalidateProjectRoutes();
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();

  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await db
      .update(projects)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(projects.id, id));
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("unique")
        ? "That slug is already in use."
        : "Could not save the project. Please try again.";
    return { success: false, message };
  }

  revalidateProjectRoutes();
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdminOrThrow();
  await db.delete(projects).where(eq(projects.id, id));
  revalidateProjectRoutes();
}

export async function togglePublished(id: string, published: boolean) {
  await requireAdminOrThrow();
  await db
    .update(projects)
    .set({ published, updatedAt: new Date() })
    .where(eq(projects.id, id));
  revalidateProjectRoutes();
}
