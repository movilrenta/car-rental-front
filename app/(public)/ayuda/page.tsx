import { Ayuda } from "@/view/ayuda";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Ayuda",
  description: "Ayuda y asistencia al cliente, consejos de seguridad."
}
export default function AyudaPage() {
  return (
   <Ayuda/>
  );
}