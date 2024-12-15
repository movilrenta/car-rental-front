"use server";

import { CarResponse } from "@/types/car.interface";
import { ReservationDetail } from "@/types/reservation.interface";
import axios from "axios";

export const getReservationById = async (orderId: number) => {
  const URL = process.env.DB_URL
  try {
    const {data} = await axios.get<ReservationDetail>(`${URL}reservations/${orderId}`)
    const {car_id} = data
    const resp = await axios.get(`${URL}cars/${car_id}`)
    if(!resp){
      return {
        ok:false,
        message:"No se encontro el vehiculo"
      }
    }
    const car_details = resp.data as CarResponse

    
    return {
      ok:true,
      message:"Peticion exitosa",
      data: {
        reservation_detail: JSON.parse(JSON.stringify(data)) as ReservationDetail,
        car_details: JSON.parse(JSON.stringify(car_details)) as CarResponse
      }
    }
  } catch (error) {
    return {
      ok:false,
      message:"Internal server error - 500",
    }
  }
}