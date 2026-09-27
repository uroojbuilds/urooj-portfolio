import { SkillAreaForm } from "@/app/admin/(protected)/skills/areas/SkillAreaForm";
import { createSkillArea } from "@/lib/actions/skills";

export default function NewSkillAreaPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">New skill area</h1>
      <div className="mt-6">
        <SkillAreaForm action={createSkillArea} />
      </div>
    </div>
  );
}
