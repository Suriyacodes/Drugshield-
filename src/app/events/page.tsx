"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  Calendar,
  Clock,
  MapPin,
  Plus,
} from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  program: string;
  date: string;
  time: string;
  venue: string;
  facilitator: string;
  capacity: number;
  registered: number;
  status: string;
  category: string;
}

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [rsvpModalEvent, setRsvpModalEvent] = useState<EventItem | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const initialEvents: EventItem[] = [
    {
      id: "EVT-101",
      title: "Campus Shield 360° - High School Workshop (Session 4)",
      program: "Campus Shield 360°",
      date: "Tomorrow, Sep 23",
      time: "4:30 PM - 6:00 PM",
      venue: "Northside High Auditorium (Room 2)",
      facilitator: "Sarah Jenkins (MSW)",
      capacity: 60,
      registered: 52,
      status: "Open for RSVP",
      category: "Workshop",
    },
    {
      id: "EVT-102",
      title: "Community Naloxone (Narcan) & Fentanyl Strip Training",
      program: "Harm Reduction Outreach",
      date: "Thursday, Sep 25",
      time: "6:00 PM - 7:30 PM",
      venue: "Lincoln Park Public Library Annex",
      facilitator: "Dr. Ethan Wright, MD",
      capacity: 80,
      registered: 80,
      status: "Waitlist Only",
      category: "Certification",
    },
    {
      id: "EVT-103",
      title: "Parent & Guardian Substance Education Circle",
      program: "Parent & Guardian Guidance Circles",
      date: "Saturday, Sep 27",
      time: "10:00 AM - 11:30 AM",
      venue: "Online Zoom Live Interactive",
      facilitator: "Elena Rostova (LCSW)",
      capacity: 40,
      registered: 28,
      status: "Open for RSVP",
      category: "Support Circle",
    },
    {
      id: "EVT-104",
      title: "Youth Peer Ambassador Orientation & Roleplay",
      program: "Youth Ambassador Peer Corps",
      date: "Monday, Sep 29",
      time: "5:00 PM - 7:00 PM",
      venue: "Central Youth District Hub",
      facilitator: "Marcus Chen",
      capacity: 35,
      registered: 30,
      status: "Open for RSVP",
      category: "Training",
    },
  ];

  const [events] = useState<EventItem[]>(initialEvents);

  const handleConfirmRsvp = () => {
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpModalEvent(null);
    }, 1500);
  };

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Events & Workshop Sessions
              </h1>
              <Badge variant="teal">{events.length} Scheduled</Badge>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Community workshops, peer support circles, and facilitator training drives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule New Event</span>
            </button>
          </div>
        </div>

        {/* View Toggle and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === "calendar"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Calendar Matrix
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Filter:</span>
            <Badge variant="teal" size="sm">All Categories</Badge>
            <Badge variant="slate" size="sm">Next 14 Days</Badge>
          </div>
        </div>

        {/* Events View: List Mode */}
        {viewMode === "list" ? (
          <div className="space-y-4">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-teal-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-slate-400">
                      {evt.id}
                    </span>
                    <Badge variant="teal" size="sm">
                      {evt.category}
                    </Badge>
                    <Badge
                      variant={evt.status === "Open for RSVP" ? "emerald" : "amber"}
                      dot
                      size="sm"
                    >
                      {evt.status}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Facilitator & Capacity */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 md:gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left md:text-right">
                    <p className="text-xs text-slate-500">Facilitator</p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {evt.facilitator}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                      {evt.registered} / {evt.capacity} registered
                    </span>
                  </div>

                  <button
                    onClick={() => setRsvpModalEvent(evt)}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    RSVP / Attendance
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Calendar Matrix Mock */
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">
                September 2026 Session Matrix
              </h3>
              <span className="text-xs text-slate-500">Showing all assigned shifts</span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500 py-2 border-b border-slate-100 dark:border-slate-800">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            <div className="grid grid-cols-7 gap-2 min-h-[300px]">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-xl border text-left flex flex-col justify-between min-h-[70px] ${
                    i === 22 || i === 24 || i === 26
                      ? "border-teal-400 bg-teal-50/50 dark:bg-teal-950/40"
                      : "border-slate-100 dark:border-slate-800 bg-slate-50/20"
                  }`}
                >
                  <span className="text-[11px] font-mono text-slate-400">{i + 1}</span>
                  {(i === 22 || i === 24 || i === 26) && (
                    <span className="text-[9px] font-bold text-teal-700 dark:text-teal-300 truncate">
                      Workshop Session
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RSVP Modal */}
        {rsvpModalEvent && (
          <Modal
            isOpen={!!rsvpModalEvent}
            onClose={() => setRsvpModalEvent(null)}
            title="RSVP / Registration Confirmation"
            description={`Confirm your participation for: ${rsvpModalEvent.title}`}
          >
            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <p>
                  <strong>Date & Time:</strong> {rsvpModalEvent.date} ({rsvpModalEvent.time})
                </p>
                <p>
                  <strong>Location:</strong> {rsvpModalEvent.venue}
                </p>
                <p>
                  <strong>Facilitator:</strong> {rsvpModalEvent.facilitator}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-800 dark:text-teal-300">
                A digital QR attendance token will automatically be generated in your dashboard pass upon confirmation.
              </div>

              {rsvpSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-center border border-emerald-200">
                  Registration Confirmed! Attendance token added to your pass.
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    onClick={() => setRsvpModalEvent(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRsvp}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-xs"
                  >
                    Confirm Registration
                  </button>
                </div>
              )}
            </div>
          </Modal>
        )}

        {/* Create Event Modal */}
        {createModalOpen && (
          <Modal
            isOpen={createModalOpen}
            onClose={() => setCreateModalOpen(false)}
            title="Schedule New Community Session"
            description="Create a workshop, support circle, or volunteer training drive."
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("New event drafted and notified to chapter coordinators.");
                setCreateModalOpen(false);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Event Title</label>
                <input
                  type="text"
                  placeholder="E.g., Campus Shield Peer Refusal Workshop"
                  required
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Date</label>
                  <input
                    type="date"
                    required
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Time</label>
                  <input
                    type="time"
                    required
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Venue Address / Virtual URL</label>
                <input
                  type="text"
                  placeholder="E.g., Northside High Room 102 or Zoom link"
                  required
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 text-white font-bold"
                >
                  Publish Session
                </button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </DashboardShell>
  );
}
