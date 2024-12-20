"use server";

import { formSchema, RequestExecutedPay, ResponseDataToken, ResponseExecutedPay } from "@/types/payway-form.schema";
import axios, { AxiosError } from "axios";
import { z } from "zod";
//const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA
//const URL = "http://localhost:3000/";
const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;
const BACK = process.env.NEXT_PUBLIC_URL_BACK

export const getTokenPay = async (values: z.infer<typeof formSchema>, code: string, reserva_id: number, group_id: number, dias: number, amount_aditionals: number) => {
  try {
    const resultParse = await formSchema.safeParseAsync(values);
    if (!resultParse.success) {
      resultParse.error.issues.forEach((err) => {
        console.log(`Error en ${err.path} - ${err.message}`);
      });
      console.log("_1");
      return {
        ok: false,
        message: "Hubo un problema al intentar realizar el pago",
      };
    }
    const resp_group = await axios.get(`${BACK}groups/${group_id}`)
    const group = resp_group.data.rate
    const { card_holder_birthday, payment_method_id, card_holder_door_number, installments, ...rest } = resultParse.data;
    const puertaNumber = +(card_holder_door_number);
    const dateTransform = card_holder_birthday.replace(/\//g, "")

    const { data } = await axios.post<ResponseDataToken>(`${URL}api/token`,
      {
        card_holder_birthday: dateTransform,
        card_holder_door_number: puertaNumber,
        ...rest
      });
    const { response } = data;
    if (response.status !== "active") {
      console.log("_2");
      return {
        ok: false,
        message: "Problemas al realizar el pago"
      }
    }

    const body = {
      site_transaction_id: code,
      token: response.id,
      payment_method_id: +(values.payment_method_id),
      bin: response.bin,
      amount: Math.floor(+(group*dias))+amount_aditionals,
      currency: "ARS",
      installments: +(installments),
      payment_type: "single",
      sub_payments: []
    }

    const responseEx = await executedPayment(body, reserva_id);
    if (!responseEx?.ok) {
      console.log("_3");
      console.log(responseEx);
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
    console.log("_4");
    console.log(error)
    return {
      ok: false,
      message: "Internal Server Error - 500"
    }
  }
};

const executedPayment = async (values: RequestExecutedPay, reserva_id: number) => {
  // console.log("soy la reserva_id", reserva_id);
  console.log(values, "VALUES");
  console.log(reserva_id, "RESERVA ID");
  try {
    const { data } = await axios.post<ResponseExecutedPay>(`${URL}api/payments`, values);
    console.log(data);
    console.log(data.response);
    console.log(data.response.status);
    if (data.response.status === "approved") {
      const dataPago = data.response
      dataPago.reservation_id = reserva_id
      dataPago.status_details = JSON.stringify(dataPago.status_details)
      dataPago.sub_payments = JSON.stringify(dataPago.sub_payments)
      dataPago.date = JSON.stringify(dataPago.date).replace("T", " ").replace("Z", "").replace(/"/g, "")
      delete dataPago.authenticated_token
      //console.log(dataPago, "DATAPAGO");
      try {
        const { data } = await axios.post(`${BACK}payments`, dataPago);
        //console.log(data, "data")
      } catch (error: any) {
        //console.log(error, "error")
        console.log(error.response.data.error, "VEAMOS");
        if (error instanceof AxiosError) {
          return {
            ok: false,
            message: error.message,
            data: null
          }
        }
      }
      return {
        ok: true,
        message: "Pago realizado con exito",
        data: dataPago
      }
    }
    return {
      ok: false,
      message: "Hubo un problema al realizar el pago",
      data: null
    }
  } catch (error: any) {
    console.log(error.response.data.error, "executedPayment")
    console.log("ERRRRRRANDO");
    if (error instanceof AxiosError) {
      console.log("_5");
      return {
        ok: false,
        message: error.message,
        data: null
      }
    }
  }
}

/*
 response: {
    id: 14250759,
    site_transaction_id: 'LBC009ZHY',
    payment_method_id: 1,
    card_brand: 'Visa',
    amount: 715670,
    currency: 'ars',
    status: 'pre_approved',
    status_details: {
      ticket: '9215',
      card_authorization_code: '180836',
      address_validation_code: 'VTE0011',
      error: null
    },
    date: '2024-12-20T18:08Z',
    payment_mode: null,
    customer: null,
    bin: '450799',
    installments: 1,
    first_installment_expiration_date: null,
    payment_type: 'single',
    sub_payments: [],
    site_id: '28464383',
    fraud_detection: null,
    aggregate_data: null,
    establishment_name: null,
    spv: null,
    confirmed: null,
    pan: null,
    customer_token: null,
    card_data: '/tokens/14250759',
    token: 'f02b932c-eacc-4812-ac4d-8b68bd114afb',
    authenticated_token: null
  }
}
*/