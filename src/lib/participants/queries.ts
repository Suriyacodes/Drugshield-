import { createClient } from "@/lib/supabase/server";

export async function getParticipants() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("participants")
    .select(`
      id,
      full_name,
      profile_id,
      created_at
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch participants: ${error.message}`);
  }

  return data ?? [];
}
