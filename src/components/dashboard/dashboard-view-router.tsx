"use client";

import React from "react";
import { useDashboard } from "@/components/layout/dashboard-shell";
import { AdminDashboardView } from "./admin-dashboard";
import { VolunteerDashboardView } from "./volunteer-dashboard";
import { ParticipantDashboardView } from "./participant-dashboard";

export function DashboardViewRouter() {
  const { currentRole } = useDashboard();

  if (currentRole === "volunteer") {
    return <VolunteerDashboardView />;
  }

  if (currentRole === "participant") {
    return <ParticipantDashboardView />;
  }

  return <AdminDashboardView />;
}
