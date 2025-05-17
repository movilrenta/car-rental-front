"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/sheet";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { VehycleFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { VehicleType } from "@/constant/cars";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import Image from "next/image";
import { PostCarAction, PutCarAction } from "@/actions/car";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { Textarea } from "@/components/textarea";
import { UserRole } from "@/types";

const autos_pic = [
  "/images2/peugeot208.webp",
  "/images2/toyotaetios.webp",
  "/images2/toyotahilux.webp",
  "/images2/nissanversa.webp",
  "/images2/renaultlogan.webp",
  "/images2/chevroletcruze.webp",
  "/images2/fiatcronos.webp",
  "/images2/chevrolettracker.webp",
  "/images2/renaultduster.webp",
  "/images2/chevrolettracker2.webp",
  "/images2/toyotahilux4x2.webp",
  "/images2/cruze-5.webp",
  "/images2/cronos.webp",
  "/images2/kangoo.webp",
  "/images2/kicks.webp",
  "/images2/kangoo-roja.webp",
  "/images2/alaskan.webp",
  "/images2/ranger.webp",
  "/images2/master.webp",
  "/images2/partner.webp",
  "/images2/sandero.webp",
  "/images2/sprinter.webp",
  "/images2/toyota-.webp",
  "/images2/berlingo.webp",
  "/images2/h-1-wagon.webp",
];
const combustibles = [
  "Gasolina",
  "Diésel",
  "Híbrido",
  "Eléctrico",
  "Hibrido",
  "Gas Natural",
  "Otro",
];
const transmisiones = ["Manual", "Automática", "Otro"];

export default function CRUD_Form({
  groups,
  brands,
  branches,
  car,
  role,
}: {
  groups: any;
  brands: any;
  branches: any;
  car?: VehicleType;
  role: UserRole;
}) {
  const { toast } = useToast();
  // const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof VehycleFormSchema>>({
    resolver: zodResolver(VehycleFormSchema),
    defaultValues: {
      name: car ? car.name : "",
      brand_id: car ? car.brand_id.toString() : "",
      group_id: car ? car.group_id.toString() : "",
      doors: car ? car.doors : 0,
      seats: car ? car.seats : 0,
      transmission: car ? car.transmission : "",
      luggage: car ? car.luggage : 0,
      fuel_type: car ? car.fuel_type : "",
      branch_id: car ? car.branch_id.toString() : "",
      image: car ? car.image : "",
      description: car ? car.description : "",
      plate: car ? (car.plate ? car.plate : "") : "",
      vehicle_type: car ? car.vehicle_type : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof VehycleFormSchema>) => {
    event?.preventDefault();
    if (car) {
      const editCar = {
        id: car.id,
        name: values.name,
        doors: values.doors,
        seats: values.seats,
        transmission: values.transmission,
        luggage: values.luggage,
        fuel_type: values.fuel_type,
        image: values.image,
        description: values.description,
        plate: values.plate,
        vehicle_type: values.vehicle_type,
        brand_id: Number(values.brand_id),
        group_id: Number(values.group_id),
        branch_id: Number(values.branch_id),
      };

      try {
        const res = await PutCarAction(editCar, role);
        //console.log(res);
        if (res.status === 200) {
          toast({
            variant: "default",
            title: res.message,
          });
          //window.location.reload();
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: "default",
          title: `Hubo un error en la edición.`,
        });
      }
    } else {
      const newCar: any = values;
      newCar.branch_id = Number(newCar.branch_id);
      newCar.brand_id = Number(newCar.brand_id);
      newCar.group_id = Number(newCar.group_id);
      console.log(newCar);
      try {
        const res = await PostCarAction(newCar, role);
        console.log(res);
        if (res.status === 201) {
          toast({
            variant: "default",
            title: res.message,
          });
          //window.location.reload();
        }else{
          toast({
            variant:"default",
            title: res.message,
            description: `código: ${res.status}`
          })
       }
      } catch (error) {
        toast({
          variant: "default",
          title: `Hubo un error en la creación.`,
        });
        console.log(error);
      }
    }
  };

  return (
    <SheetContent className="w-full !max-w-3xl min-h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{car ? "Editar vehículo" : "Agregar vehículo"}</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form className="w-full grid grid-cols-12 space-y-2 space-x-2 !text-start ">
            <p className="col-span-12 text-xs dark:text-zinc-400">
              Complete los datos para agregar este auto en la plantilla
            </p>
            {car && (
              <div className="col-span-12 py-2">
                <p className="text-mmd">Auto seleccionado</p>
                <p className="col-span-12 text-lg text-blue-600">
                  {car?.brand?.name} {car?.name}
                </p>
              </div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-8 flex flex-col justify-end">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicle_type"
              render={({ field }) => (
                <FormItem className="col-span-4 flex flex-col justify-end">
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // Actualiza el estado del formulario
                    value={field.value?.toString() || ""} // Asegúrate de convertir el valor a cadena
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value="car"
                        className="hover:bg-red-700 hover:text-white duration-200"
                      >
                        Auto
                      </SelectItem>
                      <SelectItem
                        value="van"
                        className="hover:bg-red-700 hover:text-white duration-200"
                      >
                        Camioneta
                      </SelectItem>
                      <SelectItem
                        value="utility"
                        className="hover:bg-red-700 hover:text-white duration-200"
                      >
                        Utilitario
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand_id"
              render={({ field }) => (
                <FormItem className="col-span-6 flex flex-col justify-end">
                  <FormLabel>Marca</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una marca" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands
                        ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                        .map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100"
                          >
                            <SelectItem value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          </div>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group_id"
              render={({ field }) => (
                <FormItem className="col-span-6 flex flex-col justify-end">
                  <FormLabel>Grupo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el grupo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {groups
                        ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                        .map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100"
                          >
                            <SelectItem value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          </div>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="doors"
              render={({ field }) => (
                <FormItem className="col-span-4 flex flex-col justify-end">
                  <FormLabel>Puertas</FormLabel>
                  <FormControl>
                    <Input
                      className="form-input w-full"
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
              name="seats"
              render={({ field }) => (
                <FormItem className="col-span-4 flex flex-col justify-end">
                  <FormLabel>Asientos</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="luggage"
              render={({ field }) => (
                <FormItem className="col-span-4 flex flex-col justify-end">
                  <FormLabel>Maletas</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transmission"
              render={({ field }) => (
                <FormItem className="col-span-6 flex flex-col justify-end">
                  <FormLabel>Transmisión</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // Actualiza el estado del formulario
                    value={field.value?.toString() || ""} // Asegúrate de convertir el valor a cadena
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transmisiones.map((type: string) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="hover:bg-red-700 hover:text-white duration-200"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fuel_type"
              render={({ field }) => (
                <FormItem className="col-span-6 flex flex-col justify-end">
                  <FormLabel>Combustible</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // Actualiza el estado del formulario
                    value={field.value?.toString() || ""} // Asegúrate de convertir el valor a cadena
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una opción" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {combustibles.map((type: string) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="hover:bg-red-700 hover:text-white duration-200"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branch_id"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Ubicación</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // Actualiza el estado del formulario
                    value={field.value?.toString() || ""} // Asegúrate de convertir el valor a cadena
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una sucursal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {branches?.map((branch: any) => (
                        <SelectItem
                          key={branch.id}
                          value={branch.id.toString()}
                        >
                          {branch.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Imagen</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)} // Actualiza el estado del formulario
                    value={field.value?.toString() || ""} // Asegúrate de convertir el valor a cadena
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una imagen" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {autos_pic.map((url: string) => (
                        <SelectItem
                          key={url}
                          value={url}
                          className="hover:bg-red-700 hover:text-white duration-200"
                        >
                          <div className="flex flex-nowrap items-center gap-2">
                            <Image
                              src={url}
                              width={80}
                              height={50}
                              alt="2asd"
                              className="h-8 w-auto"
                            />
                            <p>
                              {url
                                .replace("/images2/", "")
                                .replace(".webp", "")}
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Patente</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      className="form-input w-full resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </SheetHeader>
      <SheetFooter className="flex items-center justify-center gap-4 mt-12">
        <SheetClose className="min-w-24 border border-transparent py-1 hover:border-red-500 duration-200 px-4 rounded-md">
          Cerrar
        </SheetClose>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          variant="default"
          disabled={form.formState.isSubmitting}
          className="min-w-24 w-fit px-6 py-2 bg-red-700 text-white hover:bg-red-800 duration-200"
        >
          {form.formState.isSubmitting ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : car ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
