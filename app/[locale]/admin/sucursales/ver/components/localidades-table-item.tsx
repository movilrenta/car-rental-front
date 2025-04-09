import { FaEdit, FaTrash } from "react-icons/fa";
import CRUD_Branches from "./crud";
import DeleteBrunch from "./delete-brunch";


interface LocalidadesTableItemProps {
  branch: {
    id: number;
    name: string;
    address_id: number;
    address: string;
    distance_to_main_branch: number;
  }
  Addresses: any
}

export default function LocalidadesTableItem({
  branch,
  Addresses
}:
LocalidadesTableItemProps) {

  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{branch.id}</div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{branch?.name}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{branch?.address}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-right pe-2">{branch?.distance_to_main_branch} Kms.</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
        <CRUD_Branches
          branch={branch}
          children={<div className="w-full h-full bg-cover bg-center"><FaEdit className="text-blue-500" size={20}/></div>}
          address={Addresses}
        />
        <DeleteBrunch children={<div className="w-full"><FaTrash className="text-red-500" size={20}/></div>} id={branch.id} />
        </div>
      </td>
    </tr>
  );
}
