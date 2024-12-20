"use client";
import { VehicleType } from "@/constant/cars";
import { useEffect, useState } from "react";
//import CardCar from "./reserva-pick-car-card";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
//import { BiCheck } from "react-icons/bi";
import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import RenderCarsAvailability from "./reserva-cars-avalability";
import { useItinerarioStore } from "@/stores/reserva-itinerario/reserva-itinerario.store";
import axios from "axios";

export default function PickCar() {
  const removeCar = useReservaAutoStore((state) => state.removeReservaAuto);
  const itinerario = useItinerarioStore((state) => state.getItinerario());
  const [contentButton, setContentButton] = useState(<span>Buscar vehículos disponibles</span>);
  const [data, setData] = useState<VehicleType[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [showCars, setShowCars] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setContentButton(<span>Buscar vehículos disponibles</span>)
    setShowCars(false)
    removeCar()
  }, [itinerario])

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center">
        <Loader2Icon className="w-12 h-12 animate-spin" />
        <div>Obteniendo datos de los vehiculos...</div>
      </div>
    );
  }

  async function checkCars() {
    //console.log(itinerario);
    setContentButton(<><Loader2Icon className="w-12 h-12 animate-spin" /><span>Actualizando flota...</span></>);
    const payload = {
      start_date: new Date(itinerario?.startDay!).toISOString().slice(0, 10),
      end_date: new Date(itinerario?.endDay!).toISOString().slice(0, 10)
    };
    const {data, status} = await axios.post('/api/check-availability-cars', payload)
    console.log(status);
    setShowCars(true)
    setData(data.response)
  }

  return (
    <div className="grid grid-cols-12 col-span-12 gap-6 mt-8 min-h-96 w-full place-content-start">
      {showCars 
        ? <>
        <h2 className="text-2xl font-medium col-span-12 leading-snug text-gray-800 dark:text-gray-100 mb-3">
        02. Seleccione su <strong>vehículo</strong>
      </h2>
      <RenderCarsAvailability Vehicles={data}/>
        </>
        : <Button onClick={() => checkCars()} className="col-span-12 w-72 min-w-72 !py-5 border mx-auto bg-red-700 hover:bg-orange-800 text-white">
            {contentButton}
          </Button>
      }
      
      
    </div>
  );
}
