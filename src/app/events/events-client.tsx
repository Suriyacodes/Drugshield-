"use client";

import React, { useState } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { createEvent } from "./create-event-action";
import { registerForEvent } from "./register-event-action";
import { updateEvent } from "./update-event-action";
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
  capacity: number | null;
  registered: number;
  status: string;
  category: string;
}

interface EventsClientProps {
  initialEvents: Awaited<ReturnType<typeof import("@/lib/events/queries").getEvents>>;
  programs: Awaited<ReturnType<typeof import("@/lib/events/queries").getProgramsForEventForm>>;
  registeredEvents: Awaited<ReturnType<typeof import("@/lib/events/queries").getMyRegisteredEvents>>;
}

export default function EventsPage({
  initialEvents,
  programs,
  registeredEvents,
}: EventsClientProps) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [rsvpModalEvent, setRsvpModalEvent] = useState<EventItem | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [editModalEvent, setEditModalEvent] = useState<EventItem | null>(null);
  const [registeredEventIds, setRegisteredEventIds] = useState(
    () => new Set(registeredEvents.map((registration) => registration.event_id))
  );
  const [myRegisteredEventIds, setMyRegisteredEventIds] = useState(
    () => registeredEvents.map((registration) => registration.event_id)
  );

  const events: EventItem[] = initialEvents.map((event) => {
    const eventDate = new Date(event.event_date);

    const istDate = new Date(eventDate.getTime() + (5.5 * 60 * 60 * 1000));
    const day = istDate.getUTCDate();
    const month = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ][istDate.getUTCMonth()];
    const year = istDate.getUTCFullYear();

    const hours24 = istDate.getUTCHours();
    const minutes = istDate.getUTCMinutes();
    const hours12 = hours24 % 12 || 12;
    const period = hours24 >= 12 ? "PM" : "AM";

    return {
      id: event.id,
      title: event.title,
      program: event.programs?.[0]?.title ?? "Unassigned program",
      date: `${day} ${month} ${year}`,
      time: `${hours12}:${String(minutes).padStart(2, "0")} ${period}`,
      venue: event.location ?? "Location not specified",
      facilitator: "Not specified",
      capacity: event.capacity,
      registered: 0,
      status: event.capacity === 0 ? "Closed" : "Scheduled",
      category: "Event",
    };
  });

  const handleConfirmRsvp = async () => {
    if (!rsvpModalEvent) return;

    const result = await registerForEvent(rsvpModalEvent.id);

    if (!result.success) {
      alert(result.error);
      return;
    }

    setRegisteredEventIds((current) => {
      const next = new Set(current);
      next.add(rsvpModalEvent.id);
      return next;
    });

    setMyRegisteredEventIds((current) =>
      current.includes(rsvpModalEvent.id)
        ? current
        : [...current, rsvpModalEvent.id]
    );

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

        {/* My Registered Events */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                My Registered Events
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Events you have registered to attend.
              </p>
            </div>

            <Badge variant="emerald" size="sm">
              {myRegisteredEventIds.length} Registered
            </Badge>
          </div>

          {myRegisteredEventIds.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-6 text-center">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                No registered events yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Register for an event below and it will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {myRegisteredEventIds.map((eventId) => {
                const event = events.find((item) => item.id === eventId);

                if (!event) return null;

                return (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-white dark:bg-slate-900 p-5 shadow-xs"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Badge variant="emerald" size="sm" dot>
                          Registered
                        </Badge>

                        <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                          {event.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {event.program}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>{event.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-teal-600" />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

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
                      Not specified
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                      {evt.registered} / {evt.capacity} registered
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditModalEvent(evt)}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:border-teal-400 transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => setRsvpModalEvent(evt)}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      RSVP / Attendance
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
              {(() => {
                const sourceDate = initialEvents[0]?.event_date
                  ? new Date(initialEvents[0].event_date)
                  : new Date("2026-09-01T00:00:00+05:30");

                const istSource = new Date(
                  sourceDate.getTime() + 5.5 * 60 * 60 * 1000
                );

                const calendarYear = istSource.getUTCFullYear();
                const calendarMonth = istSource.getUTCMonth();

                const monthNames = [
                  "January", "February", "March", "April",
                  "May", "June", "July", "August",
                  "September", "October", "November", "December",
                ];

                const firstDay = new Date(
                  Date.UTC(calendarYear, calendarMonth, 1)
                );

                const firstDayOffset =
                  (firstDay.getUTCDay() + 6) % 7;

                const daysInMonth = new Date(
                  Date.UTC(calendarYear, calendarMonth + 1, 0)
                ).getUTCDate();

                const totalCells =
                  Math.ceil((firstDayOffset + daysInMonth) / 7) * 7;

                const getRawEvent = (id: string) =>
                  initialEvents.find((item) => item.id === id);

                const calendarEvents = events.filter((evt) => {
                  const rawEvent = getRawEvent(evt.id);

                  if (!rawEvent) return false;

                  const eventDate = new Date(
                    new Date(rawEvent.event_date).getTime() +
                      5.5 * 60 * 60 * 1000
                  );

                  return (
                    eventDate.getUTCFullYear() === calendarYear &&
                    eventDate.getUTCMonth() === calendarMonth
                  );
                });

                const getEventsForDay = (day: number) =>
                  calendarEvents.filter((evt) => {
                    const rawEvent = getRawEvent(evt.id);

                    if (!rawEvent) return false;

                    const eventDate = new Date(
                      new Date(rawEvent.event_date).getTime() +
                        5.5 * 60 * 60 * 1000
                    );

                    return (
                      eventDate.getUTCFullYear() === calendarYear &&
                      eventDate.getUTCMonth() === calendarMonth &&
                      eventDate.getUTCDate() === day
                    );
                  });

                return (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          {monthNames[calendarMonth]} {calendarYear} Session Matrix
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Showing scheduled events from Supabase
                        </p>
                      </div>

                      <span className="text-xs text-slate-500">
                        {calendarEvents.length} event
                        {calendarEvents.length === 1 ? "" : "s"}
                      </span>
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

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: totalCells }).map((_, index) => {
                        const day = index - firstDayOffset + 1;
                        const isCurrentMonth =
                          day >= 1 && day <= daysInMonth;

                        const dayEvents = isCurrentMonth
                          ? getEventsForDay(day)
                          : [];

                        return (
                          <div
                            key={index}
                            className={`p-2 rounded-xl border text-left min-h-[90px] ${
                              isCurrentMonth
                                ? dayEvents.length > 0
                                  ? "border-teal-400 bg-teal-50/50 dark:bg-teal-950/40"
                                  : "border-slate-100 dark:border-slate-800 bg-slate-50/20"
                                : "border-transparent bg-transparent opacity-30"
                            }`}
                          >
                            {isCurrentMonth && (
                              <>
                                <span className="text-[11px] font-mono text-slate-400">
                                  {day}
                                </span>

                                <div className="mt-1 space-y-1">
                                  {dayEvents.map((evt) => (
                                    <button
                                      key={evt.id}
                                      type="button"
                                      onClick={() => setRsvpModalEvent(evt)}
                                      className="w-full text-left rounded-lg bg-teal-600/10 hover:bg-teal-600/20 border border-teal-500/30 px-1.5 py-1 transition-colors"
                                    >
                                      <span className="block text-[9px] font-bold text-teal-700 dark:text-teal-300 truncate">
                                        {evt.title}
                                      </span>
                                      <span className="block text-[8px] text-teal-600 dark:text-teal-400 truncate">
                                        {evt.time}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {calendarEvents.length === 0 && (
                      <div className="text-center py-6 text-xs text-slate-500">
                        No events scheduled for this month.
                      </div>
                    )}
                  </>
                );
              })()}
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
                  <strong>Facilitator:</strong> Not specified
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 text-teal-800 dark:text-teal-300">
                A digital QR attendance token will automatically be generated in your dashboard pass upon confirmation.
              </div>

              {rsvpSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-center border border-emerald-200">
                  Registration Confirmed! Attendance token added to your pass.
                </div>
              ) : registeredEventIds.has(rsvpModalEvent.id) ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-center border border-emerald-200 dark:border-emerald-800">
                    You are already registered for this event.
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setRsvpModalEvent(null)}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
                    >
                      Close
                    </button>
                  </div>
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

        {/* Edit Event Modal */}
        {editModalEvent && (
          <Modal
            isOpen={!!editModalEvent}
            onClose={() => setEditModalEvent(null)}
            title="Edit Community Event"
            description={`Update the details for: ${editModalEvent.title}`}
          >
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData(e.currentTarget);
                const result = await updateEvent(editModalEvent.id, formData);

                if (!result.success) {
                  alert(result.error);
                  return;
                }

                setEditModalEvent(null);
                window.location.reload();
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Program
                </label>
                <select
                  name="program_id"
                  required
                  defaultValue={
                    initialEvents.find(
                      (event) => event.id === editModalEvent.id
                    )?.program_id ?? ""
                  }
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <option value="" disabled>
                    Select a program
                  </option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Event Title
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={editModalEvent.title}
                  required
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Date
                  </label>
                  <input
                    name="event_date"
                    type="date"
                    defaultValue={(() => {
                      const rawEvent = initialEvents.find(
                        (event) => event.id === editModalEvent.id
                      );

                      if (!rawEvent) return "";

                      const date = new Date(rawEvent.event_date);
                      const ist = new Date(
                        date.getTime() + 5.5 * 60 * 60 * 1000
                      );

                      return `${ist.getUTCFullYear()}-${String(
                        ist.getUTCMonth() + 1
                      ).padStart(2, "0")}-${String(
                        ist.getUTCDate()
                      ).padStart(2, "0")}`;
                    })()}
                    required
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">
                    Time
                  </label>
                  <input
                    name="event_time"
                    type="text"
                    inputMode="text"
                    placeholder="6:00 PM"
                    defaultValue={editModalEvent.time}
                    required
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Capacity
                </label>
                <input
                  name="capacity"
                  type="number"
                  min="1"
                  defaultValue={editModalEvent.capacity ?? ""}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">
                  Venue Address / Virtual URL
                </label>
                <input
                  name="location"
                  type="text"
                  defaultValue={editModalEvent.venue}
                  required
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditModalEvent(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
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
              onSubmit={async (e) => {
                e.preventDefault();

                const formData = new FormData(e.currentTarget);
                const result = await createEvent(formData);

                if (!result.success) {
                  alert(result.error);
                  return;
                }

                setCreateModalOpen(false);
                window.location.reload();
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Program</label>
                <select
                  name="program_id"
                  required
                  defaultValue=""
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                >
                  <option value="" disabled>Select a program</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {program.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Event Title</label>
                <input
                  name="title"
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
                    name="event_date"
                    type="date"
                    required
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300">Time</label>
                  <input
                    name="event_time"
                    type="text"
                    inputMode="text"
                    placeholder="6:00 PM"
                    required
                    className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Capacity</label>
                <input
                  name="capacity"
                  type="number"
                  min="1"
                  placeholder="E.g., 50"
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300">Venue Address / Virtual URL</label>
                <input
                  name="location"
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

