"use client";

import axios from "axios";
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


  document_type: "DNI" | "Pasaporte",
  document_number: string,
  license_number: string,
  license_expiration_date: string,
  drivers_address: string,
  drivers_city: string,
  flight_number: string,

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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      document_type: "DNI",
      document_number: "",
      license_number: "",
      license_expiration_date: "",
      drivers_address: "",
      drivers_city: "",
      flight_number: "",
      observation: "",
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
      end_date: `${new Date(reservaGet?.endDay!).toISOString().split('T')[0]} ${reservaGet?.endTime}`,
      start_branch_id: +(reservaGet?.startLocation!),
      end_branch_id: +(reservaGet?.endLocation!),
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      phone: values.phone,

      document_type: values.document_type,
      document_number: values.document_number,
      license_number: values.license_number,
      license_expiration_date: values.license_expiration_date,
      drivers_address: values.drivers_address,
      drivers_city: values.drivers_city,
      flight_number: values.flight_number || "",

      observation: values?.observation,
      aditionals_array: reservaGet?.aditionals_array || [],
    };
    //console.log(reserveToConfirm, "DATOS");
    try {
      const response = await axios.post("/api/reservation", reserveToConfirm);
     
      if(response.status === 201) {
        const data = response.data.response
        const dataUserMail = {
          firstName: `${values.firtName} ${values.lastName}`,
          userEmail: values.email
        }
        sessionStorage.setItem("movil_renta_code", data.code)
        sessionStorage.setItem("movil_renta_reservation_id", data.id)
        sessionStorage.setItem("movil_renta_user_data_mail", JSON.stringify(dataUserMail))
        //console.log(sessionStorage.getItem("movil_renta_code"), "ELCODIGO");
        toast({
          variant: "default",
          title: `Reserva creada con exito, realizar el pago para confirmar`,
        });
      router.push("/reservas/payments");

    }
  } catch (error: any) {
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
        className="grid grid-cols-6 gap-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
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
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
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

        {/* Ingresar formm con select de tipo de dni */}
        <FormField
          control={form.control}
          name="document_type"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                Tipo de documento
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <select
                    className="w-full p-1 border rounded-md bg-transparent text-zinc-500 dark:text-zinc-600 dark:border-zinc-600"
                    {...field}
                  >
                    <option value="DNI">DNI</option>
                    <option value="Pasaporte">Pasaporte</option>
                  </select>
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document_number"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                N° DNI / N° Pasaporte
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="" {...field} />
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
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
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
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
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
          name="license_number"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                N° de Licencia
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license_expiration_date"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                Vencimiento Licencia
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  {/* <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="correo.ejemplo@mail.com" {...field} /> */}
                  <input type="date" className="w-full p-1 border rounded-md bg-transparent text-zinc-500 dark:text-zinc-600 dark:border-zinc-600" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="drivers_address"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                Domicilio
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="drivers_city"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                Localidad
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" {...field} />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flight_number"
          render={({ field }) => (
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                N° de Vuelo
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  <Input className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="" {...field} />
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
            <FormItem className="col-span-6 flex flex-col">
              <FormLabel className="-mb-1 line-clamp-1 truncate">
                Comentarios
              </FormLabel>
              <div className="w-full flex flex-col">
                <FormControl>
                  {/* <Texta className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" placeholder="Mi vuelo llega a las 17..." {...field} /> */}
                  <Textarea
                    className="placeholder:text-zinc-300 dark:placeholder:text-zinc-600 dark:text-white" 
                    placeholder="Mi vuelo llega a las 17:00..."
                      
                  {...field}
                />
                </FormControl>
                <FormMessage className="text-red-500 dark:text-red-300 font-light line-clamp-1 text-ellipsis" />
              </div>
            </FormItem>
          )}
        />
        <hr className="col-span-6 w-full h-[2px] my-2 bg-gray-500 dark:bg-slate-100" />
        <div className="col-span-6 flex flex-col gap-1">
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
        <div className="col-span-6 flex flex-col md:flex-row items-center gap-4 mt-2">
          <Link
            href={"/reservas"}
            className="text-red-700 flex-1 font-semibold text-center py-1 dark:text-slate-100 transition-all border-2 border-transparent hover:border-red-700 rounded-md duration-200"
          >
            Volver y editar
          </Link>
          <button
            type="submit"
            className="bg-red-700 text-slate-100 flex-1 hover:shadow-lg transition-all font-semibold border-0 rounded-md line-clamp-1 px-4 py-2"
          >
            Ir a confirmar reserva
          </button>
        </div>
      </form>
    </Form>
  );
};
