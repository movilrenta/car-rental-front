'use client'
import * as React from "react";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { useEffect, useState } from "react";
import { ItinerarioType, useItinerarioStore } from "@/stores/reserva-itinerario/reserva-itinerario.store";
import { hours } from "@/constant/hours";
import { calcularDiasEntreFechas2 } from "@/components/utils/utils";
import ItinerarioPickDate from "@/components/home/itinerario-pick-date";
import { Loader2Icon } from "lucide-react";
import { BranchesType } from "@/types/branches";
import { useTranslations } from "next-intl";

export default function PickDate({branches}:{branches: BranchesType[]}) {
  const t = useTranslations("BookingPage.itinerary")
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const nuevoItinerario = useItinerarioStore((state) => state.addItinerario);
  const [dias, setDias] = useState<number>(0);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (itinerario?.startDay && itinerario?.endDay) {
      const dias = calcularDiasEntreFechas2(itinerario.startDay, itinerario.startTime!, itinerario.endDay, itinerario.endTime!);
      return setDias(dias);
    }
    return setDias(0)
  }, [itinerario]);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2Icon className="w-12 h-12 animate-spin" />
        <span>{t("loading")}</span>
      </div>
    )
  }

  const handleChange = (field: keyof ItinerarioType, value: any) => {
    itinerario![field] = value
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
  

  return (
    <div className=" w-full max-w-full min-w-0">
    <h2 className="text-2xl font-medium col-span-12 leading-snug text-gray-800 dark:text-gray-100 mb-5">
      01. {t("preTitle")} <strong>{t("title")}</strong>
    </h2>
    
    <form className="grid grid-cols-12 w-full max-w-full gap-x-6 gap-y-6 min-w-0">
   
    <div className="flex col-span-12 md:col-span-6 flex-col xs:flex-row gap-x-3 w-full max-w-full min-w-0">
      {dias !== 0 
        ? <div className="flex gap-0 text-center text-lg text-nowrap items-center justify-center font-extrabold h-12 rounded-md px-3  min-w-24 w-full xs:w-24 bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
            {dias === 1 ? `${dias} ${t("day")}` : `${dias} ${t("days")}`}
          </div>
        : <div className="flex items-center justify-center text-lg font-extrabold  gap-0 text-center rounded-md px-3  min-w-24 w-full xs:w-24 h-12 bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
            {t("choose")}
          </div>
      } 
      <ItinerarioPickDate />
    </div>
      <div className="col-span-12 flex flex-col gap-x-6 sm:flex-row w-full">
        <div className="flex flex-col xs:flex-row items-start xs:items-center w-full max-w-full gap-x-3">
          <label
            className="block text-sm sm:text-lg md:text-xl font-bold mb-1 min-w-24 w-24 md:w-24"
            htmlFor="city-start"
          >
            <GoArrowUpRight className="text-red-600 stroke-2 text-4xl sm:text-6xl" />
            {t("pickUp")}
          </label>
          <div className="w-full">
              <select
                id="city-start"
                required
                value={itinerario?.startLocation || ""}
                onChange={(e) => handleChange("startLocation", e.target.value)}
                className="form-select !w-full !max-w-full !text-ellipsis h-12"
              >
                <option value="" disabled>
                  {t("selectPickUpPlace")}
                </option>
                {branches?.map((sucursal, index) => (
                  <option
                    key={index}
                    value={sucursal.id}
                    className="dark:text-gray-950"
                  >
                    {sucursal.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap xxs:flex-nowrap">
                <select
                  id="hour-start"
                  required
                  value={itinerario?.startTime || ""}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="form-select min-w-32 w-full h-12"
                >
                  <option value="" disabled>
                    {t("selectPickUpHour")}
                  </option>
                  {hours.map((item, index) => (
                    item.work ? <option
                      key={index}
                      value={item.hour}
                      className="dark:text-gray-950"
                    >
                      {item.hour}
                    </option>
                    : null
                  ))}
                </select>
              </div>
            </div>
        </div>
        <div className="flex flex-col xs:flex-row items-start xs:items-center w-full max-w-full gap-x-3">
          <label
            className="block text-sm sm:text-lg md:text-xl font-bold mb-1 min-w-24 w-24 md:w-24"
            htmlFor="city-back"
          >
            <GoArrowDownLeft className="text-red-600 stroke-2 text-4xl sm:text-6xl" />
            {t("drop")}
          </label>
          <div className="w-full">
              <select
                id="city-back"
                required
                value={itinerario?.endLocation || ""}
                onChange={(e) => handleChange("endLocation", e.target.value)}
                className="form-select !w-full !max-w-full !text-ellipsis h-12"
              >
                <option value="" disabled>
                  {t("selectDropPlace")}
                </option>
                {branches?.map((sucursal, index) => (
                  <option
                    key={index}
                    value={sucursal.id}
                    className="dark:text-gray-950"
                  >
                    {sucursal.name}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap xxs:flex-nowrap">
                <select
                  id="hour-back"
                  required
                  value={itinerario?.endTime || ""}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  className="form-select min-w-32 w-full h-12"
                >
                  <option value="" disabled>
                    {t("selectDropHour")}
                  </option>
                  {hours.map((item, index) => (
                    item.work ? <option
                      key={index}
                      value={item.hour}
                      className="dark:text-gray-950"
                    >
                      {item.hour}
                    </option>
                    : null
                  ))}
                </select>
              </div>
            </div>
        
      </div>
      </div>
    </form>
    <p className="text-blue-600 italic text-sm mt-8">
      {t("extraDates")}
    </p>
    {branches.some(
      (sucursal) =>
        (sucursal.id === Number(itinerario?.startLocation) && !sucursal.name.toLowerCase().includes("tuc")) || 
        (sucursal.id === Number(itinerario?.endLocation) && !sucursal.name.toLowerCase().includes("tuc"))
      ) 
      && <p className="text-blue-600 italic text-sm">- {t("dropoff")}</p>
    }

    {Number(itinerario?.startTime?.slice(0,2)) <= 7 || Number(itinerario?.startTime?.slice(0,2)) > 19 
      ? <p className="text-blue-600 italic text-sm">- {t("startHourDropoff")}</p> 
      : null
    }
    {Number(itinerario?.endTime?.slice(0,2)) <= 7 || Number(itinerario?.endTime?.slice(0,2)) > 19 
      ? <p className="text-blue-600 italic text-sm">- {t("endHourDropoff")}</p> 
      : null
    }
    
  </div>
  )
}

/*

  const handleStartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    nuevoItinerario({
      startLocation: event.target.value,
      endLocation: itinerario?.endLocation || "",
      startDay: itinerario?.startDay || null,
      endDay: itinerario?.endDay || null,
      startTime: itinerario?.startTime || undefined,
      endTime: itinerario?.endTime || undefined,
    });
  };

  const handleEndChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //setEndLocation(event.target.value);
    //TODO compparar fechas
    nuevoItinerario({
      startLocation: itinerario?.startLocation || "",
      endLocation: event.target.value,
      startDay: itinerario?.startDay || null,
      endDay: itinerario?.endDay || null,
      startTime: itinerario?.startTime || undefined,
      endTime: itinerario?.endTime || undefined,
    });
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //setEndLocation(event.target.value);
    nuevoItinerario({
      startLocation: itinerario?.startLocation || "",
      endLocation: itinerario?.endLocation || "",
      startDay: itinerario?.startDay || null,
      endDay: itinerario?.endDay || null,
      startTime: event.target.value,
      endTime: itinerario?.endTime || undefined,
    });
  };
  const handleEndTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //setEndLocation(event.target.value);
    nuevoItinerario({
      startLocation: itinerario?.startLocation || "",
      endLocation: itinerario?.endLocation || "",
      startDay: itinerario?.startDay || null,
      endDay: itinerario?.endDay || null,
      startTime: itinerario?.startTime || undefined,
      endTime: event.target.value,
    });
  };
*/