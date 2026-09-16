"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ArchiveProgramResult =
  | { success: true }
  | { success: false; error: string };

export async function archiveProgram(
  id: string
): Promise<ArchiveProgramResult> {
  if (!id) {
    return { success: false, error: "Program ID is required." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "You must be logged in." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return {
      success: false,
      error: "Only administrators can archive programs.",
    };
  }

  const { error } = await supabase
    .from("programs")
    .update({ status: "archived" })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: `Failed to archive program: ${error.message}`,
    };
  }

  revalidatePath("/programs");
  revalidatePath("/dashboard");

  return { success: true };
}
