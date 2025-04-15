'use client'

import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import AdditionalCard from "./reserva-pick-aditional-card";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import { useTranslations } from "next-intl";

export type AditionalType = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  rate: {
    id: number;
    name: string;
    description: string;
  };
}

export default function PickAditional ({data} : {data: AditionalType[]}) {
  const t = useTranslations("BookingPage.pickAdditionals")
  const [isClient, setIsClient] = useState(false)
  const car = useReservaAutoStore((state) => state.getReservaAuto())

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center h-screen">
        <Loader2Icon className="w-12 h-12 animate-spin" />
        <span>{t("loading")}</span>
      </div>
    );
  }

  return (
    car && <div className="">
    <h2 className="text-2xl font-medium leading-snug text-gray-800 dark:text-gray-100 mb-5">
      03. <strong>{t("preTitle")}</strong> {t("title")}
    </h2>
    <ul className="grid grid-cols-2 gap-4 mb-16">
      {data.map((item: AditionalType) => (
        item.name !== "Kilometro" && <AdditionalCard key={item.id} item={item} />
      ))}
    </ul>
  </div>
  )
}