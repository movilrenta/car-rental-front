import { z } from "zod";

//TODO: regex permiten string de numeros del 01 al 12 para el mes, y del 00 al 99 para el año.
const regexMonth = /^(0[1-9]|1[0-2])$/;
const regexYear = /^\d{2}$/;
const regexSecCode = /^\d{3}$/;
const regexHoldBday = /^\d{2}\/\d{2}\/\d{4}$/;

export const formSchema = z.object({
  card_number: z
    .string()
    .min(16, "El número de su tarjeta no puede tener menos de 16 digitos"),
  card_expiration_month: z
    .string()
    .min(2, "El mes de expiracion debe tener 2 digitos")
    .max(2, "El mes de expiracion no debe tener más de 2 digitos")
    .regex(regexMonth, "El mes no puede ser menor a 01 ni mayor a 12"),
  card_expiration_year: z
    .string()
    .min(2, "El año de expiracion debe tener 2 digitos")
    .max(2, "El año de expiracion no debe tener más de 2 digitos")
    .regex(regexYear, "El año debe ser un número de 2 digitos"),
  security_code: z
    .string()
    .min(3, "El codigo de seguridad no puede ser menor a 3 digitos")
    .max(4, "El códgo de seguridad no puede ser mayor a 4 digitos")
    .regex(
      regexSecCode,
      "El código de seguridad debe ser un número de 3 digitos"
    ),
  card_holder_name: z
    .string()
    .min(4, "El nombre debe contener al menos 4 caracteres")
    .max(30, "El nombre es demasiado extenso"),
  card_holder_birthday: z
    .string()
    .regex(regexHoldBday, "La fecha debe estar en formato DD/MM/YYYY")
    .refine(
      (value) => {
        const [day, month, year] = value.split("/").map(Number);
        return (
          day >= 1 &&
          day <= 31 &&
          month >= 1 &&
          month <= 12 &&
          year >= 1000 &&
          year <= 9999
        );
      },
      { message: "La fecha no es válida" }
    ),
  card_holder_door_number: z.coerce
    .number()
    .positive({ message: "El número debe ser positivo" })
    .int({ message: "Solo pueden ser números enteros" }),
  card_holder_identification: z.object({
    type: z.enum(["DNI", "LE", "LC"]).default("DNI"),
    number: z
      .string()
      .min(7, "El nombre debe contener al menos 7 caracteres")
      .max(10, "El DNI es demasiado extenso"),
  }),
  payment_method_id: z.string(),
  street_address:z.string().optional()
});

export interface ResponseDataToken {
  response: {
    id: string;
    status: string;
    card_number_length: number;
    date_created: string;
    bin: string;
    last_four_digits: string;
    security_code_length: number;
    expiration_month: number;
    expiration_year: number;
    date_due: string;
    cardholder: Cardholder;
  };
}

export interface Cardholder {
  identification: Identification;
  name: string;
  birthday: string;
  nro_puerta: number;
}

export interface Identification {
  type: string;
  number: string;
}
export interface RequestExecutedPay {
  site_transaction_id: string;
  token: string;
  payment_method_id: number;
  bin: string;
  amount: number;
  currency: string;
  installments: number;
  payment_type: string;
  sub_payments: any[];
}
export interface ResponseExecutedPay {
  response: {
    id: number;
    site_transaction_id: string;
    payment_method_id: number;
    card_brand: string;
    amount: number;
    currency: string;
    status: string;
    status_details: StatusDetails;
    date: string;
    payment_mode: null;
    customer: null;
    bin: string;
    installments: number;
    first_installment_expiration_date: null;
    payment_type: string;
    sub_payments: any[];
    site_id: string;
    fraud_detection: null;
    aggregate_data: null;
    establishment_name: null;
    spv: null;
    confirmed: null;
    pan: null;
    customer_token: null;
    card_data: string;
    token: string;
  };
}

export interface StatusDetails {
  ticket: string;
  card_authorization_code: string;
  address_validation_code: string;
  error: null;
}

export interface PaymentMethods {
  idmediopago: string;
  descripcion: string;
  moneda: string,
  tarjeta: string;
}