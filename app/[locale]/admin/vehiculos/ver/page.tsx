import axios from "axios";
import { GetCarsAction } from "@/actions/car";
import { CarsTable } from "./components/cars-table";
import { GetBranchesAction } from "@/actions/branchs";
import { getUserInformation } from "@/actions/auth/getUser";
import getAuthorized from "@/components/utils/get-authorized";

export default async function VehiculosPage() {
  const BACK = process.env.NEXT_PUBLIC_URL_BACK;
  const vehycle = await GetCarsAction();
  const branch = await GetBranchesAction();
  const { role } = await getUserInformation();
  const { data: groups } = await axios.get(`${BACK}groups`);
  const { data: brands } = await axios.get(`${BACK}brands`);
  const authorized = getAuthorized(role, "cars");

  return (
    <div className="relative animate-fade-in p-6">
      <CarsTable
        Cars={vehycle}
        Brands={brands}
        Groups={groups}
        Branches={branch}
        authorized={authorized}
      />
    </div>
  );
}
