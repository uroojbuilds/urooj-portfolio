"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionState } from "@/lib/actions/projects";
import type { Certification } from "@/lib/db/schema-types";

const initialState: ActionState = { success: false };

export function CertificationForm({
  action,
  cert,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  cert?: Certification;
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
        <FormField label="Title" name="title" error={errors.title}>
          <input id="title" name="title" defaultValue={cert?.title} className={inputClass} required />
        </FormField>
        <FormField label="Slug" name="slug" error={errors.slug} hint="lowercase-with-hyphens">
          <input id="slug" name="slug" defaultValue={cert?.slug} className={inputClass} required />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Issuer" name="issuer" error={errors.issuer}>
          <input id="issuer" name="issuer" defaultValue={cert?.issuer} className={inputClass} required />
        </FormField>
        <FormField label="Date" name="date" error={errors.date}>
          <input id="date" name="date" defaultValue={cert?.date} className={inputClass} required />
        </FormField>
      </div>

      <FormField label="Category" name="category" error={errors.category}>
        <select id="category" name="category" defaultValue={cert?.category ?? "Technical Training"} className={inputClass}>
          <option value="Technical Training">Technical Training</option>
          <option value="Professional Development">Professional Development</option>
        </select>
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Credential ID" name="credentialId" error={errors.credentialId} hint="Optional">
          <input id="credentialId" name="credentialId" defaultValue={cert?.credentialId ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Credential URL" name="credentialUrl" error={errors.credentialUrl} hint="Optional">
          <input id="credentialUrl" name="credentialUrl" defaultValue={cert?.credentialUrl ?? ""} className={inputClass} />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Certificate image path" name="certificateImage" error={errors.certificateImage} hint="Optional">
          <input id="certificateImage" name="certificateImage" defaultValue={cert?.certificateImage ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Certificate PDF path" name="certificatePdf" error={errors.certificatePdf} hint="Optional">
          <input id="certificatePdf" name="certificatePdf" defaultValue={cert?.certificatePdf ?? ""} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Description" name="description" error={errors.description} hint="Optional">
        <textarea id="description" name="description" defaultValue={cert?.description ?? ""} rows={3} className={inputClass} />
      </FormField>
      <FormField label="Skills / topics" name="skills" error={errors.skills} hint="Optional — one per line">
        <textarea id="skills" name="skills" defaultValue={cert?.skills?.join("\n")} rows={3} className={inputClass} />
      </FormField>

      <FormField label="Sort order" name="sortOrder" error={errors.sortOrder}>
        <input id="sortOrder" name="sortOrder" type="number" defaultValue={cert?.sortOrder ?? 0} className={`${inputClass} w-24`} />
      </FormField>

      <SubmitButton label={cert ? "Save changes" : "Create certification"} />
    </form>
  );
}
