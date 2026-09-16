"use server";

import { createClient } from "@/lib/supabase/server";

export async function registerForEvent(eventId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: "You must be logged in to register for an event.",
    };
  }

  // Find the participant record linked to the logged-in account.
  const participantResult = await supabase
    .from("participants")
    .select("id")
    .eq("profile_id", user.id)
    .maybeSingle();

  let participant = participantResult.data;
  const participantError = participantResult.error;

  if (participantError) {
    return {
      success: false,
      error: `Failed to find participant: ${participantError.message}`,
    };
  }

  // Participant accounts may not have been provisioned with a participant
  // record yet. Create the missing linked record automatically.
  if (!participant) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, role, full_name")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError || !profile) {
      return {
        success: false,
        error: "Your profile could not be found.",
      };
    }

    if (profile.role !== "participant") {
      return {
        success: false,
        error: "Your account is not registered as a participant.",
      };
    }

    const { data: createdParticipant, error: createParticipantError } =
      await supabase
        .from("participants")
        .insert({
          profile_id: user.id,
          full_name: profile.full_name,
        })
        .select("id")
        .single();

    if (createParticipantError || !createdParticipant) {
      return {
        success: false,
        error: `Failed to create participant profile: ${
          createParticipantError?.message ?? "Unknown error"
        }`,
      };
    }

    participant = createdParticipant;
  }

  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("id, title, capacity")
    .eq("id", eventId)
    .maybeSingle();

  if (eventError || !event) {
    return {
      success: false,
      error: "Event not found.",
    };
  }

  const { data: existingRegistration, error: existingError } = await supabase
    .from("participant_registrations")
    .select("id")
    .eq("participant_id", participant.id)
    .eq("event_id", eventId)
    .maybeSingle();

  if (existingError) {
    return {
      success: false,
      error: `Failed to check registration: ${existingError.message}`,
    };
  }

  if (existingRegistration) {
    return {
      success: false,
      error: "You are already registered for this event.",
    };
  }

  const { count, error: countError } = await supabase
    .from("participant_registrations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", eventId);

  if (countError) {
    return {
      success: false,
      error: `Failed to check event capacity: ${countError.message}`,
    };
  }

  if (event.capacity !== null && (count ?? 0) >= event.capacity) {
    return {
      success: false,
      error: "This event is already full.",
    };
  }

  const qrToken = crypto.randomUUID();

  const { error: registrationError } = await supabase
    .from("participant_registrations")
    .insert({
      participant_id: participant.id,
      event_id: event.id,
      qr_token: qrToken,
    });

  if (registrationError) {
    return {
      success: false,
      error: `Registration failed: ${registrationError.message}`,
    };
  }

  return {
    success: true,
    qrToken,
    eventTitle: event.title,
  };
}
