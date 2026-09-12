"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { StatCard } from "@/components/ui/stat-card";
import {
  UserCheck,
  Search,
  AlertTriangle,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface ParticipantItem {
  id: string;
  program: string;
  cohort: string;
  enrollmentDate: string;
  completedModules: string;
  attendanceRate: string;
  riskTier: string;
  assignedCounselor: string;
  lastCheckin: string;
  dastScore: number;
}

export default function ParticipantsPage() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantItem | null>(null);

  const participantsData: ParticipantItem[] = [
    {
      id: "DS-PART-4921",
      program: "Campus Shield 360°",
      cohort: "Cohort Alpha (Northside)",
      enrollmentDate: "Aug 12, 2026",
      completedModules: "3 of 6",
      attendanceRate: "75%",
      riskTier: "Substantial Risk",
      assignedCounselor: "Sarah Jenkins (MSW)",
      lastCheckin: "Yesterday, 4:45 PM",
      dastScore: 7,
    },
    {
      id: "DS-PART-3810",
      program: "Campus Shield 360°",
      cohort: "Cohort Alpha (Northside)",
      enrollmentDate: "Aug 12, 2026",
      completedModules: "2 of 6",
      attendanceRate: "50%",
      riskTier: "At Risk of Dropout",
      assignedCounselor: "Marcus Chen",
      lastCheckin: "12 days ago",
      dastScore: 5,
    },
    {
      id: "DS-PART-8192",
      program: "University Substance Resilience",
      cohort: "Campus West",
      enrollmentDate: "Jul 28, 2026",
      completedModules: "5 of 6",
      attendanceRate: "95%",
      riskTier: "Healthy Progress",
      assignedCounselor: "Dr. Ethan Wright",
      lastCheckin: "2 days ago",
      dastScore: 1,
    },
    {
      id: "DS-PART-1104",
      program: "Parent & Guardian Guidance Circles",
      cohort: "Evening Circle B",
      enrollmentDate: "Sep 01, 2026",
      completedModules: "3 of 4",
      attendanceRate: "100%",
      riskTier: "Healthy Progress",
      assignedCounselor: "Elena Rostova",
      lastCheckin: "Yesterday, 7:15 PM",
      dastScore: 2,
    },
    {
      id: "DS-PART-6729",
      program: "Campus Shield 360°",
      cohort: "Cohort Beta (Lincoln High)",
      enrollmentDate: "Aug 15, 2026",
      completedModules: "1 of 6",
      attendanceRate: "33%",
      riskTier: "Moderate Risk",
      assignedCounselor: "Maya Patel",
      lastCheckin: "8 days ago",
      dastScore: 4,
    },
  ];

  const filtered = participantsData.filter((p) => {
    const matchesRisk =
      riskFilter === "All" || p.riskTier === riskFilter;
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.program.toLowerCase().includes(search.toLowerCase()) ||
      p.assignedCounselor.toLowerCase().includes(search.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Participant Registry & Care Pipeline
              </h1>
              <Badge variant="teal">HIPAA De-Identified</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Confidential cohort records with milestone tracking, attendance frequency, and clinical risk flags.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-xl">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>Participant PII masked by default</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Active Participants"
            value="3,410"
            change="+48 enrolled this week"
            isPositive={true}
            icon={<UserCheck className="w-6 h-6" />}
          />
          <StatCard
            title="At-Risk Alerts Active"
            value="14"
            change="2 requires urgent call"
            isPositive={false}
            icon={<AlertTriangle className="w-6 h-6" />}
            iconBgColor="bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400"
          />
          <StatCard
            title="Avg Program Attendance"
            value="89.4%"
            subtitle="Benchmark standard > 85%"
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["All", "Substantial Risk", "At Risk of Dropout", "Moderate Risk", "Healthy Progress"].map(
              (tier) => (
                <button
                  key={tier}
                  onClick={() => setRiskFilter(tier)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    riskFilter === tier
                      ? "bg-teal-600 text-white shadow-xs"
                      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {tier}
                </button>
              )
            )}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Masked ID, Counselor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Participant Table */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Masked ID</th>
                  <th className="p-4">Program & Cohort</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Attendance</th>
                  <th className="p-4">Clinical Tier</th>
                  <th className="p-4">Assigned Counselor</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filtered.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">
                      {p.id}
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {p.program}
                      </p>
                      <p className="text-[11px] text-slate-400">{p.cohort}</p>
                    </td>
                    <td className="p-4 font-medium text-teal-600 dark:text-teal-400">
                      {p.completedModules}
                    </td>
                    <td className="p-4 font-bold">{p.attendanceRate}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          p.riskTier === "Substantial Risk" || p.riskTier === "At Risk of Dropout"
                            ? "red"
                            : p.riskTier === "Moderate Risk"
                            ? "amber"
                            : "emerald"
                        }
                        dot
                      >
                        {p.riskTier}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {p.assignedCounselor}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedParticipant(p)}
                        className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        Review Care Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Participant Detail Care Modal */}
      {selectedParticipant && (
        <Modal
          isOpen={!!selectedParticipant}
          onClose={() => setSelectedParticipant(null)}
          title={`Confidential Care Card: ${selectedParticipant.id}`}
          description={`Program: ${selectedParticipant.program} (${selectedParticipant.cohort})`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-slate-400">DAST-10 Score:</span>
                <p className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedParticipant.dastScore} / 10
                </p>
              </div>
              <div>
                <span className="text-slate-400">Attendance Rate:</span>
                <p className="text-base font-bold text-teal-600 dark:text-teal-400 mt-0.5">
                  {selectedParticipant.attendanceRate}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Assigned Clinical Follow-Up Lead:
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                {selectedParticipant.assignedCounselor} • Last attendance logged {selectedParticipant.lastCheckin}.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200">
              Recommendation: Schedule private 1-on-1 de-escalation check-in prior to Session 5 to ensure cohort completion.
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedParticipant(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Intervention prompt logged for ${selectedParticipant.assignedCounselor}!`);
                  setSelectedParticipant(null);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold"
              >
                Dispatch Counselor Follow-Up
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
}
