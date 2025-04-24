import { VehicleType } from "@/constant/cars";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import Image from "next/image";
import { BsLuggageFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCarDoor, GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { useFormatNumber } from "../utils/useFormatterNumber";
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
    <div className="col-span-full sm:col-span-6 group border border-transparent hover:border-zinc-500 dark:hover:border-zinc-700 hover:bg-black/10 duration-200 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Image */}
        <div className="w-full h-full max-h-[40%]">

        <Image
          className="w-full h-full object-cover duration-200"
          src={car?.image}
          width={286}
          height={160}
          alt={car?.name}
          />
          {extra < 1 && extra !== 0 && (
                  <BadgeOffer
                    variant="special"
                    className="absolute top-0 right-0 z-10 -mt-2 flex justify-center items-center flex-nowrap"
                    text={`${(extra * 100 - 100) * -1}% off`}
                    icon={<Tag className="h-3.5 w-3.5" />}
                  />
                )}    
          </div>
        {/* Card Content */}
        <div className="grow flex flex-col p-5">
          {/* Card body */}
          <div className="grow">
            {/* Header */}
            <header className="mb-3">
              <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold line-clamp-1">
                {car?.brand?.name} {car?.name}
              </h3>
              <h5 className="text-sm line-clamp-1">
                {t("similar")} <strong>{t("group")} {car?.group?.name}</strong>
              </h5>
            </header>
            {/* Rating and price */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              {/* Rating */}
              <div></div>
              {/* <div className="flex items-center space-x-2 mr-2">
                
                <div className="flex space-x-1">
                  <button>
                    <span className="sr-only">1 star</span>
                    <svg
                      className="fill-current text-yellow-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </button>
                  <button>
                    <span className="sr-only">2 stars</span>
                    <svg
                      className="fill-current text-yellow-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </button>
                  <button>
                    <span className="sr-only">3 stars</span>
                    <svg
                      className="fill-current text-yellow-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </button>
                  <button>
                    <span className="sr-only">4 stars</span>
                    <svg
                      className="fill-current text-yellow-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </button>
                  <button>
                    <span className="sr-only">5 stars</span>
                    <svg
                      className="fill-current text-gray-300 dark:text-gray-600"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10 5.934L8 0 6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934z" />
                    </svg>
                  </button>
                </div>
                
                <div className="inline-flex text-sm font-medium text-yellow-600">
                  4.2
                </div>
              </div> */}
              {/* Price */}
              <div className="relative flex items-center justify-end gap-2 w-full"> 
                <div className="flex flex-col">
                
                  <div className="text-xs start">{t("rate")}</div>     
                </div>
                <div className="relative flex flex-col text-sm font-medium">
                {extra < 1 && <div className="absolute -top-6 left-0 line-through text-nowrap flex flex-nowrap text-sm font-medium ">
                  $ {useFormatNumber(+car?.group?.rate)}
                </div>}
                  <span className="text-nowrap  inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">$ {useFormatNumber(+car?.group?.rate * extra)}</span>
                  
                </div>
              </div>
              
            </div>
            {/* Features list */}
            <ul className="grid grid-cols-2 gap-y-3 text-nowrap mb-5 dark:text-gray-300">
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
                  {car?.transmission}
                </span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <FaUser className="w-4 h-4 min-h-4 min-w-4" />
                <span className="text-nowrap text-ellipsis overflow-clip">
                  {car?.seats} {t("seats")}
                </span>
              </li>
            </ul>
          </div>
          {/* Card footer */}
          <div>
            <div
              onClick={() => handleCar(car)}
              className="btn-sm w-full bg-red-700 hover:bg-red-900 text-gray-100 duration-200 cursor-pointer"
            >
              {pickedCar?.id === car.id ? t("unPick") : t("pick")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
