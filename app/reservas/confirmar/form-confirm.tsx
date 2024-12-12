"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { reservasSchema } from "@/components/schemas/reservas";
import { useReservaStore } from "@/stores/reservas/reserva.store";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/form";
import { Input } from "@/components/input";
import { Checkbox } from "@/components/checkbox";
import {
  IoMailOutline,
  IoPerson,
  IoPersonOutline,
  IoPhonePortraitOutline,
} from "react-icons/io5";

export const FormConfirm = () => {
  const router = useRouter();
  const reservaGet = useReservaStore((state) => state.getReserva());
  const form = useForm<z.infer<typeof reservasSchema>>({
    resolver: zodResolver(reservasSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      termyCond: false,
      mayor25: false,
    },
  });
  const onsubmit = (values: z.infer<typeof reservasSchema>) => {
    const reserveToConfirm = {
      values,
      reservaGet,
    };
    router.replace("/reservas/payments");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>
                <IoPersonOutline size={25} className="text-red-700" />
              </FormLabel>
            <div className="w-full flex flex-col gap-2">
            <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>
                <IoPerson size={25} className="text-red-700" />
              </FormLabel>
            <div className="w-full flex flex-col gap-2">
            <FormControl>
                <Input placeholder="Apellido" {...field} />
              </FormControl>
              <FormMessage />
            </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>
                <IoMailOutline size={25} className="text-red-700" />
              </FormLabel>
              <div className="w-full flex flex-col gap-2">
              <FormControl>
                <Input placeholder="Correo electronico" {...field} />
              </FormControl>
              <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>
                <IoPhonePortraitOutline size={25} className="text-red-700" />
              </FormLabel>
              <div className="w-full flex flex-col gap-2">
                <FormControl>
                  <Input placeholder="Teléfono" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <hr className="w-full h-[2px] my-4 bg-gray-500 dark:bg-slate-100" />

        <FormField
          control={form.control}
          name="termyCond"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 ml-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
                />
              </FormControl>
              <FormLabel>Acepto términos y condciones.</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mayor25"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 ml-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
                />
              </FormControl>
              <FormLabel>Soy mayor de 25 años.</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-cente gap-4 mt-2">
          <Link
            href={"/reservas"}
            className="text-red-700 flex-1 font-semibold text-center py-1 dark:text-slate-100 hover:shadow-lg transition-all border-2 border-red-700 rounded-md"
          >
            Volver y editar
          </Link>
          <button
            type="submit"
            className="bg-red-700 text-slate-100 flex-1 hover:shadow-lg transition-all font-semibold border-0 rounded-md"
          >
            Finalizar consulta
          </button>
        </div>
      </form>
    </Form>
  );
};
