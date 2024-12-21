import { LuPlus } from "react-icons/lu";
import CRUD_Vehycle from "./components/crud";
import axios from "axios";
import DeleteComponent from "./components/delete-component";
import { GetCarsAction } from "@/actions/car";

export default async function VehiculosPage() {
  const BACK = process.env.NEXT_PUBLIC_URL_BACK;
  const { data: groups } = await axios.get(`${BACK}groups`);
  const vehycle = await GetCarsAction()
  const { data: brands } = await axios.get(`${BACK}brands`);
  const { data: branch } = await axios.get(`${BACK}branches`);


  return (
    <div className="relative animate-fade-in">
      <CRUD_Vehycle
        children={<LuPlus className="absolute top-2 right-2 text-3xl border rounded-md p-2 w-11 h-11" />}
        groups={groups}
        brands={brands}
        branches={branch}
      />
      <div className="flex flex-col">
        {vehycle?.map((car: any, index: number) => (
          <div key={index} className="flex gap-2">
            <div>{car.name} </div>
            <CRUD_Vehycle
              car={car}
              children={<div className="w-full h-full bg-cover bg-center"> Editar </div>}
              groups={groups}
              brands={brands}
              branches={branch}
            />
            <DeleteComponent children={<div>Delete</div>} id={car.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
