import { AdicionalesTable } from "./components/adicionales-table";
import { GetAdditionalsAction } from "@/actions/additionals";


export default async function BranchesPage() {
  const additionals = await GetAdditionalsAction()

  return (
    <div className="relative animate-fade-in p-6">
      <AdicionalesTable Additionals={additionals}/>
    </div>
  )
}
