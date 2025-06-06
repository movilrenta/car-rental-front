import {
  FaArrowDown,
  FaArrowRight,
  FaArrowUp,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import CRUD_Fechas from "./crud";
import DeleteFecha from "./delete-fecha";
import clsx from "clsx";

interface FechasTableItemProps {
  fecha: {
    id: number;
    reason: string;
    multiplier: string;
    start_date: string;
    end_date: string;
  },
  authorized: boolean
}

export default function FechasTableItem({ fecha, authorized } : FechasTableItemProps) {
  const percentaje = Math.round(
    (fecha &&
      (+fecha?.multiplier < 1
        ? +fecha.multiplier * 100 - 100
        : (+fecha.multiplier - 1) * 100)) ||
      0
  );
  const StyleBadge = {
    discount: {
      style: "bg-green-300 text-green-800",
      text: "Descuento",
      icon: <FaArrowDown />,
    },
    recharge: {
      style: "bg-red-300 text-red-800",
      text: "Recargo",
      icon: <FaArrowUp />,
    },
    default: {
      style: "bg-gray-300 text-gray-800",
      text: "Sin cambios",
      icon: <FaArrowRight />,
    },
  };
  const selectedStyle =
    (fecha &&
      (+fecha?.multiplier < 1 ? StyleBadge.discount : StyleBadge.recharge)) ||
    StyleBadge.default;

  return (
    <tr className="hover:bg-black/5 dark:hover:bg-black/10 duration-200">
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.id}</div>
      </td> */}
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.reason}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div
          className={clsx(
            "text-center border rounded-md w-24 flex items-center justify-center gap-2",
            selectedStyle.style
          )}
        >
          {percentaje}%{selectedStyle.icon}
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.start_date}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{fecha?.end_date}</div>
      </td>

      {authorized && <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
      </td>}
    </tr>
  );
}
