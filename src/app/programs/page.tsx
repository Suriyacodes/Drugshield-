"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  Search,
  Plus,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  category: string;
  mode: string;
  duration: string;
  audience: string;
  enrolled: number;
  target: number;
  status: string;
  description: string;
  modules: string[];
}

export default function ProgramsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalProgram, setActiveModalProgram] = useState<ProgramItem | null>(null);

  const programsData: ProgramItem[] = [
    {
      id: "campus-360",
      title: "Campus Shield 360°",
      category: "Early Intervention",
      mode: "In-Person Workshops",
      duration: "6 Weeks (Weekly 90m)",
      audience: "High School & College Youth",
      enrolled: 420,
      target: 500,
      status: "Active Cohort",
      description:
        "Comprehensive peer education and refusal-skills curriculum. Includes verified QR event tracking, neurobiology of addiction, and anonymous self-screening.",
      modules: [
        "1. Neurobiology of Dopamine & Chemical Dependency",
        "2. Deconstructing Peer Pressure & Refusal Scripts",
        "3. Managing Acute Stress Without Chemical Escapes",
        "4. Fentanyl & Synthetic Adulterant Harm Reduction",
        "5. Building Safe Support & Accountability Circles",
        "6. Graduation Pledge & Community Leadership",
      ],
    },
    {
      id: "peer-corps",
      title: "Youth Ambassador Peer Corps",
      category: "Youth Leadership",
      mode: "Hybrid (Classroom + Field)",
      duration: "12 Weeks Certification",
      audience: "Student Leaders (Age 16 - 22)",
      enrolled: 180,
      target: 200,
      status: "Enrolling Now",
      description:
        "Training high school and university students as certified peer listeners, crisis de-escalation helpers, and community harm reduction advocates.",
      modules: [
        "1. Active Listening & Trauma-Informed Conversation",
        "2. Recognizing Hidden Warning Signs & Slang",
        "3. Overdose First Aid & Naloxone Administration Basics",
        "4. Privacy, Boundary Setting & Counselor Escalation",
      ],
    },
    {
      id: "family-circle",
      title: "Parent & Guardian Guidance Circles",
      category: "Family Prevention",
      mode: "Evening Virtual / Hybrid",
      duration: "4 Sessions",
      audience: "Parents, Guardians & Caregivers",
      enrolled: 95,
      target: 120,
      status: "Active Cohort",
      description:
        "Equipping parents with non-combative communication tools, early warning sign detection, and clinical referral networks for struggling adolescents.",
      modules: [
        "1. Bridging the Parent-Teen Communication Gap",
        "2. Understanding Modern Synthetic Drug Trends",
        "3. Constructive Discipline vs. Punitive Alienation",
        "4. When and How to Seek Professional Intervention",
      ],
    },
    {
      id: "workplace-wellness",
      title: "Workforce & Trades Harm Reduction",
      category: "Harm Reduction",
      mode: "On-Site Workplace Seminars",
      duration: "1 Day Intensive",
      audience: "Trades, Construction & Logistics Staff",
      enrolled: 310,
      target: 350,
      status: "Active Cohort",
      description:
        "Addressing high-risk industrial environments, chronic pain self-medication, and discreet employee assistance counseling pathways.",
      modules: [
        "1. Chronic Physical Pain & Opioid Vulnerability",
        "2. Confidential Employee Assistance Rights",
        "3. Naloxone Workplace Readiness Protocol",
      ],
    },
  ];

  const categories = ["All", "Early Intervention", "Youth Leadership", "Family Prevention", "Harm Reduction"];

  const filteredPrograms = programsData.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Prevention & Education Programs
              </h1>
              <Badge variant="teal">{programsData.length} Curricula</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Evidence-based substance abuse prevention curricula for schools, families, and community cohorts.
            </p>
          </div>

          <button
            onClick={() => setActiveModalProgram(programsData[0])}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Cohort</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-teal-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPrograms.map((prog) => {
            const percentage = Math.round((prog.enrolled / prog.target) * 100);
            return (
              <div
                key={prog.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Badge variant="teal" size="sm">
                        {prog.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                        {prog.title}
                      </h3>
                    </div>
                    <Badge variant={prog.status === "Active Cohort" ? "emerald" : "amber"} dot size="sm">
                      {prog.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{prog.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                      <Users className="w-3.5 h-3.5 text-teal-600" />
                      <span>{prog.audience}</span>
                    </div>
                  </div>

                  {/* Enrollment meter */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-slate-500">Cohort Capacity:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {prog.enrolled} / {prog.target} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">{prog.mode}</span>
                  <button
                    onClick={() => setActiveModalProgram(prog)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Program Curriculum Detail Modal */}
      {activeModalProgram && (
        <Modal
          isOpen={!!activeModalProgram}
          onClose={() => setActiveModalProgram(null)}
          title={activeModalProgram.title}
          description={`${activeModalProgram.category} • ${activeModalProgram.duration}`}
        >
          <div className="space-y-5">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModalProgram.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Weekly Curriculum Modules
              </h4>
              <div className="space-y-2">
                {activeModalProgram.modules?.map((mod: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{mod}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Cohort enrollment request recorded for administrator review.");
                  setActiveModalProgram(null);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs"
              >
                Enroll Participants in Cohort
              </button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
}
