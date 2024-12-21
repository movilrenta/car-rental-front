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
import { Textarea } from "@/components/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
// import {
//   IoMailOutline,
//   IoPerson,
//   IoPersonOutline,
//   IoPhonePortraitOutline,
// } from "react-icons/io5";

type ReservationType = {
  car_id: number,
  code: string,
  start_date : string, //"2024-12-20 15:30",
  end_date: string,
  start_branch_id : number,
  end_branch_id: number
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  //installments: string,
  aditionals_array: {id: number, amount: number}[],
  observation?: string
}

function generarCodigoReserva() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  const parteLetras = Array.from({ length: 3 }, () => letras[Math.floor(Math.random() * letras.length)]).join('');
  const parteLetras2 = Array.from({ length: 3 }, () => letras[Math.floor(Math.random() * letras.length)]).join('');
  const parteNumeros = Array.from({ length: 3 }, () => numeros[Math.floor(Math.random() * numeros.length)]).join('');
  
  return parteLetras + parteNumeros + parteLetras2;
}

export const FormConfirm = () => {

  const { toast } = useToast();

  const router = useRouter();
  const reservaGet = useReservaStore((state) => state.getReserva());
  const form = useForm<z.infer<typeof reservasSchema>>({
    resolver: zodResolver(reservasSchema),
    defaultValues: {
      firtName: "",
      lastName: "",
      email: "",
      phone: "",
      //installments: 1,
      termyCond: false,
      mayor25: false,
      //aditionals_array: []
    },
  });
  const onsubmit = async (values: z.infer<typeof reservasSchema>) => {
    const reserveToConfirm:ReservationType = {
      car_id: reservaGet?.car?.id!,
      code: generarCodigoReserva(),
      start_date: `${new Date(reservaGet?.startDay!).toISOString().split('T')[0]} ${reservaGet?.startTime}`,
      end_date: `${new Date(reservaGet?.endDay!).toISOString().split('T')[0]} ${reservaGet?.endTime}`,    // `${reservaGet?.endDay.toString().slice(0,10)} ${reservaGet?.endTime}`,
      start_branch_id: 1,
      end_branch_id: 1,
      firstname: values.firtName,
      lastname: values.lastName,
      email: values.email,
      phone: values.phone,
      observation: values?.observation,
      aditionals_array: reservaGet?.aditionals_array || [],
      //installments: values.installments,
      //termyCond: true,
      //mayor25: true

    };
    //console.log(values);
    
    //console.log(reserveToConfirm, "voy a confirmar");

    try {
      const response = await axios.post("/api/reservation", reserveToConfirm);
      //console.log(response, "soy el response");
      
      if(response.status === 201) {
        const data = response.data.response
        sessionStorage.setItem("movil_renta_code", data.code)
        sessionStorage.setItem("movil_renta_reservation_id", data.id)
        //console.log(sessionStorage.getItem("movil_renta_code"), "ELCODIGO");
        toast({
          variant: "default",
          title: `Reserva creada con exito, realizar el pago para confirmar`,
        });
      //TODO guardar el TOKEN
      console.log(response, "RESERVA response")
      console.log(reserveToConfirm, "RESERVA ENVIADA")
      router.push("/reservas/payments");
      //router.replace("/reservas/payments");
    }
  } catch (error: any) {
    console.log(error);
    if (error.response) {
      toast({
        variant: "destructive",
        title: `Error al reservar: ${error.response.data.response.error || "No se puede reservar el auto."}`,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Ocurrió un error inesperado.",
      });
    }
    return;
  }
};

  

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="firtName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Nombre
              </FormLabel>
            <div className="w-full flex flex-col">
            <FormControl>
                <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
            </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Apellido
              </FormLabel>
            <div className="w-full flex flex-col">
            <FormControl>
              <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="Apellido" {...field} />
            </FormControl>
            <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
            </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Correo electrónico
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="correo.ejemplo@mail.com" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Teléfono
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input 
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" 
                    placeholder="3814112233" 
                    value={field.value}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, ""); // Remueve cualquier carácter no numérico
                      field.onChange(input); // Actualiza el estado del campo
                      }} 
                  />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observation"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Comentarios
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  {/* <Texta className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="Mi vuelo llega a las 17..." {...field} /> */}
                  <Textarea
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" 
                    placeholder="Mi vuelo llega a las 17..."
                      
                  {...field}
                />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <hr className="w-full h-[2px] my-2 bg-gray-500 dark:bg-slate-100" />
        <div className="flex flex-col gap-1">
        <FormField
          control={form.control}
          name="termyCond"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
                  className="border-red-700 text-zinc-800 dark:text-white h-5 w-5"
                />
              </FormControl>
              <FormLabel className="h-6 p-1 cursor-pointer !m-0 flex items-center">Acepto términos y condciones.</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mayor25"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  required
                  className="border-red-700 text-zinc-800 dark:text-white h-5 w-5"
                />
              </FormControl>
              <FormLabel className="h-6 p-1 cursor-pointer !m-0 flex items-center">Soy mayor de 25 años.</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="flex items-cente gap-4 mt-2">
          <Link
            href={"/reservas"}
            className="text-red-700 flex-1 font-semibold text-center py-1 dark:text-slate-100 transition-all border-2 border-transparent hover:border-red-700 rounded-md duration-200"
          >
            Volver y editar
          </Link>
          <button
            type="submit"
            className="bg-red-700 text-slate-100 flex-1 hover:shadow-lg transition-all font-semibold border-0 rounded-md"
          >
            Confirmar reserva
          </button>
        </div>
      </form>
    </Form>
  );
};
