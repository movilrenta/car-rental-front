import { GetFechasAction } from "@/actions/fechas";
import { FechasTable } from "./components/fechas-table";
import { getUserInformation } from "@/actions/auth/getUser";
//import { GetAdditionalsAction } from "@/actions/additionals";

export const dynamic = "force-dynamic";

export default async function FechasPage() {
  const fechas = await GetFechasAction()
  const information = await getUserInformation()
  
  return (
    <div className="relative animate-fade-in p-6">
      <FechasTable Fechas={fechas} role={information?.role as string}/>
    </div>
  )
}
