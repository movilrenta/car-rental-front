"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getReservaSchema, ReservaFormValues } from "@/components/schemas/reservas";
import { useReservaStore } from "@/stores/reservas/reserva.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { Checkbox } from "@/components/checkbox";
import { Textarea } from "@/components/textarea";
import { useToast } from "@/hooks/use-toast";
import { generarCodigoReserva } from "@/components/utils/utils";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { typeDocTranslate } from "@/constant/translated";

type ReservationType = {
  car_id: number;
  code: string;
  start_date: string; //"2024-12-20 15:30",
  end_date: string;
  start_branch_id: number;
  end_branch_id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;

  document_type: "DNI" | "Pasaporte";
  document_number: string;
  license_number: string;
  license_expiration_date: string;
  drivers_address: string;
  drivers_city: string;
  flight_number: string;

  aditionals_array: { id: number; amount: number }[];
  observation?: string;
};

export const FormConfirm = () => {

  const locale = useLocale() as "en" | "es";
  const t = useTranslations("ReservaPage.ConfirmarPage.formConfirm");
  // const validationsSchema = useTranslations("ReservaPage.ConfirmarPage.formConfirm.validations");

  const { toast } = useToast();

  const router = useRouter();
  const reservaGet = useReservaStore((state) => state.getReserva());
  const form = useForm<ReservaFormValues>({
    resolver: zodResolver(getReservaSchema(t)),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      document_type: "DNI",
      document_number: "",
      license_number: "",
      license_expiration_date: "",
      drivers_address: "",
      drivers_city: "",
      flight_number: "",
      observation: "",
      termyCond: false,
      mayor25: false,
      //aditionals_array: []
    },
  });

  const onSubmit = async (values: ReservaFormValues) => {
    const reserveToConfirm: ReservationType = {
      car_id: reservaGet?.car?.id!,
      code: generarCodigoReserva(),
      start_date: `${
        new Date(reservaGet?.startDay!).toISOString().split("T")[0]
      } ${reservaGet?.startTime}`,
      end_date: `${new Date(reservaGet?.endDay!).toISOString().split("T")[0]} ${
        reservaGet?.endTime
      }`,
      start_branch_id: +reservaGet?.startLocation!,
      end_branch_id: +reservaGet?.endLocation!,
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      phone: values.phone,

      document_type: values.document_type,
      document_number: values.document_number,
      license_number: values.license_number,
      license_expiration_date: values.license_expiration_date,
      drivers_address: values.drivers_address,
      drivers_city: values.drivers_city,
      flight_number: values.flight_number || "",

      observation: values?.observation,
      aditionals_array: reservaGet?.aditionals_array || [],
    };

    try {
      const response = await axios.post("/api/reservation", reserveToConfirm);

      if (response.status === 201) {
        const data = response.data.response;
        const dataUserMail = {
          firstName: `${values.firstName} ${values.lastName}`,
          userEmail: values.email,
        };
        sessionStorage.setItem("movil_renta_code", data.code);
        sessionStorage.setItem("movil_renta_reservation_id", data.id);
        sessionStorage.setItem(
          "movil_renta_user_data_mail",
          JSON.stringify(dataUserMail)
        );
        //console.log(sessionStorage.getItem("movil_renta_code"), "ELCODIGO");
        toast({
          variant: "default",
          title: `Reserva creada con exito, realizar el pago para confirmar`,
        });
        router.push("/reservas/payments");
      }
    } catch (error: any) {
      if (error.response) {
        toast({
          variant: "destructive",
          title: `Error al reservar: ${
            error.response.data.response.error ||
            "No se puede reservar el auto."
          }`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ocurrió un error inesperado.",
        });
      }
      return;
    }
  };
  const {
    firstName,
    lastName,
    email,
    phone,
    document_type,
    document_number,
    license_number,
    license_expiration_date,
    drivers_address,
    drivers_city,
    flight_number,
    observation,
    mayor25,
    termyCond,
  } = form.watch();

  const preOnSubmit = () => {};
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-6 gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.name")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    placeholder="Nombre"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="col-span-full md:col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.lastname")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    placeholder="Apellido"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />

        {/* Ingresar formm con select de tipo de dni */}
        <FormField
          control={form.control}
          name="document_type"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.typeDoc")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <select
                    className="w-full p-1 px-3 border rounded-md bg-transparent dark:bg-[rgb(17_24_39_)] text-zinc-500 dark:text-zinc-100 dark:border-zinc-600"
                    {...field}
                  >
                    <option value="DNI">{t("selectors.DNI")}</option>
                    <option value="Pasaporte">{t("selectors.Passport")}</option>
                  </select>
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document_number"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.numberDoc")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.email")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    placeholder="correo.ejemplo@mail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.phone")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    placeholder="3814112233"
                    value={field.value}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                      field.onChange(input); // Actualiza el estado del campo
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="license_number"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.numberLic")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license_expiration_date"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.expLic")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  {/* <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="correo.ejemplo@mail.com" {...field} /> */}
                  <input
                    type="date"
                    className="w-full p-1 ps-3 border rounded-md bg-transparent text-zinc-500 dark:text-zinc-600 dark:border-zinc-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="drivers_address"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.address")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="drivers_city"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.city")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight_number"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.flightNum")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                {t("labels.comments")}
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  {/* <Texta className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="Mi vuelo llega a las 17..." {...field} /> */}
                  <Textarea
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white"
                    placeholder="Mi vuelo llega a las 17:00..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <hr className="col-span-6 w-full h-[2px] my-2 bg-gray-500 dark:bg-slate-100" />
        <div className="col-span-6 flex flex-col gap-1">
          <FormField
            control={form.control}
            name="mayor25"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    required
                    className="border-red-700 text-zinc-800 dark:text-white h-5 w-5"
                  />
                </FormControl>
                <FormLabel className="h-6 p-1 cursor-pointer !m-0 flex items-center">
                  {t("labels.over25")}
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="termyCond"
            render={({ field }) => (
              <FormItem className="flex items-center gap-3 pt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    required
                    className="border-red-700 text-zinc-800 dark:text-white h-5 w-5"
                  />
                </FormControl>
                <FormLabel className="h-6 p-1 cursor-pointer !m-0 flex items-center">
                  {t("labels.acceptTerms")}
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link
            href={"/ayuda/terminos-y-condiciones"}
            target="_blank"
            className="text-sm ps-9 !m-0 text-blue-600"
          >
            {t("buttons.terms")}
          </Link>
        </div>
        <div className="col-span-full text-center"></div>
        <div className="col-span-6 flex flex-col md:flex-row items-center gap-4 mt-2">
          <Link
            href={"/reservas"}
            className="text-red-700 flex-1 font-semibold text-center py-1 dark:text-slate-100 transition-all border-2 border-transparent hover:border-red-700 rounded-md duration-200"
          >
            {t("buttons.bBack")}
          </Link>
          {!form.formState.isValid ||
          !mayor25 ||
          !termyCond ||
          form.formState.isSubmitting ? (
            <Button
              onClick={form.handleSubmit(preOnSubmit)}
              disabled={
                !mayor25 ||
                !termyCond
              }
              type="submit"
              className="w-full bg-red-700 text-slate-100 text-base md:!p-0 !my-0 flex-1 hover:shadow-lg transition-all font-semibold border-0 rounded-md line-clamp-1 px-4 py-2"
            >
              {t("buttons.bConfirmDialog")}
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  disabled={!form.formState.isValid || !mayor25 || !termyCond}
                  className={`text-slate-100 flex-1 hover:shadow-lg transition-all font-semibold border-0 rounded-md line-clamp-1 px-4 py-2
                    ${
                      form.formState.isValid
                        ? "bg-red-700"
                        : "bg-gray-600 cursor-not-allowed"
                    }
                  `}
                >
                  {!form.formState.isValid || !mayor25 || !termyCond
                    ? t("buttons.bCheck")
                    : t("buttons.bPrevConfirm")}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] gap-0 p-1 border-4 border-red-700 bg-red-700 text-white">
                <DialogHeader className="p-0 border-none">
                  <DialogTitle className="text-white text-center p-4 uppercase tracking-wider">
                    {t("dialogConfirm.title")}
                  </DialogTitle>
                  <DialogDescription className="text-neutral-700 text-base px-4 pt-2 rounded-t-md bg-white dark:bg-[rgb(17_24_39_)] dark:text-white text-center">
                    {t("buttons.bConfirm")}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2 p-4 text-sm bg-white dark:bg-[rgb(17_24_39_)] text-black dark:text-white">
                  <p>
                    <strong>{t("dialogConfirm.name")}:</strong> {firstName}{" "}
                    {lastName}
                  </p>
                  <p>
                    <strong>{t("dialogConfirm.email")}:</strong> {email}
                  </p>
                  <p>
                    <strong>{t("dialogConfirm.phone")}:</strong> {phone}
                  </p>
                  <p>
                    <strong>
                      {typeDocTranslate[document_type]?.[locale] ??
                        document_type}{" "}
                      :
                    </strong>{" "}
                    {document_number}
                  </p>
                  <p>
                    <strong>{t("dialogConfirm.numberLic")}:</strong>{" "}
                    {license_number}
                  </p>
                  <p>
                    <strong>{t("dialogConfirm.expLic")} (AA-MM-DD):</strong>{" "}
                    {license_expiration_date}
                  </p>
                  <p>
                    <strong>{t("dialogConfirm.address")}:</strong>{" "}
                    {drivers_address}
                  </p>
                  <p>
                    <strong>{t("dialogConfirm.city")}:</strong> {drivers_city}
                  </p>
                  {flight_number && (
                    <p>
                      <strong>{t("dialogConfirm.flightNum")}:</strong>{" "}
                      {flight_number}
                    </p>
                  )}
                  {observation && (
                    <p>
                      <strong>{t("dialogConfirm.comments")}:</strong>{" "}
                      {observation}
                    </p>
                  )}
                </div>

                <DialogFooter className="rounded-b-md bg-white dark:bg-blue95 dark:bg-[rgb(17_24_39_)] text-black dark:text-white grid grid-cols-2 p-4">
                  <DialogClose>{t("buttons.bCancel")}</DialogClose>
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    disabled={
                      !form.formState.isValid ||
                      !mayor25 ||
                      !termyCond ||
                      form.formState.isSubmitting
                    }
                    type="submit"
                    className="bg-red-700 text-slate-100 text-base !p-0 !my-0 flex-1 hover:shadow-lg transition-all font-semibold border-0 rounded-md line-clamp-1 px-4 py-2"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader className="mx-auto animate-spin" />
                    ) : (
                      t("buttons.bConfirmDialog")
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          {/* <button
            type="submit"
            className="bg-red-700 text-slate-100 flex-1 hover:shadow-lg transition-all font-semibold border-0 rounded-md line-clamp-1 px-4 py-2"
          >
            Ir a confirmar reserva
          </button> */}
        </div>
      </form>
    </Form>
  );
};
