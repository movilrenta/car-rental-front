import Link from "next/link";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/select";
import { ReservationsDB } from "@/types";
import { formatDate, formatDateShort } from "@/components/utils/utils";
//import { changeStatusPayment } from "@/actions/change-status-payment";
import { EyeIcon } from "lucide-react";
import { useFormatNumber } from "@/components/utils/useFormatterNumber";

interface OrdersTableItemProps {
  order: ReservationsDB;
  branches?: any;
}

export default function OrdersTableItem({
  order,
  branches,
}: OrdersTableItemProps) {
  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-700 duration-200">
        <td className="px-4 py-3 whitespace-nowrap flex items-center font-medium text-sky-600">
          {order.id}
        </td>
        <td className="px-2 py-3 whitespace-nowrap capitalize">
          {formatDateShort(order.created_at)}
        </td>
        <td className="px-2 py-3 whitespace-nowrap">
          {order.start_branch_id} {formatDate(order.start_date)} -{" "}
          {order.start_date.toString().slice(11, 16)}Hs.
        </td>
        <td className="px-2 py-3 whitespace-nowrap">
          {order.end_branch_id} {formatDate(order.end_date)} -{" "}
          {order.end_date.toString().slice(11, 16)}Hs.
        </td>
        <td className="px-2 text-end py-3 whitespace-nowrap text-green-600">
          $ {useFormatNumber(+(order.payment?.amount) || 0) ?? 0}
        </td>
        <td
          className={`px-2 py-3 whitespace-nowrap text-left  ${
            order.status === "approved"
              ? "!text-green-600"
              : order.status === "rejected"
              ? "text-red-600"
              : "text-gray-300 dark:text-gray-500"
          }`}
        >
          {order.status === "approved"
            ? "Aprobada"
            : order.status === "rejected"
            ? "Rechazada"
            : "Pendiente"}
        </td>
        <td className="px-2 py-3 whitespace-nowrap ">
          <Link
            href={`/admin/reservas/ver/${order.id}`}
            className="flex items-center justify-center"
          >
            <EyeIcon className="stroke-1" />
          </Link>
        </td>
      </tr>
    </tbody>
  );
}
          {/* <Select defaultValue={order.status} onValueChange={ () => changeStatusPayment(order.status)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue
              placeholder={
                  order.status === "approved"
                    ? "Aprobada"
                    : order.status === "rejected"
                    ? "Rechazada"
                    : "Pendiente"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="approved">Aprobada</SelectItem>
                <SelectItem value="rejected">Rechazada</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}