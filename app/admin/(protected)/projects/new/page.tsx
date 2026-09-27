import { ProjectForm } from "@/app/admin/(protected)/projects/ProjectForm";
import { createProject } from "@/lib/actions/projects";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">New project</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
