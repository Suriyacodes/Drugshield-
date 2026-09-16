import { createClient } from "@/lib/supabase/server";

export async function getEvents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select(`
      id,
      program_id,
      title,
      event_date,
      location,
      capacity,
      programs (
        title
      ),
      participant_registrations (
        id
      )
    `)
    .order("event_date", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch events: ${error.message}`);
  }

  return data ?? [];
}

export async function getProgramsForEventForm() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("programs")
    .select("id, title, status")
    .neq("status", "archived")
    .order("title", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch programs: ${error.message}`);
  }

  return data ?? [];
}

export async function getMyRegisteredEvents() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data: participant, error: participantError } = await supabase
    .from("participants")
    .select("id")
    .eq("profile_id", user.id)
    .maybeSingle();

  if (participantError || !participant) {
    return [];
  }

  const { data, error } = await supabase
    .from("participant_registrations")
    .select(`
      id,
      event_id,
      qr_token,
      registered_at,
      events (
        id,
        title,
        event_date,
        location,
        capacity,
        programs (
          title
        )
      )
    `)
    .eq("participant_id", participant.id)
    .order("registered_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch registered events: ${error.message}`);
  }

  return data ?? [];
}
