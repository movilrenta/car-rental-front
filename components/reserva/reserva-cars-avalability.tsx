import { VehicleType } from "@/constant/cars";
import CardCar from "./reserva-pick-car-card";
import { BiCheck } from "react-icons/bi";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";

export default function RenderCarsAvailability({Vehicles}:{Vehicles: VehicleType[]}) {
  const reservaAuto = useReservaAutoStore((state) => state.getReservaAuto());
  return(
    Vehicles.map((car) => (
      <div
        key={car.id}
        className="relative grid col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3"
      >
        {reservaAuto?.id === car.id && (
          <span className="absolute inset-0 bg-black/60 rounded-md flex justify-center items-center animate-fade-in pointer-events-none">
            <BiCheck className="text-7xl text-white stroke-1 animate-fade-in duration-500" />
          </span>
        )}
        <CardCar car={car} />
      </div>
    ))
  )
}