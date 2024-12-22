import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { ReservationsDB } from "@/types";
import { formatDate } from "@/components/utils/utils";
//import { changeStatusPayment } from "@/actions/change-status-payment";
import { EyeIcon } from "lucide-react";

interface OrdersTableItemProps {
  order: ReservationsDB;
  branches?:any
}

export default function OrdersTableItem({ order, branches }: OrdersTableItemProps) {
  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="flex items-center text-gray-800">
            <div className="font-medium text-sky-600">
              {order.id}
            </div>
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div>{formatDate(order.created_at)}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-gray-800 dark:text-gray-100">
            {order.start_branch_id}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left">
          {order.end_branch_id}
            </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-green-600">
            {order.payment?.amount ?? 0}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
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
          <div className={`text-left font-medium ${
            order.status === "approved"
              ? "text-green-600"
              : order.status === "rejected"
              ? "text-red-600"
              : "text-gray-400"
          }`}>
          {
                  order.status === "approved"
                    ? "Aprobada"
                    : order.status === "rejected"
                    ? "Rechazada"
                    : "Pendiente"
                }
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap ">
          <Link href={`/admin/reservas/ver/${order.id}`} className="flex items-center justify-center">
            <EyeIcon className="stroke-1" />
          </Link>
        </td>
      </tr>
    </tbody>
  );
}
