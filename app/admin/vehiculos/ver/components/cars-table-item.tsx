import Image from "next/image";
import CRUD_Vehycle from "./crud";
import { VehicleType } from "@/constant/cars";
import DeleteComponent from "./delete-component";
import { Button } from "@/components/ui/button";
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
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <Image
              className="rounded-full"
              src={car.image}
              width={40}
              height={40}
              alt={car.name}
            />
          </div>
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
