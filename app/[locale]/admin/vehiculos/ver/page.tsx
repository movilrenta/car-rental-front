import axios from "axios";
import { GetCarsAction } from "@/actions/car";
import { CarsTable } from "./components/cars-table";
import { GetBranchesAction } from "@/actions/branchs";
import { getUserInformation } from "@/actions/auth/getUser";
import { UserRole } from "@/types";

export default async function VehiculosPage() {
  const BACK = process.env.NEXT_PUBLIC_URL_BACK;
  const vehycle = await GetCarsAction();
  const branch = await GetBranchesAction();
  const userInformation = await getUserInformation();
  const { data: groups } = await axios.get(`${BACK}groups`);
  const { data: brands } = await axios.get(`${BACK}brands`);

  return (
    <div className="relative animate-fade-in p-6">
      <CarsTable
        Cars={vehycle}
        Brands={brands}
        Groups={groups}
        Branches={branch}
        role={userInformation?.role as UserRole}
      />
    </div>
  );
}
