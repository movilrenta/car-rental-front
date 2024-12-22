import Image from "next/image";
import CRUD_Vehycle from "./crud";
import { VehicleType } from "@/constant/cars";
import DeleteComponent from "./delete-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Branch, Brand, Group } from "@/types/car.interface";

interface CarTipe extends VehicleType {
  brand_name: string;
  group_name: string;
}

interface CarTableItemProps {
  car: CarTipe;
  Groups: Group[];
  Brands: Brand[];
  Branches: Branch[]
}

export default function CarsTableItem({
  car,
  Groups,
  Brands,
  Branches
}:
CarTableItemProps) {
  return (
    <tr>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{car.id}</div>
      </td>
      <td className="flex items-center h-[47px] min-h-full">
        <div className="flex gap-2 items-center">
            <Image
              className="rounded-full w-auto"
              src={car.image}
              width={46}
              height={46}
              alt={car.name}
            />
          
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {car.name}
          </div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{car.brand_name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{car.group_name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{car.doors}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-green-600">
          {car.fuel_type}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
        <CRUD_Vehycle
          car={car}
          children={<div className="w-full h-full bg-cover bg-center"><FaEdit className="text-blue-500" size={20}/></div>}
          branches={Branches}
          brands={Brands}
          groups={Groups}
        />
        <DeleteComponent children={<div className="w-full"><FaTrash className="text-red-500" size={20}/></div>} id={car.id} />
        </div>
      </td>
    </tr>
  );
}
