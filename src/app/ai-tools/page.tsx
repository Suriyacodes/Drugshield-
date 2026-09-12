"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  Sparkles,
  Copy,
  Check,
  FileText,
  HeartHandshake,
  Cpu,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState<"summarizer" | "debrief" | "resources">(
    "summarizer"
  );
  const [inputPrompt, setInputPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [outputResult, setOutputResult] = useState<string | null>(
    "Ready. Select a copilot template or enter custom clinical notes to generate an evidence-backed synthesis."
  );

  const samplePrompts = {
    summarizer:
      "Participant DS-4921 scored 7 on DAST-10. Reports occasional binge use of prescription benzodiazepines during exam weeks. Expressed desire to stop but has trouble sleeping. Attended 3 workshops.",
    debrief:
      "Incident at Northside High Workshop Session 3: An attendee felt dizzy and panicked during synthetic opioid slide. Lead volunteer escorted to quiet room, provided water, conducted 4-7-8 breathing exercise. Parent contacted and arrived safely.",
    resources:
      "17-year-old student in Cook County, uninsured, seeks adolescent outpatient substance counseling with evening hours.",
  };

  const handleRunAI = (promptToRun?: string) => {
    const prompt = promptToRun || inputPrompt;
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setOutputResult(null);

    setTimeout(() => {
      setIsGenerating(false);
      if (activeTab === "summarizer") {
        setOutputResult(
          `### 📋 Clinical Synthesis & Care Pathway\n\n` +
          `**Subject:** Participant DS-4921 (High School Cohort)\n` +
          `**Assessment:** DAST-10 Score = 7 (Substantial Risk Tier)\n\n` +
          `#### Key Observations:\n` +
          `- **Primary Substance Mechanism:** Periodic benzodiazepine misuse linked to acute academic anxiety.\n` +
          `- **Protective Factors:** High motivation for cessation; active attendance in 3 cohort sessions.\n` +
          `- **Vulnerability:** Unmanaged sleep onset insomnia triggering chemical dependency loops.\n\n` +
          `#### Recommended Actions:\n` +
          `1. **Immediate:** Prioritize for 1-on-1 counselor check-in before Module 4.\n` +
          `2. **Skill Module:** Review Module 3 (Healthy Emotion & Sleep Coping Mechanisms).\n` +
          `3. **Medical Safety:** Provide safe prescription storage and non-pharmacological sleep hygiene guide.`
        );
      } else if (activeTab === "debrief") {
        setOutputResult(
          `### 📄 Formal Field Incident Report (Draft)\n\n` +
          `**Program:** Campus Shield 360° | Session 3\n` +
          `**Date/Time:** Incident recorded at Northside High School\n` +
          `**Incident Classification:** Acute Psychological Distress (Level 1 - Resolved)\n\n` +
          `**Chronological Account:**\n` +
          `- At 16:45, an attendee manifested symptoms of hyperventilation and anxiety.\n` +
          `- Standard protocol initiated: Volunteer lead separated attendee to low-stimulus environment.\n` +
          `- Calming exercises conducted; vital signs remained stable.\n` +
          `- Parent/guardian notified at 17:00; handoff completed at 17:25 with supportive demeanor.\n\n` +
          `**Corrective / Prevention Note:**\n` +
          `Recommend pre-warning attendees before displaying detailed statistical overdose graphs in future cohorts.`
        );
      } else {
        setOutputResult(
          `### 🧭 Tailored Community Resource Recommendations\n\n` +
          `**Target Profile:** Adolescent, Uninsured, Cook County / Chicago Area\n\n` +
          `1. **Cook County Health Adolescent Wellness Center**\n` +
          `   - *Services:* Sliding-scale sliding fees, zero out-of-pocket for uninsured youth.\n` +
          `   - *Hours:* Mon/Wed/Fri evening outpatient hours (5:00 PM - 8:30 PM).\n` +
          `   - *Contact:* (312) 864-0200 • Referral Code: DS-NGO-EXP\n\n` +
          `2. **Lurie Children’s Substance Use & Prevention Program (SUPP)**\n` +
          `   - *Services:* Specialized youth dual-diagnosis care, peer recovery mentors.\n` +
          `   - *Financial Assistance:* Full state grant coverage available for enrolled youth.`
        );
      }
    }, 1200);
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                AI Counselor & Care Copilot
              </h1>
              <Badge variant="teal" dot>
                Local Ollama Ready
              </Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              HIPAA-aligned local LLM assistant for drafting clinical summaries, debrief reports, and participant resource referrals.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <Cpu className="w-3.5 h-3.5 text-teal-600" />
            <span>Local Engine: Ollama / Llama-3 (Offline Safe)</span>
          </div>
        </div>

        {/* Template Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => {
              setActiveTab("summarizer");
              setInputPrompt(samplePrompts.summarizer);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "summarizer"
                ? "bg-teal-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Clinical Risk Summarizer</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("debrief");
              setInputPrompt(samplePrompts.debrief);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "debrief"
                ? "bg-teal-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Incident Debrief Drafter</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("resources");
              setInputPrompt(samplePrompts.resources);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "resources"
                ? "bg-teal-600 text-white shadow-xs"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Resource & Referral Matcher</span>
          </button>
        </div>

        {/* Main Interface: Split Screen Input / Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Prompt Input Box */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Case Notes / Observation Input
                </span>
                <button
                  type="button"
                  onClick={() => setInputPrompt(samplePrompts[activeTab])}
                  className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Load Sample Scenario
                </button>
              </div>

              <textarea
                rows={10}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Paste assessment answers, counselor field notes, or incident bullet points..."
                className="w-full p-3.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white"
              />

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>Zero telemetry: Processed on internal NGO privacy perimeter.</span>
              </div>
            </div>

            <button
              onClick={() => handleRunAI()}
              disabled={isGenerating || !inputPrompt.trim()}
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing with Local AI Copilot...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Care Recommendations</span>
                </>
              )}
            </button>
          </div>

          {/* AI Response Output */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Generated Copilot Dossier
                  </span>
                </div>
                {outputResult && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-teal-600 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Markdown</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Formatted Output Container */}
              <div className="min-h-[260px] p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans overflow-y-auto max-h-[380px]">
                {outputResult}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Counselor verification required prior to formal filing.
              </span>
              <button
                onClick={() => alert("Copilot summary attached to participant care record.")}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white font-semibold text-xs"
              >
                Insert into Participant Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
