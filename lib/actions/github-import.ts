"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { githubImportSchema } from "@/lib/validation/schemas";
import { requireAdminOrThrow } from "@/lib/auth/require-admin";
import type { GithubRepo } from "@/lib/github/client";

export type ImportState = {
  success: boolean;
  message?: string;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Appends -2, -3, ... until the slug is free — a repo name colliding with
 * an unrelated existing project's slug should never block or silently
 * overwrite it. */
async function uniqueSlug(base: string): Promise<string> {
  let candidate = base || "project";
  let n = 2;
  while (true) {
    const [existing] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.slug, candidate));
    if (!existing) return candidate;
    candidate = `${base}-${n}`;
    n++;
  }
}

/** Called from the discovery page's "Use for Project" button. Every
 * mutation path in this codebase re-verifies admin authorization itself,
 * regardless of what the calling page already checked. */
export async function importRepository(
  repo: GithubRepo,
  force: boolean
): Promise<ImportState> {
  await requireAdminOrThrow();

  const parsed = githubImportSchema.safeParse({
    githubRepoId: repo.id,
    githubOwner: repo.owner,
    githubRepoName: repo.name,
    githubDefaultBranch: repo.defaultBranch,
    name: repo.name,
    shortDescription: repo.description ?? "",
    github: repo.htmlUrl,
    liveDemo: repo.homepage ?? undefined,
    techStack: [repo.language, ...repo.topics].filter(
      (v): v is string => typeof v === "string" && v.length > 0
    ),
    force,
  });

  if (!parsed.success) {
    return { success: false, message: "GitHub returned data that didn't pass validation." };
  }
  const data = parsed.data;

  // Definitive duplicate: this exact repo was already imported. Never
  // create a second row for it — send the admin to the existing draft
  // instead of silently doing nothing or silently duplicating.
  const [existingByRepoId] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(eq(projects.githubRepoId, data.githubRepoId));

  if (existingByRepoId) {
    redirect(`/admin/projects/${existingByRepoId.id}/edit`);
  }

  // Likely-match warning: a project with the same generated slug already
  // exists but isn't linked to this repo ID. Don't silently overwrite it —
  // require the admin to explicitly confirm before creating a second,
  // separately-slugged project.
  const candidateSlug = slugify(data.name);
  if (!force) {
    const [existingBySlug] = await db
      .select({ id: projects.id, name: projects.name })
      .from(projects)
      .where(eq(projects.slug, candidateSlug));
    if (existingBySlug) {
      return {
        success: false,
        message: `A project named "${existingBySlug.name}" already exists with a similar slug. Choose "Import anyway" if this is genuinely a different project.`,
      };
    }
  }

  const finalSlug = await uniqueSlug(candidateSlug);

  const [created] = await db
    .insert(projects)
    .values({
      slug: finalSlug,
      name: data.name,
      shortDescription: data.shortDescription,
      category: "", // Cannot be reliably determined from GitHub — admin fills this in.
      duration: "", // Not derivable from GitHub repo dates — admin fills this in.
      techStack: data.techStack,
      github: data.github,
      liveDemo: data.liveDemo,
      featured: false,
      published: false, // Drafts are never auto-published — see Phase 10 report.
      githubRepoId: data.githubRepoId,
      githubOwner: data.githubOwner,
      githubRepoName: data.githubRepoName,
      githubDefaultBranch: data.githubDefaultBranch,
      githubLastSyncedAt: new Date(),
    })
    .returning({ id: projects.id });

  redirect(`/admin/projects/${created.id}/edit`);
}
