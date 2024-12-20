import Image from "next/image";
import graciasImagen from "@/public/images2/icon-confirm.png";
import Link from "next/link";
import { ButtonClipboard } from "@/components/ui/button-clipboard";
export const Gracias = () => {
  // console.log(sessionStorage.getItem("movil_renta_code") )
  // const code = sessionStorage.getItem("movil_renta_code") ?? "CODIGOX";
  return (
    <div className="flex flex-col items-center gap-6 my-6 p-6 min-h-screen">
      <Image
        src={graciasImagen}
        width={250}
        height={250}
        alt="imagen confirmación"
        className="h-auto w-auto mt-6"
      />
      <h2 className="text-red-700 font-semibold text-2xl">
        Reserva realizada con éxito
      </h2>
      <p className="md:w-1/2 text-gray-900 dark:text-slate-100 text-lg text-center">
        Gracias por elegirnos, a continuación le brindamos su código de reserva
        con el cual podra consultar los detalles de la misma en el apartado{" "}
        <Link
          href={"/mi-reserva"}
          className="font-semibold hover:text-blue-500 dark:text-slate-200 dark:hover:text-blue-500"
        >
          Mi Reserva
        </Link>
        .
      </p>
      <ButtonClipboard />
    </div>
  );
};
