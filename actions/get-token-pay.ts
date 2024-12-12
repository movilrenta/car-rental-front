"use server";

import { formSchema, RequestExecutedPay, ResponseDataToken, ResponseExecutedPay } from "@/types/payway-form.schema";
import axios, { AxiosError } from "axios";
import { z } from "zod";
//const URL = "http://localhost:3000/"
const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA

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

    const {card_holder_birthday, payment_method_id,...rest} = resultParse.data;
    const dateTransform = card_holder_birthday.replace(/\//g, "")

    const {data}  = await axios.post<ResponseDataToken>(`${URL}api/token`,{card_holder_birthday:dateTransform, ...rest});
    const {response} = data;
    if(response.status !== "active"){
      return {
        ok:false,
        message: "Problemas al realizar el pago"
      }
    }

    const uuid = crypto.randomUUID();
    const body = {
      site_transaction_id: uuid,
      token: response.id,
      payment_method_id: values.payment_method_id,
      bin: response.bin,
      amount: 2000,
      currency: "ARS",
      installments: 1,
      payment_type: "single",
      sub_payments: []
    }
    //!FALTA: agregar amount, currency e installments al formSchema para que realice toda la transaccion

    const responseEx = await executedPayment(body);
    if(!responseEx?.ok){
      return {
        ok: false,
        message: responseEx?.message
      }
    }
    return {
      ok: true,
      message: responseEx?.message,
      data: responseEx?.data
    }
  } catch (error) {
    console.log(error)
    return {
      ok:false,
      message:"Internal Server Error - 500"
    }
  }
};

const executedPayment = async (values:RequestExecutedPay) => {
  try {
    const {data} = await axios.post<ResponseExecutedPay>(`${URL}api/payments`, values);
    if(data.response.status === "approved"){
      return {
        ok:true,
        message:"Pago realizado con exito",
        data: data.response
      }
    }
  } catch (error) {
    console.log(error, "executedPayment")
    if(error instanceof AxiosError){
      return {
        ok:false,
        message:error.message,
        data:null
      }
    }
  }
}