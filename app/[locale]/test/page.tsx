'use client';

// import { pdf } from '@react-pdf/renderer';
// import emailjs from '@emailjs/browser';
// import { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { ReciboPDF } from './render/PDF';
// import { numeroATextoCompleto } from './util';
// import { createPDF } from './handler-send-pdf';
// import { sendEmail } from '@/actions';



export default function EnviarReciboPorEmail() {
  // const [enviando, setEnviando] = useState(false);

  

  // const handleVerPDF = async () => {
  //   const blob = await pdf(
  //     <ReciboPDF
  //       numero={5}
  //       cliente="Pedro Gimenez"
  //       direccion="Cerro Colorado 2956 - Bella Vista"
  //       fecha="05/05/2025"
  //       montoTexto={numeroATextoCompleto(210000)}
  //       formaPago="Efectivo"
  //       detalles="Prueba"
  //       nroVenta="ACF127YRT"
  //       importeImputado={210000}
  //     />
  //   ).toBlob();

  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   reader.onloadend = () => {
  //     const base64 = reader.result as string;
  //     const newTab = window.open();
  //     if (newTab) {
  //       newTab.document.write(
  //         `<iframe src="${base64}" width="100%" height="100%"></iframe>`
  //       );
  //     }
  //   };
  // };

  // const handleDescargarPDF = async () => {
  //   const blob = await pdf(
  //     <ReciboPDF
  //       numero={5}
  //       cliente="Pedro Gimenez"
  //       direccion="Cerro Colorado 2956 - Bella Vista"
  //       fecha="05/05/2025"
  //       montoTexto={numeroATextoCompleto(210000)}
  //       formaPago="Efectivo"
  //       detalles="Prueba"
  //       nroVenta="ACF127YRT"
  //       importeImputado={210000}
  //     />
  //   ).toBlob();

  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "recibo_test.pdf";
  //   a.click();
  //   URL.revokeObjectURL(url);
  // };

  // const information: PDFInfoType = {
  //   numeroFactura: 5,
  //   cliente: "Cliente nombre",
  //   direccion: "Armada de direccion",
  //   fecha: "04/04/2025",
  //   monto: 875685,
  //   montoTexto: "lskjdhfiuskd",
  //   formaPago: "Tarjeta de crédito",
  //   detalles: "Probando el detalle",
  //   codigoVenta: "ACM188PTT"
  // };

  // const testing = async () => {
  //   //const envio = await createPDF(information)
  //   //console.log(envio);
  //   const PDFInfo: PDFInfoType = {
  //   numeroFactura: 5,
  //   cliente: "Cliente nombre",
  //   direccion: "Armada de direccion",
  //   fecha: "04/04/2025",
  //   monto: 875685,
  //   montoTexto: "test",
  //   formaPago: "Tarjeta de crédito",
  //   detalles: "Probando el detalle",
  //   codigoVenta: "ACM188PTT"
  // };
  //   const createPdf = await createPDF(PDFInfo);
  //   console.log("Enviando");
  //   console.log(createPdf);
  //   const valores = {
  //     userEmail: "chluisdev@gmail.com",
  //         firstName: "Luis Ch",
  //         code: "ACC333OPO",
  //   }

  //   const enviando = await sendEmail(valores, createPdf);
  //   console.log(enviando, "Resultado del envio");
  // }

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col gap-4 p-4">
      {/* <Button onClick={testing} disabled={enviando} variant="outline">
        {enviando ? 'Enviando...' : 'Enviar Recibo por Email'}
      </Button>
      <Button onClick={handleVerPDF} variant="secondary">
        Ver PDF en pestaña nueva
      </Button>
      <Button onClick={handleDescargarPDF} variant="default">
        Descargar PDF
      </Button> */}
    </div>
  );
}

// Utilidad para convertir Blob a base64 (sin encabezado)

