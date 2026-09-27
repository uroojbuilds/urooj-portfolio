import Link from "next/link";
import { Plus, Pencil, ExternalLink, Github } from "lucide-react";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProject, togglePublished } from "@/lib/actions/projects";

export default async function AdminProjectsPage() {
  let items: Awaited<ReturnType<typeof loadProjects>> = [];
  let dbError: string | null = null;

  async function loadProjects() {
    return db.select().from(projects).orderBy(asc(projects.sortOrder));
  }

  try {
    items = await loadProjects();
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Could not reach the database.";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold text-slate">Projects</h1>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/projects/github"
            className="focus-ring inline-flex items-center gap-2 rounded-btn border border-teal px-4 py-2 text-sm font-medium text-teal hover:bg-teal/5"
          >
            <Github size={16} /> Discover from GitHub
          </Link>
          <Link
            href="/admin/projects/new"
            className="focus-ring inline-flex items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-dark"
          >
            <Plus size={16} /> New project
          </Link>
        </div>
      </div>

      {dbError && (
        <p className="mt-6 rounded-card border border-warning/30 bg-warning/10 p-4 text-sm text-slate">
          Database not reachable: <span className="font-mono text-xs">{dbError}</span>
        </p>
      )}

      {!dbError && items.length === 0 && (
        <p className="mt-6 text-sm text-muted">No projects yet. Create the first one above.</p>
      )}

      <div className="mt-6 space-y-3">
        {items.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-slate">{project.name}</p>
                {project.featured && (
                  <span className="rounded-full bg-teal-tint px-2 py-0.5 text-xs text-teal">Featured</span>
                )}
                {!project.published && (
                  <span className="rounded-full bg-muted/10 px-2 py-0.5 text-xs text-muted">Draft</span>
                )}
              </div>
              <p className="truncate text-sm text-muted">{project.category}</p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <form
                action={async () => {
                  "use server";
                  await togglePublished(project.id, !project.published);
                }}
              >
                <button
                  type="submit"
                  className="focus-ring rounded-btn border border-border px-3 py-1.5 text-xs text-slate hover:bg-teal-tint"
                >
                  {project.published ? "Unpublish" : "Publish"}
                </button>
              </form>
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo for ${project.name}`}
                  className="focus-ring rounded-btn p-2 text-muted hover:bg-teal-tint hover:text-teal"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <Link
                href={`/admin/projects/${project.id}/edit`}
                aria-label={`Edit ${project.name}`}
                className="focus-ring rounded-btn p-2 text-muted hover:bg-teal-tint hover:text-teal"
              >
                <Pencil size={16} />
              </Link>
              <DeleteButton
                label={project.name}
                onDelete={async () => {
                  "use server";
                  await deleteProject(project.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
