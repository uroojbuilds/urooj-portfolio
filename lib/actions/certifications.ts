"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { certifications } from "@/lib/db/schema";
import { certificationSchema } from "@/lib/validation/schemas";
import { requireAdminOrThrow } from "@/lib/auth/require-admin";
import type { ActionState } from "@/lib/actions/projects";

function parseForm(formData: FormData) {
  return certificationSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    date: formData.get("date"),
    category: formData.get("category"),
    credentialId: formData.get("credentialId"),
    credentialUrl: formData.get("credentialUrl"),
    certificateImage: formData.get("certificateImage"),
    certificatePdf: formData.get("certificatePdf"),
    description: formData.get("description"),
    skills: formData.get("skills"),
    sortOrder: formData.get("sortOrder") || 0,
  });
}

function revalidateCertRoutes() {
  revalidatePath("/");
  revalidatePath("/admin/certifications");
}

export async function createCertification(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = parseForm(formData);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.insert(certifications).values(parsed.data);
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateCertRoutes();
  redirect("/admin/certifications");
}

export async function updateCertification(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAdminOrThrow();
  const parsed = parseForm(formData);
  if (!parsed.success) return { success: false, errors: parsed.error.flatten().fieldErrors };

  try {
    await db.update(certifications).set({ ...parsed.data, updatedAt: new Date() }).where(eq(certifications.id, id));
  } catch {
    return { success: false, message: "Could not save. That slug may already exist." };
  }
  revalidateCertRoutes();
  redirect("/admin/certifications");
}

export async function deleteCertification(id: string) {
  await requireAdminOrThrow();
  await db.delete(certifications).where(eq(certifications.id, id));
  revalidateCertRoutes();
}
