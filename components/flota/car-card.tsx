import Image from "next/image";
import { VehicleType } from "@/constant/cars";
import { BsLuggageFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCarDoor, GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";


export default function SimpleCardCar({ car }: { car: VehicleType }) {

  return (
    <div className="col-span-full sm:col-span-6 group border border-transparent hover:border-zinc-500 dark:hover:border-zinc-700 hover:bg-black/5 duration-200 xl:col-span-3 bg-white dark:bg-gray-800 shadow-sm rounded-xl overflow-hidden">
      <div className="flex flex-col h-full">
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
              <h3 className="text-lg text-gray-800 dark:text-gray-100 font-semibold line-clamp-1">
                {car?.brand?.name} {car?.name}
              </h3>
              <h5 className="text-sm line-clamp-1">
                o similar <strong>Grupo {car?.group?.name}</strong>
              </h5>
            </header>
            {/* Rating and price */}
           
            {/* Features list */}
            <ul className="grid grid-cols-2 gap-y-3 text-nowrap mb-5 dark:text-gray-300">
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <GiGasPump className="w-4 h-4 min-h-4 min-w-4"/>
                <span className="text-nowrap text-ellipsis overflow-clip capitalize">{car?.fuel_type}</span>
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
                <span className="text-nowrap text-ellipsis overflow-clip capitalize">{car?.transmission}</span>
              </li>
              <li className="flex gap-2 items-center w-full overflow-clip text-ellipsis">
                <FaUser className="w-4 h-4 min-h-4 min-w-4"/>
                <span className="text-nowrap text-ellipsis overflow-clip">{car?.seats} Plazas</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};