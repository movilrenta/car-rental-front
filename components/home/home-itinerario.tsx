"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  ItinerarioType,
  useItinerarioStore,
} from "@/stores/reserva-itinerario/reserva-itinerario.store";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { hours } from "@/constant/hours";
import ItinerarioPickDate from "./itinerario-pick-date";
//import { Calendar } from "lucide-react";
import { calcularDiasEntreFechas2 } from "@/components/utils/utils";
import { BranchesType } from "@/types/branches";
import { useTranslations } from "next-intl";

export default function HomeItinerario({
  branches,
}: {
  branches: BranchesType[];
}) {
  const t = useTranslations("HomePage");
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const nuevoItinerario = useItinerarioStore((state) => state.addItinerario);
  const [dias, setDias] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (itinerario?.startDay && itinerario?.endDay) {
      const dias = calcularDiasEntreFechas2(
        itinerario?.startDay,
        itinerario?.startTime!,
        itinerario?.endDay,
        itinerario?.endTime!
      );
      setDias(dias);
    }
  }, [itinerario]);


  const handleChange = (field: keyof ItinerarioType, value: any) => {
    itinerario![field] = value;
    nuevoItinerario({
      ...itinerario,
      [field]: value,
      startLocation: itinerario?.startLocation || "",
      endLocation: itinerario?.endLocation || "",
      startDay: itinerario?.startDay || null,
      endDay: itinerario?.endDay || null,
      startTime: itinerario?.startTime || undefined,
      endTime: itinerario?.endTime || undefined,
    });
  };

  if (!isClient) {
    return (
      // spinner loader
      <div className="col-span-12 my-24 lg:my-0 lg:col-span-5 flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
        <p className="text-gray-500 text-sm mt-4">Cargando...</p>
      </div>
    );
  }

  const goReserva = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = "/reservas";
  };

  return (
    <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center px-4 py-6 md:py-4">
      <h1 className="sr-only">Alquiler de autos | Movil Renta</h1>
      <h2 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-2 capitalize">
        {t("reservation.title")}
      </h2>
      <div className="flex items-start pb-4 w-full max-w-[420px] ">
        <ItinerarioPickDate />
        <label
          className="block text-lg font-bold mb-1 min-w-24 w-24 ps-4"
          htmlFor="asd"
        >
          {dias !== 0 ? (
            <div className="flex gap-0 text-center text-2xl text-nowrap items-center justify-center font-extrabold h-12 rounded-md px-3 w-full bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
              {dias}
            </div>
          ) : (
            <div className="flex items-center justify-center text-xl font-extrabold  gap-0 text-center rounded-md px-3 w-full h-12 bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
              {"Elija"}
            </div>
          )}
        </label>


      </div>
      <form onSubmit={goReserva} className="max-w-[420px] w-full max-h-[450px]">
        <div className="w-full grid grid-cols-12 space-y-4">
          <div className="col-span-full">
            <label
              className="flex items-center justify-start gap-x-4 text-2xl font-bold mb-1 min-w-28"
              htmlFor="city-start"
            >
              <GoArrowUpRight className="text-red-600 stroke-2 text-5xl md:text-2xl" />
              <span>{t("reservation.start")}</span>
            </label>
            <div className="w-full">
              <select
                id="city-start"
                aria-label="city-start"
                required
                value={itinerario?.startLocation || ""}
                onChange={(e) => handleChange("startLocation", e.target.value)}
                className="form-select !w-full !max-w-full !text-ellipsis h-12"
              >
                <option value="" disabled>
                  {t("reservation.locPickup")}
                </option>
                {branches?.map((city, index) => (
                  <option
                    key={index}
                    value={city.id}
                    className="dark:text-gray-950 !w-full text-ellipsis"
                  >
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap xxs:flex-nowrap">
                <select
                  id="hour-start"
                  required
                  aria-label="hour-start"
                  value={itinerario?.startTime || ""}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="form-select min-w-20 w-full h-12"
                >
                  <option value="" disabled>
                    {t("reservation.schedule")}
                  </option>
                  {hours.map((item, index) =>
                    item.work ? (
                      <option
                        key={index}
                        value={item.hour}
                        className="dark:text-gray-950"
                      >
                        {item.hour}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="col-span-full ">
            <label
              className="flex items-center justify-start gap-x-4 text-2xl font-bold mb-1 min-w-28"
              htmlFor="city-back"
            >
              <GoArrowDownLeft className="text-red-600 stroke-2 text-5xl md:text-2xl" />
              <span>{t("reservation.end")}</span>
            </label>
            <div className="w-full">
              <select
                id="city-back"
                aria-label="city-back"
                required
                value={itinerario?.endLocation || ""}
                onChange={(e) => handleChange("endLocation", e.target.value)}
                className="form-select w-full h-12"
              >
                <option value="" disabled>
                  {t("reservation.locReturn")}
                </option>
                {branches?.map((city, index) => (
                  <option
                    key={index}
                    value={city.id}
                    className="dark:text-gray-950"
                  >
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap xxs:flex-nowrap">
                <select
                  id="hour-back"
                  aria-label="hour-back"
                  required
                  value={itinerario?.endTime || ""}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  className="form-select w-full h-12"
                >
                  <option value="" disabled>
                    {t("reservation.schedule")}
                  </option>
                  {hours.map((item, index) =>
                    item.work ? (
                      <option
                        key={index}
                        value={item.hour}
                        className="dark:text-gray-950"
                      >
                        {item.hour}
                      </option>
                    ) : null
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center my-4 h-8 gap-3 animate-fade-in">
        <label className="flex flex-row-reverse justify-start items-center my-4 h-8 group">
          <input
            type="checkbox"
            required
            className="form-checkbox cursor-pointer dark:group-hover:border-white group-hover:border-black duration-200"
          />
          <span className="text-sm mr-2 cursor-pointer border-b border-transparent hover:border-neutral-400">
            {t("reservation.over25")}
          </span>
        </label>
        
          <button
            type="submit"
            className="btn bg-red-700 text-gray-100 hover:bg-red-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-red-800 dark:hover:text-white ml-3 whitespace-nowrap duration-200"
          >
            {t("reservation.bContinue")}
          </button>
        </div>
      </form>
    </div>
  );
}
