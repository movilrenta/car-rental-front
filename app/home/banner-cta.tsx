import Image from "next/image";
import imageBanner1 from "@/public/images2/rentacar.webp";
import HomeItinerario from "./home-itinerario";

export const BannerCta = () => {
  return (
    <div className="h-full grid grid-cols-12 bg-white dark:bg-gray-800 shadow-sm">
      <div className="relative col-span-12 lg:col-span-6 overflow-hidden max-h-[600px]">
        <Image
          src={imageBanner1}
          width={550}
          height={200}
          alt="Demo"
          className="w-full lg:min-w-[660px] object-cover max-h-80 h-auto md:max-h-full"
        />
        <div className="absolute inset-0 text-3xl sm:text-5xl px-6 h-full flex flex-col justify-center bg-gradient-to-tr from-black/60 to-transparent text-gray-100 dark:text-gray-100 mb-4">
          <h4 className="pt-24 font-extralight">Fácil, rápido y seguro</h4>
          <h4 className="capitalize font-semibold">Precios Accesibles</h4>
        </div>
      </div>
      <HomeItinerario />
    </div>
  );
};
