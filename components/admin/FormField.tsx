export function FormField({
  label,
  name,
  children,
  error,
  hint,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
  error?: string[];
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-muted">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1 text-xs text-error">
          {error[0]}
        </p>
      )}
    </div>
  );
}

export const inputClass =
  "focus-ring w-full rounded-btn border border-border bg-cream px-3.5 py-2.5 text-sm text-slate placeholder:text-muted";
