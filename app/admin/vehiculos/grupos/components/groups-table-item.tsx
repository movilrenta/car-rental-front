import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
//import { formatDate } from "@/components/utils/utils";
import { Group } from "@/types/car.interface";
import CRUD_Group from "./crud";
import DeleteComponent from "./delete-component";
import { useFormatNumberNoDecimal } from "@/components/utils/useFormatterNumber";

export const GroupsTableItem = ({ group }: { group: Group }) => {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{group.id}</div>
      </td> */}
      <td className="flex first:pl-5 last:pr-5 items-center h-[47px] min-h-full">
        <div className="font-medium text-gray-800 dark:text-gray-100 whitespace-nowrap">
          {group.name}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{useFormatNumberNoDecimal(+(group?.rate))}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{useFormatNumberNoDecimal(+(group?.insurances))}</div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
          <CRUD_Group
            Group={group}
            children={
              <div className="w-full h-full bg-cover bg-center">
                <FaEdit className="text-blue-500" size={20} />
              </div>
            }
          />
          <DeleteComponent children={<div className="w-full"><FaTrash className="text-red-500" size={20}/></div>} id={group.id} />
        </div>
      </td>
    </tr>
  );
};
