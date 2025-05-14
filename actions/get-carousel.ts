"use server";

import { Carousel_Type } from "@/types/carousel.schema";
import axios, { AxiosError } from "axios";

const URL = process.env.NEXT_PUBLIC_URL_BACK as string;
export const getCarouselAction = async () => {
  try {
    const {data} = await axios.get(`${URL}carousels`);
    return {
      ok:true,
      message:"Carousels",
      data: data as Carousel_Type[]
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
    message:"No se pudo obtener la información de los carouseles",
    data:null
   }
  }
}