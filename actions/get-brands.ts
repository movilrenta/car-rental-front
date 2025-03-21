"use server";

import { Brand } from "@/types/car.interface";
import axios, { AxiosError } from "axios";

const URL = process.env.NEXT_PUBLIC_URL_BACK as string;
export const getBrands = async () => {
  try {
    const {data} = await axios.get(`${URL}brands`);
    return {
      ok:true,
      message:"Brands",
      data: data as Brand[]
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