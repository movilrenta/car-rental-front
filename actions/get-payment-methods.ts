"use server"

import { PaymentMethods } from "@/types/payway-form.schema";
import axios from "axios"

//const URL = "http://localhost:3000/";
const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;

export const getPaymentMethods = async () => {
  try {
    const {data} = await axios.get(`${URL}api/payments-methods`);
    return {
      ok:true,
      message:"Petición exitosa",
      data: data.response as PaymentMethods[]
    }
  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message:"Internal server error - 500"
    }
  }
}