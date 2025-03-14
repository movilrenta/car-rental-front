import axios from "axios";
import { GetCarsAction } from "@/actions/car";
import { CarsTable } from "./components/cars-table";
import { GetBranchesAction } from "@/actions/branchs";
import { getSatusCar } from "@/actions/save-card";

export default async function VehiculosPage() {
  const BACK = process.env.NEXT_PUBLIC_URL_BACK;
  const vehycle = await GetCarsAction();
  const branch = await GetBranchesAction();
  const { data: groups } = await axios.get(`${BACK}groups`);
  const { data: brands } = await axios.get(`${BACK}brands`);
  const updatedCars = await Promise.all(
    vehycle.map(async (car: any) => {
      const locked_status = (await getSatusCar(car.id)) as any;
      const Brands =
        brands.find((brand: any) => brand.id === car.brand_id)?.name ||
        "No disponible";
      const Groups =
        groups.find((group: any) => group.id === car.group_id)?.name ||
        "No disponible";
      return {
        ...car,
        brand_name: Brands,
        group_name: Groups,
        locked_status: locked_status?.locked_status,
      };
    })
  );
  return (
    <div className="relative animate-fade-in p-6">
      <CarsTable
        Cars={updatedCars}
        Brands={brands}
        Groups={groups}
        Branches={branch}
      />
    </div>
  );
}
