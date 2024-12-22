export const metadata: Metadata = {
  title: "Reservas - Lista",
  description: "Lista de reservas efectuadas.",
};

// import FilterButton from "@/components/dropdown-filter";
//import PaginationClassic from "@/components/pagination-classic";

// import OrdersTable from "@/app/(default)/ecommerce/orders/orders-table";
import { Metadata } from "next";
import { getReservations } from "@/actions/get-reservations";
import PaginationList from "./pagination";
import OrderesList from "./primero";

async function OrdersContent() {
  // Some dummy orders data
  const {data, branches} = await getReservations()
  if (!data) return null
  data.map((order) => {
    order.start_branch_id = branches.find((branch: any) => branch.id === order.start_branch_id).name;
    order.end_branch_id = branches.find((branch: any) => branch.id === order.end_branch_id).name;
  });
  //const itemsPerPage = 10;
  

  return (
    <OrderesList data={data} />

  );
}

export default function ReservationListPage() {
  return <OrdersContent />;
}
