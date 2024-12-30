import BannerPage from "./banner-page";
import { CarResponse } from "@/types/car.interface";
import SimpleCardCar from "@/components/flota/car-card";
import { BannerEmpresa } from "@/components/home/banner-empresa";

interface Props {
  cars:CarResponse[]
}

export const Flota = ({cars}:Props) => {
  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      <BannerPage title="Flota de vehículos" image="/images2/carBanner.webp" />
      <h3 className="max-w-3xl mx-auto font-semibold pt-6 py-2 text-pretty text-center text-lg">Contamos con la más amplia y moderna flota del Norte de Argentina. Con más de 350 unidades, último modelo, ofrecemos disponibilidad inmediata.</h3>
      <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-12 gap-6">
        {
          cars?.map((car) => (
            <SimpleCardCar key={car.id} car={car}/>
          ))
        }
      </div>
      <BannerEmpresa />
    </section>
  );
};
