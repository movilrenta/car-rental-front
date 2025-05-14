import React from "react";
import Image from "next/image";

import { useTranslations } from "next-intl";
import { BsLuggageFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCarDoor, GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";

import { VehicleType } from "@/constant/cars";
import { useFormatNumber } from "@/components/utils/useFormatterNumber";
import BadgeOffer from "@/app/[locale]/admin/fechas/ver/components/badge-offer";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import { Tag } from "lucide-react";


interface Props {
  car: VehicleType;
  extra: number;
}

export const VehicleCard = ({ car, extra }: Props) => {
  const t = useTranslations("BookingPage.pickCar.cards");
  const addReservaCar = useReservaAutoStore((state) => state.addReservaAuto);
  const removeCar = useReservaAutoStore((state) => state.removeReservaAuto);
  const pickedCar = useReservaAutoStore((state) => state.getReservaAuto());
  function handleCar(car: VehicleType) {
    pickedCar?.id === car.id ? removeCar() : addReservaCar(car);
  }

  return (
    <div className="relative rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md p-4 flex flex-col gap-4">
      <Image
        width={300}
        height={200}
        src={car.image}
        alt={car.name}
        title={car.name}
        className="w-full h-36 object-cover rounded-md"
      />
      {extra < 1 && extra !== 0 && (
        <BadgeOffer
          variant="special"
          className="absolute top-4 right-2 z-10 -mt-2 flex justify-center items-center flex-nowrap"
          text={`${(extra * 100 - 100) * -1}% off`}
          icon={<Tag className="h-3.5 w-3.5" />}
        />
      )}
      <div className="w-full flex justify-between items-center">
        <h3 className="font-semibold">
          {car.brand.name} {car.name}
        </h3>
        <h4 className="rounded-md text-sm bg-gray-500 text-gray-100 p-1">
          {t("group")} {car.group.name}
        </h4>
      </div>
      <span>
        {t("similar")}{" "}
        <strong>
          {t("group")} {car?.group?.name}
        </strong>
      </span>
      {/* Features list */}
      <ul className="grid grid-cols-4 gap-2 text-sm">
        <li className="flex flex-col items-center gap-y-2">
          <GiGasPump className="w-6 h-6 min-h-6 min-w-6" />
          <p>{car?.fuel_type}</p>
        </li>
        <li className="flex flex-col items-center gap-y-2">
          <BsLuggageFill className="w-6 h-6 min-h-6 min-w-6" />
          <p>{car?.luggage}</p>
        </li>
        <li className="flex flex-col items-center gap-y-2">
          <GiCarDoor className="w-6 h-6 min-h-6 min-w-6" />
          <p>{car?.doors}</p>
        </li>
        <li className="flex flex-col items-center gap-y-2">
          <TbManualGearbox className="w-6 h-6 min-h-6 min-w-6" />
          <p>{car?.transmission}</p>
        </li>
        {/* <li className="flex flex-col items-center">
          <FaUser className="w-6 h-6 min-h-6 min-w-6" />
          <p>{car?.seats}</p>
        </li> */}
      </ul>
      <hr aria-label="hidden" />
      <div className="flex flex-col gap-4">
        {extra < 1 && (
          <p className="font-semibold line-through text-nowrap text-sm text-gray-400">
            <span className="font-light text-sm mr-2 ">{t("rate")}</span> ${" "}
            {useFormatNumber(+car?.group?.rate)}
          </p>
        )}
        <p className="font-semibold">
          <span className="font-light text-sm mr-2">{t("rate")}</span> ${" "}
          {useFormatNumber(+car?.group?.rate * extra)}
        </p>
        <button
          onClick={() => handleCar(car)}
          className="btn-sm w-full bg-red-700 hover:bg-red-900 text-gray-100 duration-200 cursor-pointer"
        >
          {" "}
          {pickedCar?.id === car.id ? t("unPick") : t("pick")}
        </button>
      </div>
    </div>
  );
};
