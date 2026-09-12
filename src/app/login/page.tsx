"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Exact existing authentication submission logic
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Left NGO Impact Showcase Banner */}
      <div className="lg:w-1/2 bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Brand */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/30 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-2xl tracking-tight text-white flex items-center gap-1">
                Drug<span className="text-teal-400">Shield</span>
              </span>
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                Non-Profit Impact Portal
              </p>
            </div>
          </Link>
        </div>

        {/* Center Testimonial / Mission Statement */}
        <div className="my-12 relative z-10 space-y-6 max-w-lg">
          <Badge variant="teal" className="bg-teal-500/20 text-teal-300 border-teal-500/30">
            CONFIDENTIAL & SECURE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Restoring hope, preventing harm, and empowering every young life.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Sign in to access your program curriculum, log field volunteer hours, scan participant QR attendance, or check your recovery milestones.
          </p>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>Full end-to-end data encryption for participant records</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>HIPAA-aligned confidentiality safeguards</span>
            </div>
          </div>
        </div>

        {/* Emergency Crisis Hotline Callout */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">In crisis right now?</p>
              <p className="text-slate-400">Free, confidential 24/7 hotline</p>
            </div>
          </div>
          <a
            href="tel:18006624357"
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
          >
            1-800-662-4357
          </a>
        </div>
      </div>

      {/* Right Login Form Container */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Sign in to your DrugShield staff, volunteer, or participant account.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  placeholder="name@organization.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {loading ? (
                <span>Authenticating with DrugShield...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Link to Signup */}
            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                New to the DrugShield network?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
