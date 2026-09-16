"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateEventResult =
  | { success: true }
  | { success: false; error: string };

export async function createEvent(
  formData: FormData
): Promise<CreateEventResult> {
  const programId = String(formData.get("program_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const eventDate = String(formData.get("event_date") ?? "").trim();
  const eventTime = String(formData.get("event_time") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const capacityValue = String(formData.get("capacity") ?? "").trim();

  if (!programId) {
    return { success: false, error: "Please select a program." };
  }

  if (!title) {
    return { success: false, error: "Event title is required." };
  }

  if (!eventDate || !eventTime) {
    return { success: false, error: "Event date and time are required." };
  }

  const timeMatch = eventTime.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);

  if (!timeMatch) {
    return {
      success: false,
      error: "Please enter time like 6:00 PM or 10:30 AM.",
    };
  }

  let hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  const period = timeMatch[3].toUpperCase();

  if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
    return {
      success: false,
      error: "Please enter a valid time like 6:00 PM or 10:30 AM.",
    };
  }

  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  const eventDateTime =
    `${eventDate}T${formattedHours}:${formattedMinutes}:00+05:30`;

  let capacity: number | null = null;

  if (capacityValue) {
    capacity = Number(capacityValue);

    if (!Number.isInteger(capacity) || capacity <= 0) {
      return {
        success: false,
        error: "Capacity must be a positive whole number.",
      };
    }
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return {
      success: false,
      error: "Only administrators can create events.",
    };
  }

  const { error } = await supabase.from("events").insert({
    program_id: programId,
    title,
    event_date: eventDateTime,
    location: location || null,
    capacity,
  });

  if (error) {
    return {
      success: false,
      error: `Failed to create event: ${error.message}`,
    };
  }

  revalidatePath("/events");
  revalidatePath("/dashboard");

  return { success: true };
}
