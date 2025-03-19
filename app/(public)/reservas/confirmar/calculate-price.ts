"use server";

import { getMaxIncrement } from "@/actions/holidays";
import { calcularDiasEntreFechas2 } from "@/components/utils/utils";
import { VehicleType } from "@/constant/cars";
import axios from "axios";

const BACK = process.env.NEXT_PUBLIC_URL_BACK;

export type ReservaType = {
  car: VehicleType | null;
  startLocation: string;
  endLocation: string;
  startDay: Date;
  endDay: Date;
  startTime: string | undefined;
  endTime: string | undefined;
  aditionals_array: { id: number; amount: number }[];
};

export async function getReservaPrice(
  reserva: ReservaType | null
) {
  if (!reserva || !reserva.car) {
    return { totalAuto: 0, totalAdicionales: 0, totalCompleto: 0 };
  }

  try {
    const maxIncrement = await getMaxIncrement(reserva.startDay, reserva.endDay)
    const { data } = await axios.get(`${BACK}cars/${reserva.car.id}`);
    if (!data) throw new Error("Error al obtener el precio del auto");

    const precioPorDia = Number(data.group.rate);
    const dias = calcularDiasEntreFechas2(
      reserva.startDay,
      reserva.startTime!,
      reserva.endDay,
      reserva.endTime!
    );

    const totalAuto = dias * precioPorDia * maxIncrement;
    const {data: data_adicionales} = await axios.get(`${BACK}aditionals`);

    const totalAdicionales = reserva.aditionals_array.reduce((total, aditional) => {
      const adicional = data_adicionales.find((item: any) => item.id === aditional.id);
      return adicional ? total + Number(adicional.price) * dias : total;
    }, 0);

    console.log(reserva);
    const {data: startBranch} = await axios.get(`${BACK}branches/${reserva.startLocation}`);
    const {data: endBranch} = await axios.get(`${BACK}branches/${reserva.endLocation}`);
    console.log(startBranch, "start");
    console.log(endBranch, "end");
    
    const totalDropOff = (Number(startBranch.distance_to_main_branch) + Number(endBranch.distance_to_main_branch))* 600

    return {
      totalAuto,
      totalAdicionales,
      totalDropOff,
      totalCompleto: totalAuto + totalAdicionales + totalDropOff,
      days: dias
    };
  } catch (error) {
    console.error("Error al calcular el precio de la reserva:", error);
    return { totalAuto: 0, totalAdicionales: 0, totalDropOff:0, totalCompleto: 0, days: 0 };
  }
}
