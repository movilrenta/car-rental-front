import { FaEdit, FaTrash } from "react-icons/fa";
import CRUD_Carousel from "./crud";
import DeleteCarousel from "./delete-carousel";
// import CRUD_Fechas from "./crud";
// import DeleteFecha from "./delete-fecha";

interface CarouselTableItemProps {
  id: number;
  name: string;
  location: string;
  images: {
    path: string;
    title: string;
    description: string;
    link: string;
    order: number;
  }[];
}

export default function CarouselTableItem({
  item,
  authorized
}: {
  item: CarouselTableItemProps;
  authorized: boolean
}) {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{item?.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{item?.location === "none" ? "No se muestra" : "Principal"}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{item?.images[0]?.order}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{item?.images[0]?.title}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{item?.images[0]?.description}</div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left"></div>
      </td> */}

      { authorized && <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
          <CRUD_Carousel
            children={
              <div className="w-full h-full bg-cover bg-center">
                <FaEdit className="text-blue-500" size={20} />
              </div>
            }
            item={item}
          />
          <DeleteCarousel
            children={
              <div className="w-full">
                <FaTrash className="text-red-500" size={20} />
              </div>
            }
            id={item?.id}
            path={item?.images[0]?.path}
          />
        </div>
      </td>}
    </tr>
  );
}
