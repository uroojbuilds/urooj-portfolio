import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { skillAreas, toolGroups, tools } from "@/lib/db/schema";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkillArea, deleteToolGroup, deleteTool } from "@/lib/actions/skills";

export default async function AdminSkillsPage() {
  let areas: Awaited<ReturnType<typeof loadAreas>> = [];
  let groups: Awaited<ReturnType<typeof loadGroups>> = [];
  let toolItems: Awaited<ReturnType<typeof loadTools>> = [];
  let dbError: string | null = null;

  async function loadAreas() {
    return db.select().from(skillAreas).orderBy(asc(skillAreas.sortOrder));
  }
  async function loadGroups() {
    return db.select().from(toolGroups).orderBy(asc(toolGroups.sortOrder));
  }
  async function loadTools() {
    return db.select().from(tools).orderBy(asc(tools.sortOrder));
  }

  try {
    [areas, groups, toolItems] = await Promise.all([loadAreas(), loadGroups(), loadTools()]);
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Could not reach the database.";
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Skills &amp; Tools</h1>
      <p className="mt-1 text-sm text-muted">
        Skill areas describe what you work in; tools are grouped and reference the actual
        technologies you&apos;ve used.
      </p>

      {dbError && (
        <p className="mt-6 rounded-card border border-warning/30 bg-warning/10 p-4 text-sm text-slate">
          Database not reachable: <span className="font-mono text-xs">{dbError}</span>
        </p>
      )}

      {!dbError && (
        <>
          {/* Skill areas ------------------------------------------------ */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-heading text-lg font-semibold text-slate">Skill Areas</h2>
            <Link
              href="/admin/skills/areas/new"
              className="focus-ring inline-flex items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-dark"
            >
              <Plus size={16} /> New skill area
            </Link>
          </div>

          {areas.length === 0 && (
            <p className="mt-4 text-sm text-muted">No skill areas yet.</p>
          )}

          <div className="mt-4 space-y-3">
            {areas.map((area) => (
              <div
                key={area.id}
                className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-medium text-slate">{area.title}</p>
                  <p className="truncate text-sm text-muted">
                    {area.skills.length} skill{area.skills.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <Link
                    href={`/admin/skills/areas/${area.id}/edit`}
                    aria-label={`Edit ${area.title}`}
                    className="focus-ring rounded-btn p-2 text-muted hover:bg-teal-tint hover:text-teal"
                  >
                    <Pencil size={16} />
                  </Link>
                  <DeleteButton
                    label={area.title}
                    onDelete={async () => {
                      "use server";
                      await deleteSkillArea(area.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tool groups + tools ----------------------------------------- */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-heading text-lg font-semibold text-slate">Tool Groups</h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/skills/tools/new"
                className="focus-ring inline-flex items-center gap-2 rounded-btn border border-teal px-4 py-2 text-sm font-medium text-teal hover:bg-teal/5"
              >
                <Plus size={16} /> New tool
              </Link>
              <Link
                href="/admin/skills/groups/new"
                className="focus-ring inline-flex items-center gap-2 rounded-btn bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-dark"
              >
                <Plus size={16} /> New group
              </Link>
            </div>
          </div>

          {groups.length === 0 && (
            <p className="mt-4 text-sm text-muted">No tool groups yet.</p>
          )}

          <div className="mt-4 space-y-4">
            {groups.map((group) => {
              const groupTools = toolItems.filter((t) => t.toolGroupId === group.id);
              return (
                <div
                  key={group.id}
                  className="rounded-card border border-border bg-surface p-4 shadow-card"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-medium text-slate">{group.title}</p>
                    <div className="flex shrink-0 items-center gap-1">
                      <Link
                        href={`/admin/skills/groups/${group.id}/edit`}
                        aria-label={`Edit ${group.title}`}
                        className="focus-ring rounded-btn p-2 text-muted hover:bg-teal-tint hover:text-teal"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton
                        label={group.title}
                        onDelete={async () => {
                          "use server";
                          await deleteToolGroup(group.id);
                        }}
                      />
                    </div>
                  </div>

                  {groupTools.length === 0 ? (
                    <p className="mt-3 text-sm text-muted">No tools in this group yet.</p>
                  ) : (
                    <ul className="mt-3 space-y-2">
                      {groupTools.map((tool) => (
                        <li
                          key={tool.id}
                          className="flex items-center justify-between gap-3 border-t border-border pt-2 first:border-t-0 first:pt-0"
                        >
                          <span className="min-w-0 truncate text-sm text-slate/80">{tool.name}</span>
                          <div className="flex shrink-0 items-center gap-1">
                            <Link
                              href={`/admin/skills/tools/${tool.id}/edit`}
                              aria-label={`Edit ${tool.name}`}
                              className="focus-ring rounded-btn p-1.5 text-muted hover:bg-teal-tint hover:text-teal"
                            >
                              <Pencil size={14} />
                            </Link>
                            <DeleteButton
                              label={tool.name}
                              onDelete={async () => {
                                "use server";
                                await deleteTool(tool.id);
                              }}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
