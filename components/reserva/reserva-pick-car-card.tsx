import { VehicleType } from "@/constant/cars";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import Image from "next/image";
import { BsLuggageFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCarDoor, GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";

export default function CardCar({ car }: { car: VehicleType }) {
  const addReservaCar = useReservaAutoStore((state) => state.addReservaAuto)
  return (
    <div className="col-span-full sm:col-span-6 group border border-transparent hover:border-zinc-300 hover:bg-black/10 duration-200 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Image */}
        <Image
          className="w-full duration-200"
          src={car?.image}
          width={286}
          height={160}
          alt={car?.name}
        />
        {/* Card Content */}
        <div className="grow flex flex-col p-5">
          {/* Card body */}
          <div className="grow">
            {/* Header */}
            <header className="mb-3">
              <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold">
                {car?.name}
              </h3>
              <h5 className="text-sm">
                o similar <strong>Grupo {car?.group?.name}</strong>
              </h5>
            </header>
            {/* Rating and price */}
            <div className="flex flex-wrap justify-between items-center mb-4">
              {/* Rating */}
              <div className="flex items-center space-x-2 mr-2">
                {/* Stars */}
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
                {/* Rate */}
                <div className="inline-flex text-sm font-medium text-yellow-600">
                  4.2
                </div>
              </div>
              {/* Price */}
              <div>
                <div className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">
                  $ {car?.group?.rate}
                </div>
              </div>
              <div className="text-xs text-end w-full">Tarifa base: 1 día</div>
            </div>
            {/* Features list */}
            <ul className="grid grid-cols-2 gap-y-3 text-nowrap mb-5 dark:text-gray-300">
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <GiGasPump className="w-4 h-4 min-h-4 min-w-4"/>
                <span className="text-nowrap text-ellipsis overflow-clip">{car?.fuel_type}</span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <BsLuggageFill className="w-4 h-4 min-h-4 min-w-4"/>
                <span className="text-nowrap text-ellipsis overflow-clip">{car?.luggage} Maleta(s)</span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <GiCarDoor className="w-4 h-4 min-h-4 min-w-4"/>
                <span className="text-nowrap text-ellipsis overflow-clip">{car?.doors} Puertas</span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <TbManualGearbox className="w-4 h-4 min-h-4 min-w-4"/>
                <span className="text-nowrap text-ellipsis overflow-clip">{car?.transmission}</span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <FaUser className="w-4 h-4 min-h-4 min-w-4"/>
                <span className="text-nowrap text-ellipsis overflow-clip">{car?.seats} Plazas</span>
              </li>
            </ul>
          </div>
          {/* Card footer */}
          <div>
            <div
              onClick={() => addReservaCar(car)}
              className="btn-sm w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white cursor-pointer"
              
            >
              Elegir Vehículo
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};