"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { formSchema, PaymentsFormValues } from "@/types/payway-form.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import clsx from "clsx";
import { FaCreditCard } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import BannerPage from "@/view/banner-page";
import { useReservaStore } from "@/stores/reservas/reserva.store";
import { getTokenPay, sendEmail } from "@/actions";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";
import { statesCodes } from "@/constant/states-codes";
import { CARDS } from "@/constant/cards";
import { getReservaPrice } from "../confirmar/calculate-price";
import { useFormatNumber } from "@/components/utils/useFormatterNumber";
import PayWay from "./test/payway";
import { useTranslations } from "next-intl";
import axios from "axios";
import { createPDF } from "@/app/[locale]/test/handler-send-pdf";
import { PDFInfoType } from "@/types/pdf";

export default function PayForm() {
  const router = useRouter();
  const t = useTranslations("PaymentsPage");
  const validationMessages = useTranslations("PaymentsPage.form.validations");
  const [totales, setTotales] = useState<any>(null);
  const [isClient, setIsClient] = useState<boolean>(false);
  // const [paymentsMethods, setPaymentsMethods] = useState<PaymentMethods[]>(CARDS);
  const paymentsMethods = CARDS;
  const reserva = useReservaStore((state) => state.getReserva());
  const userDataEmail = JSON.parse(
    sessionStorage.getItem("movil_renta_user_data_mail") as string
  );

  const { toast } = useToast();

  const form = useForm<PaymentsFormValues>({
    resolver: zodResolver(formSchema(validationMessages)),
    defaultValues: {
      card_number: "",
      card_expiration_month: "",
      card_expiration_year: "",
      security_code: "",
      card_holder_birthday: "",
      card_holder_door_number: "",
      card_holder_identification: {
        type: "DNI",
        number: "",
      },
      payment_method_id: "",
      installments: "1",
      bill_to: {
        city: "",
        country: "AR",
        customer_id: "xxxxx",
        first_name: "",
        last_name: "",
        postal_code: "",
        state: "",
        street1: "",
      },
    },
  });

  useEffect(() => {
    if (reserva?.startDay && reserva?.endDay) consulta();
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col justify-start items-center h-screen min-w-full">
        <div className="animate-spin rounded-full h-28 w-28 border-b-2 border-gray-900 mt-52 my-4"></div>
        <div>{t("loading")}</div>
      </div>
    );
  }

  async function consulta() {
    const datos = await getReservaPrice(reserva);
    setTotales(datos);
    setIsClient(true);
    return datos;
  }

  const onSubmit = async (values: PaymentsFormValues) => {
    const code = sessionStorage.getItem("movil_renta_code");
    const reserva_id = sessionStorage.getItem("movil_renta_reservation_id");
    const number_reserva_id = Number(reserva_id);
    //const amount_aditionals = showAccesorios();
    const amount_aditionals = totales?.totalAdicionales;
    const dropOff = totales?.totalDropOff;
    const obj_pay = {
      values,
      code: code!,
      number_reserva_id,
      id: reserva?.car?.group_id!,
      days: totales?.days,

      amount_aditionals,
      dropOff,
    };
    await axios.post("/api/lock-car", obj_pay);
    if (!code) {
      toast({
        variant: "destructive",
        title: "No se encontro el codigo de la reserva",
      });
      return;
    }
    values.bill_to.street1 = values.bill_to.street1 + " 4041";
    try {
      const resp = await getTokenPay(
        values,
        code!,
        number_reserva_id,
        reserva?.car?.group_id!,
        totales?.days,
        //days,
        amount_aditionals,
        dropOff
      );
      //console.log(resp, "resp-113");
      if (!resp?.ok) {
        toast({
          variant: "default",
          title: t("form.toast"),
          description: `${resp?.message}`,
        });
      } else {
        const hoy = new Date();
        const fechaFormateada = hoy.toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        const methodPay = paymentsMethods?.filter(
          (method) => method.idmediopago === values?.payment_method_id
        )[0]?.descripcion;
        //console.log(fechaFormateada); // Ejemplo: "17/05/2025"
        const PDFInfo: PDFInfoType = {
          numeroFactura: number_reserva_id,
          cliente: userDataEmail.firstName,
          direccion: userDataEmail.address,
          fecha: fechaFormateada, //
          monto: totales.totalCompleto, //
          montoTexto: "", //
          formaPago: methodPay,
          detalles: userDataEmail.details,
          codigoVenta: code,
        };

        const creationPDF = await createPDF(PDFInfo);
        const respEmail = await sendEmail(
          {
            userEmail: userDataEmail.userEmail as string,
            firstName: userDataEmail.firstName as string,
            code,
          },
          creationPDF
        );
        //console.log(respEmail, "respEmail 126");
        if (respEmail.success) {
          toast({
            variant: "default",
            title: t("sendEmail.success.title"),
            description: t("sendEmail.success.description"),
          });
        } else {
          toast({
            variant: "default",
            title: t("sendEmail.error.title"),
            description:
              t("sendEmail.error.description") + ` Code: ${respEmail.status}`,
          });
        }
        router.replace("/reservas/gracias");
        //form.reset();
      }
    } catch (error) {
      console.log(error, "ERROR---->");
    }
  };
  return (
    <main>
      <BannerPage title={t("banner")} image="/images2/carBanner.webp" />
      <div className="relative px-4 sm:px-6 lg:px-8 py-6 max-w-lg mx-auto">
        <div className="bg-white min-h-[755px] dark:bg-gray-800 px-8 pb-6 rounded-md shadow-sm">
          <div className="text-center mb-6">
            <h1 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-semibold mb-2 pt-4">
              Movil Renta
            </h1>
            <div className="text-sm">
              {t("subtitle")}
              <span className="font-bold"> {t("subtitle1")}</span>
              {t("subtitle2")}
            </div>
            <div className="text-sm px-2 w-full mx-auto pt-3">
              <div className="font-semibold text-base dark:text-gray-200">
                {t("resume")}
              </div>
              {totales?.totalAuto && (
                <div className="flex justify-between text-start">
                  <span>{t("vehicle")}</span>
                  <span> {useFormatNumber(totales.totalAuto)} ARS</span>
                </div>
              )}
              {totales?.totalAdicionales > 0 && (
                <div className="flex justify-between text-start">
                  <span>{t("additional")}</span>
                  <span> {useFormatNumber(totales.totalAdicionales)} ARS</span>
                </div>
              )}
              {totales?.totalDropOff > 0 && (
                <div className="flex justify-between text-start">
                  <span>{t("dropoff")}</span>
                  <span> {useFormatNumber(totales.totalDropOff)} ARS</span>
                </div>
              )}
              {totales?.totalCompleto && (
                <div className="flex justify-between text-start border-t font-bold">
                  <span>Total</span>
                  <span> {useFormatNumber(totales.totalCompleto)} ARS</span>
                </div>
              )}
            </div>
          </div>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Payments Methods */}
              <FormField
                control={form.control}
                name="payment_method_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium -mb-2">
                      {t("form.payMethod")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("form.pickCard")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {paymentsMethods
                          ?.sort((a, b) =>
                            a.descripcion.localeCompare(b.descripcion)
                          )
                          .map(
                            (item, index) =>
                              !item.tarjeta.includes("Test") && (
                                <div
                                  key={index}
                                  className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100"
                                >
                                  <FaCreditCard
                                    size={20}
                                    className="text-slate-700"
                                  />
                                  <SelectItem value={item.idmediopago}>
                                    {item.descripcion.length < 2
                                      ? item.tarjeta
                                      : item.descripcion}
                                  </SelectItem>
                                </div>
                              )
                          )}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                  </FormItem>
                )}
              />

              {/* Card Number */}
              <FormField
                control={form.control}
                name="card_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium -mb-2">
                      {t("form.cardNumber")}
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="form-input w-full"
                        type="text"
                        maxLength={16}
                        placeholder="1234 1234 1234 1234"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                  </FormItem>
                )}
              />
              {/* Expiry and CVC */}
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="card_expiration_month"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.cardMonth")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="MM"
                          maxLength={2}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={field.value}
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                            field.onChange(input); // Actualiza el estado del campo
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
                {/* Expiry and CVC */}
                <FormField
                  control={form.control}
                  name="card_expiration_year"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.cardYear")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder={t("form.cardYearPlaceholder")}
                          maxLength={2}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={field.value}
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                            field.onChange(input); // Actualiza el estado del campo
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="security_code"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        CVC
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="123"
                          maxLength={4}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={field.value}
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                            field.onChange(input); // Actualiza el estado del campo
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="card_holder_identification.type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2 line-clamp-1 text-ellipsis">
                        {t("form.documentType")}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white">
                          <SelectItem value="DNI">DNI</SelectItem>
                          <SelectItem value="LE">LE</SelectItem>
                          <SelectItem value="LC">LC</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="card_holder_identification.number"
                  render={({ field }) => (
                    <FormItem className="flex-2">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        N°
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="12345678"
                          maxLength={10}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={field.value}
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                            field.onChange(input); // Actualiza el estado del campo
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="card_holder_birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium -mb-2">
                      {t("form.birthday")}
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="form-input w-full"
                        type="text"
                        maxLength={10}
                        placeholder={t("form.birthdayFormat")}
                        pattern="\d{2}/\d{2}/\d{4}"
                        value={field.value}
                        onChange={(e) => {
                          const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                          const formatted = input
                            .replace(/^(\d{2})(\d{2})/, "$1/$2") // Añade la primera barra
                            .replace(/(\d{2}\/\d{2})(\d+)/, "$1/$2"); // Añade la segunda barra
                          field.onChange(formatted); // Actualiza el estado del campo
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                  </FormItem>
                )}
              />
              {/* Name on Card */}
              <div className="flex flex-col md:flex-row md:space-x-4 gap-4 md:gap-0">
                <FormField
                  control={form.control}
                  name="bill_to.first_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.firstName")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="José"
                          maxLength={30}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bill_to.last_name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.lastName")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="Perez"
                          maxLength={30}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Birthday*/}
              <FormField
                control={form.control}
                name="installments"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="block text-sm font-medium -mb-2">
                      {t("form.installments")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("form.installments")}
                            defaultValue={"1"}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-200 text-zinc-700">
                        <SelectItem
                          className="hover:bg-zinc-700 hover:text-white"
                          value="1"
                        >
                          1 {t("form.installment1")} $
                          {useFormatNumber(totales?.totalCompleto)} ARS
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-zinc-700 hover:text-white"
                          value="13"
                        >
                          3 {t("form.installment2")} $
                          {useFormatNumber(totales?.totalCompleto / 3)} ARS
                        </SelectItem>
                        <SelectItem
                          className="hover:bg-zinc-700 hover:text-white"
                          value="16"
                        >
                          6 {t("form.installment2")} $
                          {useFormatNumber(totales?.totalCompleto / 6)} ARS
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bill_to.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium -mb-2">
                      {t("form.state")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("form.stateChose")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statesCodes.map((state) => (
                          <SelectItem value={state.value} key={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col md:flex-row md:space-x-4 gap-4 md:gap-0">
                <FormField
                  control={form.control}
                  name="bill_to.city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.city")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="San Miguel de Tucumán"
                          maxLength={50}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bill_to.postal_code"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.postal")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="4000"
                          maxLength={50}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 gap-4 md:gap-0">
                <FormField
                  control={form.control}
                  name="bill_to.street1"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.address")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="card_holder_door_number"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium -mb-2">
                        {t("form.addressNumber")}
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          maxLength={6}
                          value={field.value}
                          onChange={(e) => {
                            const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                            field.onChange(input); // Actualiza el estado del campo
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
              </div>

              {/* htmlForm footer */}
              <div className="mt-6">
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className={clsx(
                    "btn dark:border-white w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:hover:bg-gray-950",
                    {
                      "bg-gray-900/60": form.formState.isSubmitting,
                      "bg-gray-900": !form.formState.isSubmitting,
                    }
                  )}
                >
                  {form.formState.isSubmitting ? (
                    <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <div className="flex flex-nowrap gap-2 items-center">
                      <span>{t("form.pay")} </span>
                      <PayWay />
                    </div>
                  )}
                </Button>
                <div className="text-center text-xs leading-4 pt-2">
                  {t("form.confirmedLegend")}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
