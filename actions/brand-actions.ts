"use server";

import axios, { AxiosError } from "axios";
import { ActionResponse } from "@/types";
import { BrandForm } from "@/app/[locale]/admin/vehiculos/marcas/components/schema";
import { buildResponse } from "@/utils/build-response";
import { getUserInformation } from "./auth/getUser";
import { RESPONSE } from "@/constant/handler-actions";
import { revalidatePath } from "next/cache";
import getAuthorized from "@/components/utils/get-authorized";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA

export const putBrand =  async (values:BrandForm):Promise<ActionResponse> => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "marcas")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    const res = await axios.put(`${URL}api/brands/${values.id}`, values);
    revalidatePath("/admin/vehiculos/marcas")
    return buildResponse(RESPONSE.BRAND.PUT.SUCCESS, res.data);
  } catch (error) {
    console.log(error)
    if(error instanceof AxiosError){
      return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.BRAND.PUT.ERROR, null, error);
  }
}

export const postBrand = async (values:BrandForm):Promise<ActionResponse> => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "marcas")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    const res = await axios.post(`${URL}api/brands`, values);
    revalidatePath("/admin/vehiculos/marcas")
   return buildResponse(RESPONSE.BRAND.POST.SUCCESS, res.data);
  } catch (error) {
    console.log(error)
    if(error instanceof AxiosError){
       return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.BRAND.POST.ERROR, null, error);
  }
}

export const deleteBrand = async (id:number):Promise<ActionResponse> => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "marcas")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    await axios.delete(`${URL}api/brands/${id}`);
    revalidatePath("/admin/vehiculos/marcas")
    return buildResponse(RESPONSE.BRAND.DELETE.SUCCESS, null);
  } catch (error) {
   if(error instanceof AxiosError){
       return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.BRAND.DELETE.ERROR, null, error);
  }
}