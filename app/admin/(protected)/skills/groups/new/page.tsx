import { ToolGroupForm } from "@/app/admin/(protected)/skills/groups/ToolGroupForm";
import { createToolGroup } from "@/lib/actions/skills";

export default function NewToolGroupPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold text-slate">New tool group</h1>
      <div className="mt-6">
        <ToolGroupForm action={createToolGroup} />
      </div>
    </div>
  );
}
