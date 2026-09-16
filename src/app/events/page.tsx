import { getEvents, getProgramsForEventForm, getMyRegisteredEvents } from "@/lib/events/queries";
import EventsClient from "./events-client";

export default async function EventsPage() {
  const [events, programs, registeredEvents] = await Promise.all([
    getEvents(),
    getProgramsForEventForm(),
    getMyRegisteredEvents(),
  ]);

  return <EventsClient initialEvents={events} programs={programs} registeredEvents={registeredEvents} />;
}
