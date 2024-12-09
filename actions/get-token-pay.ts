"use server";

import { formSchema } from "@/types/payway-form.schema";
import axios from "axios";
import { z } from "zod";
const URL = "http://localhost:3000/"

export const getTokenPay = async (values: z.infer<typeof formSchema>) => {
  try {
    const resultParse = await formSchema.safeParseAsync(values);
    if (!resultParse.success) {
      resultParse.error.issues.forEach((err) => {
        console.log(`Error en ${err.path} - ${err.message}`);
      });
      return {
        ok: false,
        message: "Hubo un problema al intentar realizar el pago",
      };
    }

    const {card_holder_birthday, ...rest} = resultParse.data;
    const dateTransform = card_holder_birthday.replace(/\//g, "")

    const {data} = await axios.post(`${URL}api/token`,{card_holder_birthday:dateTransform, ...rest});
    if(!data){
      return {
        ok:false,
        message: "Problemas al realizar el pago"
      }
    }
    return {
      ok:true,
      message:"Pago realizado con exito",
    }
  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message:"Internal Server Error - 500"
    }
  }
};
