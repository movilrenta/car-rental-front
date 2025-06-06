import { LocalidadesTable } from "./components/localidades-table";
import { GetBranchesAction } from "@/actions/branchs";
import { GetAddressesAction } from "@/actions/address";

export const dynamic = "force-dynamic";

export default async function BranchesPage() {
  const branches = await GetBranchesAction()
  const addresses = await GetAddressesAction()

  return (
    <div className="relative animate-fade-in p-6">
      <LocalidadesTable Branches={branches} Addresses={addresses}/>
    </div>
  )
}
