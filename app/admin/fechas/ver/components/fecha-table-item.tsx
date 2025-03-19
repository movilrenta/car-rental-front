import { FaEdit, FaTrash } from "react-icons/fa";
import CRUD_Fechas from "./crud";
import DeleteFecha from "./delete-fecha";

interface FechasTableItemProps {
  fecha: { id: number; reason: string; multiplier: string; start_date: string };
}

export default function FechasTableItem({ fecha }: FechasTableItemProps) {
  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.id}</div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.reason}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.multiplier}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.start_date}</div>
      </td>

      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center justify-center gap-4">
          <CRUD_Fechas
            children={
              <div className="w-full h-full bg-cover bg-center">
                <FaEdit className="text-blue-500" size={20} />
              </div>
            }
            fecha={fecha}
          />
          <DeleteFecha
            children={
              <div className="w-full">
                <FaTrash className="text-red-500" size={20} />
              </div>
            }
            id={fecha.id}
          />
        </div>
      </td>
    </tr>
  );
}
