import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardShell, RoleType } from "@/components/layout/dashboard-shell";
import { DashboardViewRouter } from "@/components/dashboard/dashboard-view-router";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: claimsData } = await supabase.auth.getClaims();

  if (!claimsData?.claims) {
    redirect("/");
  }

  const userId = claimsData.claims.sub;

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", userId)
    .single();

  const userRole = (profile?.role as RoleType) || "admin";

  return (
    <DashboardShell
      initialRole={userRole}
      userProfile={{
        full_name: profile?.full_name ?? "DrugShield Member",
        role: profile?.role ?? "admin",
      }}
    >
      <DashboardViewRouter />
    </DashboardShell>
  );
}

