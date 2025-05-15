'use server';

import { RESPONSE } from "@/constant/handler-actions";
import { ROLES } from "@/constant/roles";
import { UserRole } from "@/types";
import axios from "axios";
import { revalidatePath } from "next/cache";


// const axiosInstance = axios.create({
//   baseURL: "http://maxbernasconi.com/", // Cambia a tu URL base
//   withCredentials: true, // Importante para incluir las cookies en las solicitudes
// });

// const setupCsrf = async () => {
//   await axiosInstance.get("/sanctum/csrf-cookie");
// };

type ActionResponse<T = any> = {
  data: T | null;
  message: string;
  status: number;
  error?: unknown;
};

const buildResponse = <T = any>(config: { message: string; code: number }, data: T | null = null, error?: unknown) => ({
  data,
  message: config.message,
  status: config.code,
  ...(error ? { error } : {})
});

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

export async function PostFechasAction(fecha: any, role:UserRole | undefined): Promise<ActionResponse> {
  if (role !== ROLES.superadmin && role !== ROLES.admin) 
    return buildResponse(RESPONSE.UNAUTHORIZED);
  //   return {
  //   data: null,
  //   message: RESPONSE.UNAUTHORIZED.message,
  //   status: RESPONSE.UNAUTHORIZED.code
  // };
  try {
    //await setupCsrf();
    const res = await axios.post(`${URL}api/date-based-price-multipliers`, fecha)
    revalidatePath("/admin/fechas/ver")
    return buildResponse(RESPONSE.FECHAS.POST.SUCCESS, res.data);
    // return {
    //   data: res.data,
    //   message: RESPONSE.FECHAS.POST.SUCCESS.message,
    //   status: RESPONSE.FECHAS.POST.SUCCESS.code
    // }
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.FECHAS.POST.ERROR, null, error);
  //   return {
  //     data: null,
  //     message: RESPONSE.FECHAS.POST.ERROR.message,
  //     error: error, 
  //     status: RESPONSE.FECHAS.POST.ERROR.code}
  // }
  }
}


export async function PutFechasAction(fecha: any, role: string | undefined) {
  if (role !== ROLES.superadmin && role !== ROLES.admin) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    //await setupCsrf();
    const res = await axios.put(`${URL}api/date-based-price-multipliers/${fecha.id}`, fecha)
    revalidatePath("/admin/fechas/ver")
    //console.log(res);
    return buildResponse(RESPONSE.FECHAS.PUT.SUCCESS, res.data);
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.FECHAS.PUT.ERROR, null, error);
    //return {message: "error", error: error, status: 400}
  }
}

export async function DeleteFechasAction(id: number) {
  try {
    const res = await axios.delete(`${URL}api/date-based-price-multipliers/${id}`)
    revalidatePath("/admin/fechas/ver")
    //console.log(res);
    return buildResponse(RESPONSE.FECHAS.DELETE.SUCCESS, res.data);
    // return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}