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
      setMsgRender({message:"",success:false})
      setData(resp.data);
      form.reset()
    } else {
      setData(null)
      setMsgRender({
        message: resp.message,
        success: true,
      });
      form.reset()
    }
    setLoading(false);
  };
  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      <BannerPage title="Mi reserva" image="/images2/carBanner.webp" />
      <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex flex-col justify-start gap-4 lg:col-span-1">
          <h2 className="font-semibold text-lg">
            Aquí podra revisar los datos de su reserva
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onsubmit)}
              className="flex flex-col"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel>Código:</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC321XYZ" maxLength={9} {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                variant="outline"
                className="self-end mt-4 bg-red-700 text-white hover:bg-red-800 hover:text-white duration-200 "
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
              <div className="w-full p-6 bg-white text-black dark:bg-zinc-600 dark:text-white rounded-md flex flex-col-reverse lg:flex-row-reverse lg:justify-around gap-4">
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={`${data.image}`}
                    width={250}
                    height={250}
                    alt={data?.car}
                    className="h-auto object-cover rounded-md"
                  />
                  
                      <p>{data?.brand_name} {data?.car}</p>
               
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-4">Código de reservación: {data.code}</h3>
                  <ul className="flex flex-col gap-4">
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
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Tipo de combustible: {data?.fuel_type}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Salida: {data?.start_branch} {formatDate(data?.start_date)}</p>
                    </li>
                    <li className="flex items-center gap-x-4">
                      <span className="bg-red-500 rounded-full w-[6px] h-[6px]"></span>
                      <p>Regreso: {data?.end_branch} {formatDate(data?.end_date)}</p>
                    </li>
                    
                    
                  </ul>
                  <div>
                    
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
