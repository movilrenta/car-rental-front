export const metadata: Metadata = {
  title: "Reservas - Lista",
  description: "Lista de reservas efectuadas.",
};

import FilterButton from "@/components/dropdown-filter";
import PaginationClassic from "@/components/pagination-classic";

import OrdersTable from "@/app/(default)/ecommerce/orders/orders-table";
import { Metadata } from "next";
import { getReservations } from "@/actions/get-reservations";

async function OrdersContent() {
  // Some dummy orders data
  const {data, branches} = await getReservations()

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Reservas
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <FilterButton align="right" />
        </div>
      </div>

      {/* Table */}
      {!data.length ? (
        <div className="text-center flex items-center justify-center h-[50vh]">
          <p className="text-md lg:text-xl font-light">Aún no hay reservas.</p>
        </div>
      ) : (
        <OrdersTable orders={data} branches={branches} />
      )}

      {/* Pagination Agregar server action */}
      {data.length > 0 && (
        <div className="mt-8">
          <PaginationClassic />
        </div>
      )}
    </div>
  );
}

export default function ReservationListPage() {
  return <OrdersContent />;
}
