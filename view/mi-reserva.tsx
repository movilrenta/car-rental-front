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
import { LuLoader } from "react-icons/lu";
import { BsLuggageFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCarDoor, GiGasPump } from "react-icons/gi";
import { TbManualGearbox } from "react-icons/tb";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { useFormatNumber } from "@/components/utils/useFormatterNumber";
import PageNotFound from "@/app/(alternative)/utility/404/page";
import NotFound from "@/app/not-found";

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
    if (resp?.ok) {
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
//console.log(data);
  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      {/* <BannerPage title="Mi reserva" image="/images2/carBanner.webp" /> */}
      {/* <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-12 gap-6">
        <div className="flex flex-col justify-start gap-4 col-span-12 sm:col-span-3">
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
                className="self-end !min-w-32 !w-32 mt-4 bg-red-700 text-white hover:bg-red-800 hover:text-white duration-200 "
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Buscando" : "Buscar"}
              </Button>
            </form>
          </Form>
        </div>
        {loading ? (
          <div className="col-span-12 sm:col-span-9 flex items-center justify-center">
            <LuLoader className="animate-spin" />
            <span className="text-slate-600 text-center">
              Cargando
            </span>
          </div>
        ) : (
          <div className="min-w-0 w-full col-span-12 sm:col-span-9 flex justify-center items-center animate-fade-in">
            {msgRender.success && (
              <h2 className="font-medium text-slate-400 text-lg italic">
                {msgRender.message}
              </h2>
            )}
            {data !== null && (
              <div className="grid grid-cols-6 w-full min-w-0 p-4 bg-white text-black dark:bg-zinc-600 dark:text-white rounded-md gap-8">
                <div className="col-span-6 w-full lg:col-span-4 font-light mb-4 md:mb-0">
                  <h2 className="font-semibold text-xl mb-2 border-b w-fit">Detalle de tu itinerario</h2>
                  <h3 className="text-sm -mt-1">Número de reserva: <strong>{data.code}</strong> </h3>
                  <div className="text-sm mb-4">Estado:{" "}
                        {data?.status === "approved"
                          ? <span className="text-green-600 font-semibold">Aprobada</span>
                          : data?.status === "rejected"
                          ? <span className="text-red-500 font-semibold">Rechazada</span>
                          : <span>Pendiente</span>}
                      </div>
                  <ul className="flex flex-col gap-4">
                    <li className="flex flex-col items-center p-2 border dark:border-[rgb(17_24_39_/_0.7)] rounded-md dark:bg-[rgb(17_24_39_/_0.3)]">
                      <div className="flex gap-1">
                        <GoArrowUpRight className="text-red-600 stroke-2 text-3xl" />
                        <p className="font-semibold text-xl">Partida</p>
                      </div>
                      <p>Lugar: {data?.start_branch}</p>
                      <p>Fecha: {formatDate(data?.start_date)}</p>
                      <p>Horario: {data?.start_date.toString().slice(10,16)}</p>
                    </li>
                    <li className="flex flex-col items-center p-2 border dark:border-[rgb(17_24_39_/_0.7)] rounded-md dark:bg-[rgb(17_24_39_/_0.3)]">
                      <div className="flex gap-1">
                        <GoArrowDownLeft className="text-red-600 stroke-2 text-3xl" />
                        <p className="font-semibold text-xl">Regreso</p>
                      </div>
                      <p>Lugar: {data?.end_branch}</p>
                      <p>Fecha: {formatDate(data?.end_date)}</p>
                      <p>Horario: {data?.end_date.toString().slice(10,16)}</p>
                    </li>
                  </ul>

                </div>
                <div className="w-full col-span-6 lg:col-span-2">
                <p className="font-semibold text-xl mb-2 border-b w-fit line-clamp-1">Detalle del vehículo</p>
                  <Image
                    src={`${data.image}`}
                    width={250}
                    height={250}
                    alt={data?.car}
                    className="w-full min-w-0 mx-auto h-auto object-cover rounded-md"
                  />
                  
                  <div className="w-full">
                    
                    <div className="w-full max-w-full">
                      <p>{data?.brand_name} {data?.car}</p>
                      <p className="text-xs">O similar Grupo {data.group}</p>
                      <div className="grid grid-cols-12 mt-2">
                        <div className="col-span-6 flex gap-1 items-center flex-nowrap">
                          <GiGasPump className="w-4 h-4 min-h-4 min-w-4"/>
                          <span>{data?.fuel_type}</span>
                        </div>
                        <div className="col-span-6 flex gap-1 items-center flex-nowrap">
                          <TbManualGearbox className="w-4 h-4 min-h-4 min-w-4"/> 
                          <span>{data?.transmission}</span>
                        </div>
                        <div className="col-span-6 flex gap-1 items-center flex-nowrap">
                          <GiCarDoor className="w-4 h-4 min-h-4 min-w-4"/> 
                          <span>{data?.doors}</span>
                        </div>
                        <div className="col-span-6 flex gap-1 items-center flex-nowrap">
                          <FaUser className="w-4 h-4 min-h-4 min-w-4"/> 
                          <span>{data?.seats}</span>
                        </div>
                        <div className="col-span-6 flex gap-1 items-center flex-nowrap">
                          <BsLuggageFill className="w-4 h-4 min-h-4 min-w-4"/> 
                          <span>{data?.luggage}</span>
                        </div>
                      </div>
                      <p className="text-xs">- Seguros: Por daños o faltantes ${useFormatNumber(+(data?.insurances || 0))}, por vuelcos o robo ${useFormatNumber(Number(data?.insurances || 0) * 3)}</p>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div> */}
      <NotFound />
    </section>
  );
};
