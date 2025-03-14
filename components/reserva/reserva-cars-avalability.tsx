import { VehicleType } from "@/constant/cars";
import CardCar from "./reserva-pick-car-card";
import { BiCheck } from "react-icons/bi";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";

export default function RenderCarsAvailability({
  Vehicles,
}: {
  Vehicles: VehicleType[];
}) {
  const reservaAuto = useReservaAutoStore((state) => state.getReservaAuto());

  const availableCars = (array: VehicleType[]) => {
    const group = array.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    }, {} as Record<string, typeof array>);
    return group;
  };

  const groupByName = availableCars(Vehicles);

  return Object.entries(groupByName).map(([name, cars]) => {
    const firstCar = cars[0]
    return (
      <div
      key={name}
      className="relative grid col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3"
    >
      <h3 className="col-span-full sm:col-span-6 mb-2 xl:col-span-4 text-gray-800 dark:text-gray-100">Cantidad disponible: {cars.length}</h3>
      {reservaAuto?.id === firstCar.id && (
        <span className="absolute inset-0 bg-black/40 rounded-md flex justify-center items-center animate-fade-in pointer-events-none">
          <BiCheck className="text-7xl text-white stroke-1 animate-fade-in duration-500" />
        </span>
      )}
      <CardCar car={firstCar} />
    </div>
    )
  });
}
