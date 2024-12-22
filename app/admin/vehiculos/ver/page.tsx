import { LuPlus } from "react-icons/lu";
import CRUD_Vehycle from "./components/crud";
import axios from "axios";
import { GetCarsAction } from "@/actions/car";
import { CarsTable } from "./components/cars-table";

export default async function VehiculosPage() {
  const BACK = process.env.NEXT_PUBLIC_URL_BACK;
  const { data: groups } = await axios.get(`${BACK}groups`);
  const vehycle = await GetCarsAction()
  const { data: brands } = await axios.get(`${BACK}brands`);
  const { data: branch } = await axios.get(`${BACK}branches`);


  return (
    <div className="relative animate-fade-in p-6">
      {/*BOTON NUEVO AUTO */}
      <CRUD_Vehycle
        children={<div className="border group duration-200 rounded-md w-fit px-2 bg-red-700 z-10 fixed bottom-6 right-6 flex gap-2 text-white items-center justify-center"><LuPlus className="text-3xl p-2 w-11 h-11" /><span className="">Nuevo</span></div>}
        groups={groups}
        brands={brands}
        branches={branch}
      />
      <CarsTable
      Cars={vehycle}
      Brands={brands}
      Groups={groups}
      Branches={branch}
      />
    </div>
  );
}
