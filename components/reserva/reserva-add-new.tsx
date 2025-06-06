"use client";

import React from "react";
import clsx from "clsx";
import { LuLoader } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { newReservationSchema, resolver } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Textarea } from "@/components/textarea";
import { generarCodigoReserva } from "@/components/utils/utils";
import { CarResponse } from "@/types/car.interface";
import { BranchesType } from "@/types/branches";
//import { Calendar } from "@/components/ui/calendar";
import { addReservationAction } from "@/actions";
import { hours } from "@/constant/hours";

interface Props {
  cars: CarResponse[];
  branches: BranchesType[];
}
export const ReservaAddNew = ({ cars, branches }: Props) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof newReservationSchema>>({
    resolver: resolver,
    defaultValues: {
      car_id: -1,
      code: "nuevalinea",
      start_date: "",
      start_hour: undefined,
      end_date: "",
      end_hour: undefined,
      start_branch_id: -1,
      end_branch_id: -1,
      firstname: "",
      lastname: "",
      observation: "",
      email: "",
      phone: "",
      document_type: "DNI",
      document_number: "",
      drivers_address: "",
      drivers_city: "",
      license_number: "",
      license_expiration_date: "",
      flight_number: "",
      origin: "offline_agent",
    },
    // defaultValues: {
    //   car_id: 0,
    //   code: "nuevalinea",
    //   start_date: "",
    //   start_hour: undefined,
    //   end_date: "",
    //   end_hour: undefined,
    //   start_branch_id: 0,
    //   end_branch_id: 0,
    //   firstname: "test",
    //   lastname: "test",
    //   observation: "test",
    //   email: "test@test.com",
    //   phone: "1234567891",
    //   document_type: "DNI",
    //   document_number: "123456789",
    //   drivers_address: "test",
    //   drivers_city: "test",
    //   license_number: "12345",
    //   license_expiration_date: "2025-02-01",
    //   flight_number: "123456",
    //   origin: "offline_agent",
    // },
  });

  async function onSubmit(values: z.infer<typeof newReservationSchema>) {
    const { start_date, end_date, start_hour, end_hour, code, ...rest } = values;
    const newValues = {
      ...rest,
      code: generarCodigoReserva(),
      start_date: values.start_date + " " + values.start_hour,
      end_date: values.end_date + " " + values.end_hour,
    };
    try {
      const resp = await addReservationAction(newValues);
      if (resp.status === 200) {
        toast({
          variant: "default",
          title: resp.message,
        });
        setTimeout(() => {
          //form.reset();
          window.location.reload();
        }, 1000)
      } else {
        toast({
          variant: "default",
          title: resp.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error al crear la reserva - status 504",
      });
    }
  }
  return (
    <div className="w-full bg-white dark:bg-gray-800 shadow-sm fade-in rounded-lg py-6 px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12 gap-x-2 gap-y-2 text-gray-900 dark:text-white"
        >
          {/* Selectores de vehiculos y sucursales */}
          <FormField
            control={form.control}
            name="car_id"
            render={({ field }) => (
              <FormItem className="col-span-full lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Vehículo <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]">
                      <SelectValue placeholder="Seleccione un vehículo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-gray-800">
                    <SelectItem value={"-1"}>
                      Seleccione un vehiculo
                    </SelectItem>
                    {cars.map((car) => (
                      <SelectItem key={car.id} value={`${car.id}`}>
                        {car.name} - {car.plate || "sin patente"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_branch_id"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Lugar de partida{" "}
                  <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]">
                      <SelectValue placeholder="Seleccione el lugar de partida" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-gray-800">
                  <SelectItem value="-1">
                      Seleccione un lugar
                    </SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={`${branch.id}`}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_branch_id"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Lugar de finalización{" "}
                  <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]">
                      <SelectValue placeholder="Seleccione el lugar de entrega" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white dark:bg-gray-800">
                  <SelectItem value="-1">
                      Seleccione un lugar
                    </SelectItem>
                    {branches.map((branch) => (
                      <SelectItem key={branch.id} value={`${branch.id}`}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          {/* Selectores de fecha y horas */}
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-3 ">
                <FormLabel className="mt-4 opacity-70">
                  Fecha de inicio <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" placeholder="01-02-2029" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="start_hour"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-3 ">
                <FormLabel className="mt-4 opacity-70">
                  Hora de inicio <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]">
                        <SelectValue placeholder="Selecciona una hora" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hours.map((item, index) =>
                        item.work ? (
                          <SelectItem
                            key={index}
                            value={item.hour}
                            className="dark:text-gray-950"
                          >
                            {item.hour}
                          </SelectItem>
                        ) : null
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-3 ">
                <FormLabel className="mt-4 opacity-70">
                  Fecha de entrega <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" placeholder="01-02-2029" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_hour"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-3 ">
                <FormLabel className="mt-4 opacity-70">
                  Hora de entrega<span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]">
                        <SelectValue placeholder="Selecciona una hora" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {hours.map((item, index) =>
                        item.work ? (
                          <SelectItem
                            key={index}
                            value={item.hour}
                            className="dark:text-gray-950"
                          >
                            {item.hour}
                          </SelectItem>
                        ) : null
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Nombre <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="José" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Apellido <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Perez" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Correo Electrónico{" "}
                  <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="juanperez@mail.com" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Teléfono <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="5411123456789" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <div className="col-span-full md:col-span-6 lg:col-span-4 flex justify-end items-start gap-x-2">
            <FormField
              control={form.control}
              name="document_type"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="mt-4 opacity-70">
                    Tipo <span className="text-red-700 text-xs">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DNI">DNI</SelectItem>
                      <SelectItem value="Pasaporte">PASAPORTE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document_number"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="mt-4 opacity-70">
                    N° DNI/Pasaporte <span className="text-red-700 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="10809777" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="drivers_address"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Dirección <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Calle 123" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="drivers_city"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">
                  Ciudad <span className="text-red-700 text-xs">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ciudad" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <div className="col-span-full md:col-span-6 lg:col-span-4 flex justify-end items-start gap-x-2">
            <FormField
              control={form.control}
              name="license_number"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="mt-4 opacity-70">
                    Nº Licencia <span className="text-red-700 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="10809777" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="license_expiration_date"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="mt-4 opacity-70">
                    Vto. Licencia{" "}
                    <span className="text-red-700 text-xs">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="01-02-2029" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="flight_number"
            render={({ field }) => (
              <FormItem className="col-span-full md:col-span-6 lg:col-span-4">
                <FormLabel className="mt-4 opacity-70">Nº de vuelo</FormLabel>
                <FormControl>
                  <Input placeholder="1234" className="!mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]" {...field} />
                </FormControl>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="observation"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel className="mt-4 opacity-70">Observación</FormLabel >
                <FormControl>
                  <Textarea
                    maxLength={200}
                    placeholder="Número de transacción (Pago)"
                    className="resize-none !mt-0 border border-neutral-300 dark:border-neutral-700 dark:bg-[rgb(17_24_39_/_0.3)]"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="!mt-0 ps-2 opacity-70">
                  Observación adicional para la reserva
                </FormDescription>
                <FormMessage className="text-red-300 dark:text-red-600 !mt-0 text-xs" />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className={clsx(
              "btn w-full md:min-w-24 md:w-fit px-6 py-2 bg-red-700 text-white hover:bg-red-800 duration-200 flex flex-nowrap gap-2",
              {
                "bg-red-700/60": form.formState.isSubmitting,
                "bg-red-800": !form.formState.isSubmitting,
              }
            )}
          >
            {form.formState.isSubmitting ? (
              <span><LuLoader className="mr-2 h-4 w-4 animate-spin" /> creando</span>
            ) : (
              <span>Crear</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
