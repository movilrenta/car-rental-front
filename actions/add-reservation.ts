"use server";

import axios, { AxiosError } from "axios";
import { getUserInformation } from "./auth/getUser";
//import { ROLES } from "@/constant/roles";
import { buildResponse } from "@/utils/build-response";
import { RESPONSE } from "@/constant/handler-actions";
// import { z } from "zod";
const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;


export const addReservationAction = async (values: any) => {
  const { token } = await getUserInformation()
  if(!token) return buildResponse(RESPONSE.UNAUTHORIZED)
  // TODO: values.origin = user || "offline_agent";
  try {
    const { data } = await axios.post(`${URL}api/reservation`, values);
    return buildResponse(RESPONSE.RESERVATION.POST.SUCCESS, data)
    // return {
    //   ok: true,
    //   message: "Reserva creada exitosamente",
    //   status: data.status,
    // };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        ok: false,
        message: error.response?.data.response.error || "Error al crear reserva",
        status: error.response?.status,
      };
    }
    return buildResponse(RESPONSE.RESERVATION.POST.ERROR, null, error)
  }
};
