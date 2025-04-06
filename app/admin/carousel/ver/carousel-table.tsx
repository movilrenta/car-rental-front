import { LuPlus } from "react-icons/lu";
import CRUD_Carousel from "./crud";
import CarouselTableItem from "./carousel-table-item";
import axios from "axios";

const item = {
  name: "nombre de la imagen",
  location: "home",
  images: [
    {
      path: "https://res.cloudinary.com/druaw8kla/image/upload/v1743338055/jukmvbiqfg0qjrijksfe.webp",
      title: "ESte es el titulo",
      description: "la descripcion",
      link: "un link!",
      order: 1,
    },
  ],
};

const imagenes = [
  {
    id: 1,
    name: "Carousel 1",
    location: "Principal",
    images: [
      {
        path: "https://res.cloudinary.com/ditapddzx/image/upload/v1743981416/peqewlxmhfpi2hpplbqg.webp",
        title: "Fácil, rápido y seguro",
        description: "Precios Accesibles",
        link: "un link!",
        order: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Carousel 2",
    location: "Principal",
    images: [
      {
        path: "https://res.cloudinary.com/ditapddzx/image/upload/v1743981416/lem19lftfhs1hhkritnc.webp",
        title: "Disfrutá, conocé, compartíESte es el titulo",
        description: "Movete con libertad",
        link: "un link!",
        order: 2,
      },
    ],
  },
];

export default async function CarouselsTable() {
  //   /api/
  //const carousel_images = await axios.get(`${process.env.NEXT_PUBLIC_URL_BACK}/carousel`);
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl relative">
      <header className="flex justify-between items-center px-5 py-4">
        <h2 className="font-semibold flex justify-center items-center gap-2 text-gray-800 dark:text-gray-100">
          Todas las imagenes para carousel{" "}
          <span className="text-gray-400 dark:text-gray-500 font-medium">
            {imagenes.length}
          </span>
        </h2>
        <CRUD_Carousel
          children={
            <div className="border group duration-200 rounded-md w-fit px-2 bg-red-700 flex gap-2 text-white items-center justify-center">
              <LuPlus className="text-3xl p-2 w-11 h-11" />
              <span className="">Nueva</span>
            </div>
          }
          //item={item}
        />
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Nombre</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Lugar</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Título</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Descripción</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold">Opciones</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {imagenes?.map((item) => (
                <CarouselTableItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
