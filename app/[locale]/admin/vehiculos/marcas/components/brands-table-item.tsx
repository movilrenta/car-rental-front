import { Brand } from "@/types/car.interface";
import Image from "next/image";
import React from "react";
import CRUD_Brand from "./crud";
import { FaEdit, FaTrash } from "react-icons/fa";
//import { formatDate } from "@/components/utils/utils";
import DeleteComponent from "./delete-component";

export const BrandsTableItem = ({ brand }: { brand: Brand }) => {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{brand.id}</div>
      </td> */}
      <td className="flex items-center h-[47px] min-h-full">
        <div className="flex gap-2 items-center ps-4">
          <Image
            className="object-contain rounded-md h-10 w-16"
            src={brand.image}
            width={60}
            height={46}
            alt={brand?.name}
          />

          <div className="font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
            {brand?.name}
          </div>
        </div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{formatDate(brand.created_at)}</div>
      </td> */}

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
          <CRUD_Brand
            Brand={brand}
            children={
              <div className="w-full h-full bg-cover bg-center">
                <FaEdit className="text-blue-500" size={20} />
              </div>
            }
          />
          <DeleteComponent children={<div className="w-full"><FaTrash className="text-red-500" size={20}/></div>} id={brand.id} />
        </div>
      </td>
    </tr>
  );
};
