"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CreateProgramForm from "./create-program-form";
import EditProgramForm from "./edit-program-form";
import { archiveProgram } from "./actions/archive-program";
import { createClient } from "@/lib/supabase/client";
import { restoreProgram } from "./actions/restore-program";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  Search,
  Plus,
  MapPin,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

interface ProgramItem {
  id: string;
  title: string;
  description: string | null;
  awareness_topic: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

interface ProgramsClientProps {
  initialPrograms: ProgramItem[];
}

export default function ProgramsClient({
  initialPrograms,
}: ProgramsClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [activeModalProgram, setActiveModalProgram] =
    useState<ProgramItem | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [archiveError, setArchiveError] = useState("");
  const [isRestoring, setIsRestoring] = useState(false);

  const topics = useMemo(() => {
    const uniqueTopics = Array.from(
      new Set(
        initialPrograms
          .map((program) => program.awareness_topic)
          .filter((topic): topic is string => Boolean(topic))
      )
    );

    return ["All", ...uniqueTopics];
  }, [initialPrograms]);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("programs-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "programs",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const filteredPrograms = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialPrograms.filter((program) => {
      const matchesTopic =
        selectedTopic === "All" ||
        program.awareness_topic === selectedTopic;

      const matchesSearch =
        !query ||
        program.title.toLowerCase().includes(query) ||
        (program.description ?? "").toLowerCase().includes(query) ||
        (program.awareness_topic ?? "").toLowerCase().includes(query) ||
        (program.location ?? "").toLowerCase().includes(query);

      return matchesTopic && matchesSearch;
    });
  }, [initialPrograms, search, selectedTopic]);

  return (
    <DashboardShell>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Prevention & Education Programs
              </h1>

              <Badge variant="teal">
                {initialPrograms.length} Programs
              </Badge>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Manage real DrugShield prevention and awareness programs.
            </p>
          </div>

          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Launch New Program</span>
          </button>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedTopic === topic
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-teal-400"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search programs..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Real Programs */}
        {filteredPrograms.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              No programs found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {initialPrograms.length === 0
                ? "No programs have been created yet."
                : "Try changing your search or topic filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-teal-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {program.awareness_topic && (
                        <Badge variant="teal" size="sm">
                          {program.awareness_topic}
                        </Badge>
                      )}

                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                        {program.title}
                      </h3>
                    </div>

                    <Badge variant="emerald" dot size="sm">
                      {program.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {program.description || "No description provided."}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
                    {program.location && (
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>{program.location}</span>
                      </div>
                    )}

                    {(program.start_date || program.end_date) && (
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                        <CalendarDays className="w-3.5 h-3.5 text-teal-600" />
                        <span>
                          {program.start_date || "—"}{" "}
                          {program.end_date
                            ? `→ ${program.end_date}`
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
                  <button
                    onClick={() => setActiveModalProgram(program)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    <span>View Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Program */}
      {showCreateForm && (
        <Modal
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          title="Launch New Program"
          description="Create a new DrugShield prevention or awareness program."
        >
          <CreateProgramForm
            onCancel={() => setShowCreateForm(false)}
            onSuccess={() => {
              setShowCreateForm(false);
              router.refresh();
            }}
          />
        </Modal>
      )}

      {/* Program Detail */}
      {activeModalProgram && (
        <Modal
          isOpen={!!activeModalProgram}
          onClose={() => setActiveModalProgram(null)}
          title={activeModalProgram.title}
          description={
            activeModalProgram.awareness_topic ||
            "DrugShield prevention program"
          }
        >
          <div className="space-y-5">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModalProgram.description ||
                "No description provided for this program."}
            </p>

            <div className="grid grid-cols-1 gap-3 text-xs">
              {activeModalProgram.awareness_topic && (
                <div>
                  <span className="font-semibold text-slate-500">
                    Awareness topic
                  </span>
                  <p className="mt-1 text-slate-800 dark:text-slate-200">
                    {activeModalProgram.awareness_topic}
                  </p>
                </div>
              )}

              {activeModalProgram.location && (
                <div>
                  <span className="font-semibold text-slate-500">
                    Location
                  </span>
                  <p className="mt-1 text-slate-800 dark:text-slate-200">
                    {activeModalProgram.location}
                  </p>
                </div>
              )}

              <div>
                <span className="font-semibold text-slate-500">
                  Program period
                </span>
                <p className="mt-1 text-slate-800 dark:text-slate-200">
                  {activeModalProgram.start_date || "Not specified"}
                  {" → "}
                  {activeModalProgram.end_date || "Not specified"}
                </p>
              </div>

              <div>
                <span className="font-semibold text-slate-500">Status</span>
                <p className="mt-1 text-slate-800 dark:text-slate-200">
                  {activeModalProgram.status}
                </p>
              </div>
            </div>

            {archiveError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
                {archiveError}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              {activeModalProgram.status === "archived" ? (
                <button
                  disabled={isRestoring}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Restore "${activeModalProgram.title}"?`
                    );

                    if (!confirmed) return;

                    setArchiveError("");
                    setIsRestoring(true);

                    const result = await restoreProgram(activeModalProgram.id);

                    if (!result.success) {
                      setArchiveError(result.error);
                      setIsRestoring(false);
                      return;
                    }

                    setActiveModalProgram(null);
                    setIsRestoring(false);
                    router.refresh();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-teal-200 text-teal-600 hover:bg-teal-50 disabled:opacity-50"
                >
                  {isRestoring ? "Restoring..." : "Restore Program"}
                </button>
              ) : (
                <button
                  disabled={isArchiving}
                  onClick={async () => {
                    const confirmed = window.confirm(
                      `Archive "${activeModalProgram.title}"?`
                    );

                    if (!confirmed) return;

                    setArchiveError("");
                    setIsArchiving(true);

                    const result = await archiveProgram(activeModalProgram.id);

                    if (!result.success) {
                      setArchiveError(result.error);
                      setIsArchiving(false);
                      return;
                    }

                    setActiveModalProgram(null);
                    setIsArchiving(false);
                    router.refresh();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  {isArchiving ? "Archiving..." : "Archive"}
                </button>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowEditForm(true)}
                  disabled={activeModalProgram.status === "archived"}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50"
                >
                  Edit Program
                </button>

                <button
                  onClick={() => setActiveModalProgram(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Program */}
      {activeModalProgram && showEditForm && (
        <Modal
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
          title="Edit Program"
          description={`Update ${activeModalProgram.title}`}
        >
          <EditProgramForm
            program={activeModalProgram}
            onCancel={() => setShowEditForm(false)}
            onSuccess={() => {
              setShowEditForm(false);
              setActiveModalProgram(null);
              router.refresh();
            }}
          />
        </Modal>
      )}
    </DashboardShell>
  );
}
