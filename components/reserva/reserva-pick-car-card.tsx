import { VehicleType } from "@/constant/cars";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import Image from "next/image";
import { BsLuggageFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCarDoor, GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { useFormatNumberNoDecimal } from "../utils/useFormatterNumber";
import BadgeOffer from "@/app/[locale]/admin/fechas/ver/components/badge-offer";
import { Tag } from "lucide-react";
import { useTranslations } from "next-intl";

export default function CardCar({
  car,
  extra,
}: {
  car: VehicleType;
  extra: number;
}) {
  const t = useTranslations("BookingPage.pickCar.cards")
  const addReservaCar = useReservaAutoStore((state) => state.addReservaAuto);
  const removeCar = useReservaAutoStore((state) => state.removeReservaAuto);
  const pickedCar = useReservaAutoStore((state) => state.getReservaAuto());
  function handleCar(car: VehicleType) {
    pickedCar?.id === car.id ? removeCar() : addReservaCar(car);
  }

  return (
    <div className="col-span-full sm:col-span-6 group border border-transparent hover:border-zinc-500 dark:hover:border-zinc-200 hover:bg-neutral-100/5 dark:hover:bg-indigo-950 duration-200 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      {extra < 1 && extra !== 0 && (
      // {true && (
        <BadgeOffer
          variant="special"
          className="absolute top-0 right-0 z-10 -mt-2 flex justify-center items-center flex-nowrap"
          text={`20% off`}
          icon={<Tag className="h-3.5 w-3.5" />}
        />
      )}  
      <div className="flex flex-col h-full">
        {/* Image */}
        <Image
          className="w-full h-full min-h-[40%] object-cover duration-200"
          src={car?.image}
          width={286}
          height={160}
          alt={car?.name}
          />
        {/* Card Content */}
        <div className="grow flex flex-col p-2">
          {/* Card body */}
          <div className="grow">
            {/* Header */}
            <header>
              <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold line-clamp-1">
                {car?.brand?.name} {car?.name}
              </h3>
              <h5 className="text-xs line-clamp-1 -mt-1">
                {t("similar")} <strong>{t("group")} {car?.group?.name}</strong>
              </h5>
              <p className="text-xs -mt-1">{car?.fuel_type}</p>
            </header>
            {/* Features list */}
            <ul className="grid grid-cols-4 text-sm pt-3 pb-2 mt-2 opacity-70 border-y border-y-neutral-300 dark:border-y -neutral-600 ">
              <li className="flex flex-col items-center ">
                <FaUser className="w-6 h-6 min-h-6 min-w-6" />
                <span className="text-xs">{t("seats")}</span>
                <p>{car?.seats}</p>
              </li>
              <li className="flex flex-col items-center ">
                <BsLuggageFill className="w-6 h-6 min-h-6 min-w-6" />
                <span className="text-xs">{t("luggage")}</span>
                <p>{car?.luggage}</p>
              </li>
              <li className="flex flex-col items-center ">
                <GiCarDoor className="w-6 h-6 min-h-6 min-w-6" />
                <span className="text-xs">{t("doors")}</span>
                <p>{car?.doors}</p>
              </li>
              <li className="flex flex-col items-center ">
                <TbManualGearbox className="w-6 h-6 min-h-6 min-w-6" />
                <span className="text-xs">{t("box")}</span>
                <p>{car?.transmission[0]}</p>
              </li>
            </ul>
            {/* <ul className="grid grid-cols-2 gap-y-1 py-2 text-nowrap text-neutral-400 dark:text-gray-500/90">
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <GiGasPump className="w-4 h-4 min-h-4 min-w-4" />
                <span className="text-nowrap text-ellipsis overflow-clip capitalize">
                  {car?.fuel_type}
                </span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <BsLuggageFill className="w-4 h-4 min-h-4 min-w-4" />
                <span className="text-nowrap text-ellipsis overflow-clip">
                  {car?.luggage} {t("luggage")}
                </span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <GiCarDoor className="w-4 h-4 min-h-4 min-w-4" />
                <span className="text-nowrap text-ellipsis overflow-clip">
                  {car?.doors} {t("doors")}
                </span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <TbManualGearbox className="w-4 h-4 min-h-4 min-w-4" />
                <span className="text-nowrap text-ellipsis overflow-clip capitalize">
                  {car?.transmission[0]}
                </span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <FaUser className="w-4 h-4 min-h-4 min-w-4" />
                <span className="text-nowrap text-ellipsis overflow-clip">
                  {car?.seats} {t("seats")}
                </span>
              </li>
            </ul> */}
          </div>
          {/* Card footer */}
          <div>
          <div className="flex flex-row pt-5 flex-nowrap justify-between items-center mb-2">
              {/* Price */}
              <div className="relative flex items-center justify-between gap-2 w-full"> 
                  {/* <div className="text-xs start">{t("rate")}</div>      */}
                <div className="relative flex items-center text-sm font-medium z-0">
                {extra < 1 && <div className="absolute -top-3 left-1 line-through text-nowrap flex flex-nowrap text-sm font-medium opacity-70 tracking-wider z-0">
                  {useFormatNumberNoDecimal(+car?.group?.rate)}
                </div>}
                  <span className="text-nowrap text-xl text-black dark:text-white font-semibold py-0.5 z-10">{useFormatNumberNoDecimal(+car?.group?.rate * extra)}</span>
                  <span className="text-base ps-0.5">/día</span>     
                </div>
              </div>
            <button
              onClick={() => handleCar(car)}
              className="btn-sm p-2 bg-red-700 min-w-28 hover:bg-red-900 text-gray-100 duration-200 cursor-pointer text-nowrap"
            >
              {pickedCar?.id === car.id ? t("unPick") : t("pick")}
            </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
