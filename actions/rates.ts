import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";

// const axiosInstance = axios.create({
//   baseURL: "http://maxbernasconi.com/", // Cambia a tu URL base
//   withCredentials: true, // Importante para incluir las cookies en las solicitudes
// });

// const setupCsrf = async () => {
//   await axiosInstance.get("/sanctum/csrf-cookie");
// };

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA
export async function GetRatesAction() {
  noStore();
  try {
    const {data} = await axios.get(`${URL}/api/rates`)
    return data.response
  }
  catch (error) {
    console.log(error);
    return []
  }
}

export async function PostRatesAction(address: any) {
  try {
    //await setupCsrf();
    const res = await axios.post(`/api/rates`, address)
    return {data: res.data, status: res.status}
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}


export async function PutRatesAction(address: any) {
  try {
    //await setupCsrf();
    const res = await axios.put(`/api/rates/${address.id}`, address)
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}

export async function DeleteRatesAction(id: number) {
  try {
    const res = await axios.delete(`/api/rates/${id}`)
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}