"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionState } from "@/lib/actions/projects";
import type { ToolGroup } from "@/lib/db/schema-types";

const initialState: ActionState = { success: false };

export function ToolGroupForm({
  action,
  group,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  group?: ToolGroup;
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
          <input id="title" name="title" defaultValue={group?.title} className={inputClass} required />
        </FormField>
        <FormField label="Slug" name="slug" error={errors.slug} hint="lowercase-with-hyphens">
          <input id="slug" name="slug" defaultValue={group?.slug} className={inputClass} required />
        </FormField>
      </div>

      <FormField label="Sort order" name="sortOrder" error={errors.sortOrder}>
        <input
          id="sortOrder"
          name="sortOrder"
          type="number"
          defaultValue={group?.sortOrder ?? 0}
          className={`${inputClass} w-24`}
        />
      </FormField>

      <SubmitButton label={group ? "Save changes" : "Create tool group"} />
    </form>
  );
}
