import BannerPage from "./banner-page";
import { CarResponse } from "@/types/car.interface";
import SimpleCardCar from "@/components/flota/car-card";
import { BannerEmpresa } from "@/components/home/banner-empresa";

interface Props {
  cars: CarResponse[];
}

export const Flota = ({ cars }: Props) => {
  const availableCars = (array: any[]) => {
    return array.reduce((acc, item) => {
      if (!item.status) {
        // Solo pushea si el status es true
        if (!acc[item.name]) {
          acc[item.name] = [];
        }
        acc[item.name].push(item);
      }
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
  console.log(cars, "cas");

  const groupByName = availableCars(cars);
  const totalCars = total(cars)["Hilux DC 4X4"];
  console.log(totalCars.length, "total");

  return (
    <section className="w-full min-h-screen animate-fade-in mb-14 dark:text-white">
      <BannerPage title="Flota de vehículos" image="/images2/carBanner.webp" />
      <h3 className="max-w-3xl mx-auto font-semibold pt-6 py-2 text-pretty text-center text-lg">
        Contamos con la más amplia y moderna flota del Norte de Argentina. Con
        más de 350 unidades, último modelo, ofrecemos disponibilidad inmediata.
      </h3>
      <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-12 gap-6">
        {Object.entries(groupByName).map(([name, Cars]: any, index) => {
          const firstCar = Cars[0];
          const totalCars = total(cars)[name];

          return firstCar ? (
            <div className="col-span-4">
              <h3 className="text-2xl font-bold">
                Cantidad: {totalCars.length}
                <span className="text-sm text-gray-500 ml-2">
                  Disponibles: {Cars.filter((car: any) => !car.status).length}
                </span>
              </h3>
              <div
                key={firstCar.id}
                className="relative grid col-span-full sm:col-span-6 md:col-span-4 xl:col-span-3"
              >
                {" "}
                <SimpleCardCar key={firstCar.id} car={firstCar} />
              </div>
            </div>
          ) : null;
        })}
      </div>
      <BannerEmpresa />
    </section>
  );
};
