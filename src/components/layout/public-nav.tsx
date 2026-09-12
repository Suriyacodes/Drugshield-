"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, AlertCircle, Menu, X, HeartHandshake } from "lucide-react";

export function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
      {/* Top Notice Bar */}
      <div className="bg-slate-900 text-white text-xs px-4 py-1.5">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400" />
            <span className="font-medium text-slate-300">
              DrugShield Community Network • Substance Awareness & Peer Support
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
            <span>For acute medical or psychological emergencies, immediately call 911.</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              Drug<span className="text-teal-600 dark:text-teal-400">Shield</span>
            </span>
            <p className="text-[10px] font-medium tracking-widest uppercase text-slate-400 -mt-1">
              Community Awareness & Impact
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/programs" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Programs
          </Link>
          <Link href="/events" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Workshops & Events
          </Link>
          <Link href="/assessments" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Self-Screening
          </Link>
          <Link href="/analytics" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Impact Evidence
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-semibold px-4 py-2 text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/20 transition-all flex items-center gap-1.5"
          >
            <HeartHandshake className="w-4 h-4" />
            Get Involved
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 font-medium text-slate-700 dark:text-slate-200">
            <Link
              href="/programs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Programs & Initiatives
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Events & Drives
            </Link>
            <Link
              href="/assessments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Self-Screening Tools
            </Link>
            <Link
              href="/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Impact Evidence
            </Link>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center font-medium border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
            >
              Sign In to Portal
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center font-semibold bg-teal-600 text-white rounded-xl shadow-xs"
            >
              Join DrugShield
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
