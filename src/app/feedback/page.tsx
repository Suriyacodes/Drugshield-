"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/ui/stat-card";
import {
  Star,
  Send,
  Heart,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";

export default function FeedbackPage() {
  const [rating, setRating] = useState(5);
  const [sentimentType, setSentimentType] = useState<"participant" | "volunteer">("participant");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reviews = [
    {
      id: "FB-01",
      role: "High School Participant",
      program: "Campus Shield 360°",
      rating: 5,
      date: "Yesterday",
      comment:
        "The refusal-skills script actually helped me during a party this weekend. For the first time, I felt confident saying no without looking weird.",
      sentiment: "Positive",
    },
    {
      id: "FB-02",
      role: "Parent Attendee",
      program: "Parent & Guardian Guidance Circles",
      rating: 5,
      date: "3 days ago",
      comment:
        "Elena was so empathetic. Learning about modern fentanyl test strips and naloxone removed so much panic and gave us practical tools.",
      sentiment: "Positive",
    },
    {
      id: "FB-03",
      role: "Field Volunteer Lead",
      program: "Harm Reduction Workshop",
      rating: 4,
      date: "1 week ago",
      comment:
        "Turnout was great (52 attendees). We could use an extra volunteer at the door for QR scanning during the first 10 minutes rush.",
      sentiment: "Constructive",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setComments("");
      setSubmitted(false);
    }, 2500);
  };

  return (
    <DashboardShell>
      <div className="space-y-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Community Voice & Session Feedback
              </h1>
              <Badge variant="teal">360° Survey Hub</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Gathering honest input from participants, families, and field volunteers to continuously improve our curriculum.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Anonymous Submissions Encouraged</span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Overall Satisfaction"
            value="4.88 / 5.0"
            change="+0.2 this quarter"
            isPositive={true}
            icon={<Star className="w-6 h-6 fill-amber-400 text-amber-400" />}
          />
          <StatCard
            title="Safety & Trust Rating"
            value="98.2%"
            subtitle="Felt physically and emotionally safe"
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <StatCard
            title="Total Reviews Collected"
            value="1,240"
            change="Across 18 cohorts"
            isPositive={true}
            icon={<MessageSquare className="w-6 h-6" />}
          />
        </div>

        {/* Two Column: Form + Live Feedback Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Submit Session Feedback
              </h3>
              <p className="text-xs text-slate-500">
                Help us understand what resonated and how we can better support you.
              </p>
            </div>

            {/* Respondent Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                I am submitting as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSentimentType("participant")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    sentimentType === "participant"
                      ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Participant / Family
                </button>
                <button
                  type="button"
                  onClick={() => setSentimentType("volunteer")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    sentimentType === "volunteer"
                      ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200"
                      : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Volunteer / Facilitator
                </button>
              </div>
            </div>

            {/* Rating Stars */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Overall Session Rating:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-700"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Comment Area */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Your Thoughts & Honest Observations:
                </label>
                <textarea
                  rows={4}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="What was most helpful? What topics felt unclear? Any logistical improvements needed?"
                  required
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Confidential Feedback</span>
              </button>
            </form>

            {submitted && (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold text-center border border-emerald-200">
                Thank you! Your feedback has been received and reviewed by the evaluation committee.
              </div>
            )}
          </div>

          {/* Feedback Stream */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recent Community Insights
                </h3>
                <span className="text-xs text-slate-400">Live feed</span>
              </div>

              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {rev.role}
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500">{rev.program}</span>
                      </div>
                      <Badge variant={rev.sentiment === "Positive" ? "emerald" : "teal"} size="sm">
                        {rev.sentiment}
                      </Badge>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 italic leading-relaxed">
                      &quot;{rev.comment}&quot;
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <span>{rev.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold cursor-pointer">
                Export Full Qualitative Feedback Report (CSV) →
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
