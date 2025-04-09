import { Nosotros } from "@/view";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Nosotros",
  description: "Conozca más sobre nosotros, nuestros valores y calidad de servicio."
}

export default function NosotrosPage() {
  return (
   <Nosotros/>
  );
}