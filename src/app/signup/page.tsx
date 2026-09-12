"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  User,
  Mail,
  Lock,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Eye,
  EyeOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [roleIntent, setRoleIntent] = useState<"volunteer" | "participant">("volunteer");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Exact existing signup logic preserved
  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name, role_intent: roleIntent } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage("Account created successfully. Check your email if confirmation is enabled.");
    setLoading(false);
    setTimeout(() => router.push("/login"), 1500);
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      {/* Left NGO Brand Panel */}
      <div className="lg:w-1/2 bg-gradient-to-br from-teal-950 via-slate-950 to-slate-900 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

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
                Community Impact Foundation
              </p>
            </div>
          </Link>
        </div>

        <div className="my-12 relative z-10 space-y-6 max-w-lg">
          <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
            JOIN THE IMPACT NETWORK
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Be part of a nationwide movement safeguarding young lives.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Whether you are registering as a dedicated field volunteer, campus educator, or participant taking your first step toward recovery, DrugShield welcomes you.
          </p>

          <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Certified volunteer hours tracking for campus credits</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Private digital attendance passes for discreet event entry</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct access to evidence-backed harm reduction materials</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-teal-400" />
            <span className="text-slate-300">Confidential Helpline: 1-800-662-4357</span>
          </div>
          <span className="text-slate-500 text-[10px]">24/7 • 365 Days</span>
        </div>
      </div>

      {/* Right Registration Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create an account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Join the DrugShield community prevention & wellness portal.
            </p>
          </div>

          {/* Role Intent Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              I am joining primarily as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRoleIntent("volunteer")}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center gap-2 ${
                  roleIntent === "volunteer"
                    ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 ring-2 ring-teal-500/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <HeartHandshake className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Volunteer / Educator</span>
              </button>
              <button
                type="button"
                onClick={() => setRoleIntent("participant")}
                className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all flex items-center gap-2 ${
                  roleIntent === "participant"
                    ? "border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 text-teal-900 dark:text-teal-200 ring-2 ring-teal-500/20"
                    : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                }`}
              >
                <Shield className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Participant / Member</span>
              </button>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Full Legal or Preferred Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="E.g., Alex Rivera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="alex@example.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Create Password (min. 6 characters)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  minLength={6}
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

            {/* Error & Message Alerts */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs">
                {error}
              </div>
            )}
            {message && (
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs">
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {loading ? (
                <span>Registering Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
