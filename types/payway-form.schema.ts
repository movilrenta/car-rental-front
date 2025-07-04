import { z } from "zod";

//TODO: regex permiten string de numeros del 01 al 12 para el mes, y del 00 al 99 para el año.
const regexMonth = /^(0[1-9]|1[0-2])$/;
const regexYear = /^2[5-9]|[3-9]\d$/;
// const regexYear = /^\d{2}$/;
//const regexSecCode = /^\d{3}$/;
const regexHoldBday = /^\d{2}\/\d{2}\/\d{4}$/;

export const formSchema = (t?: (key: string) => string) => {
  return z.object({
  card_number: z
    .string().trim()
    .min(15, t ? t("cardMin") : "No puede tener menos de 15 digitos")
    .max(18, t ? t("cardMax") : "No puede tener mas de 18 digitos"),
  card_expiration_month: z
    .string().trim()
    .min(2, t ? t("cardMonth") : "2 digitos")
    .max(2, t ? t("cardMonth") : "2 digitos")
    .regex(regexMonth, t ? t("cardMonthTo") : "01 al 12"),
  card_expiration_year: z
    .string().trim()
    .min(2, t ? t("cardMonth") : "2 digitos")
    .max(2, t ? t("cardMonth") : "2 digitos")
    .regex(regexYear, t ? t("cardMonth") : "Verificar"),
  security_code: z.string().trim().min(3, t ? t("securityCode") : "3/4 dígitos").max(4, t ? t("securityCode") : "3/4 dígitos"),
  // .regex(
  //   regexSecCode,
  //   "El código de seguridad debe ser un número de 3 digitos"
  // ),
  card_holder_birthday: z
    .string().trim()
    .regex(regexHoldBday, t ? t("birthdayPlaceholder") : "Formato DD/MM/AAAA")
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
      { message: t ? t("birthday") : "La fecha no es válida" }
    ),
  card_holder_door_number: z
    .string().trim()
    .max(6, t ? t("cardHolderDoorNumber") : "El número de puerta es demasiado extenso"),
  card_holder_identification: z.object({
    type: z.enum(["DNI", "LE", "LC"]).default("DNI"),
    number: z.string().trim().min(7, t ? t("cardHolderIdentificationMin") : "Minimo 7 dígitos").max(10, t ? t("cardHolderIdentificationMax") : "Demasiado extenso"),
  }),
  payment_method_id: z.string().trim().min(1, t ? t("paymentMethod") : "Debe seleccionar un metodo de pago"),
  installments: z.string().trim(),
  bill_to: z.object({
    city: z.string().trim().min(1, t ? t("city") : "Debe seleccionar una ciudad"),
    country: z.string().trim().min(1, "Pais es requerido"),
    customer_id: z.string().trim().min(3, "El campo debe tener al menos 3 caracteres"),
    first_name: z
      .string().trim()
      .min(2, t ? t("firstNameMin") : "El nombre es obligatorio")
      .max(30, t ? t("firstNameMax") : "El nombre es demasiado extenso"),
    last_name: z
      .string().trim()
      .min(2, t ? t("lastNameMin") : "El apellido es obligatorio")
      .max(30, t ? t("lastNameMax") : "El apellido es demasido extenso"),
    postal_code: z
      .string().trim()
      .min(3, t ? t("postalCodeMin") : "El código postal es obligatorio")
      .max(6, t ? t("postalCodeMax") : "El codigo es demasiado extenso"),
    state: z.string().trim().min(1, t ? t("state") : "Debe seleccionar una provincia"),
    street1: z
      .string().trim()
      .min(3, t ? t("addressMin") : "La dirección es obligatoria")
      .max(50, t ? t("addressMax") : "Direccion demasiado extensa"),
    // phone_number: z.string().min(6, "El numero de telefono es obligatorio"),
  }),
})
};

export const formSchemaGetToken = z.object({
  card_number: z
    .string().trim()
    .min(15, "No puede tener menos de 15 digitos")
    .max(18, "No puede tener mas de 18 digitos"),
  card_expiration_month: z
    .string().trim()
    .min(2, "2 digitos")
    .max(2, "2 digitos")
    .regex(regexMonth, "01 a 12"),
  card_expiration_year: z
    .string().trim()
    .min(2, "2 digitos")
    .max(2, "2 digitos")
    .regex(regexYear, "Verificar"),
  security_code: z.string().trim().min(3, "3/4 digitos").max(4, "3/4 digitos"),
  // .regex(
  //   regexSecCode,
  //   "El código de seguridad debe ser un número de 3 digitos"
  // ),
  card_holder_birthday: z
    .string().trim()
    .regex(regexHoldBday, "Formato DD/MM/AAAA")
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
  card_holder_door_number: z
    .string().trim()
    .max(6, "El número de puerta es demasiado extenso"),
  card_holder_identification: z.object({
    type: z.enum(["DNI", "LE", "LC"]).default("DNI"),
    number: z.string().trim().min(7, "Minimo 7 dígitos").max(10, "Demasiado extenso"),
  }),
  payment_method_id: z.string().trim().min(1, "Debe seleccionar un metodo de pago"),
  installments: z.string().trim(),
  bill_to: z.object({
    city: z.string().trim().min(1, "Debe seleccionar una Provincia"),
    country: z.string().trim().min(1, "Pais es requerido"),
    customer_id: z.string().trim().min(3, "El campo debe tener al menos 3 caracteres"),
    first_name: z
      .string().trim()
      .min(2, "El nombre es obligatorio")
      .max(30, "El nombre es demasiado extenso"),
    last_name: z
      .string().trim()
      .min(2, "El apellido es obligatorio")
      .max(30, "El apellido es demasido extenso"),
    postal_code: z
      .string().trim()
      .min(3, "El código postal es obligatorio")
      .max(6, "El codigo es demasiado extenso"),
    state: z.string().trim().min(1, "Debe seleccionar una provincia"),
    street1: z
      .string().trim()
      .min(3, "La dirección es obligatoria")
      .max(50, "Direccion demasiado extensa"),
    // phone_number: z.string().min(6, "El numero de telefono es obligatorio"),
  }),
});

export interface ResponseDataToken {
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
}

export type PaymentsFormValues = z.infer<
  Awaited<ReturnType<typeof formSchema>>
>;

export interface ResponseDataToken {
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
    status_details: StatusDetails | string;
    date: string;
    payment_mode: null;
    customer: null | string;
    bin: string;
    installments: number;
    first_installment_expiration_date: null;
    payment_type: string;
    sub_payments: any[] | string;
    site_id: string;
    fraud_detection: string | null;
    aggregate_data: null;
    establishment_name: null;
    spv: null;
    confirmed: null;
    pan: null;
    customer_token: null;
    card_data: string;
    token: string;
    reservation_id?: number;
    authenticated_token?: any;
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
  moneda: string;
  tarjeta: string;
}
