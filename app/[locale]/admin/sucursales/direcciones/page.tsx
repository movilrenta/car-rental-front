import { AddressesTable } from "./components/addresses-table";
import { GetAddressesAction } from "@/actions/address";

export const dynamic = "force-dynamic";

export default async function AddressesPage() {
  const addresses = await GetAddressesAction()

  return (
    <div className="relative animate-fade-in p-6">
      <AddressesTable Addresses={addresses}/>
    </div>
  )
}