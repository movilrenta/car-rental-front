"use server";

import { GroupForm } from "@/app/admin/vehiculos/grupos/components/groupSchema";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA

export const putGroup =  async (values:GroupForm) => {
  try {
    const res = await axios.put(`${URL}/api/groups/${values.id}`, values);
    revalidatePath("/admin/vehiculos/grupos")
    return {
      ok:true,
      data: res.data,
      message:"Grupo actualizado con éxito"
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

export const postGroup = async (values:GroupForm) => {
  try {
    const res = await axios.post(`${URL}/api/groups`, values);

    revalidatePath("/admin/vehiculos/grupos")
    return {
      ok:true,
      data: res.data,
      message:"Grupo creado con éxito"
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

export const deleteGroup = async (id:number) => {
  try {
    await axios.delete(`${URL}/api/groups/${id}`);
    revalidatePath("/admin/vehiculos/grupos")
    return {
      ok:true,
      message:"Grupo eliminado con éxito"
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