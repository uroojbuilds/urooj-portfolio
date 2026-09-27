import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { experience } from "@/lib/db/schema";
import { ExperienceForm } from "@/app/admin/(protected)/experience/ExperienceForm";
import { updateExperience } from "@/lib/actions/experience";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [entry] = await db.select().from(experience).where(eq(experience.id, id));
  if (!entry) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Edit experience entry</h1>
      <div className="mt-6">
        <ExperienceForm action={updateExperience.bind(null, id)} entry={entry} />
      </div>
    </div>
  );
}
