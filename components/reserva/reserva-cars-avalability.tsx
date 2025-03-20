import { VehicleType } from "@/constant/cars";
import CardCar from "./reserva-pick-car-card";
import { BiCheck } from "react-icons/bi";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function RenderCarsAvailability({
  Vehicles,
  itinerary,
  extra,
}: {
  Vehicles: any[];
  itinerary: any;
  extra: number;
}) {
  const reservaAuto = useReservaAutoStore((state) => state.getReservaAuto());
  const message = `Hola!, me gustaria saber si queda disponible algun vehiculo para las siguientes fechas: ${itinerary?.startDay?.toLocaleDateString()} a las ${
    itinerary.startTime
  } hasta el ${itinerary?.endDay?.toLocaleDateString()} a las ${
    itinerary.endTime
  }`;
  const encodedMessage = encodeURIComponent(message);

  const availableCars = (array: any[]) => {
    return array.reduce((acc, item) => {
      //if (!item.status) {
        // Solo pushea si el status es true
        if (!acc[item.name]) {
          acc[item.name] = [];
        }
        acc[item.name].push(item);
      //}
      return acc;
    }, {} as Record<string, VehicleType[]>);
  };
  console.log(Vehicles);
  const groupByName = availableCars(Vehicles);

  return (
    <div className="grid grid-cols-12 gap-4 col-span-full">
      {Object.entries(groupByName).map(([name, cars]: any) => {
        const firstCar = cars[0];

        return firstCar ? (
          <div
            key={firstCar.id}
            className="relative grid col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3"
          >
            {reservaAuto?.id === firstCar.id && (
              <span className="absolute inset-0 bg-black/40 rounded-md flex justify-center items-center animate-fade-in pointer-events-none">
                <BiCheck className="text-7xl text-white stroke-1 animate-fade-in duration-500" />
              </span>
            )}
            <CardCar car={firstCar} extra={extra} />
          </div>
        ) : null;
      })}

      <div className="flex items-center justify-center col-span-full">
        <div className="flex flex-col justify-center items-center bg-gray-800 text-white rounded-lg shadow-lg p-6 w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">
            No encontraste lo que buscabas?
          </h2>
          <p className="mb-4 text-center">
            Tranquilo!, contactanos para que podamos ayudarte en tu próxima
            reserva.
          </p>

          <Link
            href={`https://api.whatsapp.com/send?phone=5493815873049&text=${encodedMessage}`}
            target="_blank"
            className="bg-gradient-to-r mt-4 flex gap-2 items-center justify-center from-blue-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full animate-pulse"
          >
            <span>Habla con un asesor</span>
            <FaWhatsapp className="text-3xl text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
