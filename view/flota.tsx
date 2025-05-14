import BannerPage from "./banner-page";
import { CarResponse } from "@/types/car.interface";
import { BannerEmpresa } from "@/components/home/banner-empresa";
import FlotaFilter from "./flota-filter";
import { getTranslations } from "next-intl/server";
import { VehicleType } from "@/constant/cars";

interface Props {
  cars: CarResponse[];
}

export const Flota = async ({ cars }: Props) => {
  const t = await getTranslations("FleetPage");
  const availableCars = (array: any[]) => {
    return array.reduce((acc, item) => {
      const key = `${item.name}-${item.group_id}`; // Clave compuesta por nombre y grupo
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {} as Record<string, VehicleType[]>);
  };

  const groupByName = availableCars(cars);

  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      <BannerPage title={t("banner")} image="/images2/carBanner.webp" />
      <h3 className="max-w-3xl mx-auto font-semibold pt-6 py-2 text-pretty text-center text-lg">
        {t("title")}
      </h3>
      <FlotaFilter agrupedCars={groupByName} />
      <BannerEmpresa />
    </section>
  );
};
