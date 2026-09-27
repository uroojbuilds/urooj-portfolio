import { ExperienceForm } from "@/app/admin/(protected)/experience/ExperienceForm";
import { createExperience } from "@/lib/actions/experience";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">New experience entry</h1>
      <div className="mt-6">
        <ExperienceForm action={createExperience} />
      </div>
    </div>
  );
}
