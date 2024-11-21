"use client";

import { Cars } from "@/constant/cars";
import { useEffect, useState } from "react";
import CardCar from "./reserva-pick-car-card";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import { BiCheck } from "react-icons/bi";

export default function PickCar() {
  const reservaAuto = useReservaAutoStore((state) => state.getReservaAuto());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center h-screen">
        <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-gray-900 mt-52 my-4"></div>
        <div>Obteniendo datos de los vehiculos...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 col-span-12 gap-6 mt-8 w-full">
      <h2 className="text-2xl font-medium col-span-12 leading-snug text-gray-800 dark:text-gray-100 mb-5">
        02. Seleccione su <strong>vehículo</strong>
      </h2>
      {Cars.map((car) => (
        <div
          key={car.id}
          className="relative grid col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3"
        >
          {reservaAuto?.id === car.id && (
            <span className="absolute inset-0 bg-black/60 rounded-md flex justify-center items-center animate-fade-in pointer-events-none">
              <BiCheck className="text-7xl text-white stroke-1 animate-fade-in duration-500" />
            </span>
          )}
          <CardCar car={car} />
        </div>
      ))}
    </div>
  );
}
