//import { csmdds } from "@/constant/csmmd";
import { ResponseExecutedPay } from "@/types/payway-form.schema";
import axios from "axios";
import { NextResponse } from "next/server";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;

export async function POST(request: Request) {
  const {solicitud, ejecucion} = await request.json()

  try {
    const { data } = await axios.post(`${URL}api/token`, solicitud);
    ejecucion.token = data.response.id

    const respExc: any = await axios.post(`${URL}api/payments`,ejecucion);
//
    if (respExc?.data?.response?.status === "pre_approved") {
      const body = {
        id: respExc.data.response.id,
        site_transaction_id: respExc.data.response.site_transaction_id,
        token: respExc.data.response.token,
        payment_method_id: respExc.data.response.payment_method_id,
        bin: respExc.data.response.bin,
        amount: respExc.data.response.amount,
        currency: respExc.data.response.currency,
        installments: respExc.data.response.installments,
        payment_type: respExc.data.response.payment_type,
        site_id: respExc.data.response.site_id,
        sub_payments: respExc.data.response.sub_payments
      }
      try {
        const { data } = await axios.put<ResponseExecutedPay>(`${URL}api/pre-to-app`, body);
        return NextResponse.json({ 
          ok: true, 
          message: "Transacción exitosa", 
          data: data.response, 
          status: 201 })
      } catch (error) {
        return NextResponse.json({
          ok: false,
          message: "Transacción en estado pre aprobada",
          data: error,
          status: 500,
        });
      }
    }

    return NextResponse.json({ 
      ok: true, 
      message: "Transacción exitosa", 
      data: respExc.data, 
      status: 201 })

  } catch (error) {
    return NextResponse.json({
      ok: false,
      message: "Internal Server",
      data: error,
      status: 500,
    });
  }
}
