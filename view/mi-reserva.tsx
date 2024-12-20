"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import BannerPage from "./banner-page";
import { useForm } from "react-hook-form";
import { FormMiReserva, resolver } from "@/types/mi-reserva.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/input";
import { getUserReservation } from "@/actions";
import { ResponseUserReservation } from "@/types/user-reservation.inteface";
import { formatDate } from "@/components/utils/utils";
import Image from "next/image";

export const MiReserva = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<ResponseUserReservation | null>(null);
  const [msgRender, setMsgRender] = React.useState({
    message: "",
    success: false,
  });
  const form = useForm({
    resolver: resolver,
    defaultValues: {
      code: "",
    },
  });

  const onsubmit = async (values: FormMiReserva) => {
    setLoading(true);
    const resp = await getUserReservation(values);
    if (resp.ok) {
      setData(resp.data);
    } else {
      setMsgRender({
        message: resp.message,
        success: true,
      });
    }
    setLoading(false);
  };
  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      <BannerPage title="Mi reserva" image="/images2/carBanner.webp" />
      <div className="container mx-auto mt-6 px-2 sm:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col justify-start gap-4 lg:col-span-1">
          <h2 className="font-semibold text-lg">
            Aqui podra revisar los datos de su reserva
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onsubmit)}
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Código:</FormLabel>
                    <FormControl>
                      <Input placeholder="AAA321" maxLength={9} {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                    <FormDescription>
                      <span className="text-xs">
                        Por favor escriba el código respestando máyusculas.
                      </span>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                className="mt-4 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Buscando" : "Buscar"}
              </Button>
            </form>
          </Form>
        </div>
        {loading ? (
          <div className="lg:col-span-2 flex items-center justify-center">
            <span className="text-slate-600 animate-pulse text-center">
              Cargando
            </span>
          </div>
        ) : (
          <div className="lg:col-span-2 flex justify-center items-center">
            {msgRender.success && (
              <h2 className="font-medium text-slate-400 text-lg italic">
                {msgRender.message}
              </h2>
            )}
            {data !== null && (
              <div className="w-full flex flex-col lg:flex-row-reverse lg:justify-around gap-4">
                <div className="flex justify-center items-center">
                  <Image
                    src={`${data.image}`}
                    width={250}
                    height={250}
                    alt={data?.car}
                    className="h-auto object-cover rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg my-4">Información:</h3>
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Auto: {data?.car}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Marca: {data?.brand_name}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Tipo de combustible: {data?.fuel_type}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Lugar de salida: {data?.start_branch}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Lugar de llegada: {data?.end_branch}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Inicio: {formatDate(data?.start_date)}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Regreso: {formatDate(data?.end_date)}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>
                        Estado de reserva:{" "}
                        {data?.status === "approved"
                          ? "Aprobada"
                          : data?.status === "rejected"
                          ? "Rechazada"
                          : "Pendiente"}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
