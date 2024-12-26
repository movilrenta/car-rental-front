"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { formSchema, PaymentMethods } from "@/types/payway-form.schema";
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
import { calcularDiasEntreFechas2 } from "@/components/utils/utils";
import { getPaymentMethods, getTokenPay } from "@/actions";
import { useRouter } from "next/navigation";
import { LuLoader } from "react-icons/lu";

export default function PayForm({aditionals} : {aditionals: any[]}) {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(true);
  const [paymentsMethods, setPaymentsMethods] = useState<PaymentMethods[]>();
  const reserva = useReservaStore((state) => state.getReserva())

  const { toast } = useToast();
  
  const payMethods = async () => {
    const resp = await getPaymentMethods();
    setPaymentsMethods(resp.data);
  };
  useEffect(() => {
    payMethods();
    setLoader(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      card_number: "",
      card_expiration_month: "",
      card_expiration_year: "",
      security_code: "",
      card_holder_birthday: "",
      card_holder_door_number: "",
      card_holder_name: "",
      card_holder_identification: {
        type: "DNI",
        number: "",
      },
      payment_method_id: "",
      street_address:"",
      installments: "1"
    },
  });
  const days = calcularDiasEntreFechas2(reserva?.startDay!, reserva?.endDay!)

  const showAccesorios = (): number => {
    let amount_aditionals = 0;
    reserva?.aditionals_array.map((aditional) => {
      const adicional = aditionals.find((item: any) => item.id === aditional.id);
      if (adicional) {
        amount_aditionals = amount_aditionals + (Number(adicional.price) * days);
      }
    });
    return amount_aditionals
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const code = sessionStorage.getItem("movil_renta_code");
    const reserva_id = sessionStorage.getItem("movil_renta_reservation_id")
    const number_reserva_id = Number(reserva_id)
    const amount_aditionals = showAccesorios()
    if (!code) {
      toast({
        variant: "destructive",
        title: "No se encontro el codigo de la reserva",
      });
      return;
    }
    const {street_address,...rest} = values
    try {
      const resp = await getTokenPay(rest, code!, number_reserva_id, reserva?.car?.group_id!, days, amount_aditionals);
      console.log(resp);
    if (!resp?.ok) {
      toast({
        variant: "default",
        title: `${resp?.message}`,
      });
      // setTimeout( () => {
      //   router.replace("/");
      // }, 2000)
    } else {
      // await saveCard(values);

      toast({
        variant: "default",
        title: `${resp.message}`,
      });
      router.replace("/reservas/gracias");
      //form.reset();
    }
    } catch (error) {
      console.log(error, "ERROR---->");
    }

  };
  return (
    <main>
      <BannerPage title="Realizar el pago" image="/images2/carBanner.webp"/>

      <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
        <div className="bg-white min-h-[755px] dark:bg-gray-800 px-8 pb-6 rounded-b-xl shadow-sm">
          {/* Card header */}
          <div className="text-center mb-6">
            {/* <div className="mb-2">
              <Image
                className="-mt-8 inline-flex rounded-full"
                src={User}
                width={64}
                height={64}
                alt="User"
              />
            </div> */}
            <h1 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-semibold mb-2 pt-4">
              Movil Renta
            </h1>
            <div className="text-sm">
             Por favor complete los siguientes datos del formulario de pago para finalizar su reserva.
            </div>
          </div>
          {!loader && <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              {/* Payments Methods */}
              {loader ? (
                <div className="w-full flex flex-col gap-2">
                  <p className="h-4 animate-pulse bg-slate-200 rounded-md"></p>
                  <div className="w-full h-10 animate-pulse bg-slate-200 rounded-md"></div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="payment_method_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seleccione un medio de pago</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione su tarjeta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentsMethods?.sort((a, b) => a.descripcion.localeCompare(b.descripcion)).map((item, index) => (
                            !item.tarjeta.includes("Test") && <div
                              key={index}
                              className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100"
                            >
                              <FaCreditCard size={20} className="text-slate-700"/>
                              <SelectItem value={item.idmediopago}>
                                {item.descripcion.length < 2 ? item.tarjeta : item.descripcion}
                              </SelectItem>
                            </div>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </FormItem>
                  )}
                />
              )}
              {/* Card Number */}
              <FormField
                control={form.control}
                name="card_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1">
                      Número de la tarjeta{" "}
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
                      <FormLabel className="block text-sm font-medium mb-1">
                        Mes
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
                      <FormLabel className="block text-sm font-medium mb-1">
                        Año
                        <span className="text-red-500"> *</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="form-input w-full"
                          type="text"
                          placeholder="AA"
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
                      <FormLabel className="block text-sm font-medium mb-1">
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
              {/* Birthday*/}
              <FormField
                  control={form.control}
                  name="installments"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium mb-1">
                        Cantidad de cuotas
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Cantidad de cuotas" defaultValue={"1"}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-200 text-zinc-700">
                          <SelectItem className="hover:bg-zinc-700 hover:text-white" value="1">1 cuota s/int</SelectItem>
                          <SelectItem className="hover:bg-zinc-700 hover:text-white" value="2">2 cuotas s/int</SelectItem>
                          <SelectItem className="hover:bg-zinc-700 hover:text-white" value="3">3 cuotas s/int</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="card_holder_birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1">
                      Fecha de nacimiento
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="form-input w-full"
                        type="text"
                        maxLength={10}
                        placeholder="DD/MM/AAAA"
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
              <FormField
                control={form.control}
                name="card_holder_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1">
                      Nombre y Apellido
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="form-input w-full"
                        type="text"
                        placeholder="José Perez"
                        maxLength={36}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="street_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1">
                      Dirección
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="form-input w-full"
                        type="text"
                        placeholder="Calle"
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
                  <FormItem>
                    <FormLabel className="block text-sm font-medium mb-1">
                      Altura
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="form-input w-full"
                        type="text"
                        placeholder="123"
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
              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="card_holder_identification.type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="block text-sm font-medium mb-1">
                        Tipo
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
                      <FormLabel className="block text-sm font-medium mb-1">
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
              {/* htmlForm footer */}
              <div className="mt-6">
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className={clsx(
                    "btn w-full bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white",
                    {
                      "bg-gray-900/60": form.formState.isSubmitting,
                      "bg-gray-900": !form.formState.isSubmitting,
                    }
                  )}
                >
                  {form.formState.isSubmitting 
                    ?<LuLoader className="mr-2 h-4 w-4 animate-spin" />
                    : "Pagar"}
                </Button>
              </div>
            </form>
          </Form>}
        </div>
      </div>
    </main>
  );
}
