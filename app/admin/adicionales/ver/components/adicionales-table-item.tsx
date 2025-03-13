// import { FaEdit, FaTrash } from "react-icons/fa";
// import CRUD_Branches from "./crud";
// import DeleteBrunch from "./delete-additional";

import { useFormatNumber } from "@/components/utils/useFormatterNumber";


interface AdicionalesTableItemProps {
  additional: {id: number, name: string, description: string, price: string, rate: {name: string}}
}

export default function AdicionalesTableItem({
  additional
}:
AdicionalesTableItemProps) {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{additional?.id}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{additional?.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{useFormatNumber(+additional?.price)}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{additional?.rate?.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{additional?.description}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        {/* <div className="flex items-center justify-center gap-4">
        <CRUD_Branches
          branch={branch}
          children={<div className="w-full h-full bg-cover bg-center"><FaEdit className="text-blue-500" size={20}/></div>}
          address={Addresses}
        />
        <DeleteBrunch children={<div className="w-full"><FaTrash className="text-red-500" size={20}/></div>} id={branch.id} />
        </div> */}
      </td>
    </tr>
  );
}
