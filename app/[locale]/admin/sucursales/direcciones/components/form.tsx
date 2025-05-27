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
import { AddressFormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/select";
import { useToast } from "@/hooks/use-toast";
import { LoaderIcon } from "lucide-react";
//import { PostBranchesAction, PutBranchesAction } from "@/actions/branchs";
import { PostAddressesAction, PutAddressesAction } from "@/actions/address";

export default function CRUD_Address_Form({
  address,
  onClose
}: {
  address?: any;
  onClose?: () => void;
}) {

  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddressFormSchema>>({
    resolver: zodResolver(AddressFormSchema),
    defaultValues: {
      street: address?.street || "",
      city: address?.city || "",
      state: address?.state || "",
      postal_code: address?.postal_code || "",
      latitude: address?.latitude || "",
      longitude: address?.longitude || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddressFormSchema>) => {
    //event?.preventDefault();
    //setIsLoading(true);
    if (address) {
      const editAddress = {
        id: address.id,
        street: values.street,
        city: values.city,
        state: values.state,
        postal_code: values.postal_code,
        latitude: values.latitude,
        longitude: values.longitude,
      };

      try {
        const res = await PutAddressesAction(editAddress);
        //console.log(res, "1");
        if (res.status === 200) {
          toast({
            variant: "default",
            title: res.message,
          });
          //setIsLoading(false);
          onClose?.()
        } else {
          toast({
            variant: "default",
            title: res.message,
          });
        }
      } catch (error) {
        console.log(error, "error");
        toast({
          variant: "default",
          title: `Hubo un error en la edición.`,
        });
      }
    } else {
      const newAddress: any = values;
      newAddress.address_id = Number(newAddress.address_id);

      try {
        const res = await PostAddressesAction(newAddress);
        //console.log(res, "3");
        if (res.status === 201) {
          toast({
            variant: "default",
            title: res.message,
          });
          onClose?.()
          //setIsLoading(false);
          //window.location.reload();
        }
      } catch (error) {
        toast({
          variant: "default",
          title: `Hubo un error en la creación.`,
        });
        //setIsLoading(false);
        //console.log(error, "4");
      }
    }
  };

  return (
    <SheetContent className="w-full !max-w-3xl min-h-screen overflow-y-auto">
      <SheetHeader>
        <SheetTitle>{address ? "Editar sucursal" : "Agregar sucursal"}</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form className="w-full grid grid-cols-12 space-y-2 space-x-2 !text-start ">
            <p className="col-span-12 text-xs dark:text-zinc-400">
              Complete los datos para agregar esta sucursal en la plantilla
            </p>
            {address && (
              <div className="col-span-12 py-2">
                <p className="text-mmd">Dirección seleccionada</p>
                <p className="col-span-12 text-lg text-blue-600">
                  {address.state} - {address.city} - {address.street}
                </p>
              </div>
            )}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Calle</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Ciudad</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Provincia</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Código Postal</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Latitud</FormLabel>
                  <FormControl>
                    <Input className="form-input w-full" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Longitud</FormLabel>
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
          disabled={form.formState.isSubmitting}
          className="min-w-24 w-fit px-6 py-2 bg-red-700 text-white hover:bg-red-800 duration-200"
        >
          {form.formState.isSubmitting ? (
            <LoaderIcon className="w-4 h-4 animate-spin" />
          ) : address ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}