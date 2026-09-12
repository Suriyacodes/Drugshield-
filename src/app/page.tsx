"use client";

import React from "react";
import Link from "next/link";
import {
  Shield,
  Heart,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  BookOpen,
  MapPin,
} from "lucide-react";
import { PublicNav } from "@/components/layout/public-nav";
import { PublicFooter } from "@/components/layout/public-footer";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const programs = [
    {
      id: "campus-360",
      tag: "FLAGSHIP INITIATIVE",
      title: "Campus Shield 360°",
      audience: "High Schools & Colleges",
      description:
        "Comprehensive 6-module peer education and refusal-skills curriculum. Includes verified QR event tracking and anonymous self-screening.",
      stat: "85+ Campuses Deployed",
      href: "/programs",
    },
    {
      id: "peer-network",
      tag: "YOUTH LEADERSHIP",
      title: "Peer Ambassador Corps",
      audience: "Youth Age 16 - 24",
      description:
        "Certified student advocates trained in mental wellness first aid, fentanyl test strip awareness, and de-escalation methods.",
      stat: "320+ Ambassadors",
      href: "/programs",
    },
    {
      id: "family-circle",
      tag: "FAMILY PREVENTION",
      title: "Parent & Guardian Circles",
      audience: "Families & Caregivers",
      description:
        "Compassionate guided sessions to detect early behavioral indicators, overcome communication barriers, and navigate recovery resources.",
      stat: "1,400+ Families Supported",
      href: "/programs",
    },
  ];

  const upcomingEvents = [
    {
      date: "SEP 24",
      time: "5:30 PM",
      title: "Understanding Synthetic Opioid Risks: Community Forum",
      venue: "Lincoln Community Center • Chicago, IL",
      badge: "Free Public Entry",
    },
    {
      date: "OCT 02",
      time: "4:00 PM",
      title: "Campus Shield Facilitator Training (Cohort IV)",
      venue: "Online Webinar + Live Q&A",
      badge: "Volunteer Certification",
    },
    {
      date: "OCT 15",
      time: "6:00 PM",
      title: "Youth Resilience & Stigma-Free Recovery Circle",
      venue: "Metro Youth Annex • Room 102",
      badge: "Confidential Session",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <PublicNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-b from-teal-50/40 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-400/10 dark:bg-teal-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 text-xs font-semibold shadow-xs">
              <Shield className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Evidence-Based Substance Abuse Prevention & Recovery NGO</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Protecting Youth. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500">
                Empowering Communities.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              DrugShield provides schools, youth centers, and health districts with proven substance education, confidential self-screenings, digital QR attendance, and certified peer volunteer intervention.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/programs"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/25 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <span>Explore Prevention Programs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Sign In to Member Portal</span>
              </Link>
            </div>

            {/* Micro reassurance */}
            <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Zero Stigma Policy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Accredited Curriculum</span>
              </div>
            </div>
          </div>

          {/* High Impact Numbers Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-5 text-center shadow-xs">
              <p className="text-3xl sm:text-4xl font-extrabold text-teal-600 dark:text-teal-400">
                14,200+
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                Lives Impacted
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-5 text-center shadow-xs">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                85+
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                Partner Campuses
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-5 text-center shadow-xs">
              <p className="text-3xl sm:text-4xl font-extrabold text-teal-600 dark:text-teal-400">
                320+
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                Certified Volunteers
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs p-5 text-center shadow-xs">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">
                89.4%
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                Cohort Retention Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Pillars Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="teal">OUR IMPACT PILLARS</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              A holistic framework for real harm reduction
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Unlike outdated punitive tactics, DrugShield blends clinically vetted education, peer empathy, and real-time accountability data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Pillar 1 */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 shadow-xs hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                1. Scientific Education & Refusal Skills
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Interactive youth curricula breaking down neurochemical dopamine loops, adulterated synthetic drug risks, and practical social boundary communication.
              </p>
              <div className="pt-2">
                <Link
                  href="/programs"
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                >
                  View curriculum modules →
                </Link>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 shadow-xs hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                2. Stigma-Free Peer Support Circles
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Safe spaces led by certified peer advocates where students and participants can share honest struggles without fear of disciplinary expulsion.
              </p>
              <div className="pt-2">
                <Link
                  href="/events"
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                >
                  Join next circle →
                </Link>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-7 shadow-xs hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                3. QR Tracking & Grant Analytics
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Seamless digital check-ins protect participant privacy while delivering robust attendance statistics and behavior change metrics to institutional partners.
              </p>
              <div className="pt-2">
                <Link
                  href="/analytics"
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                >
                  Explore analytics evidence →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Carousel / Grid */}
      <section className="py-20 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <Badge variant="teal">FLAGSHIP PROGRAMS</Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
                Proven models deployed in local schools
              </h2>
            </div>
            <Link
              href="/programs"
              className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
            >
              Browse all 8 active programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:border-teal-400 transition-all hover:shadow-lg bg-slate-50/40 dark:bg-slate-900/40"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400">
                    {prog.tag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                    {prog.title}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 mt-2 mb-3">
                    Target: {prog.audience}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {prog.stat}
                  </span>
                  <Link
                    href={prog.href}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 flex items-center gap-1"
                  >
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Community Workshops Banner */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                  COMMUNITY CALENDAR
                </span>
                <h3 className="text-2xl font-bold mt-1">Upcoming Free Outreach Sessions</h3>
              </div>
              <Link
                href="/events"
                className="text-xs font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                View Full Calendar & Register →
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.map((evt, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-800/80 border border-slate-700/60 hover:border-teal-500/60 transition-all gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-teal-600/20 border border-teal-500/30 flex flex-col items-center justify-center text-teal-400 shrink-0">
                      <span className="text-[10px] font-bold uppercase">{evt.date.split(" ")[0]}</span>
                      <span className="text-lg font-extrabold">{evt.date.split(" ")[1]}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-teal-400" />
                        {evt.venue} • {evt.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="teal" size="sm">
                      {evt.badge}
                    </Badge>
                    <Link
                      href="/events"
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors"
                    >
                      RSVP Free
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="py-20 bg-gradient-to-tr from-teal-800 via-teal-700 to-emerald-800 text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl space-y-6">
          <Badge variant="teal" className="bg-white/20 text-white border-white/30">
            MAKE A DIFFERENCE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold">
            Ready to bring DrugShield to your campus or community?
          </h2>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Join hundreds of educators, volunteers, counselors, and students working together for healthy, addiction-free futures.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-teal-900 font-extrabold text-sm shadow-xl hover:bg-teal-50 transition-all hover:scale-105"
            >
              Sign Up as Volunteer or Leader
            </Link>
            <Link
              href="/assessments"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-teal-900/60 hover:bg-teal-900 border border-teal-400/30 text-white font-bold text-sm transition-all"
            >
              Take Free Confidential Self-Screening
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
