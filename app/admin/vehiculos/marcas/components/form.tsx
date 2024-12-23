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
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { Textarea } from "@/components/textarea";
import { brandSchema, resolver } from "./schema";
import { Brand } from "@/types/car.interface";
import { postBrand, putBrand } from "@/actions";

const autos_pic = [
  "/images2/peugeot-logo.png",
  "/images2/toyotaetios.webp",
  "/images2/toyotahilux.webp",
  "/images2/nissanversa.webp",
];

export default function CRUD_Form({ Brand }: { Brand?: Brand }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: resolver,
    defaultValues: {
      name: Brand ? Brand.name : "",
      image: Brand ? Brand.image : "",
      description: Brand ? Brand.description : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof brandSchema>) => {
    setIsLoading(true);
    if (Brand) {
      const editBrand = {
        id: Brand.id,
        name: values.name,
        image: values.image,
        description: values.description,
      };

      try {
        const res = await putBrand(editBrand);
        if (res.ok) {
          toast({
            variant: "default",
            title: `Marca editada con exito`,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: "default",
          title: `Hubo un error en la edición.`,
        });
        setIsLoading(false);
      }
    } else {
      try {
        const res = await postBrand(values);
        if (res.ok) {
          toast({
            variant: "default",
            title: `Marca creada con exito`,
          });
          setIsLoading(false);
        }
      } catch (error) {
        toast({
          variant: "default",
          title: `Hubo un error en la creación.`,
        });
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <SheetContent className="w-full !max-w-3xl min-h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{Brand ? "Editar marca" : "Agregar marca"}</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form className="w-full grid grid-cols-12 space-y-2 space-x-2 !text-start ">
            <p className="col-span-12 text-xs dark:text-zinc-400">
              Complete los datos para agregar esta marca en la plantilla
            </p>
            {Brand && (
              <div className="col-span-12 py-2">
                <p className="text-mmd">Grupo seleccionado</p>
                <p className="col-span-12 text-lg text-blue-600">
                  {Brand.name}
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-4 flex flex-col justify-end">
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
                            <p>{url}</p>
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
          {isLoading ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : Brand ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
