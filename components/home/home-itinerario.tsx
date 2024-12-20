"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  ItinerarioType,
  useItinerarioStore,
} from "@/stores/reserva-itinerario/reserva-itinerario.store";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { cities } from "@/constant/cities";
import { hours } from "@/constant/hours";
import ItinerarioPickDate from "./itinerario-pick-date";
//import { Calendar } from "lucide-react";
import { calcularDiasEntreFechas2 } from "@/components/utils/utils";

export default function HomeItinerario() {
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const nuevoItinerario = useItinerarioStore((state) => state.addItinerario);
  const [dias, setDias] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (itinerario?.startDay && itinerario?.endDay) {
      const dias = calcularDiasEntreFechas2(itinerario.startDay, itinerario.endDay);
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
      <h2 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6 capitalize">
        Hace tu reserva
      </h2>
      <div className="flex items-start pb-2 w-full max-w-[420px] ">
        <label className="block text-lg font-bold mb-1 min-w-20 w-20 pe-4"
        htmlFor="asd">
          {dias !== 0 
            ? <div className="flex gap-0 text-center text-2xl text-nowrap items-center justify-center font-extrabold h-12 rounded-md px-3 w-full bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
                {dias}
              </div>
            : <div className="flex items-center justify-center text-xl font-extrabold  gap-0 text-center rounded-md px-3 w-full h-12 bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
                {"Elija"}
              </div>
          }
          
        </label>

          <ItinerarioPickDate />
          {/* {dias !== 0 
            ? <div className="flex gap-0 text-start text-lg text-nowrap items-center justify-start font-extrabold h-12 rounded-md px-3 w-full bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
                {dias === 1 ? `${dias} Día` : `${dias} Días`}
              </div>
            : <div className="flex items-center justify-center text-lg font-extrabold  gap-0 text-center rounded-md px-3 w-full h-12 bg-red-50 dark:bg-red-800 text-red-800 dark:text-red-50">
                Elija
              </div>
          } */}

      </div>
      <form onSubmit={goReserva} className="max-w-full">
        <div className="space-y-0">
          <div className="flex items-center w-full max-w-full ">
            <label
              className="block text-lg font-bold mb-1 min-w-20 w-20"
              htmlFor="city-start"
            >
              <GoArrowUpRight className="text-red-600 stroke-2 text-5xl" />
              Partida
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
                  Selecciona lugar de retiro
                </option>
                {cities.map((city, index) => (
                  <option
                    key={index}
                    value={city.value}
                    className="dark:text-gray-950 text-ellipsis"
                  >
                    {city.label}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap xxs:flex-nowrap">
                <select
                  id="hour-start"
                  required
                  value={itinerario?.startTime || ""}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                  className="form-select min-w-20 w-full h-12"
                >
                  <option value="" disabled>
                    Horario
                  </option>
                  {hours.hours.map((item, index) => (
                    <option
                      key={index}
                      value={item.hour}
                      className="dark:text-gray-950"
                    >
                      {item.hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-full ">
            <label
              className="block text-lg font-bold mb-1 min-w-20 w-20"
              htmlFor="city-back"
            >
              <GoArrowDownLeft className="text-red-600 stroke-2 text-5xl" />
              Regreso
            </label>
            <div>
              <select
                id="city-back"
                required
                value={itinerario?.endLocation || ""}
                onChange={(e) => handleChange("endLocation", e.target.value)}
                className="form-select w-full h-12"
              >
                <option value="" disabled>
                  Seleccione lugar de entrega
                </option>
                {cities.map((city, index) => (
                  <option
                    key={index}
                    value={city.value}
                    className="dark:text-gray-950"
                  >
                    {city.label}
                  </option>
                ))}
              </select>
              <div className="flex flex-wrap xxs:flex-nowrap">
                <select
                  id="hour-back"
                  required
                  value={itinerario?.endTime || ""}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                  className="form-select w-full h-12"
                >
                  <option value="" disabled>
                    Horario
                  </option>
                  {hours.hours.map((item, index) => (
                    <option
                      key={index}
                      value={item.hour}
                      className="dark:text-gray-950"
                    >
                      {item.hour}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <label className="flex items-center mt-6 group">
          <input
            type="checkbox"
            required
            className="form-checkbox cursor-pointer dark:group-hover:border-white group-hover:border-black duration-200"
          />
          <span className="text-sm ml-2 cursor-pointer">
            Tengo más de 25 años de edad.
          </span>
        </label>
        <div className="flex justify-end my-2 gap-3">
          <button
            type="submit"
            className="btn bg-red-700 text-gray-100 hover:bg-red-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-red-800 dark:hover:text-white ml-3 whitespace-nowrap duration-200"
          >
            Continuar
          </button>
        </div>
        <div className="mr-1 my-4"></div>
      </form>
    </div>
  );
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
    nuevoItinerario({
      startLocation: itinerario?.startLocation || "",
      endLocation: event.target.value,
      startDay: itinerario?.startDay || null,
      endDay: itinerario?.endDay || null,
      startTime: itinerario?.startTime || undefined,
      endTime: itinerario?.endTime || undefined,
    });
  };

  const handleStartTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
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

                  <Datepicker
                  mode="single"
                  onDatesChange={handleDatesStart}
                  defaultStart={itinerario?.startDay! || new Date()}
                  minDate={itinerario?.startDay! || new Date()}
                  maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                />
*/
