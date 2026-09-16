import { createClient } from "@/lib/supabase/server";

export async function getPrograms() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("programs")
    .select(
      "id, title, description, awareness_topic, location, start_date, end_date, status, created_by, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch programs: ${error.message}`);
  }

  return data ?? [];
}
