import axios from "axios";
import { GetCarsAction } from "@/actions/car";
import { CarsTable } from "./components/cars-table";
import { GetBranchesAction } from "@/actions/branchs";
import { getSatusCar } from "@/actions/save-card";

export default async function VehiculosPage() {
  const BACK = process.env.NEXT_PUBLIC_URL_BACK;
  if (!BACK) {
    throw new Error("NEXT_PUBLIC_URL_BACK no está definida");
  }

  const [vehycleRes, branchRes, groupsRes, brandsRes] =
    await Promise.allSettled([
      GetCarsAction(),
      GetBranchesAction(),
      axios.get(`${BACK}groups`),
      axios.get(`${BACK}brands`),
    ]);

  const vehycle = vehycleRes.status === "fulfilled" ? vehycleRes.value : [];
  const branch = branchRes.status === "fulfilled" ? branchRes.value : [];
  const groups = groupsRes.status === "fulfilled" ? groupsRes.value.data : [];
  const brands = brandsRes.status === "fulfilled" ? brandsRes.value.data : [];

  const updatedCars = await Promise.allSettled(
    vehycle.map(async (car: any) => {
      const locked_status = (await getSatusCar(car.id)) as any;
      return {
        ...car,
        brand_name:
          brands.find((b: any) => b.id === car.brand_id)?.name ??
          "No disponible",
        group_name:
          groups.find((g: any) => g.id === car.group_id)?.name ??
          "No disponible",
        locked_status: locked_status?.locked_status,
      };
    })
  );

  const validCars = updatedCars
    .filter((result) => result.status === "fulfilled")
    .map((result) => (result as PromiseFulfilledResult<any>).value);

  return (
    <div className="relative animate-fade-in p-6">
      <CarsTable
        Cars={validCars}
        Brands={brands}
        Groups={groups}
        Branches={branch}
      />
    </div>
  );
}
