"use client";

import React, { useState } from "react";
import { DashboardShell, useDashboard } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Bell,
  Lock,
  PhoneCall,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const { currentRole, userProfile } = useDashboard();
  const [fullName, setFullName] = useState(userProfile?.full_name ?? "DrugShield Member");
  const [organization, setOrganization] = useState("Northside Community District #12");
  const [crisisNumber, setCrisisNumber] = useState("1-800-662-4357");
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [maskPii, setMaskPii] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Platform Preferences & Security
              </h1>
              <Badge variant="teal">Encrypted Settings</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage your personal counselor identity, emergency helpline defaults, and privacy controls.
            </p>
          </div>

          <Badge variant="emerald" dot size="sm">
            Role: {currentRole.toUpperCase()}
          </Badge>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Preferences saved and synced to your DrugShield profile!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Profile Identity */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <User className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Account & Identity
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Full Name / Display Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Affiliated Campus / District Chapter
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Crisis Helpline Hotline Configuration */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <PhoneCall className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                24/7 Crisis Helpline Hotlink
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Default Helpline Phone Number
                </label>
                <input
                  type="text"
                  value={crisisNumber}
                  onChange={(e) => setCrisisNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500"
                />
                <p className="text-[10px] text-slate-400">
                  Displayed on top banner and emergency quick-call buttons.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Crisis Text Line Keyword
                </label>
                <input
                  type="text"
                  defaultValue="SHIELD to 741741"
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Notification Alerts */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Bell className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Notifications & Field Dispatch
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Immediate SMS Alerts for High Risk DAST-10 Scores
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Dispatches notification to assigned counselor within 5 minutes of participant screening submission.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Weekly Cohort Attendance & Drop-Off Digest
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Summary email covering weekly QR scan trends and absent participants.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
              </label>
            </div>
          </div>

          {/* Section 4: Privacy & HIPAA Safeguards */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Lock className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Participant Privacy & Masking
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 cursor-pointer">
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    Always Mask Participant Identifiers in Volunteer View
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Shows IDs like DS-PART-4921 instead of real names on the attendance roster.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={maskPii}
                  onChange={(e) => setMaskPii(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                />
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center gap-2 hover:-translate-y-0.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Platform Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}
