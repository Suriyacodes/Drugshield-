import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon,
  iconBgColor = "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={`inline-flex items-center font-semibold px-1.5 py-0.5 rounded-md ${
                isPositive
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
              }`}
            >
              {isPositive ? "↑ " : "↓ "}
              {change}
            </span>
          )}
          {subtitle && (
            <span className="text-slate-500 dark:text-slate-400">{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
