"use server";

import { ReservationDetail } from "@/types/reservation.interface";
import axios from "axios";

export const getReservationById = async (orderId: number) => {
  const URL = process.env.DB_URL
  try {
    const {data} = await axios.get(`${URL}reservations/${orderId}`)
    return {
      ok:true,
      message:"Peticion exitosa",
      data: JSON.parse(JSON.stringify(data)) as ReservationDetail
    }
  } catch (error) {
    return {
      ok:false,
      message:"Internal server error - 500",
    }
  }
}