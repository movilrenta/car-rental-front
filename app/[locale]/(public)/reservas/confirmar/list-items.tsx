"use client";

import { useFormatNumber } from "@/components/utils/useFormatterNumber";
import { calcularDiasEntreFechas2, formatDate } from "@/components/utils/utils";
import { useReservaStore } from "@/stores/reservas/reserva.store";
import { BranchesType } from "@/types/branches";
import { useEffect, useState } from "react";
import {
  IoCalendarOutline,
  IoCarOutline,
  IoCheckboxOutline,
  IoNavigateOutline,
} from "react-icons/io5";
import { getReservaPrice } from "./calculate-price";
import { Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { accessoriesTranslate } from "@/constant/translated";


export const ListItems = ({
  data,
  branches,
}: {
  data: any;
  branches: BranchesType[];
}) => {
  const locale = useLocale() as "es" | "en";
  const t = useTranslations("ReservaPage.ConfirmarPage");
  const [isClient, setIsClient] = useState<boolean>(false);
  const reservas = useReservaStore((state) => state.getReserva());
  const [totales, setTotales] = useState<any>(null);

  const dias = calcularDiasEntreFechas2(
    reservas?.startDay!,
    reservas?.startTime!,
    reservas?.endDay!,
    reservas?.endTime!
  );

  useEffect(() => {
    setIsClient(true);
    if (reservas?.startDay && reservas?.endDay) {
      //getMaxIncrement(reservas.startDay, reservas.endDay).then(setMaxIncrement);
      consulta();
    }
  }, []);

  if (!isClient || !reservas || !totales) {
    return (
      <div className="flex flex-col justify-start items-center h-screen min-w-full">
        <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-gray-900 mt-52 my-4"></div>
        <div>{t("listItems.loader")}</div>
      </div>
    );
  }

  async function consulta() {
    const datos = await getReservaPrice(reservas);
    //console.log(datos, "DATOS");
    setTotales(datos);
    return datos;
  }

  //console.log(totales, "TOTALES");

  const selectedCity = (id: string) => {
    const label = branches.find((sucursal) => sucursal.id.toString() === id);
    return label?.name;
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-4">
        <IoCalendarOutline size={50} className="text-red-700" />
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex justify-between">
            <h2 className="text-md md:text-lg font-semibold  text-red-700">
              {t("listItems.itinerary.title")}
            </h2>
            <span className="text-md md:text-lg font-semibold text-gray-900 dark:text-slate-100">
              {dias} {t("listItems.itinerary.days")}
            </span>
          </div>
          <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
            <div>
              <h3 className="flex gap-x-1">
                {t("listItems.itinerary.from")}:{" "}
                {formatDate(reservas!.startDay, locale)}, {reservas!.startTime} Hs,{" "}
                {selectedCity(reservas!.startLocation)}
              </h3>
              <h3 className="flex gap-2">
                {t("listItems.itinerary.to")}: {formatDate(reservas!.endDay, locale)},{" "}
                {reservas!.endTime} Hs, {selectedCity(reservas!.endLocation)}
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
              {t("listItems.car.title")}
            </h2>
            <span className="text-md md:text-lg font-semibold text-gray-900 dark:text-slate-100">
              {/* ARS { useFormatNumber((+(reservas?.car?.group?.rate!) * dias * maxIncrement)) || "--"} */}
              ARS {useFormatNumber(totales?.totalAuto) || "--"}
            </span>
          </div>
          <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
            <p className="flex flex-col">
              <span className="font-semibold">
                {t("listItems.car.group")}: {reservas?.car?.group?.name}
              </span>{" "}
              - {reservas?.car?.brand?.name} {reservas?.car?.name}.
              <span>
                {t("listItems.car.insurance.span1")}{" "}
                {useFormatNumber(+(reservas?.car?.group?.insurances || 0))},{" "}
                {t("listItems.car.insurance.span2")}
                {useFormatNumber(
                  Number(reservas?.car?.group?.insurances || 0) * 3
                )}
              </span>
            </p>
          </div>
        </div>
      </div>

      {totales?.totalDropOff > 0 && (
        <>
          <hr className="w-full h-[2px] bg-gray-500 dark:bg-slate-100" />
          <div className="w-full flex items-center gap-4">
            <Plus size={50} className="text-red-700" />
            <div className="w-full flex flex-col gap-y-2">
              <div className="flex justify-between">
                <h2 className="text-md md:text-lg font-semibold  text-red-700">
                  {t("listItems.dropOff.title")}
                </h2>
                <span className="text-md md:text-lg font-semibold text-gray-900 dark:text-slate-100">
                  {/* ARS { useFormatNumber((+(reservas?.car?.group?.rate!) * dias * maxIncrement)) || "--"} */}
                  ARS {useFormatNumber(totales?.totalDropOff) || "--"}
                </span>
              </div>
              <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
                <p className="flex flex-col">
                  <span>{t("listItems.dropOff.description")}</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {reservas?.aditionals_array?.length! > 0 && (
        <>
          <hr className="w-full h-[2px] bg-gray-500 dark:bg-slate-100" />
          <div className="w-full flex items-center gap-4">
            <IoNavigateOutline size={50} className="text-red-700" />
            <div className="w-full flex flex-col gap-y-2">
              <div className="flex justify-between">
                <h2 className="text-md md:text-lg font-semibold  text-red-700">
                  {t("listItems.accessories.title")}
                </h2>
                <span className="text-md md:text-lg font-semibold text-gray-900 dark:text-slate-100">
                  ARS {useFormatNumber(totales?.totalAdicionales)}
                  {/* ARS {useFormatNumber(showAccesorios())} */}
                </span>
              </div>
              <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
                {reservas?.aditionals_array.map((aditional) => {
                  const adicional:{ name:string} = data.find(
                    (item: any) => item.id === aditional.id
                  );
                  if (adicional) {
                    return (
                      <p key={aditional.id} className="">
                        {accessoriesTranslate[adicional.name]?.[locale] ?? adicional.name}
                      </p>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </>
      )}

      <hr className="w-full h-[2px] bg-gray-500 dark:bg-slate-100" />
      <div className="w-full flex items-center gap-4">
        <IoCheckboxOutline size={50} className="text-red-700" />
        <div className="w-full flex flex-col gap-y-2">
          <div className="flex justify-between">
            <h2 className="text-md md:text-lg font-semibold  text-red-700">
              Total
            </h2>
            <span className="text-md md:text-lg font-bold text-gray-900 dark:text-slate-100">
              ARS {useFormatNumber(totales?.totalCompleto)}
              {/* ARS {useFormatNumber(totalPrice)} */}
            </span>
          </div>
          <div className="text-xs md:text-base text-gray-900 dark:text-slate-100">
            <p className="italic">
             {t("listItems.total.estimatedRates")}
            </p>
            <p className="italic">
              {t("listItems.total.taxes")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
