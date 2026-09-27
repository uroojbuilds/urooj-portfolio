"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionState } from "@/lib/actions/projects";
import type { Experience } from "@/lib/db/schema-types";

const initialState: ActionState = { success: false };

export function ExperienceForm({
  action,
  entry,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  entry?: Experience;
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
        <FormField label="Organization" name="organization" error={errors.organization}>
          <input id="organization" name="organization" defaultValue={entry?.organization} className={inputClass} required />
        </FormField>
        <FormField label="Slug" name="slug" error={errors.slug} hint="lowercase-with-hyphens">
          <input id="slug" name="slug" defaultValue={entry?.slug} className={inputClass} required />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Role" name="role" error={errors.role}>
          <input id="role" name="role" defaultValue={entry?.role} className={inputClass} required />
        </FormField>
        <FormField label="Duration" name="duration" error={errors.duration} hint='e.g. "2026 — Present"'>
          <input id="duration" name="duration" defaultValue={entry?.duration} className={inputClass} required />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Status" name="status" error={errors.status}>
          <select id="status" name="status" defaultValue={entry?.status ?? "ongoing"} className={inputClass}>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </FormField>
        <FormField label="Type" name="type" error={errors.type} hint="Optional">
          <input id="type" name="type" defaultValue={entry?.type ?? ""} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Description" name="description" error={errors.description}>
        <textarea id="description" name="description" defaultValue={entry?.description} rows={3} className={inputClass} required />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Location" name="location" error={errors.location} hint="Optional">
          <input id="location" name="location" defaultValue={entry?.location ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Organization URL" name="organizationUrl" error={errors.organizationUrl} hint="Optional">
          <input id="organizationUrl" name="organizationUrl" defaultValue={entry?.organizationUrl ?? ""} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Responsibilities" name="responsibilities" error={errors.responsibilities} hint="Optional — one per line">
        <textarea id="responsibilities" name="responsibilities" defaultValue={entry?.responsibilities?.join("\n")} rows={3} className={inputClass} />
      </FormField>
      <FormField label="Highlights / achievements" name="achievements" error={errors.achievements} hint="Optional — one per line">
        <textarea id="achievements" name="achievements" defaultValue={entry?.achievements?.join("\n")} rows={3} className={inputClass} />
      </FormField>
      <FormField label="Technologies" name="technologies" error={errors.technologies} hint="Optional — one per line">
        <textarea id="technologies" name="technologies" defaultValue={entry?.technologies?.join("\n")} rows={3} className={inputClass} />
      </FormField>

      <FormField label="Sort order" name="sortOrder" error={errors.sortOrder}>
        <input id="sortOrder" name="sortOrder" type="number" defaultValue={entry?.sortOrder ?? 0} className={`${inputClass} w-24`} />
      </FormField>

      <SubmitButton label={entry ? "Save changes" : "Create entry"} />
    </form>
  );
}
