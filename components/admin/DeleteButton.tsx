"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";

/**
 * A destructive action always needs an explicit confirmation step — this
 * renders as a plain delete icon-button until clicked, then swaps to an
 * inline "Confirm / Cancel" pair rather than a browser confirm() dialog
 * (which is not reliably styleable/accessible across browsers).
 */
export function DeleteButton({
  onDelete,
  label,
}: {
  onDelete: () => Promise<void>;
  label: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-slate">Delete {label}?</span>
        <button
          type="button"
          disabled={isPending}
          onClick={() => startTransition(async () => onDelete())}
          className="focus-ring rounded-btn bg-error px-3 py-1.5 font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Deleting…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="focus-ring rounded-btn border border-border px-3 py-1.5 text-slate hover:bg-teal-tint"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${label}`}
      className="focus-ring inline-flex items-center gap-1 rounded-btn p-2 text-muted transition-colors hover:bg-error/10 hover:text-error"
    >
      <Trash2 size={16} />
    </button>
  );
}
