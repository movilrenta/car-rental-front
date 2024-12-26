import { PageUnderConstruction } from "@/components/page-under-construction";
import BannerPage from "./banner-page";
import { CarResponse } from "@/types/car.interface";
import { SimpleCard } from "@/components/flota/simple-card";

interface Props {
  cars:CarResponse[]
}

export const Flota = ({cars}:Props) => {
  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      <BannerPage title="Flota de vehículos" image="/images2/carBanner.webp" />
      <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          cars.map((car) => (
            <SimpleCard key={car.id} car={car}/>
          ))
        }
      </div>
    </section>
  );
};
