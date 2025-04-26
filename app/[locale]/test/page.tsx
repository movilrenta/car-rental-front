'use client';

import { pdf } from '@react-pdf/renderer';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ReciboPDF } from './render/PDF';
import { numeroATextoCompleto } from './util';

export default function EnviarReciboPorEmail() {
  const [enviando, setEnviando] = useState(false);

  const handleEnviar = async () => {
    setEnviando(true);

    try {
      const blob = await pdf(
        <ReciboPDF
          numero={5}
          cliente="Pedro Gimenez"
          direccion="Cerro Colorado 2956 - Bella Vista"
          fecha="05/05/2025"
          montoTexto={numeroATextoCompleto(210000)}
          formaPago="Efectivo"
          detalles="Prueba"
          nroVenta="ACF127YRT"
          importeImputado="210000"
        />
      ).toBlob();

      const base64 = await blobToBase64(blob);

      const templateParams = {
        userEmail: 'chluisdev@gmail.com',
        firstName: 'Pedro Gimenez',
        title: 'Adjunto el recibo solicitado.',
        content: `data:application/pdf;base64,${base64}`,
        code: 'recibo_0000000005.pdf',
        to_email: 'chluisdev@gmail.com',
        date: '05/05/2025',
        amount: '210000',
        paymentMethod: 'Efectivo',
        details: 'Prueba',
        saleNumber: 'ACF127YRT',
        amountPaid: 'XXXXXX',
      };

      console.log(templateParams.content);

      //  setEnviando(false);
      //  return; // ← Esto lo dejé como pediste

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        'template_7b8whgg',
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_KEY!,
      );

      alert('¡Recibo enviado correctamente!');
    } catch (error) {
      console.error('Error al enviar el recibo', error);
      alert('Hubo un error al enviar el recibo.');
    }

    setEnviando(false);
  };

  const handleVerPDF = async () => {
    const blob = await pdf(
      <ReciboPDF
        numero={5}
        cliente="Pedro Gimenez"
        direccion="Cerro Colorado 2956 - Bella Vista"
        fecha="05/05/2025"
        montoTexto={numeroATextoCompleto(210000)}
        formaPago="Efectivo"
        detalles="Prueba"
        nroVenta="ACF127YRT"
        importeImputado="210000"
      />
    ).toBlob();

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const newTab = window.open();
      if (newTab) {
        newTab.document.write(
          `<iframe src="${base64}" width="100%" height="100%"></iframe>`
        );
      }
    };
  };

  const handleDescargarPDF = async () => {
    const blob = await pdf(
      <ReciboPDF
        numero={5}
        cliente="Pedro Gimenez"
        direccion="Cerro Colorado 2956 - Bella Vista"
        fecha="05/05/2025"
        montoTexto={numeroATextoCompleto(210000)}
        formaPago="Efectivo"
        detalles="Prueba"
        nroVenta="ACF127YRT"
        importeImputado="210000"
      />
    ).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "recibo_test.pdf";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto h-screen flex flex-col gap-4 p-4">
      <Button onClick={handleEnviar} disabled={enviando} variant="outline">
        {enviando ? 'Enviando...' : 'Enviar Recibo por Email'}
      </Button>
      <Button onClick={handleVerPDF} variant="secondary">
        Ver PDF en pestaña nueva
      </Button>
      <Button onClick={handleDescargarPDF} variant="default">
        Descargar PDF
      </Button>
    </div>
  );
}

// Utilidad para convertir Blob a base64 (sin encabezado)
const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString() || '';
      const base64 = result.split(',')[1]; // Remueve el encabezado "data:application/pdf;base64,"
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
