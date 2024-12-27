"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { LuLoader } from "react-icons/lu";

export default function TESTING() {
  const [isLoading, setIsLoading] = useState(false);
  const deviceUniqueIdentifier = crypto.randomUUID();
  const payload = {
    solicitud: {
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
      },
    },
    ejecucion: {
      site_transaction_id: "TEST24",
      token: "token.id",
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
    }
  };


  async function submitPayment() {
    setIsLoading(true);
    try {
      const {data} = await axios.post("/api/process-payments", payload)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    console.log("PAGANDO");
    setIsLoading(false)
  }
  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <Button className="border p-4" onClick={submitPayment}>{isLoading ? <LuLoader className="w-4 h-4 animate-spin" /> :"Pagar"}</Button>
    </div>
  );
}
