"use server"

import { ReservationsDB } from "@/types"
import axios from "axios"

export const getReservations = async () => {

  const URL = process.env.DB_URL
  try {
    const {data} = await axios.get(`${URL}reservations`);
    const reservas:ReservationsDB[] = data;

    return {
      ok:true,
      message:"Petición exitosa",
      data: reservas
    }
  } catch (error) {
    return {
      ok:false,
      message:"Internal server error - 500",
      data: []
    }
  }
}