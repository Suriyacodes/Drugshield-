"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import {
  QrCode,
  Camera,
  CheckCircle2,
  Scan,
  Volume2,
  VolumeX,
  Keyboard,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function AttendancePage() {
  const [mode, setMode] = useState<"scanner" | "pass">("scanner");
  const [manualId, setManualId] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [recentScans, setRecentScans] = useState([
    {
      id: "DS-PART-4921",
      name: "Participant #4921",
      event: "Campus Shield Session 4",
      time: "2 mins ago",
      status: "Verified",
    },
    {
      id: "DS-PART-1104",
      name: "Participant #1104",
      event: "Campus Shield Session 4",
      time: "5 mins ago",
      status: "Verified",
    },
    {
      id: "DS-PART-8192",
      name: "Participant #8192",
      event: "Campus Shield Session 4",
      time: "11 mins ago",
      status: "Verified",
    },
  ]);
  const [scanNotification, setScanNotification] = useState<string | null>(null);

  const handleSimulateScan = (idToScan?: string) => {
    const code = idToScan || manualId || `DS-PART-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry = {
      id: code,
      name: `Participant #${code.replace("DS-PART-", "")}`,
      event: "Campus Shield Session 4",
      time: "Just now",
      status: "Verified",
    };

    setRecentScans([newEntry, ...recentScans]);
    setScanNotification(`Attendance Recorded for ${code}!`);
    setManualId("");

    setTimeout(() => {
      setScanNotification(null);
    }, 2500);
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                QR Attendance & Verification Hub
              </h1>
              <Badge variant="emerald" dot>
                Live Event Mode
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Discreet, privacy-protecting QR attendance tracking for grant reporting and cohort retention.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setMode("scanner")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === "scanner"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-teal-600" />
              <span>Volunteer Scanner</span>
            </button>
            <button
              onClick={() => setMode("pass")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mode === "pass"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-teal-600" />
              <span>My Digital Pass</span>
            </button>
          </div>
        </div>

        {/* Scan Confirmation Toast */}
        {scanNotification && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-sm shadow-xl flex items-center justify-between animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>{scanNotification}</span>
            </div>
            <span className="text-xs bg-emerald-600 px-2 py-1 rounded-lg">
              Recorded in Database
            </span>
          </div>
        )}

        {/* Dynamic Mode View */}
        {mode === "scanner" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Viewfinder Simulator */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Camera Viewfinder
                  </h3>
                  <p className="text-xs text-slate-500">
                    Align attendee&apos;s digital pass or paper ticket within the reticle
                  </p>
                </div>
                <button
                  onClick={() => setAudioEnabled(!audioEnabled)}
                  className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  title="Toggle Audio Beep"
                >
                  {audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-teal-600" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Viewfinder Graphic */}
              <div className="relative aspect-video max-h-80 w-full rounded-2xl bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden border-2 border-slate-800">
                {/* Crosshairs & Scanning line */}
                <div className="relative w-48 h-48 border-2 border-teal-400/80 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <div className="absolute inset-x-0 h-0.5 bg-teal-400 animate-pulse shadow-md shadow-teal-400" />
                  <Scan className="w-12 h-12 text-teal-400/60" />
                </div>
                <p className="text-xs text-slate-400 mt-4 tracking-wider uppercase font-semibold">
                  Optical Scanner Active
                </p>
              </div>

              {/* Action Buttons & Manual Fallback */}
              <div className="space-y-4">
                <button
                  onClick={() => handleSimulateScan()}
                  className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Scan className="w-4 h-4" />
                  <span>Simulate Camera Scan (Test In-Person Check-In)</span>
                </button>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (manualId) handleSimulateScan(manualId);
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <Keyboard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Or enter Masked ID manually (e.g. DS-PART-4921)..."
                      value={manualId}
                      onChange={(e) => setManualId(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    Check In
                  </button>
                </form>
              </div>
            </div>

            {/* Live Check-in Stream */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Live Verification Log
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">{recentScans.length} verified</span>
                </div>

                <div className="space-y-3">
                  {recentScans.map((scan, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-xs flex items-center justify-between"
                    >
                      <div>
                        <p className="font-mono font-bold text-slate-900 dark:text-white">
                          {scan.id}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{scan.event}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="emerald" size="sm">
                          {scan.status}
                        </Badge>
                        <p className="text-[10px] text-slate-400 mt-1">{scan.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <span className="text-[11px] text-slate-400">
                  Attendance logs sync automatically with program cohorts.
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Participant Digital Pass View */
          <div className="max-w-md mx-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Participant Pass</span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Alex Rivera
              </h2>
              <p className="text-xs font-mono text-slate-500 mt-1">ID: DS-PART-4921</p>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-0.5">
                Campus Shield 360° • High School Cohort
              </p>
            </div>

            {/* Simulated Digital QR Card */}
            <div className="mx-auto w-56 h-56 rounded-3xl bg-slate-950 p-4 shadow-2xl flex flex-col items-center justify-center border-4 border-teal-500/30">
              <div className="grid grid-cols-6 gap-1.5 w-40 h-40">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-xs ${
                      i % 3 === 0 || i % 5 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                        ? "bg-white"
                        : "bg-teal-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Valid for Session 4 & Remaining Cohort Drives
              </p>
              <p className="text-[11px]">
                Screen brightness automatically boosted for scanner recognition.
              </p>
            </div>

            <button
              onClick={() => alert("Pass refreshed with latest cryptographic token.")}
              className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Pass Token</span>
            </button>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
