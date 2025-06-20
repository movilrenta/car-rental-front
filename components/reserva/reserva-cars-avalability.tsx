import { VehicleType } from "@/constant/cars";
import CardCar from "./reserva-pick-car-card";
import { BiCheck } from "react-icons/bi";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import React from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

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

        if (priceOrder === "group") return carsA[0]?.brand.name.localeCompare(carsB[0]?.brand.name);
        if (priceOrder === "group-reverse") return carsB[0]?.brand.name.localeCompare(carsA[0]?.brand.name);
        else if (sortBy === "price") {
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
      {Vehicles.length > 1 && 
      <div className="col-span-full flex flex-row flex-nowrap items-center gap-4">
        <div className="relative min-w-44">
          <select
            required
            value={priceOrder}
            onChange={(e) => {
              setSortBy("price");
              setPriceOrder(e.target.value);
            }}
            className={`appearance-none px-4 py-2 rounded-lg border text-sm cursor-pointer min-w-44 w-full ${
              sortBy === "price"
                ? "bg-orange-600 !text-white !dark:text-white"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          >
            <option value="" className="disabled:text-opacity-20" disabled>
              {t("selectOrder")}
            </option>
            <option value="minor" className="dark:text-gray-950 cursor-pointer">
              {t("selectMinor")}
            </option>
            <option value="major" className="dark:text-gray-950 cursor-pointer">
              {t("selectMajor")}
            </option>
            <option value="group" className="dark:text-gray-950 cursor-pointer">
              A-Z
            </option>
            <option value="group-reverse" className="dark:text-gray-950 cursor-pointer">
              Z-A
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg
              className={`w-4 h-4 ${
                sortBy === "price" ? "text-white" : "text-gray-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        {sortBy && 
        <X
          className="w-7 h-7 cursor-pointer text-gray-500"
          onClick={() => {
          setPriceOrder("");
          setSortBy(null)}}
        />
        }
        {/* <button
          onClick={() => {
            setPriceOrder("");
            setSortBy("group")}}
          className={`px-4 py-2 rounded-lg !m-0 border text-sm cursor-pointer text-nowrap ${
            sortBy === "group"
              ? "bg-orange-600 text-white"
              : "bg-white text-gray-800 border-gray-300"
          }`}
        >
          Ordenar A-Z
        </button> */}
      </div>}

      {sortedEntries.map(([name, cars]: any) => {
        const firstCar = cars[0];

        return firstCar ? (
          <div
            key={firstCar.id}
            className="relative grid col-span-full sm:col-span-6 lg:col-span-4 xl:col-span-3"
          >
            {reservaAuto?.id === firstCar.id && (
              <span className="absolute inset-0 bg-black/20 rounded-md flex justify-center items-center animate-fade-in pointer-events-none">
                <BiCheck className="text-7xl text-white stroke-1 animate-fade-in duration-500" />
              </span>
            )}
            <CardCar car={firstCar} extra={extra} />
          </div>
        ) : null;
      })}

      {Vehicles.length > 1 && (
        <div className="flex items-center justify-center col-span-full">
          <div className="flex flex-col justify-center items-center bg-white text-black dark:bg-gray-800 dark:text-white rounded-lg shadow-lg p-6 w-80">
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
