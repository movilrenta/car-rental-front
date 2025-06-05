'use client'
import { ReciboPDF } from "@/components/ReciboPDF";
import { blobToBase64, numeroATextoCompleto } from "./util";
import { pdf } from "@react-pdf/renderer";
import { PDFInfoType } from "@/types/pdf";
//import emailjs from '@emailjs/browser';

export const createPDF = async (PDFInfo: PDFInfoType) => {
    //console.log(PDFInfo);
    //setEnviando(true);

    try {
      const blob = await pdf(
        <ReciboPDF
          numero={PDFInfo.numeroFactura}
          cliente={PDFInfo.cliente}
          direccion={PDFInfo.direccion}
          fecha={PDFInfo.fecha}
          montoTexto={numeroATextoCompleto(PDFInfo.monto)}
          formaPago={PDFInfo.formaPago}
          detalles={PDFInfo.detalles}
          nroVenta={PDFInfo.codigoVenta}
          importeImputado={PDFInfo.monto}
        />
      ).toBlob();

      const base64 = await blobToBase64(blob);
      return `data:application/pdf;base64,${base64}`
      // const templateParams = {
      //   userEmail: 'chluisdev@gmail.com',
      //   firstName: 'Pedro Gimenez',
      //   title: 'Adjunto el recibo solicitado.',
      //   content: `data:application/pdf;base64,${base64}`,
      //   code: 'recibo_0000000005.pdf',
      //   to_email: 'chluisdev@gmail.com',
      //   date: '05/05/2025',
      //   amount: '210000',
      //   paymentMethod: 'Efectivo',
      //   details: 'Prueba',
      //   saleNumber: 'ACF127YRT',
      //   amountPaid: 'XXXXXX',
      // };

      // console.log(templateParams.content);

      // //  setEnviando(false);
      // //  return; // ← Esto lo dejé como pediste

      // await emailjs.send(
      //   process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      //   'template_7b8whgg',
      //   templateParams,
      //   process.env.NEXT_PUBLIC_EMAILJS_KEY!,
      // );

      // alert('¡Recibo enviado correctamente!');
    } catch (error) {
      console.error('Error al enviar el recibo', error);
      //alert('Hubo un error al enviar el recibo.');
    }
};