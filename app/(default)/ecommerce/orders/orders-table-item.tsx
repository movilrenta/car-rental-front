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
import { changeStatusPayment } from "@/actions/change-status-payment";

interface OrdersTableItemProps {
  order: ReservationsDB;
}

export default function OrdersTableItem({ order }: OrdersTableItemProps) {

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
          <div className="text-left">{order.end_branch_id}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-green-600">
            {order.payment?.amount ?? 0}
          </div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <Select defaultValue={order.status} onValueChange={ () => changeStatusPayment(order.status)}>
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
          </Select>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <Link href={`/reservas/reservation-list/${order.id}`} className="text-left">
            ver orden
          </Link>
        </td>
      </tr>
    </tbody>
  );
}
