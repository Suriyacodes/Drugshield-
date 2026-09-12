"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import {
  ArrowRight,
  RotateCcw,
  Shield,
  Download,
} from "lucide-react";

export default function AssessmentsPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validated DAST-10 questions
  const questions = [
    {
      id: 1,
      text: "Have you used drugs other than those required for medical reasons?",
    },
    {
      id: 2,
      text: "Do you abuse more than one drug at a time?",
    },
    {
      id: 3,
      text: "Are you always able to stop using drugs when you want to?",
      invertScore: true, // "No" is 1 point
    },
    {
      id: 4,
      text: "Have you had blackouts or flashbacks as a result of drug use?",
    },
    {
      id: 5,
      text: "Do you ever feel bad or guilty about your drug use?",
    },
    {
      id: 6,
      text: "Does your spouse, partner, or parent ever complain about your involvement with drugs?",
    },
    {
      id: 7,
      text: "Have you neglected your family or school/work duties because of drug use?",
    },
    {
      id: 8,
      text: "Have you engaged in illegal activities in order to obtain drugs?",
    },
    {
      id: 9,
      text: "Have you ever experienced withdrawal symptoms (felt sick) when you stopped taking drugs?",
    },
    {
      id: 10,
      text: "Have you had medical problems as a result of your drug use (e.g. memory loss, hepatitis, convulsions)?",
    },
  ];

  const handleAnswer = (qId: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [qId]: val }));
  };

  // Compute DAST Score
  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const answered = answers[q.id];
      if (answered !== undefined) {
        if (q.invertScore) {
          if (answered === false) score += 1;
        } else {
          if (answered === true) score += 1;
        }
      }
    });
    return score;
  };

  const score = calculateScore();

  const getRiskLevel = (s: number): { tier: string; color: BadgeVariant; action: string } => {
    if (s === 0) return { tier: "None / Low Risk", color: "emerald", action: "Monitor; continue baseline wellness education." };
    if (s <= 2) return { tier: "Low Risk", color: "teal", action: "Encourage ongoing participation in peer resistance circles." };
    if (s <= 5) return { tier: "Moderate Risk", color: "amber", action: "Recommend confidential counseling review & brief intervention." };
    if (s <= 8) return { tier: "Substantial Risk", color: "red", action: "Intensive clinical assessment and referral advised immediately." };
    return { tier: "Severe Risk", color: "red", action: "Immediate professional intervention and medical detox consultation." };
  };

  const risk = getRiskLevel(score);
  const totalAnswered = Object.keys(answers).length;
  const progressPercent = Math.round((totalAnswered / questions.length) * 100);

  return (
    <DashboardShell>
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                DAST-10 Substance Risk Self-Assessment
              </h1>
              <Badge variant="teal">Clinically Validated</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Anonymous, non-punitive screening tool to assess chemical dependency risks and tailor recovery support.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-teal-600" />
            <span>100% Confidential & Secure</span>
          </div>
        </div>

        {!isSubmitted ? (
          /* Questionnaire Wizard */
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Assessment Progress</span>
                <span className="text-teal-600 dark:text-teal-400">
                  {totalAnswered} of {questions.length} Answered ({progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Questions List */}
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {q.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 sm:pl-4">
                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, true)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        answers[q.id] === true
                          ? "bg-teal-600 text-white shadow-xs"
                          : "border border-slate-200 dark:border-slate-700 hover:border-teal-400 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAnswer(q.id, false)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        answers[q.id] === false
                          ? "bg-slate-800 dark:bg-slate-700 text-white shadow-xs"
                          : "border border-slate-200 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Responses are not shared without explicit participant consent.
              </span>
              <button
                disabled={totalAnswered < questions.length}
                onClick={() => setIsSubmitted(true)}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center gap-2"
              >
                <span>Calculate Screening Score</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Results Card */
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <Badge variant={risk.color} size="md">
                {risk.tier.toUpperCase()}
              </Badge>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                DAST-10 Score: {score} / 10
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                {risk.action}
              </p>
            </div>

            {/* Clinical Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">
                Intervention Guidance:
              </h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                The Drug Abuse Screening Test (DAST-10) is a standard 10-item clinical tool. A score of <strong>{score}</strong> suggests that you would benefit from exploring the Campus Shield Peer Support modules, or speaking 1-on-1 with a DrugShield counselor.
              </p>
              {score >= 6 && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 flex items-center justify-between">
                  <span>Urgent support is always available free and confidentially.</span>
                  <a href="tel:18006624357" className="font-bold underline ml-2">
                    Call 1-800-662-4357
                  </a>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  setAnswers({});
                  setIsSubmitted(false);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>
              <button
                onClick={() => alert("Summary saved to your private recovery record.")}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Private Clinical Record</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
