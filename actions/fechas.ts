'use server';

import axios from "axios";
import { revalidatePath } from "next/cache";


// const axiosInstance = axios.create({
//   baseURL: "http://maxbernasconi.com/", // Cambia a tu URL base
//   withCredentials: true, // Importante para incluir las cookies en las solicitudes
// });

// const setupCsrf = async () => {
//   await axiosInstance.get("/sanctum/csrf-cookie");
// };

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

export async function PostFechasAction(fecha: any) {
  try {
    //await setupCsrf();
    const res = await axios.post(`${URL}api/date-based-price-multipliers`, fecha)
    revalidatePath("/admin/fechas/ver")
    return {data: res.data, status: res.status}
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}


export async function PutFechasAction(fecha: any) {
  try {
    //await setupCsrf();
    const res = await axios.put(`${URL}api/date-based-price-multipliers/${fecha.id}`, fecha)
    revalidatePath("/admin/fechas/ver")
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}

export async function DeleteFechasAction(id: number) {
  try {
    const res = await axios.delete(`${URL}api/date-based-price-multipliers/${id}`)
    revalidatePath("/admin/fechas/ver")
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}