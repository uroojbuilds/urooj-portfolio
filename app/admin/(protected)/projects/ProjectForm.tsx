"use client";

import { useActionState } from "react";
import { FormField, inputClass } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { ActionState } from "@/lib/actions/projects";
import type { Project } from "@/lib/db/schema-types";

const initialState: ActionState = { success: false };

export function ProjectForm({
  action,
  project,
}: {
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  project?: Project;
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
        <FormField label="Name" name="name" error={errors.name}>
          <input id="name" name="name" defaultValue={project?.name} className={inputClass} required />
        </FormField>
        <FormField label="Slug" name="slug" error={errors.slug} hint="lowercase-with-hyphens">
          <input id="slug" name="slug" defaultValue={project?.slug} className={inputClass} required />
        </FormField>
      </div>

      <FormField label="Short description" name="shortDescription" error={errors.shortDescription}>
        <textarea
          id="shortDescription"
          name="shortDescription"
          defaultValue={project?.shortDescription}
          rows={2}
          className={inputClass}
          required
        />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <FormField label="Category" name="category" error={errors.category}>
          <input id="category" name="category" defaultValue={project?.category} className={inputClass} required />
        </FormField>
        <FormField label="Duration" name="duration" error={errors.duration}>
          <input id="duration" name="duration" defaultValue={project?.duration} className={inputClass} required />
        </FormField>
        <FormField label="Status" name="status" error={errors.status} hint="Optional">
          <input id="status" name="status" defaultValue={project?.status ?? ""} className={inputClass} />
        </FormField>
      </div>

      <FormField
        label="Tech stack"
        name="techStack"
        error={errors.techStack}
        hint="One technology per line"
      >
        <textarea
          id="techStack"
          name="techStack"
          defaultValue={project?.techStack?.join("\n")}
          rows={4}
          className={inputClass}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="GitHub URL" name="github" error={errors.github} hint="Optional">
          <input id="github" name="github" defaultValue={project?.github ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Live demo URL" name="liveDemo" error={errors.liveDemo} hint="Optional">
          <input id="liveDemo" name="liveDemo" defaultValue={project?.liveDemo ?? ""} className={inputClass} />
        </FormField>
      </div>

      <FormField label="Problem" name="problem" error={errors.problem} hint="Optional — case study">
        <textarea id="problem" name="problem" defaultValue={project?.problem ?? ""} rows={3} className={inputClass} />
      </FormField>
      <FormField label="Solution" name="solution" error={errors.solution} hint="Optional — case study">
        <textarea id="solution" name="solution" defaultValue={project?.solution ?? ""} rows={3} className={inputClass} />
      </FormField>
      <FormField label="Key features" name="features" error={errors.features} hint="Optional — one per line">
        <textarea
          id="features"
          name="features"
          defaultValue={project?.features?.join("\n")}
          rows={4}
          className={inputClass}
        />
      </FormField>
      <FormField label="How it works" name="howItWorks" error={errors.howItWorks} hint="Optional">
        <textarea
          id="howItWorks"
          name="howItWorks"
          defaultValue={project?.howItWorks ?? ""}
          rows={3}
          className={inputClass}
        />
      </FormField>
      <FormField label="Challenges" name="challenges" error={errors.challenges} hint="Optional">
        <textarea
          id="challenges"
          name="challenges"
          defaultValue={project?.challenges ?? ""}
          rows={3}
          className={inputClass}
        />
      </FormField>
      <FormField label="Lessons learned" name="lessonsLearned" error={errors.lessonsLearned} hint="Optional">
        <textarea
          id="lessonsLearned"
          name="lessonsLearned"
          defaultValue={project?.lessonsLearned ?? ""}
          rows={3}
          className={inputClass}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Image path" name="image" error={errors.image} hint="Optional — e.g. /images/projects/x.png">
          <input id="image" name="image" defaultValue={project?.image ?? ""} className={inputClass} />
        </FormField>
        <FormField label="Image alt text" name="imageAlt" error={errors.imageAlt} hint="Optional">
          <input id="imageAlt" name="imageAlt" defaultValue={project?.imageAlt ?? ""} className={inputClass} />
        </FormField>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-slate">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4 accent-teal" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-slate">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project?.published ?? true}
            className="h-4 w-4 accent-teal"
          />
          Published
        </label>
        <FormField label="Sort order" name="sortOrder" error={errors.sortOrder}>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={project?.sortOrder ?? 0}
            className={`${inputClass} w-24`}
          />
        </FormField>
      </div>

      <SubmitButton label={project ? "Save changes" : "Create project"} />
    </form>
  );
}
