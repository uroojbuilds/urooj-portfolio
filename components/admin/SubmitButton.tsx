"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="focus-ring inline-flex items-center gap-2 rounded-btn bg-teal px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Saving…" : label}
    </button>
  );
}
