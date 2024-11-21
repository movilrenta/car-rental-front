import Image from "next/image"
import graciasImagen from '@/public/images2/icon-confirm.png'
export const Gracias = () => {
  return (
    <div className="flex flex-col items-center gap-4 my-6 p-6 min-h-screen">
      <Image
      src={graciasImagen}
      width={250}
      height={250}
      alt="imagen confirmación"
      className="h-auto w-auto mt-6"
      />
      <h2 className="text-red-700 font-semibold text-2xl">Solicitud Recibida</h2>
      <p className="md:w-1/2 text-gray-900 dark:text-slate-100 text-lg text-center">Gracias por elegirnos, un asesor comercial evaluará su solicitud y se pondrá en contacto con usted en las proximas horas para confirmar la disponibilidad del vehículo y su reserva.</p>
    </div>
  )
}
