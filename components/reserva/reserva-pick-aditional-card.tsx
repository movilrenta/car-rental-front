"use client";
import Image from "next/image";
import { AditionalType } from "./reserva-pick-aditional";
import { useReservaAdicionalesStore } from "@/stores/reserva-adicionales/reserva-adicionales.store";
import { BiCheck } from "react-icons/bi";
import { useLocale } from "next-intl";
import {
  accesoriesAndDescriptionTranslate
} from "@/constant/translated";
//import { useTranslations } from "next-intl";

export default function AdditionalCard({ item }: { item: AditionalType }) {
  //const t = useTranslations("BookingPage.pickAdditionals")
  const reservaAdicionales = useReservaAdicionalesStore((state) =>
    state.getReservaAdicionales()
  );
  const addAdditionals = useReservaAdicionalesStore(
    (state) => state.addReservaAdicional
  );
  const locale = useLocale() as "es" | "en";
  return (
    <label
      onClick={() => addAdditionals(item.id)}
      className={`relative cursor-pointer col-span-2 lg:col-span-1 flex items-center pb-4 sm:py-6 border-2 border-zinc-200 dark:hover:border-zinc-600 hover:border-zinc-300 duration-200 group dark:border-gray-700/60  rounded-lg`}
    >
      <Image
        className="max-w-40 sm:w-36 rounded-sm group-hover:scale-[1.01] duration-200"
        src={item.name === "GPS" ? "/images2/gps.webp" : "/images2/silla.webp"}
        //src={item.image}
        width={200}
        height={200}
        alt={item.name}
      />
      <div className="grow ps-4 pt-4 sm:pt-0">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
          {accesoriesAndDescriptionTranslate[item.name]?.[locale].title ?? item.name}
        </h3>
        <div className="text-sm mb-2">
          {accesoriesAndDescriptionTranslate[item.name]?.[locale].description ??
            item.description}
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">
            ${item.price}
          </div>
          <div className="text-xs w-full mt-1">{accesoriesAndDescriptionTranslate[item.name]?.[locale].rate ?? item.rate.description}</div>
        </div>
      </div>
      {reservaAdicionales?.find((i) => i.id === item.id) && (
        <BiCheck className="absolute bottom-1 right-1 text-3xl animate-fade-in text-slate-800 dark:text-slate-200" />
      )}
    </label>
    // <label
    //   onClick={() => addAdditionals(item.id)}
    //   className="relative col-span-full md:col-span-1 lg:col-span-2 group cursor-pointer grid grid-cols-1 border-2 border-zinc-200 rounded-lg hover:border-zinc-300 dark:border-gray-700/60 dark:hover:border-zinc-600 duration-200 overflow-hidden"
    // >
    //   <Image
    //     className="h-auto w-full object-cover group-hover:scale-[1.01] duration-200"
    //     src={item.name === "GPS" ? "/images2/gps.webp" : "/images2/silla.webp"}
    //     //src={item.image}
    //     width={300}
    //     height={300}
    //     alt={item.name}
    //   />

    //   <div className="h-full p-2 flex flex-col justify-start">
    //     <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
    //       {accesoriesAndDescriptionTranslate[item.name]?.[locale].title ??
    //         item.name}
    //     </h3>
    //     <div className="text-sm mb-2">
    //       {accesoriesAndDescriptionTranslate[item.name]?.[locale].description ??
    //         item.description}
    //     </div>
    //     <div className="flex flex-wrap justify-between items-center">
    //       <div className="inline-flex text-sm font-medium bg-green-500/20 text-green-700 rounded-full text-center px-2 py-0.5">
    //         ${item.price}
    //       </div>
    //       <div className="text-xs w-full mt-1">
    //         {accesoriesAndDescriptionTranslate[item.name]?.[locale].rate ??
    //           item.rate.description}
    //       </div>
    //     </div>
    //   </div>
    //   {reservaAdicionales?.find((i) => i.id === item.id) && (
    //     <BiCheck className="absolute bottom-1 right-1 text-3xl animate-fade-in text-slate-800 dark:text-slate-200" />
    //   )}
    // </label>
  );
}
