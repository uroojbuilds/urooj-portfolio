import { EducationForm } from "@/app/admin/(protected)/education/EducationForm";
import { createEducation } from "@/lib/actions/education";

export default function NewEducationPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">New education entry</h1>
      <div className="mt-6">
        <EducationForm action={createEducation} />
      </div>
    </div>
  );
}
