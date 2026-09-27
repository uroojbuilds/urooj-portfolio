import { asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { tools, toolGroups } from "@/lib/db/schema";
import { ToolForm } from "@/app/admin/(protected)/skills/tools/ToolForm";
import { updateTool } from "@/lib/actions/skills";

export default async function EditToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [[tool], groups] = await Promise.all([
    db.select().from(tools).where(eq(tools.id, id)),
    db.select().from(toolGroups).orderBy(asc(toolGroups.sortOrder)),
  ]);
  if (!tool) notFound();

  const action = updateTool.bind(null, id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Edit tool</h1>
      <div className="mt-6">
        <ToolForm action={action} tool={tool} groups={groups} />
      </div>
    </div>
  );
}
