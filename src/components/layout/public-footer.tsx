import React from "react";
import Link from "next/link";
import { Shield, Mail, MapPin, AlertCircle } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Community Safety & Non-Medical Notice Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/80 py-6">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">
                Important Community Safety Notice
              </h4>
              <p className="text-xs text-slate-400">
                DrugShield provides community education, workshop materials, and peer mentorship. We are not a medical or clinical crisis provider. In a medical or psychiatric emergency, immediately contact local emergency services (911).
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-400 text-center md:text-right shrink-0">
            <span>Non-Profit Community Initiative (Demo)</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-white">DrugShield</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            DrugShield is a community impact foundation committed to school and campus substance awareness, peer recovery support, and verified workshop attendance tracking.
          </p>
          <div className="pt-2 flex flex-col gap-1.5 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>National Operations Hub, Chicago, IL (Demo)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>info@drugshield.org</span>
            </div>
          </div>
        </div>

        {/* Column 1 */}
        <div>
          <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
            Prevention Programs
          </h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/programs" className="hover:text-teal-400 transition-colors">Campus Shield 360°</Link></li>
            <li><Link href="/programs" className="hover:text-teal-400 transition-colors">Peer Ambassador Network</Link></li>
            <li><Link href="/programs" className="hover:text-teal-400 transition-colors">Parent & Guardian Circles</Link></li>
            <li><Link href="/programs" className="hover:text-teal-400 transition-colors">High School Awareness Drive</Link></li>
            <li><Link href="/programs" className="hover:text-teal-400 transition-colors">Workplace Wellness</Link></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
            Impact & Community
          </h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/events" className="hover:text-teal-400 transition-colors">Upcoming Workshops</Link></li>
            <li><Link href="/assessments" className="hover:text-teal-400 transition-colors">DAST-10 Self-Screening</Link></li>
            <li><Link href="/analytics" className="hover:text-teal-400 transition-colors">Impact Summary Report</Link></li>
            <li><Link href="/volunteers" className="hover:text-teal-400 transition-colors">Volunteer Directory</Link></li>
            <li><Link href="/feedback" className="hover:text-teal-400 transition-colors">Participant Voice & Survey</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h5 className="text-white font-semibold text-xs tracking-wider uppercase mb-3">
            Organization & Portals
          </h5>
          <ul className="space-y-2 text-xs">
            <li><Link href="/signup" className="hover:text-teal-400 transition-colors">Join as Volunteer</Link></li>
            <li><Link href="/dashboard" className="hover:text-teal-400 transition-colors">Member Dashboard</Link></li>
            <li><Link href="/ai-tools" className="hover:text-teal-400 transition-colors">AI Facilitator Tools</Link></li>
            <li><Link href="/settings" className="hover:text-teal-400 transition-colors">Privacy & Settings</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-slate-900 py-6 text-xs">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} DrugShield Impact Platform. Dedicated to youth substance education & awareness.
          </p>
          <div className="flex items-center gap-6 text-slate-500">
            <span className="hover:text-slate-400 cursor-pointer">Community Confidentiality Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Data Protection Guidelines</span>
            <span className="hover:text-slate-400 cursor-pointer">Volunteer Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
