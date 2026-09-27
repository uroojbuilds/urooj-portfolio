import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  disabled?: boolean;
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  className,
  type = "button",
  external = false,
  disabled = false,
}: ButtonProps) {
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-btn px-6 py-3 text-sm font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-teal text-white hover:bg-teal-dark",
    secondary:
      "border border-teal text-teal bg-transparent hover:bg-teal/5",
    ghost: "text-muted hover:text-teal",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
        {icon}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-busy={disabled || undefined}
      className={classes}
    >
      {children}
      {icon}
    </button>
  );
}
