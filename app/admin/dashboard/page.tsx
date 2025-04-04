// import brand from '@/public/images2/brand.png'
// import Image from "next/image";

import { getReservations } from "@/actions/get-reservations";
import { Chart } from "@/components/charts/test";

// export default function AdminPage() {
//   return (
//     <div className="h-full w-full flex flex-col p-6 items-center">
//       <h1 className="text-xl">Administración de MOVIL RENTA</h1>
//       "use client"

export default async function AdminPage() {
  const { data, branches } = await getReservations();
  return <Chart data={data} />;
}
