import { csmdds } from "@/constant/csmmd";
import { ResponseDataToken } from "@/types/payway-form.schema";
import axios, { AxiosError } from "axios";
import { NextResponse, NextRequest } from "next/server";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;

export async function POST(request: Request) {
  const deviceUniqueIdentifier = crypto.randomUUID();

  // console.log(deviceUniqueIdentifier);
  try {
    const body = {
      card_number: "4507990000004905",
      card_expiration_month: "12",
      card_expiration_year: "30",
      card_holder_name: "John Doe",
      card_holder_birthday: "07051964",
      card_holder_door_number: 2473,
      security_code: "123",
      card_holder_identification: {
        type: "DNI",
        number: "25123456",
      },
      fraud_detection: {
        device_unique_identifier: deviceUniqueIdentifier,
      }
    };

    const response = await axios.post(`${URL}api/token`, body);
    if (!response)
      return NextResponse.json({
        ok: false,
        message: "Error al obtener token",
      });

    const token: ResponseDataToken = response.data;

    //!Generado con crypto()
    const respExecutedPayment = {
      // customer: {
      //   id: "id_cliente",
      //   email: "cliente@decidir.com",
      //   ip_address: "245.160.47.153",
      // },
      site_transaction_id: "TEST17",
      token: token.response.id,
      establishment_name: "Movil Renta",
      payment_method_id: 1,
      bin: "450799",
      amount: 2000,
      currency: "ARS",
      installments: 1,
      payment_type: "single",
      sub_payments: [],
      fraud_detection: {
        send_to_cs: true,
        channel: "Web/Mobile",
        bill_to: {
          city: "Buenos Aires",
          country: "AR",
          customer_id: "0001",
          email: "accept@decidir.com.ar",
          first_name: "martin",
          last_name: "paoletta",
          phone_number: "1547766329",
          postal_code: "1427",
          state: "BA",
          street1: "GARCIA DEL RIO 4041",
        },
        purchase_totals: { currency: "ARS", amount: 2000 },
        // customer_in_site: { date_of_birth: "129412", street: "RIO 4041" },
        retail_transaction_data: {
          ship_to: {//TODO datos de la empresa
            city: "Buenos Aires",
            country: "AR",
            customer_id: "0001",
            email: "accept@decidir.com.ar",
            first_name: "martin",
            last_name: "paoletta",
            phone_number: "1547766329",
            postal_code: "1427",
            state: "BA",
            street1: "GARCIA DEL RIO 4041",
          },
          dispatch_method: "movilrenta",
          items: [
            {
              code: "codigoProducto1",
              description: "Descripcion condicional del producto",
              name: "nombre del producto",
              sku: "asas",
              total_amount: 2000,
              quantity: 1,
              unit_price: 2000,
            },
          ],
        },
      },
      // csmdds: csmdds,
    };

    const respExc = await axios.post(
      `${URL}api/payments`,
      respExecutedPayment
    );
    if (!respExc)
      return NextResponse.json({
        ok: false,
        message: "Error al ejecutar el pago",
      });

    return NextResponse.json({data: respExc.data.response, status: respExc.status})

    // return NextResponse.json({ message: "ip obtenida" });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json({
        error: error.response?.data,
        status: error.status,
      });
    }
    return NextResponse.json({
      ok: false,
      message: "Internal Server",
      status: 500,
    });
  }
}
