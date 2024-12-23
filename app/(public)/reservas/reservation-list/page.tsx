export const metadata: Metadata = {
  title: "Reservas - Lista",
  description: "Lista de reservas efectuadas.",
};

import { Metadata } from "next";
import { getReservations } from "@/actions/get-reservations";
import OrderesList from "./primero";

export default async function OrdersContent() {
  // Some dummy orders data
  const {data, branches} = await getReservations()
  if (!data) return null
  data.map((order) => {
    order.start_branch_id = branches.find((branch: any) => branch.id === order.start_branch_id)?.name;
    order.end_branch_id = branches.find((branch: any) => branch.id === order.end_branch_id)?.name;
  });
  //const itemsPerPage = 10;
  

  return (
    <OrderesList data={data} />

  );
}
