"use server";

// import { newReservationSchema } from "@/types";
import axios, { AxiosError } from "axios";
// import { z } from "zod";
const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;


export const addReservationAction = async (values: any) => {
  try {
    const { data } = await axios.post(`${URL}api/reservation`, values);
    return {
      ok: true,
      message: "Reserva creada exitosamente",
      status: data.status,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        message: error.response?.data.response.error || "Error al crear reserva",
        status: error.response?.status,
      };
    }
    return {
      ok: false,
      message: "Internal server error - 500",
      error: error,
    };
  }
};
