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
import { RateFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoaderIcon } from "lucide-react";
import { PostRatesAction, PutRatesAction } from "@/actions/rates";

export default function CRUD_Rate_Form({ rate }: { rate?: any }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RateFormSchema>>({
    resolver: zodResolver(RateFormSchema),
    defaultValues: {
      name: rate?.name || "",
      description: rate?.desciption || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RateFormSchema>) => {
    event?.preventDefault();
    setIsLoading(true);
    if (rate) {
      const editRate = {
        id: rate.id,
        name: values.name,
        description: values.description,
      };

      try {
        const res = await PutRatesAction(editRate);
        console.log(res, "1");
        if (res.status === 200) {
          toast({
            variant: "default",
            title: `Sucursal editada con exito`,
          });
          setIsLoading(false);
          window.location.reload();
        }
      } catch (error) {
        console.log(error, "error");
        toast({
          variant: "default",
          title: `Hubo un error en la edición.`,
        });
      }
    } else {
      const newRate: any = values;
      //newRate.address_id = Number(newRate.address_id);

      try {
        const res = await PostRatesAction(newRate);
        console.log(res, "3");
        if (res.status === 200) {
          toast({
            variant: "default",
            title: `Tarifa creada con exito`,
          });
          setIsLoading(false);
          window.location.reload();
        }
      } catch (error) {
        toast({
          variant: "default",
          title: `Hubo un error en la creación.`,
        });
        setIsLoading(false);
        console.log(error, "4");
      }
    }
  };

  return (
    <SheetContent className="w-full !max-w-3xl min-h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{rate ? "Editar tarifa" : "Agregar tarifa"}</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form className="w-full grid grid-cols-12 space-y-2 space-x-2 !text-start ">
            <p className="col-span-12 text-xs dark:text-zinc-400">
              Complete los datos para agregar esta sucursal en la plantilla
            </p>
            {rate && (
              <div className="col-span-12 py-2">
                <p className="text-mmd">Tarifa seleccionada</p>
                <p className="col-span-12 text-lg text-blue-600">{rate.name}</p>
              </div>
            )}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Nombre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una dirección" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <div className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100">
                        <SelectItem value={"Unica vez"}>
                          Pago por unica vez
                        </SelectItem>
                      </div>
                      <div className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100">
                        <SelectItem value={"Diario"}>Pago diario</SelectItem>
                      </div>
                      <div className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100">
                        <SelectItem value={"Semanal"}>Pago semanal</SelectItem>
                      </div>
                      <div className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100">
                        <SelectItem value={"Mensual"}>Pago mensual</SelectItem>
                      </div>
                      <div className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100">
                        <SelectItem value={"Anual"}>Pago anual</SelectItem>
                      </div>
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
                    <Input className="form-input w-full" {...field} />
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
          disabled={isLoading}
          className="min-w-24 w-fit px-6 py-2 bg-red-700 text-white hover:bg-red-800 duration-200"
        >
          {isLoading ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : rate ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
