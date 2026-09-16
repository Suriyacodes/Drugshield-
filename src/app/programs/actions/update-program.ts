"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type UpdateProgramResult =
  | { success: true }
  | { success: false; error: string };

export async function updateProgram(
  id: string,
  formData: FormData
): Promise<UpdateProgramResult> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const awarenessTopic = String(
    formData.get("awareness_topic") ?? ""
  ).trim();
  const location = String(formData.get("location") ?? "").trim();
  const startDate = String(formData.get("start_date") ?? "").trim();
  const endDate = String(formData.get("end_date") ?? "").trim();

  if (!id) {
    return { success: false, error: "Program ID is required." };
  }

  if (!title) {
    return { success: false, error: "Program title is required." };
  }

  if (startDate && endDate && startDate > endDate) {
    return {
      success: false,
      error: "End date cannot be before start date.",
    };
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
      error: "Only administrators can update programs.",
    };
  }

  const { error } = await supabase
    .from("programs")
    .update({
      title,
      description: description || null,
      awareness_topic: awarenessTopic || null,
      location: location || null,
      start_date: startDate || null,
      end_date: endDate || null,
    })
    .eq("id", id);

  if (error) {
    return {
      success: false,
      error: `Failed to update program: ${error.message}`,
    };
  }

  revalidatePath("/programs");
  revalidatePath("/dashboard");

  return { success: true };
}
