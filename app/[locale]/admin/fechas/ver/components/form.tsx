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
import { FechaFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { useToast } from "@/hooks/use-toast";
//import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { PostFechasAction, PutFechasAction } from "@/actions/fechas";
import { UserRole } from "@/types";

export default function CRUD_Fecha_Form({
  fecha,
  onClose,
  role
}: {
  fecha?: {
    id: number;
    reason: string;
    multiplier: number;
    start_date: string;
    end_date: string;
  };
  onClose: any
  role?: UserRole
}) {
  const { toast } = useToast();
  //const [isLoading, setIsLoading] = useState(false);

  const percentaje =
    fecha &&
    (fecha?.multiplier < 1
      ? fecha.multiplier * 100 - 100
      : (fecha.multiplier - 1) * 100);

  const form = useForm<z.infer<typeof FechaFormSchema>>({
    resolver: zodResolver(FechaFormSchema),
    defaultValues: {
      reason: fecha?.reason || "",
      multiplier: Math.round(percentaje || 0),
      start_date: fecha?.start_date || "",
      end_date: fecha?.end_date || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FechaFormSchema>) => {
    //setIsLoading(true);
    const division = values.multiplier / 100;

    if (fecha) {
      const editFecha = {
        id: fecha.id,
        reason: values.reason,
        multiplier: 1 + division,
        start_date: values.start_date,
      };

      try {
        const res = await PutFechasAction(editFecha, role);
        if (res.status === 401) {
          toast({
            variant: "default",
            title: res.message || "no autorizado 401",
          });
          //setIsLoading(false);
          //window.location.reload();
        }
        if (res.status === 200) {
          toast({
            variant: "default",
            title: res.message || 'Editada con éxito',
          });
          onClose();
          //setIsLoading(false);
          //window.location.reload();
        }
      } catch (error) {
        console.log(error, "error");
        toast({
          variant: "default",
          title: `Hubo un error en la edición.`,
        });
      }
    } else {
      const newFecha: any = values;
      newFecha.multiplier = 1 + division;
      try {
        const res = await PostFechasAction(newFecha, role);
        if (res.status === 401) {
          toast({
            variant: "default",
            title: res.message || "no autorizado 401",
          });
          //setIsLoading(false);
          //window.location.reload();
        }
        if (res.status === 201) {
          toast({
            variant: "default",
            title: res.message,
          });
          onClose();
          //setIsLoading(false);
          //window.location.reload();
        }
      } catch (error) {
        toast({
          variant: "default",
          title: `Hubo un error en la creación.`,
        });
        //setIsLoading(false);
        console.log(error, "4");
      }
    }
  };

  return (
    <SheetContent className="w-full !max-w-3xl min-h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{fecha ? "Editar fecha" : "Agregar fecha"}</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form className="w-full grid grid-cols-12 space-y-2 space-x-2 !text-start ">
            <p className="col-span-12 text-xs dark:text-zinc-400">
              Complete los datos para agregar una modificación de precio
            </p>
            {fecha && (
              <div className="col-span-12 py-2">
                <p className="text-mmd">Fecha seleccionada</p>
                <p className="col-span-12 text-lg text-blue-600">
                  {fecha.reason}
                </p>
              </div>
            )}
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Motivo</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="multiplier"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Porcentaje %</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <div className="gap-4 col-span-full w-full grid grid-cols-2">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col">
                    <FormLabel>Fecha desde</FormLabel>
                    <div className="w-full flex flex-col">
                      <FormControl>
                        {/* <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="correo.ejemplo@mail.com" {...field} /> */}
                        <input
                          type="date"
                          className="w-full p-1 border rounded-md bg-transparent text-zinc-500 dark:text-zinc-600 dark:border-zinc-600"
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
                name="end_date"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col">
                    <FormLabel>Fecha hasta</FormLabel>
                    <div className="w-full flex flex-col">
                      <FormControl>
                        {/* <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="correo.ejemplo@mail.com" {...field} /> */}
                        <input
                          type="date"
                          className="w-full p-1 border rounded-md bg-transparent text-zinc-500 dark:text-zinc-600 dark:border-zinc-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                    </div>
                  </FormItem>
                )}
              />
            </div>
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
          // disabled={isLoading}
          className="min-w-24 w-fit px-6 py-2 bg-red-700 text-white hover:bg-red-800 duration-200"
        >
          {form.formState.isSubmitting ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : fecha ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
