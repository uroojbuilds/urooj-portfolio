"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { education } from "@/lib/db/schema";
import { educationSchema } from "@/lib/validation/schemas";
import { requireAdminOrThrow } from "@/lib/auth/require-admin";
import type { ActionState } from "@/lib/actions/projects";

function parseForm(formData: FormData) {
  return educationSchema.safeParse({
    slug: formData.get("slug"),
    institution: formData.get("institution"),
    degree: formData.get("degree"),
    period: formData.get("period"),
    location: formData.get("location"),
    link: formData.get("link"),
    coursework: formData.get("coursework"),
    gpa: formData.get("gpa"),
    sortOrder: formData.get("sortOrder") || 0,
  });
}

function revalidateEducationRoutes() {
  revalidatePath("/");
  revalidatePath("/admin/education");
}

export async function createEducation(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = parseForm(formData);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.insert(education).values(parsed.data);
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateEducationRoutes();
  redirect("/admin/education");
}

export async function updateEducation(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = parseForm(formData);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.update(education).set({ ...parsed.data, updatedAt: new Date() }).where(eq(education.id, id));
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateEducationRoutes();
  redirect("/admin/education");
}

export async function deleteEducation(id: string) {
  await requireAdminOrThrow();
  await db.delete(education).where(eq(education.id, id));
  revalidateEducationRoutes();
}
