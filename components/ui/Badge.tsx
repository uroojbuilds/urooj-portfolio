import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-teal/15 bg-teal-tint px-3 py-1 text-xs font-medium text-slate font-mono",
        className
      )}
    >
      {children}
    </span>
  );
}
