"use client";

import React, { useState, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  Layers,
  Calendar,
  Users,
  UserCheck,
  QrCode,
  FileCheck2,
  MessageSquareHeart,
  BarChart3,
  Bot,
  Settings,
  Bell,
  Menu,
  X,
  PhoneCall,
  UserCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import LogoutButton from "@/app/dashboard/logout-button";

export type RoleType = "admin" | "volunteer" | "participant";

interface DashboardContextType {
  currentRole: RoleType;
  setRole: (role: RoleType) => void;
  userProfile?: {
    full_name?: string | null;
    role?: string | null;
  };
}

const DashboardContext = createContext<DashboardContextType>({
  currentRole: "admin",
  setRole: () => {},
});

export const useDashboard = () => useContext(DashboardContext);

interface DashboardShellProps {
  children: React.ReactNode;
  initialRole?: RoleType;
  userProfile?: {
    full_name?: string | null;
    role?: string | null;
  };
}

export function DashboardShell({
  children,
  initialRole = "admin",
  userProfile,
}: DashboardShellProps) {
  const [currentRole, setRole] = useState<RoleType>(
    (userProfile?.role as RoleType) || initialRole
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Items with role visibility flags
  const navItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "volunteer", "participant"],
    },
    {
      label: "Programs",
      href: "/programs",
      icon: Layers,
      roles: ["admin", "volunteer", "participant"],
    },
    {
      label: "Events & Sessions",
      href: "/events",
      icon: Calendar,
      roles: ["admin", "volunteer", "participant"],
    },
    {
      label: "Volunteers",
      href: "/volunteers",
      icon: Users,
      roles: ["admin"],
    },
    {
      label: "Participants",
      href: "/participants",
      icon: UserCheck,
      roles: ["admin", "volunteer"],
    },
    {
      label: "QR Attendance",
      href: "/attendance",
      icon: QrCode,
      badge: "Live",
      roles: ["admin", "volunteer", "participant"],
    },
    {
      label: "Assessments (DAST)",
      href: "/assessments",
      icon: FileCheck2,
      roles: ["admin", "volunteer", "participant"],
    },
    {
      label: "Community Voice",
      href: "/feedback",
      icon: MessageSquareHeart,
      roles: ["admin", "volunteer", "participant"],
    },
    {
      label: "Impact Analytics",
      href: "/analytics",
      icon: BarChart3,
      roles: ["admin"],
    },
    {
      label: "AI Counselor Tools",
      href: "/ai-tools",
      icon: Bot,
      badge: "AI",
      roles: ["admin", "volunteer"],
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["admin", "volunteer", "participant"],
    },
  ];

  const visibleNavItems = navItems.filter((item) =>
    item.roles.includes(currentRole)
  );

  return (
    <DashboardContext.Provider value={{ currentRole, setRole, userProfile }}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col antialiased">
        {/* Urgent Crisis Bar on top */}
        <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="font-medium text-white">Confidential Support:</span>
            <span className="hidden sm:inline">24/7 Helpline 1-800-662-4357</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Interactive Role Switcher Pill for Previewing */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <span className="text-[10px] text-slate-400 px-2 font-medium uppercase tracking-wider hidden sm:inline">
                View As:
              </span>
              {(["admin", "volunteer", "participant"] as RoleType[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-all ${
                    currentRole === r
                      ? "bg-teal-500 text-slate-950 font-bold shadow-xs"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-1 relative overflow-hidden">
          {/* Sidebar for Desktop */}
          <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 select-none">
            {/* Logo */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link href="/dashboard" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
                    Drug<span className="text-teal-600 dark:text-teal-400">Shield</span>
                  </span>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                    Impact Portal
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {currentRole} Menu
              </div>
              {visibleNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-semibold shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? "text-teal-600 dark:text-teal-400"
                            : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Footprint & Logout */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                    {(userProfile?.full_name ?? "U").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {userProfile?.full_name ?? "DrugShield Member"}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 capitalize truncate">
                      Role: {currentRole}
                    </p>
                  </div>
                </div>
                <LogoutButton />
              </div>
            </div>
          </aside>

          {/* Mobile Sidebar Slide-Over */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="relative w-72 max-w-[80vw] bg-white dark:bg-slate-900 h-full flex flex-col z-10 shadow-2xl">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">DrugShield Menu</span>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                  {visibleNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                          isActive
                            ? "bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-semibold"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                  <LogoutButton />
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            {/* Topbar */}
            <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 h-15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Badge variant="teal" dot size="sm">
                    {currentRole.toUpperCase()} VIEW
                  </Badge>
                  <span className="hidden sm:inline text-xs text-slate-400">
                    Community Substance Shield Network
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Emergency Hotline shortcut */}
                <a
                  href="tel:18006624357"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>24/7 Helpline</span>
                </a>

                {/* Notification Dropdown Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500" />
                  </button>

                  {notificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-4 z-50 text-xs space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          Community Alerts
                        </span>
                        <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold cursor-pointer">
                          Mark all read
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/40">
                          <p className="font-semibold text-teal-800 dark:text-teal-300">
                            Upcoming Workshop
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                            Campus Shield Session 3 starts in 45 minutes at Hall B.
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/40">
                          <p className="font-semibold text-amber-800 dark:text-amber-300">
                            Follow-up Due
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                            Participant DS-4819 completed self-screening with Moderate Risk.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="hidden sm:block h-6 w-px bg-slate-200 dark:bg-slate-800" />

                {/* Profile Pill */}
                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <UserCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 hidden sm:inline">
                    {userProfile?.full_name ?? "Account"}
                  </span>
                </Link>
              </div>
            </header>

            {/* Page Viewport */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {children}
            </main>
          </div>
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
