import { Metadata } from "next";
import { Contacto } from "@/view";

export const metadata:Metadata = {
  title: "Contacto",
  description: "Contactenos para un asesoramiento o cualquier tipo de consulta."
}
export default function ContactoPage() {
  return (
   <Contacto/>
  );
}