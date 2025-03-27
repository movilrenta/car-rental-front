import React from "react";
import BannerPage from "./banner-page";
import { ListRender } from "@/components/list-render";
//import { PageUnderConstruction } from "@/components/page-under-construction";

interface ListItem {
  title: string;
  content?: string; 
  subItems?: ListItem[];
}

const termsAndConditions: ListItem[] = [
  {
    title: "A cargo de Móvil Renta:",
    subItems: [
      { title: "Mantenimiento" },
      {
        title: "Sustitución del auto por avería o accidente:",
        subItems: [
          { title: "En forma inmediata en nuestra oficina" },
          { title: "Dentro de las 24 horas fuera de nuestra oficina" },
          {
            title:
              "Los autos de reemplazo podrán tener iguales o similares características al original alquilado.",
          },
        ],
      },
      {
        title:
          "Seguros de Responsabilidad Civil para terceros transportados y/o no transportados, daños a cosas y/o a personas hasta $ 10.000.000.-",
      },
      { title: "Asistencia mecánica, sanitaria y remolque las 24 horas." },
    ],
  },
  {
    title: "A cargo del cliente:",
    subItems: [
      { title: "Combustible" },
      { title: "Multas de tránsito" },
      { title: "Excedentes" },
      { title: "Peajes" },
      { title: "Cargos por drop-off" },
      {
        title:
          "Franquicias por faltantes, daños, robo y/o vuelco del vehículo.",
      },
    ],
  },
  {
    title: "Reducción de la franquicia:",
    content:
      "El cliente puede reducir su responsabilidad de la franquicia pagando un seguro adicional. Para reducir la franquicia de los alquileres mensuales el cliente deberá pagar el equivalente a 18 días de seguro adicional conforme a la categoría de auto asignado. Será de exclusiva responsabilidad del cliente todo daño al vehículo causado por uso indebido, negligencia, o la no observancia de los mecanismos preventivos de la unidad (señales sonoras o lumínicas), cruce de ríos, y/o por circular por caminos de tierra, ripio, arena o cualquier otro no pavimentado, aunque el costo exceda la franquicia, eximiendo a Móvil Renta de producirse la inmovilización del vehículo por estas causas, de toda responsabilidad por demoras, pérdidas, gastos y sustitución del vehículo. Esta garantía y obligación incluye todo daño o infracción cometida por cualquier persona, que utilice el vehículo durante la vigencia del contrato de alquiler",
  },
  {
    title: "Requisitos para el conductor:",
    subItems: [
      {
        title:
          "Los conductores deberán ser mayores de 25 años de edad, tener licencia de conducir vigente y documento de identidad actualizado.",
      },
      {
        title:
          "Para retirar un auto deberá presentarse una tarjeta de crédito (Visa, American Express, Diners, Mastercard, etc.).",
      },
    ],
  },
  {
    title: "Faltante de combustible:",
    content:
      "Móvil Renta cobrará al cliente un excedente por servicio en caso que éste no devuelva el vehículo alquilado con la misma cantidad de combustible como fue entregado originalmente.",
  },
  {
    title: "Entrega del vehículo:",
    content:
      "El cliente asumirá la responsabilidad del contenido y los cargos detallados en el acta de devolución del vehículo, cuando entregara el mismo, fuera del horario de atención al público o dentro de ese horario cuando no esperase la devolución de dicho documento y la verificación del vehículo.",
  },
  {
    title: "Aviso de cancelación de reserva confirmada:",
    content:
      "En caso que el cliente tenga una reserva confirmada y deba suspender ese alquiler es de suma importancia que lo informen a Móvil Renta con la mayor anticipación posible.",
  },
  {
    title: "Tasa de aeropuertos:",
    content:
      "Los alquileres tomados en Aeropuertos NO tendrán recargo en concepto de tasa de aeropuerto.",
  },
];

export const TerminosCondiciones = () => {
  return (
    <div className="min-h-screen fade-in mx-auto space-y-2 md:space-y-6 text-gray-900 dark:text-white">
    <BannerPage title="Términos y condiciones" image="/images2/carBanner.webp" />
    <ListRender items={termsAndConditions} />
    </div>
  );
};
