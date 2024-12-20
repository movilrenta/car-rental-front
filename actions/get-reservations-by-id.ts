"use server";

import { ReservationsDB } from "@/types";
import { CarResponse } from "@/types/car.interface";
//import { ReservationDetail } from "@/types/reservation.interface";
import axios from "axios";

export const getReservationById = async (orderId: number) => {
  const URL = process.env.NEXT_PUBLIC_URL_BACK
  try {
    const response = await axios.get(`${URL}reservations/${orderId}`)

    if(!response){
      return {
        ok:false,
        message:`No se encontró la reserva con id ${orderId} `,
        data:null
      }
    }

    const reserva:ReservationsDB = response.data;
    const resp = await axios.get(`${URL}cars/${reserva.car_id}`)
    
    if(!resp){
      return {
        ok:false,
        message:"No se encontro el vehiculo"
      }
    }
    const car_details:CarResponse = resp.data

    
    return {
      ok:true,
      message:"Peticion exitosa",
      data: {
        reservation: JSON.parse(JSON.stringify(reserva)),
        car_details: JSON.parse(JSON.stringify(car_details)) as CarResponse
      }
    }
  } catch (error) {
    return {
      ok:false,
      message:"Internal server error - 500",
      data:null
    }
  }
}