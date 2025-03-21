"use server"

import { ReservationsDB } from "@/types"
import axios from "axios"
import { unstable_noStore as noStore } from "next/cache";

export const getReservations = async () => {
  noStore()
  const URL = process.env.NEXT_PUBLIC_URL_BACK
  try {
    const {data} = await axios.get(`${URL}reservations`);
    const {data: branches} = await axios.get(`${URL}branches`);

    const reservas:ReservationsDB[] = data;
    
    return {
      ok:true,
      message:"Petición exitosa",
      data: reservas,
      branches: branches
    }
  } catch (error) {
    return {
      ok:false,
      message:"Internal server error - 500",
      data: []
    }
  }
}