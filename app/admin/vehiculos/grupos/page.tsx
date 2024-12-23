import { getGroups } from "@/actions";
import { GroupTable } from "./components/groups-table";

export default async function GroupsPage() {
  const { ok, data: Groups } = await getGroups();
  if (!ok)
    return (
      <div className="grid place-content-center">
        <h2 className="text-center text-2xl">
          Hubo un problema al cargar <span className="italic">Grupos</span>
        </h2>
      </div>
    );
  return (
    <main className="animate-fade-in p-6 relative">
      <GroupTable Groups={Groups || []} />
    </main>
  );
}
