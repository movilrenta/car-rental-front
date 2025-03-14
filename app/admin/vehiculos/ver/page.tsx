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

  try {
    const [vehycle, branch, groupsRes, brandsRes] = await Promise.all([
      GetCarsAction(),
      GetBranchesAction(),
      axios.get(`${BACK}groups`),
      axios.get(`${BACK}brands`),
    ]);

    const groups = groupsRes.data;
    const brands = brandsRes.data;

    const updatedCars = await Promise.all(
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
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    return <div>Error al cargar los datos</div>;
  }
}
