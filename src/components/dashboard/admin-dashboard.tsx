"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  HeartHandshake,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  QrCode,
  CalendarPlus,
  FileSpreadsheet,
  Layers,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";

export function AdminDashboardView() {
  const activePrograms = [
    {
      id: 1,
      title: "Campus Shield 360° - High School Cohort",
      category: "Early Intervention",
      participants: 420,
      target: 500,
      status: "Active",
      riskFlag: "Low",
    },
    {
      id: 2,
      title: "Parent & Guardian Guidance Circle",
      category: "Family Prevention",
      participants: 185,
      target: 200,
      status: "Active",
      riskFlag: "Healthy",
    },
    {
      id: 3,
      title: "University Substance Resilience Workshop",
      category: "Harm Reduction",
      participants: 680,
      target: 750,
      status: "Active",
      riskFlag: "Moderate",
    },
  ];

  const urgentAlerts = [
    {
      id: "AL-101",
      participantMasked: "DS-PART-4921",
      reason: "DAST-10 Score Spike (Substantial Risk)",
      program: "University Substance Resilience",
      timestamp: "28m ago",
      assignedVolunteer: "Sarah Jenkins (MSW)",
    },
    {
      id: "AL-102",
      participantMasked: "DS-PART-3810",
      reason: "Missed 2 Consecutive Counseling Sessions",
      program: "Campus Shield 360°",
      timestamp: "2h ago",
      assignedVolunteer: "Marcus Chen",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Executive Impact Operations
            </h1>
            <Badge variant="teal">Live NGO Hub</Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time substance abuse prevention KPIs, cohort attendance, and field volunteer operations.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/attendance"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs shadow-xs transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>Scan Attendance</span>
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors"
          >
            <CalendarPlus className="w-4 h-4 text-teal-600" />
            <span>New Workshop</span>
          </Link>
          <Link
            href="/analytics"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-500" />
            <span>Report</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Active Interventions"
          value="12"
          change="2 new this month"
          isPositive={true}
          icon={<Layers className="w-6 h-6" />}
          iconBgColor="bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400"
        />
        <StatCard
          title="Registered Participants"
          value="3,410"
          change="18.4%"
          isPositive={true}
          subtitle="vs previous quarter"
          icon={<GraduationCap className="w-6 h-6" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        />
        <StatCard
          title="Volunteers & Counselors"
          value="48"
          change="92% on-duty"
          isPositive={true}
          icon={<HeartHandshake className="w-6 h-6" />}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400"
        />
        <StatCard
          title="Avg Session Retention"
          value="89.4%"
          change="4.2%"
          isPositive={true}
          subtitle="benchmark > 85%"
          icon={<CheckCircle2 className="w-6 h-6" />}
          iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400"
        />
      </div>

      {/* Main Content: Programs + Critical Intervention Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Cohorts Progress */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Active Program Cohorts
              </h2>
              <p className="text-xs text-slate-500">
                Enrollment progress against community target capacity
              </p>
            </div>
            <Link
              href="/programs"
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              View all programs <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-5">
            {activePrograms.map((prog) => {
              const percentage = Math.round((prog.participants / prog.target) * 100);
              return (
                <div
                  key={prog.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {prog.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{prog.category}</span>
                        <span className="text-slate-300">•</span>
                        <Badge variant="teal" size="sm">
                          {prog.status}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                      {percentage}% Filled
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>
                      <strong>{prog.participants}</strong> enrolled
                    </span>
                    <span>Target: {prog.target} participants</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Urgent Counselor Attention Feed */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Intervention Alerts
                </h3>
              </div>
              <Badge variant="amber" size="sm">
                2 Pending Action
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Participants flagged for confidential follow-up based on attendance or screening scores.
            </p>

            <div className="space-y-3">
              {urgentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                      {alert.participantMasked}
                    </span>
                    <span className="text-[10px] text-slate-400">{alert.timestamp}</span>
                  </div>
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    {alert.reason}
                  </p>
                  <div className="text-[11px] text-slate-500">
                    Lead Counselor: <span className="font-medium text-slate-700 dark:text-slate-300">{alert.assignedVolunteer}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/participants"
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              Open Counselor Action Registry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
