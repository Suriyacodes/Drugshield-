import { getPrograms } from "@/lib/programs/queries";
import ProgramsClient from "./programs-client";

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return <ProgramsClient initialPrograms={programs} />;
}
