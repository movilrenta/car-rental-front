"use server";

import { BrandForm } from "@/app/admin/vehiculos/marcas/components/schema";
import axios, { AxiosError } from "axios"
import { revalidatePath } from "next/cache";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA

export const putBrand =  async (values:BrandForm) => {
  try {
    const res = await axios.put(`${URL}/api/brands/${values.id}`, values);
    revalidatePath("/admin/vehiculos/marcas")
    return {
      ok:true,
      data: res.data,
      message:"Marca actualizada con éxito"
    }
  } catch (error) {
    console.log(error)
    if(error instanceof AxiosError){
      return {
        ok:false,
        message: error.response?.data.message,
        data:null
      }
    }
    return {
      ok:false,
      message: "Internal Server Error",
      data:null
    }
  }
}

export const postBrand = async (values:BrandForm) => {
  try {
    const res = await axios.post(`${URL}/api/brands`, values);

    revalidatePath("/admin/vehiculos/marcas")
    return {
      ok:true,
      data: res.data,
      message:"Marca creada con éxito"
    }
  } catch (error) {
    console.log(error)
    if(error instanceof AxiosError){
      return {
        ok:false,
        message: error.response?.data.message,
        data:null
      }
    }
    return {
      ok:false,
      message: "Internal Server Error",
      data:null
    }
  }
}

export const deleteBrand = async (id:number) => {
  try {
    await axios.delete(`${URL}/api/brands/${id}`);
    revalidatePath("/admin/vehiculos/marcas")
    return {
      ok:true,
      message:"Marca eliminada con éxito"
    }
  } catch (error) {
    if(error instanceof AxiosError){
      return {
        ok:false,
        message: error.response?.data.message
      }
    }
    return {
      ok:false,
      message:"Internal Server Error"
    }
  }
}