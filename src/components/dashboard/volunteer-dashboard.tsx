"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Award,
  QrCode,
  Calendar,
  MapPin,
  CheckCircle2,
  FileText,
  UserCheck,
  Send,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { Badge } from "@/components/ui/badge";

export function VolunteerDashboardView() {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Pick up DAST-10 assessment survey packets from admin desk", done: true },
    { id: 2, text: "Verify QR scanner connectivity on mobile device", done: true },
    { id: 3, text: "Set up Youth Safe Space seating at Community Center Room 2", done: false },
    { id: 4, text: "Submit post-session feedback debrief form", done: false },
  ]);

  const [note, setNote] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const toggleTask = (id: number) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    setNoteSaved(true);
    setTimeout(() => {
      setNote("");
      setNoteSaved(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Field Volunteer Operations
            </h1>
            <Badge variant="emerald" dot>
              On-Duty Assigned
            </Badge>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Welcome back, Field Lead. Review your shift agenda, check-in attendees, and log observations.
          </p>
        </div>

        <Link
          href="/attendance"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 transition-all"
        >
          <QrCode className="w-4 h-4" />
          <span>Launch QR Scanner</span>
        </Link>
      </div>

      {/* Volunteer KPI metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard
          title="Community Hours Logged"
          value="58.5 hrs"
          change="+6 hrs this week"
          isPositive={true}
          icon={<Clock className="w-6 h-6" />}
          iconBgColor="bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400"
        />
        <StatCard
          title="Sessions Facilitated"
          value="14"
          subtitle="96% positive participant rating"
          icon={<Award className="w-6 h-6" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400"
        />
        <StatCard
          title="Attendees Verified"
          value="248"
          change="100% on-time check-in"
          isPositive={true}
          icon={<UserCheck className="w-6 h-6" />}
          iconBgColor="bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400"
        />
      </div>

      {/* Current Shift Details & Shift Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Event Duty */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Today&apos;s Active Assignment
              </span>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                Campus Shield 360° - High School Cohort (Session 4)
              </h2>
            </div>
            <Badge variant="teal">Starts in 35m</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Date & Time</p>
                <p className="text-slate-500">Today • 4:30 PM - 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Venue</p>
                <p className="text-slate-500">Northside High Auditorium (Room 2)</p>
              </div>
            </div>
          </div>

          {/* Shift Checklist */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Field Shift Checklist
            </h3>
            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleTask(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none text-xs ${
                    item.done
                      ? "bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 text-slate-400 line-through"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-400"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      item.done
                        ? "bg-teal-600 border-teal-600 text-white"
                        : "border-slate-300 dark:border-slate-600"
                    }`}
                  >
                    {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Field Observation Note Tool */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Log Field Observation
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Quickly record any behavioral note, participant questions, or venue incident.
            </p>

            <form onSubmit={handleSaveNote} className="space-y-3">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="E.g., Participant DS-4921 expressed anxiety regarding upcoming exams; requested peer group intro..."
                rows={5}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-slate-200"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Observation</span>
              </button>
            </form>

            {noteSaved && (
              <div className="mt-3 p-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs text-center font-medium border border-emerald-200">
                Observation saved to supervisor queue!
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/feedback"
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline block text-center"
            >
              Submit Detailed Post-Event Debrief →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
