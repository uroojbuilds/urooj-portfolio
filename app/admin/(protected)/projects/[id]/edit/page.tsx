import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { ProjectForm } from "@/app/admin/(protected)/projects/ProjectForm";
import { updateProject } from "@/lib/actions/projects";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.id, id));
  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">Edit project</h1>
      <div className="mt-6">
        <ProjectForm action={action} project={project} />
      </div>
    </div>
  );
}
