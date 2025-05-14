import { GetRatesAction } from "@/actions/rates";
import { RatesTable } from "./components/rates-table";

export default async function RatesPage() {
  const rates = await GetRatesAction()

  return (
    <div className="relative animate-fade-in p-6">
      <RatesTable Rates={rates}/>
    </div>
  )
}
