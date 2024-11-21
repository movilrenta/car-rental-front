'use client'

import { useReservaAdicionalesStore } from "@/stores/reserva-adicionales/reserva-adicionales.store";
import Image from "next/image"
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi"

export default function PickAditional () {
  const adicionales = useReservaAdicionalesStore((state) => state.getReservaAdicionales());
  const addSilla = useReservaAdicionalesStore((state) => state.addReservaAdicionalSilla);
  const addGPS = useReservaAdicionalesStore((state) => state.addReservaAdicionalGPS);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center h-screen">
        <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-gray-900 mt-52 my-4"></div>
        <div>Obteniendo datos adicionales...</div>
      </div>
    );
  }

  return (
    <div className="">
    <h2 className="text-2xl font-medium leading-snug text-gray-800 dark:text-gray-100 mb-5">
      03. Accesorios <strong>opcionales</strong>
    </h2>
    <ul className="grid grid-cols-2 gap-4 mb-16">
      <label
        className={`relative cursor-pointer col-span-2 lg:col-span-1 flex items-center pb-4 sm:py-6 border-2 ${
          adicionales?.silla ? "dark:border-zinc-200 border-zinc-900" : "border-zinc-200 dark:hover:border-zinc-600 hover:border-zinc-300"
        }  duration-200 group dark:border-gray-700/60  rounded-lg`}
      >
        <Image
          className="max-w-40 sm:w-36 rounded-sm group-hover:scale-[1.01] duration-200"
          src={"/images2/silla.webp"}
          width={200}
          height={200}
          alt="Product 01"
        />
        <div className="grow ps-4 pt-4 sm:pt-0">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
            Silla para niños
          </h3>
          <div className="text-sm mb-2">
            Silla de seguridad para niños, se adapta a cualquier vehículo.
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <div className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">
              $5.000,00
            </div>
            <div className="text-xs w-full">Tarifa base: 1 día</div>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={() => addSilla(!adicionales?.silla)}
          className="hidden"
        />
        {adicionales?.silla && (
          <BiCheck className="absolute bottom-1 right-1 text-3xl animate-fade-in" />
        )}
      </label>
      <label
        className={`relative cursor-pointer col-span-2 lg:col-span-1 flex items-center pb-4 sm:py-6 border-2 ${
          adicionales?.gps ? "dark:border-zinc-200 border-zinc-900" : "border-zinc-200 dark:hover:border-zinc-600 hover:border-zinc-300"
        }  duration-200 group dark:border-gray-700/60   rounded-lg`}
      >
        <Image
          className="max-w-40 sm:w-36 rounded-sm group-hover:scale-[1.01] duration-200"
          src={"/images2/gps.webp"}
          width={200}
          height={200}
          alt="Product 01"
        />
        <div className="grow ps-4 pt-4 sm:pt-0">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
            GPS
          </h3>
          <div className="text-sm mb-2">
            Sistema de Posicionamiento Global portátil para automóviles.
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <div className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">
              $5.000,00
            </div>
            <div className="text-xs w-full">Tarifa base: 1 día</div>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={() => addGPS(!adicionales?.gps)}
          className="hidden"
        />
        {adicionales?.gps && (
          <BiCheck className="absolute bottom-1 right-1 text-3xl animate-fade-in" />
        )}
      </label>
    </ul>
  </div>
  )
}