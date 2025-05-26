'use server';

import axios from "axios";
import { RESPONSE } from "@/constant/handler-actions";
import { ROLES } from "@/constant/roles";
import type { ActionResponse } from "@/types";
import { buildResponse } from "@/utils/build-response";
import { revalidatePath } from "next/cache";
import { getUserInformation } from "./auth/getUser";


const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA

export async function GetFechasAction() {
  try {
    const {data} = await axios.get(`${URL}api/date-based-price-multipliers`)
    return data.response
  }
  catch (error) {
    console.log(error);
    return []
  }
}

export async function PostFechasAction(fecha: any): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  if (role !== ROLES.superadmin && role !== ROLES.admin) 
    return buildResponse(RESPONSE.UNAUTHORIZED);

  try {
    const res = await axios.post(`${URL}api/date-based-price-multipliers`, fecha)
    revalidatePath("/admin/fechas/ver")
    return buildResponse(RESPONSE.FECHAS.POST.SUCCESS, res.data);
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.FECHAS.POST.ERROR, null, error);
  }
}


export async function PutFechasAction(fecha: any): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  if (role !== ROLES.superadmin && role !== ROLES.admin) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    const res = await axios.put(`${URL}api/date-based-price-multipliers/${fecha.id}`, fecha)
    revalidatePath("/admin/fechas/ver")
    return buildResponse(RESPONSE.FECHAS.PUT.SUCCESS, res.data);
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.FECHAS.PUT.ERROR, null, error);
  }
}

export async function DeleteFechasAction(id: number): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  if (role !== ROLES.superadmin && role !== ROLES.admin) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    const res = await axios.delete(`${URL}api/date-based-price-multipliers/${id}`)
    revalidatePath("/admin/fechas/ver")
    return buildResponse(RESPONSE.FECHAS.DELETE.SUCCESS, res.data);
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.FECHAS.DELETE.ERROR, null, error);
  }
}