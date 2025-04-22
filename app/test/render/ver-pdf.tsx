"use client";

import dynamic from "next/dynamic";
import { ReciboPDF } from "./PDF";
import { numeroATextoCompleto } from "../util";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);


export default function PreviewPDF() {
  return (
    <PDFViewer width="100%" height="200%">
      <ReciboPDF importeImputado="415000" montoTexto={numeroATextoCompleto(415000)}/>
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