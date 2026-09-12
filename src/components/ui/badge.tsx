import React from "react";

export type BadgeVariant =
  | "teal"
  | "emerald"
  | "amber"
  | "red"
  | "blue"
  | "purple"
  | "slate";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  teal: {
    container: "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-800",
    dot: "bg-teal-500",
  },
  emerald: {
    container: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    dot: "bg-emerald-500",
  },
  amber: {
    container: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  red: {
    container: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800",
    dot: "bg-rose-500",
  },
  blue: {
    container: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800",
    dot: "bg-sky-500",
  },
  purple: {
    container: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800",
    dot: "bg-purple-500",
  },
  slate: {
    container: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    dot: "bg-slate-500",
  },
};

export function Badge({
  children,
  variant = "slate",
  size = "sm",
  dot = false,
  className = "",
}: BadgeProps) {
  const styles = variantStyles[variant];
  const sizeClasses =
    size === "sm"
      ? "text-xs px-2.5 py-0.5"
      : "text-sm px-3 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${styles.container} ${sizeClasses} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />}
      {children}
    </span>
  );
}
