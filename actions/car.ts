"use server";
import axios, { AxiosError } from "axios";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

import { ActionResponse } from "@/types";
import { buildResponse } from "@/utils/build-response";
import { getUserInformation } from "./auth/getUser";
import { RESPONSE } from "@/constant/handler-actions";
import { ROLES } from "@/constant/roles";

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

export async function PostCarAction(car: any): Promise<ActionResponse> {
  const { role } = await getUserInformation();
  if (role !== ROLES.admin && role !== ROLES.superadmin) {
    return buildResponse(RESPONSE.UNAUTHORIZED);
  }
  try {
    const res = await axios.post(`${URL}/api/cars`, car);
    revalidatePath("/admin/vehiculos/ver");
    return buildResponse(RESPONSE.CARS.POST.SUCCESS, res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      // console.log({ error: error.response?.data.error.errors, message:error.response?.data.error.message, status:error.status })
      return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.CARS.POST.ERROR, null, error);
  }
}

export async function PutCarAction(car: any): Promise<ActionResponse> {
  const { role } = await getUserInformation();
  if (role !== ROLES.admin && role !== ROLES.superadmin) {
    return buildResponse(RESPONSE.UNAUTHORIZED);
  }
  try {
    const res = await axios.put(`${URL}/api/cars/${car.id}`, car);
    revalidatePath("/admin/vehiculos/ver");
    return buildResponse(RESPONSE.CARS.PUT.SUCCESS, res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.CARS.PUT.ERROR, null, error);
  }
}

export async function StatusCarAction(car: any): Promise<ActionResponse> {
  const { role } = await getUserInformation();
  if (role !== ROLES.admin && role !== ROLES.superadmin) {
    return buildResponse(RESPONSE.UNAUTHORIZED);
  }
  car.is_active = !car.is_active;
  try {
    const res = await axios.patch(`${URL}/api/cars/${car.id}`, {
      is_active: car.is_active,
    });
    revalidatePath("/admin/vehiculos/ver");
    return buildResponse(RESPONSE.CARS.PUT.SUCCESS, res.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return buildResponse({
        message:
          error.response?.data.error.message || "Error status car action",
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.CARS.PUT.ERROR, null, error);
  }
}

export async function DeleteCarAction(id: number): Promise<ActionResponse> {
  const { role } = await getUserInformation();
  if (role !== ROLES.admin && role !== ROLES.superadmin) {
    return buildResponse(RESPONSE.UNAUTHORIZED);
  }
  try {
    const res = await axios.delete(`${URL}/api/cars/${id}`);
    revalidatePath("/admin/vehiculos/ver");
    return buildResponse(RESPONSE.CARS.DELETE.SUCCESS, res.data);
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return buildResponse({
        message:
          error.response?.data.error.message || "Error delete car action",
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.CARS.DELETE.ERROR, null, error);
  }
}
