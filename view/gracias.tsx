import Image from "next/image";
import graciasImagen from "@/public/images2/icon-confirm.png";

import { ButtonClipboard } from "@/components/ui/button-clipboard";
import { getTranslations } from "next-intl/server";

export const Gracias = async () => {
  const t = await getTranslations("GraciasPage");

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
        {t("title")}
      </h2>
      <p className="md:w-1/2 text-gray-900 dark:text-slate-100 text-lg text-center">
        {t("subtitle")}
        
        {/* <Link
          href={"/mi-reserva"}
          className="font-semibold underline underline-offset-4 hover:text-blue-500 dark:text-slate-200 dark:hover:text-blue-500"
        >
          Mi Reserva
        </Link>
        . */}
        {/* Además, recibirá un correo electrónico con este mismo código en su bandeja de entrada. */}
      </p>
      <ButtonClipboard />
    </div>
  );
};
