'use client'
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

import Datepicker from "@/components/datepicker";
import { useEffect, useState } from "react";
import { useItinerarioStore } from "@/stores/reserva-itinerario/reserva-itinerario.store";
import { cities } from "@/constant/cities";
import { hours } from "@/constant/hours";
import { calcularDiasEntreFechas2 } from "@/components/utils/utils";

export default function PickDate() {
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const nuevoItinerario = useItinerarioStore((state) => state.addItinerario);
  const [dias, setDias] = useState<number>(0);
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (itinerario?.startDay && itinerario?.endDay) {
      const dias = calcularDiasEntreFechas2(itinerario.startDay, itinerario.endDay);
      setDias(dias);
    }
  }, [itinerario]);

  if (!isClient) {
    return (
      <div>Obteniendo datos del itinerario...</div>
    )
  }
  

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

  const handleDatesStart = (dates: Date[]) => {
    nuevoItinerario({
      startLocation: itinerario?.startLocation || "",
      endLocation: itinerario?.endLocation || "",
      startDay: dates[0],
      endDay: itinerario?.endDay || null,
      startTime: itinerario?.startTime || undefined,
      endTime: itinerario?.endTime || undefined,
    });
  };
  const handleDatesEnd = (dates: Date[]) => {
    nuevoItinerario({
      startLocation: itinerario?.startLocation || "",
      endLocation: itinerario?.endLocation || "",
      startDay: itinerario?.startDay || null,
      endDay: dates[0],
      startTime: itinerario?.startTime || undefined,
      endTime: itinerario?.endTime || undefined,
    });
  };

  return (
    <div className=" w-full max-w-full min-w-0">
    <h2 className="text-2xl font-medium col-span-12 leading-snug text-gray-800 dark:text-gray-100 mb-5">
      01. Su <strong>itinerario</strong>
    </h2>
    
    <form className="grid grid-cols-12  w-full max-w-full gap-x-6 gap-y-6 min-w-0">
    <div className="flex col-span-12 sm:col-span-3 md:col-span-4 lg:col-span-12 flex-col gap-3 w-full max-w-full min-w-0">
        {dias !== 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-0 text-center rounded-md px-6 py-3 w-full bg-red-50 text-red-800">
            <div className="text-4xl font-extrabold flex items-center justify-center h-fit">
              {dias}
            </div>
            <div className="text-2xl flex font-semibold items-center -mt-1 justify-center h-fit">
              Dias
            </div>
          </div>
        ) : null}
    </div>

      <div className="col-span-12 sm:col-span-9 md:col-span-8 lg:col-span-12 flex flex-col gap-x-6 lg:flex-row w-full">
        <div className="flex flex-col xs:flex-row items-start xs:items-center w-full max-w-full">
          <label
            className="block text-sm sm:text-lg lg:text-xl font-bold mb-1 w-20 lg:w-28 min-w-0"
            htmlFor="city-start"
          >
            <GoArrowUpRight className="text-red-600 stroke-2 text-4xl sm:text-6xl" />
            Partida
          </label>
          <div className="w-full">
              <select
                id="city-start"
                required
                value={itinerario?.startLocation || ""}
                onChange={(e) => handleStartChange(e)}
                className="form-select !w-full !max-w-full !text-ellipsis h-12"
              >
                <option value="" disabled>
                  Selecciona lugar de retiro
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
                <Datepicker
                  mode="single"
                  onDatesChange={handleDatesStart}
                  defaultStart={itinerario?.startDay! || new Date()}
                  minDate={itinerario?.startDay! || new Date()}
                  maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                />
                <select
                  id="hour-start"
                  required
                  value={itinerario?.startTime || ""}
                  onChange={(e) => handleStartTimeChange(e)}
                  className="form-select min-w-32 w-full h-12"
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
        <div className="flex flex-col xs:flex-row items-start xs:items-center w-full max-w-full">
          <label
            className="block text-sm sm:text-lg lg:text-xl font-bold mb-1 w-20 lg:w-28 min-w-0"
            htmlFor="city-back"
          >
            <GoArrowDownLeft className="text-red-600 stroke-2 text-4xl sm:text-6xl" />
            Regreso
          </label>
          <div className="w-full">
              <select
                id="city-back"
                required
                value={itinerario?.endLocation || ""}
                onChange={(e) => handleEndChange(e)}
                className="form-select !w-full !max-w-full !text-ellipsis h-12"
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
                <Datepicker
                  mode="single"
                  onDatesChange={handleDatesEnd}
                  defaultStart={itinerario?.endDay!}
                  minDate={new Date(itinerario?.startDay! || new Date())}
                  maxDate={new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                />
                <select
                  id="hour-back"
                  required
                  value={itinerario?.endTime || ""}
                  onChange={(e) => handleEndTimeChange(e)}
                  className="form-select min-w-32 w-full h-12"
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
    </form>
    <p className="text-blue-600 italic text-sm mt-8">
      Las tarifas pueden tener variantes segun la fecha seleccionada.
    </p>
  </div>
  )
}