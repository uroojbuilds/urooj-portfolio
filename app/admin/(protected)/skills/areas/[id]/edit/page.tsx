import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { skillAreas } from "@/lib/db/schema";
import { SkillAreaForm } from "@/app/admin/(protected)/skills/areas/SkillAreaForm";
import { updateSkillArea } from "@/lib/actions/skills";

export default async function EditSkillAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [area] = await db.select().from(skillAreas).where(eq(skillAreas.id, id));
  if (!area) notFound();

  const action = updateSkillArea.bind(null, id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Edit skill area</h1>
      <div className="mt-6">
        <SkillAreaForm action={action} area={area} />
      </div>
    </div>
  );
}
