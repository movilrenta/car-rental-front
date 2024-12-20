'use client'
import Image from "next/image"
import { useReservaAdicionalesStore } from "@/stores/reserva-adicionales/reserva-adicionales.store";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi"
import AdditionalCard from "./reserva-pick-aditional-card";

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
  //const adicionales = useReservaAdicionalesStore((state) => state.getReservaAdicionales());
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center h-screen">
        <Loader2Icon className="w-12 h-12 animate-spin" />
        <span>Obteniendo datos adicionales...</span>
      </div>
    );
  }

  return (
    <div className="">
    <h2 className="text-2xl font-medium leading-snug text-gray-800 dark:text-gray-100 mb-5">
      03. Accesorios <strong>opcionales</strong>
    </h2>
    <ul className="grid grid-cols-2 gap-4 mb-16">
      {data.map((item: AditionalType) => (
        <AdditionalCard key={item.id} item={item} />
      ))}
    </ul>
  </div>
  )
}