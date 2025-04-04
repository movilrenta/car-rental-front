import { Empresa } from "@/view";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Empresas",
  description: "Sección para conctacto de empresas, solución a medida y gestion de presupuesto."
}

export default function EmpresasPage() {
  return (
   <Empresa/>
  );
}