"use client";
import axios from "axios";
import { VehicleType } from "@/constant/cars";
import { useEffect, useRef, useState } from "react";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import RenderCarsAvailability from "./reserva-cars-avalability";
import { useItinerarioStore } from "@/stores/reserva-itinerario/reserva-itinerario.store";
import { getMaxIncrement } from "@/actions/holidays";

export default function PickCar() {
  const removeCar = useReservaAutoStore((state) => state.removeReservaAuto);
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const car = useReservaAutoStore((state) => state.getReservaAuto());
  const [contentButton, setContentButton] = useState(
    <span>Buscar vehículos disponibles</span>
  );
  const firstMount = useRef(true);
  const [data, setData] = useState<VehicleType[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showCars, setShowCars] = useState(false);
  const [maxIncrement, setMaxIncrement] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    if (itinerario?.startDay && itinerario?.endDay) {
      getMaxIncrement(itinerario.startDay, itinerario.endDay).then(
        setMaxIncrement
      );
    }
  }, [itinerario?.startDay, itinerario?.endDay]);
  const handlerSubmit = async () => {
    const payload = {
      start_date: new Date(itinerario?.startDay!).toISOString().slice(0, 10),
      end_date: new Date(itinerario?.endDay!).toISOString().slice(0, 10),
    };
    const { data, status } = await axios.post(
      "/api/check-availability-cars",
      payload
    );
    //console.log(status);
    setShowCars(true);
    //TODO:status
    const onlyAvailable = await data.response.filter((car: any) => car.is_active);
    setData(onlyAvailable);
    //console.log(data.response.filter((item: any) => item.name === "Hilux DC 4X4"));
  };
  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      handlerSubmit();
    }
  }, []);
  useEffect(() => {
    setContentButton(<span>Buscar vehículos disponibles</span>);
    setShowCars(false);
    removeCar();
  }, [itinerario]);

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center">
        <Loader2Icon className="w-12 h-12 animate-spin" />
        <div>Obteniendo datos de los vehiculos...</div>
      </div>
    );
  }
  const isStartDayValid = itinerario?.startDay
    ? new Date(itinerario.startDay) >= new Date(new Date().setHours(0, 0, 0, 0))
    : false;

  async function checkCars() {
    setContentButton(
      <>
        <Loader2Icon className="w-12 h-12 animate-spin" />
        <span>Actualizando flota...</span>
      </>
    );
    handlerSubmit();
  }

  //console.log("Incremento máximo encontrado:", maxIncrement);

  return (
    <div className="grid grid-cols-12 col-span-12 gap-6 mt-8 min-h-96 w-full place-content-start">
      {showCars ? (
        <>
          <h2 className="text-2xl font-medium col-span-12 leading-snug text-gray-800 dark:text-gray-100 mb-3">
            02. Seleccione su <strong>vehículo</strong>
          </h2>
          {!car ? (
            <RenderCarsAvailability
              Vehicles={data}
              extra={maxIncrement}
              itinerary={itinerario}
            />
          ) : (
            <RenderCarsAvailability
              Vehicles={Array.isArray(car) ? car : [car]}
              extra={maxIncrement}
              itinerary={itinerario}
            />
          )}
        </>
      ) : (
        <>
          <Button
            disabled={
              !itinerario?.startDay ||
              !itinerario?.endDay ||
              !itinerario?.startLocation ||
              !itinerario?.endLocation ||
              !itinerario?.startTime ||
              !itinerario?.endTime ||
              !isStartDayValid
            }
            onClick={() => checkCars()}
            className="col-span-12 w-72 min-w-72 !py-5 border mx-auto bg-red-700 hover:bg-orange-800 text-white"
          >
            {contentButton}
          </Button>
          {!isStartDayValid && (
            <span className="col-span-12 text-center mx-auto text-red-600 -mt-6 text-xs">
              Verifique las fechas de reserva
            </span>
          )}
        </>
      )}
    </div>
  );
}
