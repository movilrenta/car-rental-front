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
import { useToast } from "@/hooks/use-toast";
import { LoaderIcon } from "lucide-react";
import { Textarea } from "@/components/textarea";
import { Group } from "@/types/car.interface";
import { groupSchema, resolver } from "./groupSchema";
import { postGroup, putGroup } from "@/actions";

export default function CRUD_Form({ Group, onClose }: { Group?: Group, onClose?:() => void;}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: resolver,
    defaultValues: {
      name: Group ? Group.name : "",
      description: Group ? Group.description : "",
      insurances: Group ? Group.insurances : "",
      rate: Group ? Group.rate : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof groupSchema>) => {
    if (Group) {
      const editGroup = {
        id: Group.id,
        name: values.name,
        description: values.description,
        insurances: values.insurances,
        rate: values.rate,
      };

      try {
        const res = await putGroup(editGroup);
        if (res.status === 200) {
          toast({
            variant: "default",
            title: res.message,
          });
          onClose?.()
        } else {
          toast({
            variant: "default",
            title: res.message,
            description: `Código: ${res.status}`,
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          variant: "default",
          title: `Hubo un error en la edición.`,
        });
      }
    } else {
      try {
        const res = await postGroup(values);
        if (res.status === 201) {
          toast({
            variant: "default",
            title: res.message,
          });
          onClose?.();
        } else {
          toast({
            variant: "default",
            title: res.message,
            description: `Código: ${res.status}`,
          });
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
        <SheetTitle>{Group ? "Editar grupo" : "Agregar grupo"}</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form className="w-full grid grid-cols-12 space-y-2 space-x-2 !text-start ">
            <p className="col-span-12 text-xs dark:text-zinc-400">
              Complete los datos para agregar esta marca en la plantilla
            </p>
            {Group && (
              <div className="col-span-12 py-2">
                <p className="text-mmd">Marca seleccionada</p>
                <p className="col-span-12 text-lg text-blue-600">
                  {Group.name}
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
              name="insurances"
              render={({ field }) => (
                <FormItem className="col-span-4 flex flex-col justify-end">
                  <FormLabel>Seguros</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem className="col-span-4 flex flex-col justify-end">
                  <FormLabel>Tarifa</FormLabel>
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
          ) : Group ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
