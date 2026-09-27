import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { toolGroups } from "@/lib/db/schema";
import { ToolGroupForm } from "@/app/admin/(protected)/skills/groups/ToolGroupForm";
import { updateToolGroup } from "@/lib/actions/skills";

export default async function EditToolGroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [group] = await db.select().from(toolGroups).where(eq(toolGroups.id, id));
  if (!group) notFound();

  const action = updateToolGroup.bind(null, id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Edit tool group</h1>
      <div className="mt-6">
        <ToolGroupForm action={action} group={group} />
      </div>
    </div>
  );
}
