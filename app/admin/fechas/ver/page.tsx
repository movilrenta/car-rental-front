import { GetFechasAction } from "@/actions/fechas";
import { FechasTable } from "./components/fechas-table";
//import { GetAdditionalsAction } from "@/actions/additionals";

export const dynamic = "force-dynamic";

export default async function FechasPage() {
  const fechas = await GetFechasAction()

  return (
    <div className="relative animate-fade-in p-6">
      <FechasTable Fechas={fechas}/>
    </div>
  )
}
