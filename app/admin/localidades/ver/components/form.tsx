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
import { BranchFormSchema } from "./schema";
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
import { PostBranchesAction, PutBranchesAction } from "@/actions/branchs";



export default function CRUD_Branch_Form({
  branch,
  address
}: {
  branch?: any;
  address: any;
}) {

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof BranchFormSchema>>({
    resolver: zodResolver(BranchFormSchema),
    defaultValues: {
      name: branch?.name || "",
      address_id: branch?.address_id || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BranchFormSchema>) => {
    event?.preventDefault();
    setIsLoading(true);
    if (branch) {
      const editBranch = {
        id: branch.id,
        name: values.name,
        address_id: Number(values.address_id),
      };

      try {
        const res = await PutBranchesAction(editBranch);
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
      const newBranch: any = values;
      newBranch.address_id = Number(newBranch.address_id);
      

      try {
        const res = await PostBranchesAction(newBranch);
        console.log(res, "3");
        if (res.status === 200) {
          toast({
            variant: "default",
            title: `Sucursal creada con exito`,
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
        <SheetTitle>{branch ? "Editar sucursal" : "Agregar sucursal"}</SheetTitle>
        <SheetDescription></SheetDescription>
        <Form {...form}>
          <form className="w-full grid grid-cols-12 space-y-2 space-x-2 !text-start ">
            <p className="col-span-12 text-xs dark:text-zinc-400">
              Complete los datos para agregar esta sucursal en la plantilla
            </p>
            {branch && (
              <div className="col-span-12 py-2">
                <p className="text-mmd">Sucursal seleccionada</p>
                <p className="col-span-12 text-lg text-blue-600">
                  {branch.name}
                </p>
              </div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
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
              name="address_id"
              render={({ field }) => (
                <FormItem className="col-span-12 flex flex-col justify-end">
                  <FormLabel>Dirección</FormLabel>
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
                      {address
                        ?.sort((a: any, b: any) => a.state.localeCompare(b.state))
                        .map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-2 pe-0 cursor-pointer hover:bg-slate-100"
                          >
                            <SelectItem value={item.id.toString()}>
                              {item.state} - {item.city} - {item.street}
                            </SelectItem>
                          </div>
                        ))}
                    </SelectContent>
                  </Select>
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
          ) : branch ? (
            "Editar"
          ) : (
            "Crear"
          )}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}