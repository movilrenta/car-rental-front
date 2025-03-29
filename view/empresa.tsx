// import { PageUnderConstruction } from "@/components/page-under-construction";
import Image from "next/image";
import BannerPage from "./banner-page";
import ImageCompany from "@/public/images2/mr-company.jpg";
import { ListRender } from "@/components/list-render";
// import { FormContact } from "@/components/empresa/form-contact";

const EmpresaText = {
  title: "Leasing operativo o renting de vehículos y utilitarios a largo plazo",
  subtitle:
    "Un sistema que le permitirá a su empresa obtener ventajas impositivas, financieras, en costos y nivel de servicio.",
  description:
    "Somos la primera empresa de alquiler de autos, creada para empresas y formada por gente que conoce las necesidades que las mismas tienen. Si usted está pensando en renovar su flota, realizar un contrato de trabajo por tiempo limitado, presentarse a una licitación, formar una UTE para realizar obras, etc., no dude en consultarnos",
  listItems: [
    {
      title: "Ventajas y beneficios",
      subItems: [
        {
          title:
            "Mejor aprovechamiento del capital, evitando la inmovilizacion del mismo o la liberación de la capacidad crediticia.",
        },
        {
          title:
            "Le ofrece importantes beneficios impositivos: crédito fiscal mensual por el pago de la cuota, disminuciones en el activo, en las deudas del pasivo y en el pago de impuesto a las ganancias.",
        },
        {
          title:
            "Olvidese del pago de: Patentes, Seguro, Transferencia, Mantenimiento e Impuestos.",
        },
        {
          title:
            "Le ofrece un presupuesto cerrado, evitando confusos gastos dispersos contablemente.",
        },
        {
          title:
            "Facilita los cálculos de costo eliminando imprevistos: Flota reserva, etc.",
        },
        {
          title:
            "No necesita estructura propia o de terceros para el mantenimiento.",
        },
        { title: "Evita personal administrativo para control de flota." },
        {
          title:
            "No tiene unidades inmovilizadas o para absorver necesidades temporarias.",
        },
        {
          title:
            "Tiene siempre una flota de no más de 12 meses, acorde con la imagen de su empresa.",
        },
        {
          title:
            "Reemplazo inmediato de la unidad por services, desperfectos o siniestros.Le ofrece asistencia en las principales ciudades del país a través de una red de alquiladoras.",
        },
      ],
    },
  ],
  subtitleForm: "Solicite presupuesto",
  descriptionForm:
    "Complete el siguiente formulario para cotizar una solución a medida de las necesidades concretas de su empresa.",
};

// const EmpresaFormText = {
//   name: {
//     label: "Nombre y Apellido",
//     placeholder: "José Perez",
//   },
//   email: {
//     label: "Correo Electrónico",
//     placeholder: "joseperez@email.com",
//   },
//   phone: {
//     label: "Teléfono",
//     placeholder: "(+54)1122334455",
//   },
//   company: {
//     label: "Empresa",
//     placeholder: "Empresa S.A.",
//   },
//   description: {
//     label: "Detalle sus necesidades",
//     placeholder: "Detalle",
//   },
//   buttonConfirmText: "Finalizar consulta",
// };

export const Empresa = () => {
  return (
    <div className="min-h-screen fade-in space-y-2 mb-7 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage title="Empresas" image="/images2/carBanner.webp" />
      {/* <PageUnderConstruction /> */}
      <div className="grid grid-cols-12 md:px-4 lg:px-0 gap-4 lg:gap-x-2 max-w-7xl lg:mx-auto">
        <div className="col-span-full flex flex-col gap-4 p-4 lg:col-span-7">
          <h1 className="text-red-600 font-bold text-xl lg:text-3xl">
            {EmpresaText.title}
          </h1>
          <Image
            src={ImageCompany}
            alt="Hombre en el interior de un vehiculo"
            width={400}
            height={300}
            className="h-auto object-contain w-full rounded-sm"
          />
          <h2 className="text-red-700 dark:text-red-600 font-light lg:text-xl">
            {EmpresaText.subtitle}
          </h2>
          <p className="font-semibold">{EmpresaText.description}</p>
        </div>
        <div className="col-span-full lg:col-span-5">
          <ListRender items={EmpresaText.listItems} counterItem={false} />
        </div>
        {/* Formulario de contacto */}
        {/* <hr className="border-t border-gray-300 rounded-full col-span-full my-2 px-4" />
        <div className="col-span-full p-4">
          <h2 className="text-center text-red-700 mb-4 dark:text-red-600 text-xl font-semibold lg:text-2xl">
            {EmpresaText.subtitleForm}
          </h2>
          <h3 className="text-center mb-4 text-lg text-gray-700 dark:text-white">
            {EmpresaText.descriptionForm}
          </h3>
          <FormContact text={EmpresaFormText} />
        </div> */}
      </div>
    </div>
  );
};
