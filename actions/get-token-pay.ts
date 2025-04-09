"use server";

import { formSchema } from "@/types/payway-form.schema";
import { ReservationDetail } from "@/types/reservation.interface";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { getMaxIncrement } from "./holidays";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;
const BACK = process.env.NEXT_PUBLIC_URL_BACK

type PaymentData = {
  reservation_id: number;
  id: number;
  status_details: {
    ticket: string;
    card_authorization_code: string;
    address_validation_code: string;
    error: string | null;
  };
  sub_payments: any[]; // array vacío como string originalmente, se puede tipar mejor si sabés qué trae
  date: string;
  fraud_detection: {
    status: {
      decision: string;
      request_id: string;
      reason_code: number;
      description: string;
      review: string | null;
    };
  };
  amount: number;
  customer: any | null;
  site_transaction_id: string;
  payment_method_id: number;
  card_brand: string;
  currency: string;
  status: string;
  payment_mode: string | null;
  bin: string;
  installments: number;
  first_installment_expiration_date: string | null;
  payment_type: string;
  site_id: string;
  aggregate_data: any | null;
  establishment_name: string;
  spv: any | null;
  confirmed: boolean | null;
  pan: string | null;
  customer_token: string | null;
  card_data: string;
  token: string;
  authenticated_token: string | null;
  tid: string |null;
  emv_issuer_data: string | null;
};


export const getTokenPay = async (values: z.infer<typeof formSchema>, code: string, reserva_id: number, group_id: number, dias: number, amount_aditionals: number, dropoff: number) => {
  try {
    const resultParse = await formSchema.safeParseAsync(values);
    if (!resultParse.success) {
      resultParse.error.issues.forEach((err) => {console.log(`Error en ${err.path} - ${err.message}`);});
      return {ok: false, message: "Hubo un problema al intentar realizar el pago", status: 403 };
    }
    const reservation_info = await axios.get<ReservationDetail>( `${BACK}reservations/${reserva_id}`)
    const deviceUniqueIdentifier = crypto.randomUUID();
    const resp_group = await axios.get(`${BACK}groups/${group_id}`)
    const price_car = resp_group?.data?.rate
    const increment_per_holiday = await getMaxIncrement(reservation_info?.data?.start_date, reservation_info?.data?.end_date) //Si deberia funcionar
    const dateTransform = values.card_holder_birthday.replace(/\//g, "")
    const amount_to_send = (Math.floor(+(price_car*dias*(increment_per_holiday || 1)))+amount_aditionals + dropoff)*100
    const payload = {
      solicitud: {
        card_number: values.card_number,
        card_expiration_month: values.card_expiration_month,
        card_expiration_year: values.card_expiration_year,
        card_holder_name: values.bill_to.first_name + " " + values.bill_to.last_name,
        card_holder_birthday: dateTransform,
        card_holder_door_number: +(values.card_holder_door_number),
        security_code: values.security_code || reservation_info?.data?.code,
        card_holder_identification: {
          type: values.card_holder_identification.type,
          number: values.card_holder_identification.number,
        },
        fraud_detection: {
          device_unique_identifier: deviceUniqueIdentifier,
        },
      },
      ejecucion: {
        site_transaction_id: code,
        //token: "",
        establishment_name: "Movil Renta",
        payment_method_id: +(values.payment_method_id),
        //bin: "450799",
        amount: amount_to_send,
        currency: "ARS",
        installments: +(values.installments),
        payment_type: "single",
        sub_payments: [],
        fraud_detection: {
          send_to_cs: true,
          channel: "Web/Mobile",
          bill_to: {
            city: values.bill_to.city,
            country: values.bill_to.country,
            customer_id: reservation_info?.data?.code || values.bill_to.customer_id,
            email: reservation_info?.data?.reservation_detail?.email,
            first_name: values.bill_to.first_name,
            last_name: values.bill_to.last_name,
            phone_number: reservation_info?.data?.reservation_detail?.phone,
            postal_code: values.bill_to.postal_code,
            state: values.bill_to.state,
            street1: values.bill_to.street1,
          },
          purchase_totals: { currency: "ARS", amount: amount_to_send },
          // customer_in_site: { date_of_birth: "129412", street: "RIO 4041" },
          retail_transaction_data: {
            ship_to: {//TODO datos de la empresa
              city: values.bill_to.city,
              country: "AR",
              customer_id: "0001",
              email: reservation_info?.data?.reservation_detail?.email || "accept@decidir.com.ar",
              first_name: reservation_info?.data?.reservation_detail?.firstname,
              last_name: reservation_info?.data?.reservation_detail?.lastname,
              phone_number: reservation_info?.data?.reservation_detail?.email,
              postal_code: values.bill_to.postal_code,
              state: values.bill_to.state,
              street1: values.bill_to.street1 + " " + values.card_holder_door_number,
            },
            dispatch_method: "movilrenta",
            items: [
              {
                code: "Alquiler vehiculo",
                description: "Paquete de renta",
                name: "Paquete",
                sku: "asas",
                total_amount: amount_to_send,
                quantity: 1,
                unit_price: amount_to_send,
              },
            ],
          },
        },
      }
    };

    //console.log(payload);
    //return { ok: true, message: "test" , status: 203, data: "data" }


    const { data: response } = await axios.post(`${URL}api/process-payments`, payload);
    if( response?.data?.status === "approved" || response?.data?.status === "accredited"){
      //console.log(response.data, "_________________10002!!!")
      const dataPago = response.data

      dataPago.reservation_id = reservation_info.data.reservation_detail.id
      dataPago.status_details = JSON.stringify(dataPago.status_details)
      dataPago.sub_payments = JSON.stringify(dataPago.sub_payments)
      dataPago.date = JSON.stringify(dataPago.date).replace("T", " ").replace("Z", "").replace(/"/g, "")
      dataPago.fraud_detection = JSON.stringify(dataPago.fraud_detection)
      dataPago.amount = dataPago.amount/100
      dataPago.customer = JSON.stringify(dataPago?.customer)
      dataPago.confirmed = JSON.stringify(dataPago?.confirmed)

      //remmover el tid de dataPago
      // delete dataPago.tid
      // delete dataPago.emv_issuer_data

      const DataToSend: PaymentData = {
        reservation_id: dataPago?.reservation_id,
        id: dataPago?.id,
        status_details: dataPago?.status_details,
        sub_payments: dataPago?.sub_payments,
        date: dataPago?.date,
        fraud_detection: dataPago?.fraud_detection,
        amount: dataPago?.amount,
        customer: dataPago?.customer,
        site_transaction_id: dataPago?.site_transaction_id,
        payment_method_id: dataPago?.payment_method_id,
        card_brand: dataPago?.card_brand,
        currency: dataPago?.currency,
        status: dataPago?.status,
        payment_mode: dataPago?.payment_mode,
        bin: dataPago?.bin,
        installments: dataPago?.installments,
        first_installment_expiration_date: dataPago?.first_installment_expiration_date,
        payment_type: dataPago?.payment_type,
        site_id: dataPago?.site_id,
        aggregate_data: dataPago?.aggregate_data || null, //dataPago.aggregate_data, // no viene en la respuesta
        establishment_name: dataPago?.establishment_name || "Movil Renta",
        spv: dataPago?.spv || null, //dataPago.spv, // no viene en la respuesta
        confirmed: dataPago?.confirmed || null, //dataPago.confirmed, // no viene en la respuesta
        pan: dataPago?.pan || null, //dataPago.pan, // no viene en la respuesta
        customer_token: dataPago?.customer_token || null, //dataPago.customer_token, // no viene en la respuesta
        card_data: dataPago?.card_data || null, //dataPago.card_data, // no viene en la respuesta
        token: dataPago?.token || null, //dataPago.token, // no viene en la respuesta
        authenticated_token: dataPago?.authenticated_token || null, //dataPago.authenticated_token, // no viene en la respuesta
        tid: dataPago?.tid || null, //dataPago.tid, // no viene en la respuesta
        emv_issuer_data: dataPago?.emv_issuer_data || null, //dataPago.emv_issuer_data, // no viene en la respuesta
      }

      //console.log(dataPago, "dataPago ___________________");
      //await axios.post(`${BACK}payments`, dataPago);
      await axios.post(`${BACK}payments`, DataToSend);

    }
    //console.log(response, "___________")
    return { ok: response.ok, message: response.message , status: response.status, data: response.data }
  } catch (error) {
    console.log(error,"________________2");
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      // return { ok: data.ok, message: data.message , status: data.status, data: data.data }

      return { ok: false, message: "Hubo un problema al intentar realizar el pago1", status: 403 }
    }
    return { ok: false, message: "Hubo un problema al intentar realizar el pago2", status: 403 }
  }
}

    //const { card_holder_birthday, payment_method_id, card_holder_door_number, installments, ...rest } = resultParse.data;
    //const puertaNumber = +(card_holder_door_number);
    //const dateTransform = card_holder_birthday.replace(/\//g, "")

    //const deviceUniqueIdentifier = crypto.randomUUID();
    // const { data } = await axios.post(`${URL}api/token`,
    //   {
    //     card_holder_birthday: dateTransform,
    //     card_holder_door_number: puertaNumber,
    //     fraud_detection: {
    //       device_unique_identifier: deviceUniqueIdentifier,
    //     },
    //     ...rest
    //   });
    
    //const { response } : { response: ResponseDataToken } = data;

//     if (response.status !== "active") {
//       return { ok: false, message: "Problemas al realizar el pago", status: 405}
//     }

//     const body = {
//       site_transaction_id: code,
//       token: response.id,
//       payment_method_id: +(values.payment_method_id),
//       bin: response.bin,
//       amount: Math.floor(+(price_car*dias))+amount_aditionals,
//       currency: "ARS",
//       installments: +(installments),
//       payment_type: "single",
//       sub_payments: []
//     }

//     const responseEx = await executedPayment(body, reserva_id);

//     //console.log(responseEx, "REsPONSE EXX");

//     if (!responseEx?.ok) {
//       console.log(responseEx);
//       if (responseEx?.status === 402) {
//         if (responseEx?.data?.error?.status === "rejected") {
//           const dataPago = responseEx.data.error
//           dataPago.reservation_id = reserva_id
//           dataPago.status_details = JSON.stringify(dataPago.status_details)
//           dataPago.sub_payments = JSON.stringify(dataPago.sub_payments)
//           dataPago.date = JSON.stringify(dataPago.date).replace("T", " ").replace("Z", "").replace(/"/g, "")
//           dataPago.fraud_detection = JSON.stringify(dataPago.fraud_detection)
//           delete dataPago.authenticated_token
//           //console.log(dataPago, "DATAPAGO");
//           try {
//             const { data } = await axios.post(`${BACK}payments`, dataPago);
//             console.log(data, "__________data")
//           } catch (error: any) {
//             console.log(error, "_____________1")
//             console.log(error.response.data.error, "VEAMOS");
//             if (error instanceof AxiosError) {
//               console.log(error, "_____________4");
//               return {
//                 ok: false,
//                 message: error.message,
//                 data: null
//               }
//             }
//           }
//         return {
//           ok: false,
//           message: "Tarjeta rechazada",
//           status: 402
//         }
//       }
//       return {
//         ok: false,
//         message: responseEx,
//         status: 402
//       }
//     }
//     console.log(responseEx, "___________________XXX");
//       // TODO ---> Ver aqui
//     return {
//       ok: true,
//       message: responseEx?.message,
//       data: responseEx?.data
//     }
//     }
//     return {
//       ok: true,
//       message: responseEx?.message,
//       data: responseEx?.data
//     }
//   } catch (error) {
//     console.log("_4");
//     console.log(error)
//     return {
//       ok: false,
//       message: "Internal Server Error - 500"
//     }
//   }
// };

// const executedPayment = async (values: RequestExecutedPay, reserva_id: number) => {
//   try {
//     const { data } = await axios.post<ResponseExecutedPay>(`${URL}api/payments`, values);
//     if (data.response.status === "pre_approved") {
//       const body = {
//         id: data.response.id,
//         site_transaction_id: data.response.site_transaction_id,
//         token: data.response.token,
//         payment_method_id: data.response.payment_method_id,
//         bin: data.response.bin,
//         amount: data.response.amount,
//         currency: data.response.currency,
//         installments: data.response.installments,
//         payment_type: data.response.payment_type,
//         site_id: data.response.site_id,
//         sub_payments: data.response.sub_payments
//       }
//       try {
//         const { data } = await axios.put<ResponseExecutedPay>(`${URL}api/pre-to-app`, body);     
//         if (data?.response?.status === "approved"){

//           console.log("GO to save payment PRE APPROBVED to Aproved");
//           const dataPago = data.response
//           dataPago.reservation_id = reserva_id
//           dataPago.status_details = JSON.stringify(dataPago.status_details)
//           dataPago.sub_payments = JSON.stringify(dataPago.sub_payments)
//           dataPago.date = JSON.stringify(dataPago.date).replace("T", " ").replace("Z", "").replace(/"/g, "")
//           dataPago.confirmed = null
//           //data.response.status === "rejected" ? data.response.fraud_detection = JSON.stringify(data.response.fraud_detection) : null
//           delete dataPago.authenticated_token
//           //console.log(dataPago, "DATAPAGO");
//           try {
//             const { data } = await axios.post(`${BACK}payments`, dataPago);
//             console.log(data, "respuesta del pre aprobado a aprobado desde el back------ 104");
//           } catch (error: any) {
//             if (error instanceof AxiosError) {
//               console.log(error, "_____________4");
//               return {
//                 ok: false,
//                 message: error.message,
//                 data: null
//               }
//             }
//           }
//           return {
//             ok: true,
//             message: data.response.status === "approved" ? "Pago realizado con exito" : "Pago pendiente",
//             data: dataPago
//           }
//         }
//       } catch (error: any) {
//         console.log(error, "_____________ERROR DEL PRE TO APP");
//         console.log(error.response.data.error, "ERRROORRRR PRE APROBED")
//         if (error instanceof AxiosError) {
//           console.log(error, "_____________90________");
//           return {
//             ok: false,
//             message: error.message,
//             data: null
//           }
//         }
//       }
      
      
//     }
//     if (data.response.status === "approved" || data.response.status === "rejected") {
//       console.log("GO to save payment");
//       const dataPago = data.response
//       dataPago.reservation_id = reserva_id
//       dataPago.status_details = JSON.stringify(dataPago.status_details)
//       dataPago.sub_payments = JSON.stringify(dataPago.sub_payments)
//       dataPago.date = JSON.stringify(dataPago.date).replace("T", " ").replace("Z", "").replace(/"/g, "")
//       data.response.status === "rejected" ? data.response.fraud_detection = JSON.stringify(data.response.fraud_detection) : null
//       delete dataPago.authenticated_token
//       //console.log(dataPago, "DATAPAGO");
//       try {
//         const { data } = await axios.post(`${BACK}payments`, dataPago);
        
//       } catch (error: any) {
//         if (error instanceof AxiosError) {
//           console.log(error, "_____________4");
//           return {
//             ok: false,
//             message: error.message,
//             data: null
//           }
//         }
//       }
//       return {
//         ok: true,
//         message: data.response.status === "approved" ? "Pago realizado con exito" : "Pago pendiente",
//         data: dataPago
//       }
//     }
    
   
//     return {
//       ok: false,
//       message: "Hubo un problema al realizar el pago - error 103",
//       data: null
//     }
//   } catch (error: any) {
//     console.log(error, "_______________________1________________________");
//     console.log(error.response.data.error, "_____2");
//     console.log(error.response.data.error, "executedPayment")
//     console.log("ERRRRRRANDO");
//     if (error instanceof AxiosError) {
//       console.log("_5");
//       console.log(error, "_______3"); // pasa por aqui, es una instancia de axios
//       return {
//         ok: false,
//         message: error.message,
//         data: error.response?.data,
//         status: error.response?.status
//       }
//     }
//     console.log("EROORER ________________");
//     return {
//       ok: false,
//       message: "Pago efectuado pero denegado",
//       data: null
//     }
//   }
// }

// /*
//  response: {
//     id: 14250759,
//     site_transaction_id: 'LBC009ZHY',
//     payment_method_id: 1,
//     card_brand: 'Visa',
//     amount: 715670,
//     currency: 'ars',
//     status: 'pre_approved',
//     status_details: {
//       ticket: '9215',
//       card_authorization_code: '180836',
//       address_validation_code: 'VTE0011',
//       error: null
//     },
//     date: '2024-12-20T18:08Z',
//     payment_mode: null,
//     customer: null,
//     bin: '450799',
//     installments: 1,
//     first_installment_expiration_date: null,
//     payment_type: 'single',
//     sub_payments: [],
//     site_id: '28464383',
//     fraud_detection: null,
//     aggregate_data: null,
//     establishment_name: null,
//     spv: null,
//     confirmed: null,
//     pan: null,
//     customer_token: null,
//     card_data: '/tokens/14250759',
//     token: 'f02b932c-eacc-4812-ac4d-8b68bd114afb',
//     authenticated_token: null
//   }
// }
// 