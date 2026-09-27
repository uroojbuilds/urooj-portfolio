import Link from "next/link";
import { asc } from "drizzle-orm";
import { Plus, Pencil } from "lucide-react";
import { db } from "@/lib/db";
import { certifications } from "@/lib/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCertification } from "@/lib/actions/certifications";

export default async function AdminCertificationsPage() {
  let items: Awaited<ReturnType<typeof load>> = [];
  let dbError: string | null = null;

  async function load() {
    return db.select().from(certifications).orderBy(asc(certifications.sortOrder));
  }

  try {
    items = await load();
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Could not reach the database.";
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold text-slate">Certifications</h1>
        <Link href="/admin/certifications/new" className="focus-ring inline-flex items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-dark">
          <Plus size={16} /> New certification
        </Link>
      </div>

      {dbError && (
        <p className="mt-6 rounded-card border border-warning/30 bg-warning/10 p-4 text-sm text-slate">
          Database not reachable: <span className="font-mono text-xs">{dbError}</span>
        </p>
      )}
      {!dbError && items.length === 0 && <p className="mt-6 text-sm text-muted">No certifications yet.</p>}

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="font-medium text-slate">{item.title}</p>
              <p className="truncate text-sm text-muted">{item.issuer} · {item.date}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <Link href={`/admin/certifications/${item.id}/edit`} aria-label={`Edit ${item.title}`} className="focus-ring rounded-btn p-2 text-muted hover:bg-teal-tint hover:text-teal">
                <Pencil size={16} />
              </Link>
              <DeleteButton
                label={item.title}
                onDelete={async () => {
                  "use server";
                  await deleteCertification(item.id);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
