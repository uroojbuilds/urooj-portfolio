"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { experience } from "@/lib/db/schema";
import { experienceSchema } from "@/lib/validation/schemas";
import { requireAdminOrThrow } from "@/lib/auth/require-admin";
import type { ActionState } from "@/lib/actions/projects";

function parseForm(formData: FormData) {
  return experienceSchema.safeParse({
    slug: formData.get("slug"),
    organization: formData.get("organization"),
    role: formData.get("role"),
    duration: formData.get("duration"),
    status: formData.get("status"),
    description: formData.get("description"),
    type: formData.get("type"),
    location: formData.get("location"),
    organizationUrl: formData.get("organizationUrl"),
    responsibilities: formData.get("responsibilities"),
    achievements: formData.get("achievements"),
    technologies: formData.get("technologies"),
    sortOrder: formData.get("sortOrder") || 0,
  });
}

function revalidateExperienceRoutes() {
  revalidatePath("/");
  revalidatePath("/admin/experience");
}

export async function createExperience(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = parseForm(formData);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.insert(experience).values(parsed.data);
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateExperienceRoutes();
  redirect("/admin/experience");
}

export async function updateExperience(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = parseForm(formData);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.update(experience).set({ ...parsed.data, updatedAt: new Date() }).where(eq(experience.id, id));
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateExperienceRoutes();
  redirect("/admin/experience");
}

export async function deleteExperience(id: string) {
  await requireAdminOrThrow();
  await db.delete(experience).where(eq(experience.id, id));
  revalidateExperienceRoutes();
}
