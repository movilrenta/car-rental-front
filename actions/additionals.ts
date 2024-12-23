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
export async function GetAdditionalsAction() {
  noStore();
  try {
    const {data} = await axios.get(`${URL}/api/additionals`)
    return data.response
  }
  catch (error) {
    console.log(error);
    return []
  }
}

export async function PostAdditionalsAction(address: any) {
  try {
    //await setupCsrf();
    const res = await axios.post(`/api/additionals`, address)
    return {data: res.data, status: res.status}
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}


export async function PutAdditionalsAction(address: any) {
  try {
    //await setupCsrf();
    const res = await axios.put(`/api/additionals/${address.id}`, address)
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}

export async function DeleteAdditionalsAction(id: number) {
  try {
    const res = await axios.delete(`/api/additionals/${id}`)
    console.log(res);
    return res.data
  }
  catch (error) {
    console.log(error);
    return {message: "error", error: error, status: 400}
  }
}