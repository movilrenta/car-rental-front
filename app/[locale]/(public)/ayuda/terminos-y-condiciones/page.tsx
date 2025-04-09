import { Metadata } from "next";
import { TerminosCondiciones } from "@/view";

export const metadata:Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de la empresa"
}

export default function TerminosYCondicionesPage() {
  return (
    <TerminosCondiciones/>
  );
}