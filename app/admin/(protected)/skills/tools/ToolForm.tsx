"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionState } from "@/lib/actions/projects";
import type { Tool, ToolGroup } from "@/lib/db/schema-types";

const initialState: ActionState = { success: false };

export function ToolForm({
  action,
  tool,
  groups,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  tool?: Tool;
  groups: ToolGroup[];
}) {
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="max-w-xl space-y-5">
      {state.message && (
        <p role="alert" className="rounded-btn bg-error/10 px-4 py-3 text-sm text-error">
          {state.message}
        </p>
      )}

      <FormField label="Tool group" name="toolGroupId" error={errors.toolGroupId}>
        <select
          id="toolGroupId"
          name="toolGroupId"
          defaultValue={tool?.toolGroupId ?? ""}
          className={inputClass}
          required
        >
          <option value="" disabled>
            Choose a group
          </option>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.title}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Name" name="name" error={errors.name}>
        <input id="name" name="name" defaultValue={tool?.name} className={inputClass} required />
      </FormField>

      <FormField
        label="Related project slugs"
        name="projectSlugs"
        error={errors.projectSlugs}
        hint="Optional — one project slug per line, must match an existing project's slug"
      >
        <textarea
          id="projectSlugs"
          name="projectSlugs"
          defaultValue={tool?.projectSlugs?.join("\n")}
          rows={3}
          className={inputClass}
        />
      </FormField>

      <FormField label="Sort order" name="sortOrder" error={errors.sortOrder}>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={tool?.sortOrder ?? 0}
          className={`${inputClass} w-24`}
        />
      </FormField>

      <SubmitButton label={tool ? "Save changes" : "Create tool"} />
    </form>
  );
}
