"use client";

import { VehicleType } from "@/constant/cars";
import CarsTableItem from "./cars-table-item";
import { Brand, Group } from "@/types/car.interface";
import { Branches } from "@/types/user-reservation.inteface";

export const CarsTable = ({
  Cars,
  Brands,
  Groups,
  Branches
}: {
  Cars: VehicleType[];
  Brands: Brand[];
  Groups: Group[];
  Branches: Branches[]
}) => {

  const newCars = Cars.map((car) => {
    const brands = Brands.find((brand) => brand.id === car.brand_id)?.name || "No disponible";
    const groups = Groups.find((group) => group.id === car.group_id)?.name || "No disponible";
    return { ...car, brand_name: brands, group_name: groups}
  })

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Todos los vehículos{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {Cars.length}
          </span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Auto</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Marca</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Grupo</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Nº puertas</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Combustible</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Opciones</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {newCars.map((car) => (
                <CarsTableItem key={car.id} car={car} Brands={Brands} Branches={Branches} Groups={Groups}/>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
