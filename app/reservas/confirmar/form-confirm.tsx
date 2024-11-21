"use client"

import {IoChatbubbleOutline} from "react-icons/io5";
import { InputConfirm } from "./input-confirm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { reservasSchema } from "@/components/schemas/reservas";
import { useReservaStore } from "@/stores/reservas/reserva.store";
import { inputsValues } from "@/constant/input-values";

export const FormConfirm = () => {
  const router = useRouter();
  const reservaGet =  useReservaStore((state) => state.getReserva())
  const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof reservasSchema>>({
    resolver: zodResolver(reservasSchema),
    defaultValues: {
      name:"",
      email:"",
      phone:"",
      company:"",
      coments:"",
      termyCond:false,
      mayor25:false
    }
  })
  const onsubmit = (values: z.infer<typeof reservasSchema>) => {
    const reserveToConfirm = {
      values,
      reservaGet
    }
    console.log(reserveToConfirm)
    router.push('/reservas/gracias')
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-6 py-4">
      <div className="w-full flex flex-col items-center gap-6">
      {inputsValues.map((item) => (
        <InputConfirm register={register} errors={errors} {...item} key={item.id}/>
        ))}
    </div>
    <div className="w-full flex items-start gap-x-4">
      <IoChatbubbleOutline size={26} className="text-red-700"/>
      <textarea
      id="feedback"
      className="form-textarea w-full focus:border-gray-300"
      rows={4}
      placeholder="Comentarios adicionales"
      {...register("coments")}
    ></textarea>
    </div>
    <hr className="w-full h-[2px] my-4 bg-gray-500 dark:bg-slate-100" />
    <div className="mr-1 space-y-2 text-gray-900 dark:text-slate-100">
      <label className="flex items-center cursor-pointer w-fit">
        <input type="checkbox" className="form-checkbox" {...register("termyCond")} />
        <span className="text-sm ml-2">Acepto términos y condiciones.</span>
      </label>

      <label className="flex items-center cursor-pointer w-fit">
        <input type="checkbox" className="form-checkbox" {...register("mayor25")}/>
        <span className="text-sm ml-2">Tengo más de 25 años de edad.</span>
      </label>
    </div>
    <div className="grid grid-cols-2 gap-x-4 mt-4">
      <Link
        href={"/reservas"}
        className="text-red-700 font-semibold text-center py-1 dark:text-slate-100 hover:shadow-lg transition-all border-2 border-red-700 rounded-md"
      >
        Volver y editar
      </Link>
      <button
        type="submit"
        className="bg-red-700 text-slate-100 hover:shadow-lg transition-all font-semibold border-0 rounded-md"
      >
        Finalizar consulta
      </button>
    </div>
  </form>
  );
};