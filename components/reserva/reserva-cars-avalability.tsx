import { VehicleType } from "@/constant/cars";
import CardCar from "./reserva-pick-car-card";
import { BiCheck } from "react-icons/bi";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";
import { useTranslations } from "next-intl";

export default function RenderCarsAvailability({
  Vehicles,
  itinerary,
  extra,
}: {
  Vehicles: any[];
  itinerary: any;
  extra: number;
}) {
  const t = useTranslations("BookingPage.pickCar");
  const reservaAuto = useReservaAutoStore((state) => state.getReservaAuto());

  const formatDate = (date: any) => {
    if (!date) return ""; // Si es null o undefined, devuelve un string vacío
    const parsedDate = date instanceof Date ? date : new Date(date);
    return !isNaN(parsedDate.getTime()) ? parsedDate.toLocaleDateString() : "";
  };

  const message = itinerary.startTime
    ? `Hola!, me gustaria saber si queda disponible algun vehiculo para las siguientes fechas: ${formatDate(
        itinerary?.startDay
      )} a las ${itinerary?.startTime} hasta el ${formatDate(
        itinerary?.endDay
      )} a las ${itinerary?.endTime}`
    : `Hola!, me gustaria saber si queda disponible algun vehiculo para las siguientes fechas:  `;

  // const message = `Hola!, me gustaria saber si queda disponible algun vehiculo para las siguientes fechas: ${itinerary?.startDay?.toLocaleDateString() || ""} a las ${
  //   itinerary?.startTime
  // } hasta el ${itinerary?.endDay?.toLocaleDateString() || ""} a las ${
  //   itinerary?.endTime
  // }`;
  const encodedMessage = encodeURIComponent(message);

  const availableCars = (array: any[]) => {
    return array.reduce((acc, item) => {
      const key = `${item.name}-${item.group_id}`; // Clave compuesta por nombre y grupo
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, VehicleType[]>);
  };
  const [sortBy, setSortBy] = React.useState<"price" | "group" | null>(null);
  const [priceOrder, setPriceOrder] = React.useState<string>("");
  const groupByName = availableCars(Vehicles);

  const sortedEntries = React.useMemo(() => {
    if (!sortBy) return Object.entries(groupByName);
    //console.log(Object.entries(groupByName));

    return Object.entries(groupByName).sort(
      ([nameA, carsA]: any, [nameB, carsB]: any) => {
        //console.log(nameA, nameB);

        if (sortBy === "group") {
          return carsA[0]?.brand.name.localeCompare(carsB[0]?.brand.name);
        } else if (sortBy === "price") {
          const priceA = carsA[0]?.group.rate ?? 0;
          const priceB = carsB[0]?.group.rate ?? 0;
          if (priceOrder === "minor") {
            return priceA - priceB;
          } else {
            return priceB - priceA;
          }
        }
        return 0;
      }
    );
  }, [groupByName, sortBy, priceOrder]);

  return (
    <div className="grid grid-cols-12 gap-4 col-span-full">
      <div className="col-span-full space-x-2">
        <select
          required
          value={priceOrder}
          onChange={(e) => {
            setSortBy("price");
            setPriceOrder(e.target.value);
          }}
          className={`px-4 py-2 rounded-lg border text-sm cursor-pointer min-w-44 ${
            sortBy === "price"
              ? "bg-orange-600 !text-white"
              : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          <option value="" disabled>
            Ordenar por precio
          </option>
          <option value="minor" className="dark:text-gray-950 cursor-pointer">
            Menor precio
          </option>
          <option value="major" className="dark:text-gray-950 cursor-pointer">
            Mayor precio
          </option>
        </select>

        <button
          onClick={() => setSortBy("group")}
          className={`px-4 py-2 rounded-lg border text-sm cursor-pointer ${
            sortBy === "group"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          Ordenar A-Z
        </button>
      </div>

      {sortedEntries.map(([name, cars]: any) => {
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

      {Vehicles.length > 1 && (
        <div className="flex items-center justify-center col-span-full">
          <div className="flex flex-col justify-center items-center bg-gray-800 text-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {t("dontFind")}
            </h2>
            <p className="mb-4 text-center">{t("dontFindDescription")}</p>

            <Link
              href={`https://api.whatsapp.com/send?phone=5493815873049&text=${encodedMessage}`}
              target="_blank"
              className="bg-gradient-to-r mt-4 flex gap-2 items-center justify-center from-blue-500 to-pink-500 text-white font-bold py-2 px-4 rounded-full animate-pulse"
            >
              <span>{t("talkAdviser")}</span>
              <FaWhatsapp className="text-3xl text-white" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
