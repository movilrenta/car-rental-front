'use server';
import axios from "axios";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

// const axiosInstance = axios.create({
//   baseURL: "http://maxbernasconi.com/", // Cambia a tu URL base
//   withCredentials: true, // Importante para incluir las cookies en las solicitudes
// });

// const setupCsrf = async () => {
//   await axiosInstance.get("/sanctum/csrf-cookie");
// };

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;
export async function GetCarsAction() {
  noStore();
  try {
    const { data } = await axios.get(`${URL}/api/cars`);

    return data?.cars;
  } catch (error) {
    console.log(error);
    return { message: "error", error: error, status: 400 };
  }
}

export async function PostCarAction(car: any) {
  try {
    const res = await axios.post(`${URL}/api/cars`, car);
    revalidatePath("/admin/vehiculos/ver");
    return { data: res.data, status: res.status };
  } catch (error) {
    console.log(error);
    return { message: "error", error: error, status: 400 };
  }
}

export async function PutCarAction(car: any) {
  try {
    const res = await axios.put(`${URL}/api/cars/${car.id}`, car);
    revalidatePath("/admin/vehiculos/ver");
    return { data: res.data, status: res.status };
  } catch (error) {
    console.log(error);
    return { message: "error", error: error, status: 400 };
  }
}

export async function StatusCarAction(car: any) {
  car.is_active = !car.is_active;
  try {
    const res = await axios.patch(`${URL}/api/cars/${car.id}`, {is_active: car.is_active});
    revalidatePath("/admin/vehiculos/ver");
    return { data: res.data, status: res.status };
  } catch (error) {
    console.log(error);
    return { message: "error", error: error, status: 400 };
  }
}

export async function DeleteCarAction(id: number) {
  try {
    const res = await axios.delete(`${URL}/api/cars/${id}`);
    revalidatePath("/admin/vehiculos/ver");
    return res.data;
  } catch (error) {
    console.log(error);
    return { message: "error", error: error, status: 400 };
  }
}
