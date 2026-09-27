"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionState } from "@/lib/actions/projects";
import type { SkillArea } from "@/lib/db/schema-types";

const initialState: ActionState = { success: false };

export function SkillAreaForm({
  action,
  area,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  area?: SkillArea;
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

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Title" name="title" error={errors.title}>
          <input id="title" name="title" defaultValue={area?.title} className={inputClass} required />
        </FormField>
        <FormField label="Slug" name="slug" error={errors.slug} hint="lowercase-with-hyphens">
          <input id="slug" name="slug" defaultValue={area?.slug} className={inputClass} required />
        </FormField>
      </div>

      <FormField label="Description" name="description" error={errors.description} hint="Optional">
        <textarea
          id="description"
          name="description"
          defaultValue={area?.description ?? ""}
          rows={2}
          className={inputClass}
        />
      </FormField>

      <FormField label="Skills" name="skills" error={errors.skills} hint="One skill per line">
        <textarea
          id="skills"
          name="skills"
          defaultValue={area?.skills?.join("\n")}
          rows={6}
          className={inputClass}
        />
      </FormField>

      <FormField label="Sort order" name="sortOrder" error={errors.sortOrder}>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={area?.sortOrder ?? 0}
          className={`${inputClass} w-24`}
        />
      </FormField>

      <SubmitButton label={area ? "Save changes" : "Create skill area"} />
    </form>
  );
}
