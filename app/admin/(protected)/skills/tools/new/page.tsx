import { asc } from "drizzle-orm";
import { db } from "@/lib/db";
import { toolGroups } from "@/lib/db/schema";
import { ToolForm } from "@/app/admin/(protected)/skills/tools/ToolForm";
import { createTool } from "@/lib/actions/skills";

export default async function NewToolPage() {
  const groups = await db.select().from(toolGroups).orderBy(asc(toolGroups.sortOrder));

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">New tool</h1>
      {groups.length === 0 ? (
        <p className="mt-6 text-sm text-muted">
          Create a tool group first before adding a tool to it.
        </p>
      ) : (
        <div className="mt-6">
          <ToolForm action={createTool} groups={groups} />
        </div>
      )}
    </div>
  );
}
