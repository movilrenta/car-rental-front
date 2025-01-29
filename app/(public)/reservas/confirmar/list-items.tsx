"use client";

import { useFormatNumber } from "@/components/utils/useFormatterNumber";
import { calcularDiasEntreFechas2, formatDate } from "@/components/utils/utils";
//import { cities } from "@/constant/cities";
import { useReservaStore } from "@/stores/reservas/reserva.store";
import { BranchesType } from "@/types/branches";
import { useEffect, useState } from "react";
import {
  IoCalendarOutline,
  IoCarOutline,
  IoCheckboxOutline,
  IoNavigateOutline,
} from "react-icons/io5";

export const ListItems = ({ data, branches }: { data: any, branches: BranchesType[] }) => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const reservas = useReservaStore((state) => state.getReserva());
  const dias = calcularDiasEntreFechas2(reservas?.startDay!, reservas?.startTime!, reservas?.endDay!, reservas?.endTime!);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center h-screen">
        <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-gray-900 mt-52 my-4"></div>
        <div>Obteniendo datos...</div>
      </div>
    );
  }

  const selectedCity = (id: string) => {
    const label = branches.find((sucursal) =>
      sucursal.id.toString() === id
    );
    return label?.name;
  };

  const showAccesorios = (): number => {
    let amount_aditionals = 0;
    reservas?.aditionals_array.map((aditional) => {
      const adicional = data.find((item: any) => item.id === aditional.id);
      if (adicional) {
        //console.log(adicional);
        amount_aditionals = amount_aditionals + Number(adicional.price) * dias;
      }
    });

    //console.log(amount_aditionals);
    return amount_aditionals;
  };
  const totalPrice = reservas?.car?.group?.rate
    ? +(reservas.car.group?.rate) * dias + showAccesorios()
    : 0;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-4">
        <IoCalendarOutline size={50} className="text-red-700" />
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex justify-between">
            <h2 className="text-md md:text-lg font-semibold  text-red-700">
              Itinerario
            </h2>
            <span className="text-md md:text-lg font-semibold text-gray-900 dark:text-slate-100">
              {dias} Días
            </span>
          </div>
          <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
            <div>
              <h3 className="flex gap-x-1">
                Desde: {formatDate(reservas!.startDay)}, {reservas!.startTime}{" "}
                Hs, {selectedCity(reservas!.startLocation)}
              </h3>
              <h3 className="flex gap-2">
                Hasta: {formatDate(reservas!.endDay)}, {reservas!.endTime} Hs,{" "}
                {selectedCity(reservas!.endLocation)}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-full h-[2px] bg-gray-500 dark:bg-slate-100" />
      <div className="w-full flex items-center gap-4">
        <IoCarOutline size={50} className="text-red-700" />
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex justify-between">
            <h2 className="text-md md:text-lg font-semibold  text-red-700">
              Vehículo
            </h2>
            <span className="text-md md:text-lg font-semibold text-gray-900 dark:text-slate-100">
              ARS { useFormatNumber((+(reservas?.car?.group?.rate!) * dias)) || "--"}
            </span>
          </div>
          <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
            <p className="flex flex-col">
              <span className="font-semibold">
                Grupo: {reservas?.car?.group?.name}
              </span>{" "}
              - {reservas?.car?.brand?.name} {reservas?.car?.name}. 
              <span>
                - Seguros: Por daños o faltantes ${useFormatNumber(reservas?.car?.group?.insurances)}, por vuelcos o robo ${useFormatNumber(Number(reservas?.car?.group?.insurances) * 3)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {reservas?.aditionals_array?.length! > 0 && <>
        <hr className="w-full h-[2px] bg-gray-500 dark:bg-slate-100" />
        <div className="w-full flex items-center gap-4">
          <IoNavigateOutline size={50} className="text-red-700" />
          <div className="w-full flex flex-col gap-y-2">
            <div className="flex justify-between">
              <h2 className="text-md md:text-lg font-semibold  text-red-700">
                Accesorios
              </h2>
              <span className="text-md md:text-lg font-semibold text-gray-900 dark:text-slate-100">
                ARS {useFormatNumber(showAccesorios())}
              </span>
            </div>
            <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
              {reservas?.aditionals_array.map((aditional) => {
                const adicional = data.find(
                  (item: any) => item.id === aditional.id
                );
                if (adicional) {
                  return <p key={aditional.id} className="">{adicional.name}</p>;
                }
              })}
            </div>
          </div>
        </div>
      </>}

      <hr className="w-full h-[2px] bg-gray-500 dark:bg-slate-100" />
      <div className="w-full flex items-center gap-4">
        <IoCheckboxOutline size={50} className="text-red-700" />
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex justify-between">
            <h2 className="text-md md:text-lg font-semibold  text-red-700">
              Total
            </h2>
            <span className="text-md md:text-lg font-bold text-gray-900 dark:text-slate-100">
              ARS {useFormatNumber(totalPrice)}
            </span>
          </div>
          <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
            <p className="italic">
              - Tarifas estimadas sin promociones y sujetas a modificación sin
              previo aviso.
            </p>
            <p className="italic">
              - IVA 21% y Seguro con franquicia incluídos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
