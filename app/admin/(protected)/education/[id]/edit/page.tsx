import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { education } from "@/lib/db/schema";
import { EducationForm } from "@/app/admin/(protected)/education/EducationForm";
import { updateEducation } from "@/lib/actions/education";

export default async function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [entry] = await db.select().from(education).where(eq(education.id, id));
  if (!entry) notFound();

  const action = updateEducation.bind(null, id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Edit education entry</h1>
      <div className="mt-6">
        <EducationForm action={action} entry={entry} />
      </div>
    </div>
  );
}
