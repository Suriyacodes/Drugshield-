"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { StatCard } from "@/components/ui/stat-card";
import {
  Users,
  Search,
  Clock,
  Award,
  Plus,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

interface VolunteerItem {
  id: string;
  name: string;
  role: string;
  chapter: string;
  hours: number;
  eventsLed: number;
  status: string;
  email: string;
  phone: string;
  specialty: string;
}

export default function VolunteersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerItem | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const volunteersData: VolunteerItem[] = [
    {
      id: "VOL-01",
      name: "Sarah Jenkins, MSW",
      role: "Certified Clinical Lead",
      chapter: "Chicago Northside",
      hours: 142,
      eventsLed: 24,
      status: "Verified Lead",
      email: "sarah.j@drugshield.ngo",
      phone: "(312) 555-0192",
      specialty: "Adolescent Crisis Counseling",
    },
    {
      id: "VOL-02",
      name: "Marcus Chen",
      role: "Peer Outreach Coordinator",
      chapter: "Metro High Schools",
      hours: 98,
      eventsLed: 18,
      status: "Active",
      email: "marcus.c@drugshield.ngo",
      phone: "(312) 555-0144",
      specialty: "Campus Ambassador Mentorship",
    },
    {
      id: "VOL-03",
      name: "Dr. Ethan Wright, MD",
      role: "Medical Harm Reduction Advisor",
      chapter: "District Health Liason",
      hours: 64,
      eventsLed: 12,
      status: "Verified Lead",
      email: "dr.wright@drugshield.ngo",
      phone: "(312) 555-0188",
      specialty: "Naloxone Administration Training",
    },
    {
      id: "VOL-04",
      name: "Maya Patel",
      role: "Youth Peer Facilitator",
      chapter: "University Cohort",
      hours: 46,
      eventsLed: 9,
      status: "Active",
      email: "maya.p@drugshield.ngo",
      phone: "(312) 555-0219",
      specialty: "Fentanyl Strip Harm Reduction",
    },
    {
      id: "VOL-05",
      name: "David Morales",
      role: "Parent Circle Facilitator",
      chapter: "South Suburbs",
      hours: 28,
      eventsLed: 5,
      status: "In Training",
      email: "david.m@drugshield.ngo",
      phone: "(312) 555-0371",
      specialty: "Bilingual Family Support",
    },
  ];

  const filteredVolunteers = volunteersData.filter((v) => {
    const matchesStatus =
      statusFilter === "All" || v.status === statusFilter;
    const matchesSearch =
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.specialty.toLowerCase().includes(search.toLowerCase()) ||
      v.chapter.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Volunteer & Counselor Directory
              </h1>
              <Badge variant="teal">{volunteersData.length} Certified Staff</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Field facilitators, peer mentors, and medical advisors safeguarding local communities.
            </p>
          </div>

          <button
            onClick={() => setAssignModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Deploy Volunteer to Shift</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Active Volunteers"
            value="48"
            change="100% Background Checked"
            isPositive={true}
            icon={<Users className="w-6 h-6" />}
          />
          <StatCard
            title="Community Hours Delivered"
            value="1,480 hrs"
            change="+120 hrs this month"
            isPositive={true}
            icon={<Clock className="w-6 h-6" />}
          />
          <StatCard
            title="Facilitator Rating"
            value="4.9 / 5.0"
            subtitle="Based on 480 attendee surveys"
            icon={<Award className="w-6 h-6" />}
          />
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["All", "Verified Lead", "Active", "In Training"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  statusFilter === st
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search volunteers by name, skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Volunteer Directory Table */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Volunteer & Role</th>
                  <th className="p-4">Chapter / Zone</th>
                  <th className="p-4">Specialty</th>
                  <th className="p-4">Impact Hours</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredVolunteers.map((v) => (
                  <tr
                    key={v.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                          {v.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">
                            {v.name}
                          </p>
                          <p className="text-[11px] text-slate-500">{v.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {v.chapter}
                    </td>
                    <td className="p-4 font-medium text-slate-800 dark:text-slate-200">
                      {v.specialty}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-teal-600 dark:text-teal-400">
                        {v.hours} hrs
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">
                        ({v.eventsLed} events)
                      </span>
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={
                          v.status === "Verified Lead"
                            ? "emerald"
                            : v.status === "Active"
                            ? "teal"
                            : "amber"
                        }
                        dot
                      >
                        {v.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedVolunteer(v)}
                        className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Volunteer Profile Modal */}
      {selectedVolunteer && (
        <Modal
          isOpen={!!selectedVolunteer}
          onClose={() => setSelectedVolunteer(null)}
          title={selectedVolunteer.name}
          description={selectedVolunteer.role}
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-4 h-4 text-teal-600" />
                <span>{selectedVolunteer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-4 h-4 text-teal-600" />
                <span>{selectedVolunteer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Background Check: Verified Clean (Expires 2027)</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-slate-800 dark:text-slate-200">
                Assigned Programs:
              </span>
              <p className="text-slate-500">
                Campus Shield 360°, University Harm Reduction, Adolescent Emergency De-escalation.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Direct message link sent to ${selectedVolunteer.email}`);
                  setSelectedVolunteer(null);
                }}
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold"
              >
                Send Coordinator Message
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Deploy Volunteer Modal */}
      {assignModalOpen && (
        <Modal
          isOpen={assignModalOpen}
          onClose={() => setAssignModalOpen(false)}
          title="Deploy Field Volunteer to Shift"
          description="Select an approved volunteer and assign them to an upcoming workshop or drive."
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Volunteer deployed to session! SMS alert dispatched.");
              setAssignModalOpen(false);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="font-bold">Select Volunteer</label>
              <select className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                {volunteersData.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.specialty})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Select Event Session</label>
              <select className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                <option>Campus Shield 360° - Session 4 (Northside High)</option>
                <option>Community Naloxone Training (Lincoln Park)</option>
                <option>Parent Guidance Circle (Online Zoom)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setAssignModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold"
              >
                Confirm Deployment
              </button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardShell>
  );
}
