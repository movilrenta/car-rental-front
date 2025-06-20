'use client'

import { useReservaAdicionalesStore } from "@/stores/reserva-adicionales/reserva-adicionales.store";
import { useReservaAutoStore } from "@/stores/reserva-auto/reserva-auto.store";
import { useItinerarioStore } from "@/stores/reserva-itinerario/reserva-itinerario.store";
import { ReservaType, useReservaStore } from "@/stores/reservas/reserva.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { calcularDiasEntreFechas2 } from "../utils/utils";
import { useTranslations } from "next-intl";

export default function ReservaConfirm() {
  const t = useTranslations("BookingPage.confirm")
  const router = useRouter();
  const reservaAuto = useReservaAutoStore((state) => state.getReservaAuto());
  const reservaAditional = useReservaAdicionalesStore((state) => state.getReservaAdicionales());
  const reservaItinerario = useItinerarioStore((state) => state.getItinerario());
  const nuevaReserva = useReservaStore((state) => state.addReserva);
  const [isClient, setIsClient] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(
    reservaAuto === null || reservaItinerario === null
  );

  useEffect(() => {
    if(reservaItinerario !== null &&
      reservaItinerario?.startDay !== null 
      && reservaItinerario?.endDay !== null 
      && reservaItinerario?.startLocation !== ""
      && reservaItinerario?.endLocation !== ""
      && reservaItinerario?.startTime !== undefined
      && reservaItinerario?.endTime !== undefined
      && reservaAuto !== null) {
        return setButtonDisabled(false)
      }
    return setButtonDisabled(true);

  }, [reservaAuto, reservaItinerario]);
  
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if(!isClient) return (<div></div>)

  const handleGoBook = () => {
    if(reservaAuto === null || reservaItinerario === null) return;
    const dias = calcularDiasEntreFechas2(reservaItinerario?.startDay!, reservaItinerario?.startTime!, reservaItinerario?.endDay!, reservaItinerario?.endTime!)
    const reservation: ReservaType = {
      car: reservaAuto,
      startLocation: reservaItinerario.startLocation,
      endLocation: reservaItinerario.endLocation,
      startDay: reservaItinerario.startDay!,
      endDay: reservaItinerario.endDay!,
      startTime: reservaItinerario!.startTime,
      endTime: reservaItinerario!.endTime,
      aditionals_array: reservaAditional?.map((item) => ({
        ...item,
        amount: dias,
      })) || []
    };
    nuevaReserva(reservation);
    router.push('/reservas/confirmar')
  };

  return (
    <div className="flex w-full pt-12 justify-center sm:justify-end items-end px-14">
    <button
      disabled={buttonDisabled}
      onClick={handleGoBook}
      className={`${buttonDisabled ? "cursor-not-allowed opacity-25" : "cursor-pointer hover:!bg-red-700 hover:!text-white"} btn w-60 bg-red-700 text-gray-100 hover:bg-red-800 dark:bg-gray-100 dark:text-gray-800`}
    >
      {t("btn")}
    </button>
  </div>
  )
}