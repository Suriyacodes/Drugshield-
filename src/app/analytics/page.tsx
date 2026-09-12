"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import {
  TrendingUp,
  Download,
  Users,
  CheckCircle2,
  Layers,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("Last 12 Months");

  const monthlyReachData = [
    { month: "Jan", reached: 840, target: 700 },
    { month: "Feb", reached: 920, target: 750 },
    { month: "Mar", reached: 1100, target: 800 },
    { month: "Apr", reached: 1250, target: 900 },
    { month: "May", reached: 1400, target: 1000 },
    { month: "Jun", reached: 1150, target: 1000 },
    { month: "Jul", reached: 980, target: 900 },
    { month: "Aug", reached: 1320, target: 1100 },
    { month: "Sep", reached: 1540, target: 1200 },
  ];

  const maxVal = Math.max(...monthlyReachData.map((d) => d.reached));

  const retentionFunnel = [
    { stage: "Registered & Onboarded", count: "3,410", percent: 100, color: "bg-teal-600" },
    { stage: "Completed Modules 1-3", count: "3,140", percent: 92, color: "bg-teal-500" },
    { stage: "Completed All 6 Modules", count: "3,048", percent: 89, color: "bg-emerald-500" },
    { stage: "Certified Alumni & Advocates", count: "2,932", percent: 86, color: "bg-emerald-600" },
  ];

  const demographicBreakdown = [
    { label: "High School Students (14-18)", percentage: "45%", count: "1,534" },
    { label: "College & Trade Youth (18-24)", percentage: "32%", count: "1,091" },
    { label: "Parents, Guardians & Caregivers", percentage: "15%", count: "512" },
    { label: "Workplace & Community Adults", percentage: "8%", count: "273" },
  ];

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Impact Evidence & Grant Analytics
              </h1>
              <Badge variant="teal">Donor & Board Ready</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Verified behavioral outcome data, cohort retention funnels, and demographic reach across community chapters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
            >
              <option>Last 30 Days</option>
              <option>Quarter to Date</option>
              <option>Last 12 Months</option>
              <option>Lifetime Impact</option>
            </select>

            <button
              onClick={() => alert("Comprehensive Grant Impact Dossier (PDF/CSV) generated!")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Impact Dossier</span>
            </button>
          </div>
        </div>

        {/* High Level Impact KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Total Participants Reached"
            value="14,200+"
            change="+18.4% YoY"
            isPositive={true}
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="Avg Cohort Retention"
            value="89.4%"
            change="Exceeds national avg (72%)"
            isPositive={true}
            icon={<CheckCircle2 className="w-6 h-6" />}
            iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
          />
          <StatCard
            title="Refusal Confidence Index"
            value="91.2%"
            change="Up from 38% pre-training"
            isPositive={true}
            icon={<TrendingUp className="w-6 h-6" />}
            iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400"
          />
          <StatCard
            title="Active Campus Chapters"
            value="85"
            change="Across 6 Districts"
            isPositive={true}
            icon={<Layers className="w-6 h-6" />}
            iconBgColor="bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400"
          />
        </div>

        {/* Chart 1: Monthly Community Reach (Bar Chart) */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Community Attendance Reach (2026)
              </h3>
              <p className="text-xs text-slate-500">
                Total unique verified QR attendances recorded across all prevention programs
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-teal-600" />
                <span className="text-slate-600 dark:text-slate-400">Actual Reached</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-slate-300 dark:bg-slate-700" />
                <span className="text-slate-600 dark:text-slate-400">Grant Target</span>
              </div>
            </div>
          </div>

          {/* Pure CSS Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 border-b border-slate-100 dark:border-slate-800">
            {monthlyReachData.map((d, i) => {
              const heightPercent = Math.round((d.reached / maxVal) * 100);
              const targetPercent = Math.round((d.target / maxVal) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="relative w-full max-w-[36px] flex items-end justify-center h-full">
                    {/* Target ghost bar */}
                    <div
                      className="absolute w-full bg-slate-200/80 dark:bg-slate-800 rounded-t-md pointer-events-none"
                      style={{ height: `${targetPercent}%` }}
                    />
                    {/* Actual Bar */}
                    <div
                      className="w-full bg-teal-600 group-hover:bg-teal-500 rounded-t-md transition-all relative z-10"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold py-1 px-1.5 rounded whitespace-nowrap transition-opacity shadow-md pointer-events-none">
                        {d.reached} youth
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium text-slate-500">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row: Retention Funnel & Demographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cohort Retention Funnel */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Cohort Retention & Completion Funnel
              </h3>
              <p className="text-xs text-slate-500">
                Attrition tracking across the 6-module curriculum
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {retentionFunnel.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{item.stage}</span>
                    <span className="text-slate-500">
                      {item.count} ({item.percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className={`${item.color} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-800 dark:text-teal-300 text-xs">
              Key Insight: Peer-led check-ins reduced dropouts between Module 3 and 4 by 41% compared to prior academic year.
            </div>
          </div>

          {/* Demographic Breakdown */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Participant Demographics
              </h3>
              <p className="text-xs text-slate-500">
                Audience segmentation across campus and regional chapters
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {demographicBreakdown.map((demo, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {demo.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{demo.count} enrolled</span>
                    <Badge variant="teal" size="sm">
                      {demo.percentage}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-xs text-slate-500">
              Audience data complies with anonymized non-identifiable research standards.
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
