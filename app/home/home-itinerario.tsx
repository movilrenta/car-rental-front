"use client";

import { useEffect, useState } from "react";
import Datepicker from "@/components/datepicker";
import { useItinerarioStore } from "@/stores/reserva-itinerario/reserva-itinerario.store";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { cities } from "@/constant/cities";
import { hours } from "@/constant/hours";

export default function HomeItinerario() {
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const nuevoItinerario = useItinerarioStore((state) => state.addItinerario);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStartChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //setStartLocation(event.target.value);
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
    <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center px-4 py-6 md:py-4">
      <h2 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6 capitalize">
        Hace tu reserva
      </h2>

      <form onSubmit={goReserva} className="max-w-full">
        <div className="space-y-10">
          <div className="flex flex-col xs:flex-row items-start xs:items-center w-full max-w-full">
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
                    className="dark:text-gray-950 text-ellipsis"
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
          <div className="flex flex-col xs:flex-row items-start xs:items-center w-full max-w-full">
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
                onChange={(e) => handleEndChange(e)}
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
          <input type="checkbox" required className="form-checkbox cursor-pointer dark:group-hover:border-white group-hover:border-black duration-200" />
          <span className="text-sm ml-2 cursor-pointer">Tengo más de 25 años de edad.</span>
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
