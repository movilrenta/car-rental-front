import BannerPage from "./banner-page";
import { CarResponse } from "@/types/car.interface";
// import SimpleCardCar from "@/components/flota/car-card";
import { BannerEmpresa } from "@/components/home/banner-empresa";
import FlotaFilter from "./flota-filter";
import { getTranslations } from "next-intl/server";

interface Props {
  cars: CarResponse[];
}

export const Flota = async ({ cars }: Props) => {
  const t = await getTranslations('FleetPage')
  const availableCars = (array: any[]) => {
    return array.reduce((acc, item) => {
      // Solo pushea si el status es true
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);

      return acc;
    }, {} as Record<string, any[]>);
  };
  const total = (array: any[]) => {
    return array.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    }, {} as Record<string, any[]>);
  };
  //console.log(cars, "cas");

  const groupByName = availableCars(cars);
  // const totalCars = total(cars)["Hilux DC 4X4"];
  // console.log(totalCars.length, "total");

  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      <BannerPage title={t("banner")} image="/images2/carBanner.webp" />
      <h3 className="max-w-3xl mx-auto font-semibold pt-6 py-2 text-pretty text-center text-lg">
        {t("title")}
      </h3>
      {/* <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-12 gap-6"> */}
        <FlotaFilter agrupedCars={groupByName}/>
        {/* {Object.entries(groupByName).map(([name, Cars]: any, index) => {
          const firstCar = Cars[0];
          // const totalCars = total(cars)[name];

          return firstCar ? (
            <div className="col-span-12 md:col-span-4" key={firstCar.id}>
              <div className="relative grid col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3">
                <SimpleCardCar key={firstCar.id} car={firstCar} />
              </div>
            </div>
          ) : null;
        })} */}
      {/* </div> */}
      <BannerEmpresa />
    </section>
  );
};
