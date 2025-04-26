"use client";

import dynamic from "next/dynamic";
import { ReciboPDF } from "./PDF";
import { numeroATextoCompleto } from "../util";

const PDFViewer = dynamic(
  async () => {
    const mod = await import("@react-pdf/renderer");
    return mod.PDFViewer;
  },
  { ssr: false } // Importante para que lo cargue sólo en cliente
);

export default function PreviewPDF() {
  return (
    <PDFViewer width="100%" height="100vh">
      <ReciboPDF importeImputado="415000" montoTexto={numeroATextoCompleto(415000)} />
    </PDFViewer>
  );
}




// Ejemplo de uso:
// console.log(numeroATextoCompleto(201000));
// console.log(numeroATextoCompleto(210000));
// console.log(numeroATextoCompleto(250.50));
// console.log(numeroATextoCompleto(0.80));
// console.log(numeroATextoCompleto(0.05));
// console.log(numeroATextoCompleto(1.25));
// console.log(numeroATextoCompleto(20));
// console.log(numeroATextoCompleto(1234567.89));
// console.log(numeroATextoCompleto(0));
// console.log(numeroATextoCompleto(5.00));