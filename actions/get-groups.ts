"use server";

import { Group } from "@/types/car.interface";
import axios, { AxiosError } from "axios";

const URL = process.env.NEXT_PUBLIC_URL_BACK as string;
export const getGroups = async () => {
  try {
    const {data} = await axios.get(`${URL}groups`);
    return {
      ok:true,
      message:"Groups",
      data: data as Group[]
    }
  } catch (error) {
   if(error instanceof AxiosError){
    return {
      ok:false,
      message:`${error.response?.data.message}`,
      data:null
    }
   }
   return {
    ok:false,
    message:"Internal Server Error - 500"
   }
  }
}