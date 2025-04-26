"use client";

import { VehicleType } from "@/constant/cars";
import CarsTableItem from "./cars-table-item";
import { Brand, Group } from "@/types/car.interface";
import { Branches } from "@/types/user-reservation.inteface";
import CRUD_Vehycle from "./crud";
import { LuPlus } from "react-icons/lu";
// import { getSatusCar } from "@/actions/save-card";
import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

export const CarsTable = ({
  Cars,
  Brands,
  Groups,
  Branches,
}: {
  Cars: VehicleType[];
  Brands: Brand[];
  Groups: Group[];
  Branches: Branches[];
}) => {
  const [newCars, setNewCars] = useState<any[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );
  //console.log(Cars, "v");
  // Agrupar los autos por nombre
  const groupedCars = newCars.reduce((acc, car) => {
    const key = `${car.name}-${car.group_id}`; // Clave compuesta por nombre y grupo
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(car);
    return acc;
  }, {} as Record<string, any[]>);
  

  const toggleExpand = (name: string) => {
    setExpandedGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };
  useEffect(() => {
    const fetchCarStatuses = async () => {
      const updatedCars = await Promise.all(
        Cars?.map(async (car) => {
          // const locked_status = (await getSatusCar(car.id)) as any;
          const brands =
            Brands.find((brand) => brand.id === car.brand_id)?.name ||
            "No disponible";
          const groups =
            Groups.find((group) => group.id === car.group_id)?.name ||
            "No disponible";
          return {
            ...car,
            brand_name: brands,
            group_name: groups,
            //locked_status: false,
          };
        })
      );
      setNewCars(updatedCars);
    };

    fetchCarStatuses();
  }, [Cars, Brands, Groups]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="flex justify-between items-center px-5 py-4">
        <h2 className="flex gap-2 items-center justify-center font-semibold text-gray-800 dark:text-gray-100">
          Todos los vehículos{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {Cars?.length}
          </span>
        </h2>
        <CRUD_Vehycle
          children={
            <div className="border group duration-200 rounded-md w-fit px-2 bg-red-700 flex gap-2 text-white items-center justify-center">
              <LuPlus className="text-3xl p-2 w-11 h-11" />
              <span className="">Nuevo</span>
            </div>
          }
          groups={Groups}
          brands={Brands}
          branches={Branches}
        />
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">#</div>
                </th>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Id</div>
                </th> */}
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Cantidad</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Auto</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Patente</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Marca</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-center">Grupo</div>
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
              {/* {newCars.map((car) => (
                <CarsTableItem
                  key={car.id}
                  car={car}
                  Brands={Brands}
                  Branches={Branches}
                  Groups={Groups}
                  cars={Cars}
                />
              ))} */}
              {Object.keys(groupedCars).map((name) => {
                const carsInGroup = groupedCars[name];
                const firstCar = carsInGroup[0];
                const isExpanded = expandedGroups[name];
                return (
                  <React.Fragment key={name}>
                    {/* Fila principal */}
                    <tr onClick={() => toggleExpand(name)} className="bg-white dark:bg-gray-800 cursor-pointer hover:bg-neutral-100 dark:hover:bg-gray-700">
                      <td className="px-4 py-2">
                        <button
                          
                          className="focus:outline-none"
                        >
                          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                      </td>{" "}
                      {/* <td className="px-4 py-2">-</td> */}
                      <td className="px-4 py-2">{carsInGroup.length}</td>
                      <td className="px-4 py-2">
                        <td className="flex items-center h-[47px] min-h-full">
                          <div className="flex gap-3 items-center">
                            <Image
                              className="hidden sm:block rounded-md w-auto h-10"
                              src={firstCar?.image}
                              width={60}
                              height={48}
                              alt={firstCar?.name}
                            />

                            <div className="font-medium text-gray-800 dark:text-gray-100 text-ellipsis line-clamp-1">
                              {firstCar?.name}
                            </div>
                          </div>
                        </td>
                      </td>
                      <td className="px-4 py-2 min-w-28"></td>
                      <td className="px-4 py-2">{firstCar.brand_name}</td>
                      <td className="px-4 py-2 text-center">{firstCar.group_name}</td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2 min-w-[210px]"></td>
                    </tr>
                    {/* Filas ocultas */}
                    {isExpanded &&
                      carsInGroup.map((car: any) => (
                        <CarsTableItem
                          key={car.id}
                          car={car}
                          Brands={Brands}
                          Branches={Branches}
                          Groups={Groups}
                          //cars={Cars}
                        />
                      ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
