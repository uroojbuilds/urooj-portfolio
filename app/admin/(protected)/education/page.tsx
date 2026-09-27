import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { education } from "@/lib/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteEducation } from "@/lib/actions/education";

export default async function AdminEducationPage() {
  let items: Awaited<ReturnType<typeof loadEducation>> = [];
  let dbError: string | null = null;

  async function loadEducation() {
    return db.select().from(education).orderBy(asc(education.sortOrder));
  }

  try {
    items = await loadEducation();
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Could not reach the database.";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold text-slate">Education</h1>
        <Link
          href="/admin/education/new"
          className="focus-ring inline-flex items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-dark"
        >
          <Plus size={16} /> New entry
        </Link>
      </div>

      {dbError && (
        <p className="mt-6 rounded-card border border-warning/30 bg-warning/10 p-4 text-sm text-slate">
          Database not reachable: <span className="font-mono text-xs">{dbError}</span>
        </p>
      )}

      {!dbError && items.length === 0 && (
        <p className="mt-6 text-sm text-muted">No education entries yet. Create the first one above.</p>
      )}

      <div className="mt-6 space-y-3">
        {items.map((entry) => (
          <div
            key={entry.id}
            className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="font-medium text-slate">{entry.degree}</p>
              <p className="truncate text-sm text-muted">{entry.institution}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link
                href={`/admin/education/${entry.id}/edit`}
                aria-label={`Edit ${entry.degree}`}
                className="focus-ring rounded-btn p-2 text-muted hover:bg-teal-tint hover:text-teal"
              >
                <Pencil size={16} />
              </Link>
              <DeleteButton
                label={entry.degree}
                onDelete={async () => {
                  "use server";
                  await deleteEducation(entry.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
