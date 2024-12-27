import ReservaView from "@/view/reserva";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Reservas | Movil Renta"
}

export default function ReservasPage() {
  return <ReservaView />;
}