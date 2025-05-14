import { FaEdit, FaTrash } from "react-icons/fa";
import CRUD_Branches from "./crud";
import DeleteAddress from "./delete-address";


interface AddressTableItemProps {
  address: { id: number;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    latitude: string;
    longitude: string}
}

export default function AddressesTableItem({
  address
}:
AddressTableItemProps) {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{address.id}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{address.state}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{address.city}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{address.street}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{address.postal_code}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
        <CRUD_Branches
          children={<div className="w-full h-full bg-cover bg-center"><FaEdit className="text-blue-500" size={20}/></div>}
          address={address}
        />
        <DeleteAddress children={<div className="w-full"><FaTrash className="text-red-500" size={20}/></div>} id={address.id} />
        </div>
      </td>
    </tr>
  );
}
