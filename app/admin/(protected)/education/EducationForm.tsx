"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionState } from "@/lib/actions/projects";
import type { Education } from "@/lib/db/schema-types";

const initialState: ActionState = { success: false };

export function EducationForm({
  action,
  entry,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  entry?: Education;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      {state.message && (
        <p role="alert" className="rounded-btn bg-error/10 px-4 py-3 text-sm text-error">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Institution" name="institution" error={errors.institution}>
          <input id="institution" name="institution" defaultValue={entry?.institution} className={inputClass} required />
        </FormField>
        <FormField label="Slug" name="slug" error={errors.slug} hint="lowercase-with-hyphens">
          <input id="slug" name="slug" defaultValue={entry?.slug} className={inputClass} required />
        </FormField>
      </div>

      <FormField label="Degree" name="degree" error={errors.degree}>
        <input id="degree" name="degree" defaultValue={entry?.degree} className={inputClass} required />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Period" name="period" error={errors.period} hint="Optional">
          <input id="period" name="period" defaultValue={entry?.period ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Location" name="location" error={errors.location} hint="Optional">
          <input id="location" name="location" defaultValue={entry?.location ?? ""} className={inputClass} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Link" name="link" error={errors.link} hint="Optional">
          <input id="link" name="link" defaultValue={entry?.link ?? ""} className={inputClass} />
        </FormField>
        <FormField label="GPA" name="gpa" error={errors.gpa} hint="Optional">
          <input id="gpa" name="gpa" defaultValue={entry?.gpa ?? ""} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Coursework" name="coursework" error={errors.coursework} hint="Optional — one per line">
        <textarea id="coursework" name="coursework" defaultValue={entry?.coursework?.join("\n")} rows={4} className={inputClass} />
      </FormField>

      <FormField label="Sort order" name="sortOrder" error={errors.sortOrder}>
        <input id="sortOrder" name="sortOrder" type="number" defaultValue={entry?.sortOrder ?? 0} className={`${inputClass} w-24`} />
      </FormField>

      <SubmitButton label={entry ? "Save changes" : "Create entry"} />
    </form>
  );
}
