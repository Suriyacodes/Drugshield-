"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  PhoneCall,
  CheckCircle2,
  Smile,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

export function ParticipantDashboardView() {
  const [supportModalOpen, setSupportModalOpen] = useState(false);
  const [wellnessAnswered, setWellnessAnswered] = useState<string | null>(null);

  const modules = [
    { title: "Understanding Brain & Chemical Triggers", done: true },
    { title: "Refusal Skills & Peer Pressure Resilience", done: true },
    { title: "Healthy Stress & Emotion Coping Mechanisms", done: true },
    { title: "Building an Accountability Circle", done: false, active: true },
    { title: "Navigating Relapse Risk & High-Temptation Zones", done: false },
    { title: "Future Pathway & Graduation Pledge", done: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-teal-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Confidential Personal Wellness Space</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back to your recovery journey
            </h1>
            <p className="text-teal-100/80 text-xs sm:text-sm leading-relaxed">
              Every step matters. You have completed 3 of 6 educational & wellness sessions in the Campus Shield Program.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => setSupportModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs tracking-wide shadow-lg shadow-rose-950 flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Need Help Right Now?</span>
            </button>
          </div>
        </div>
      </div>

      {/* Wellness & Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Journey Progress */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Program Milestone Progress
              </h2>
              <p className="text-xs text-slate-500">
                Campus Shield 360° • Certificate upon completion
              </p>
            </div>
            <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
              50% Complete
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full w-1/2 transition-all duration-500" />
          </div>

          {/* Module List */}
          <div className="space-y-2.5">
            {modules.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-xs transition-colors ${
                  m.done
                    ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50 text-slate-800 dark:text-slate-200"
                    : m.active
                    ? "bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 font-semibold text-teal-900 dark:text-teal-200"
                    : "bg-slate-50/50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      m.done
                        ? "bg-emerald-600 text-white"
                        : m.active
                        ? "bg-teal-600 text-white"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                    }`}
                  >
                    {m.done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span>{m.title}</span>
                </div>
                <div>
                  {m.done && <Badge variant="emerald">Completed</Badge>}
                  {m.active && <Badge variant="teal">Up Next</Badge>}
                  {!m.done && !m.active && <span className="text-[11px] text-slate-400">Locked</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Attendance Pass Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col justify-between items-center text-center">
          <div className="w-full">
            <Badge variant="teal" size="sm" className="mb-2">
              DIGITAL EVENT PASS
            </Badge>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Scan-In at Any DrugShield Session
            </h3>
            <p className="text-[11px] text-slate-500 mt-1 mb-4">
              Present this code to your workshop volunteer facilitator.
            </p>

            {/* QR Mock container */}
            <div className="mx-auto w-48 h-48 rounded-2xl bg-white border-2 border-slate-200 p-3 shadow-md flex flex-col items-center justify-center relative">
              <div className="w-full h-full bg-slate-900 rounded-xl p-2 flex items-center justify-center">
                {/* SVG QR Code Simulation */}
                <div className="grid grid-cols-5 gap-1.5 w-32 h-32">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 7 === 0 || i === 0 || i === 4 || i === 20 || i === 24
                          ? "bg-white"
                          : "bg-teal-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
              ID: DS-PART-4921
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Encrypted & Confidential • Auto-refreshes daily
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 w-full">
            <Link
              href="/attendance"
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline block"
            >
              Open Fullscreen Attendance Pass →
            </Link>
          </div>
        </div>
      </div>

      {/* Daily Wellness Check Prompt */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Smile className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Daily Anonymous Mood & Craving Check-In
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              How are you feeling today regarding temptation, stress, and your recovery goals?
            </p>
          </div>

          <div className="flex items-center gap-2">
            {["Strong & Focused", "Mild Stress", "Struggling / High Urge"].map((option) => (
              <button
                key={option}
                onClick={() => setWellnessAnswered(option)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                  wellnessAnswered === option
                    ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {wellnessAnswered && (
          <div className="mt-4 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-200 flex items-center justify-between">
            <span>
              Thank you for recording today&apos;s check-in (<strong>{wellnessAnswered}</strong>). Your counselors are rooting for you.
            </span>
            <Link href="/assessments" className="font-semibold underline ml-2">
              Take Full DAST Screening
            </Link>
          </div>
        )}
      </div>

      {/* Emergency Distress Modal */}
      <Modal
        isOpen={supportModalOpen}
        onClose={() => setSupportModalOpen(false)}
        title="Immediate Confidential Support"
        description="You do not have to fight substance urges alone. We have trained listeners available 24/7."
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-sm">
              <PhoneCall className="w-4 h-4" />
              <span>National Substance Abuse Hotline (SAMHSA)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Toll-free, 24-hour, 365-day-a-year treatment referral and information service in English and Spanish.
            </p>
            <a
              href="tel:18006624357"
              className="inline-block mt-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
            >
              Call 1-800-662-4357 Now
            </a>
          </div>

          <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 space-y-2">
            <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-sm">
              <Heart className="w-4 h-4" />
              <span>DrugShield Peer Crisis Chat</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Text with a certified recovery counselor anonymously right now.
            </p>
            <a
              href="sms:741741"
              className="inline-block mt-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs"
            >
              Text &quot;SHIELD&quot; to 741741
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
