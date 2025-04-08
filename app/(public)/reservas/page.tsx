import ReservaView from "@/view/reserva";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Reservas"
}

export default function ReservasPage() {
  return <ReservaView />;
}