'use server';

import axios from "axios";
import { revalidatePath } from "next/cache";
//import { unstable_noStore as noStore } from "next/cache";

// const axiosInstance = axios.create({
//   baseURL: "http://maxbernasconi.com/", // Cambia a tu URL base
//   withCredentials: true, // Importante para incluir las cookies en las solicitudes
// });

// const setupCsrf = async () => {
//   await axiosInstance.get("/sanctum/csrf-cookie");
// };

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA
export async function GetBranchesAction() {
  //noStore();
  try {
    const {data} = await axios.get(`${URL}api/branches`)
    return data.response
  }
  catch (error) {
    console.log(error);
    return []
  }
}

export async function PostBranchesAction({branch} : {branch: any}) {
  try {
    //await setupCsrf();
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL_MOVILRENTA}/api/branches`, {branch})
    revalidatePath("/admin/sucursales/ver")
    return {data: res.data, status: res.status}
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}


export async function PutBranchesAction(branch: any) {
  console.log(branch, "BRUNCH");
  try {
    //await setupCsrf();
    const res = await axios.put(`${process.env.NEXT_PUBLIC_URL_MOVILRENTA}/api/branches/${branch.id}`, branch)
    //console.log(res);
    revalidatePath("/admin/sucursales/ver")
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}

export async function DeleteBranchesAction(id: number) {
  try {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_URL_MOVILRENTA}/api/branches/${id}`)
    //console.log(res);
    revalidatePath("/admin/sucursales/ver")
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}
