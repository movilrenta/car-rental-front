// import Image from "next/image";
// import ImgAbout from "@/public/images2/mr-about.jpg";
import { PageUnderConstruction } from "@/components/page-under-construction";
import BannerPage from "./banner-page";

// interface NosotrosText {
//   title: string;
//   listItem: {
//     item: string;
//     content: string;
//   }[];
// }

// const nosotrosText: NosotrosText[] = [
//   {
//     title: "Integridad",
//     listItem: [
//       {
//         item: "Respeto por los demás:",
//         content:
//           "Trataremos a todas las personas con las que trabajamos con respeto y cordialidad.",
//       },
//       {
//         item: "Responsabilidad:",
//         content:
//           "Cumpliremos todos nuestros compromisos con nuestros clientes y empleados.",
//       },
//       {
//         item: "Honestidad:",
//         content:
//           "Nos comunicaremos de manera abierta y honesta para ganar la confianza de nuestros clientes.",
//       },
//     ],
//   },
//   {
//     title: "Trabajo en equipo",
//     listItem: [
//       {
//         item: "Compañerismo y Solidaridad:",
//         content:
//           "Mantendremos una atmósfera de trabajo de compañerismo y solidaridad",
//       },
//       {
//         item: "Respeto y confianza:",
//         content:
//           "Nos comunicaremos con respeto y confianza para trabajar de manera adecuada.",
//       },
//     ],
//   },
//   {
//     title: "Calidad",
//     listItem: [
//       {
//         item: "Esfuerzo y constancia:",
//         content: "Nos esforzamos constantemente en dar nuestra mejor versión para que nuestros clientes puedan disfrutar de su experiencia con nosotros",
//       },
//       {
//         item: "Experiencia:",
//         content:
//           "Nos comprometemos a brindar un servicio efectivo y conveniente, ya que contamos con la suficiente experiencia en el rubro.",
//       },
//       {
//         item: "Efectividad en el servicio:",
//         content: "Fácil, rápido, seguro, económico (mejor precio garantizado).",
//       },
//       {
//         item: "Crecimiento e innovación:",
//         content:
//           "Nos comprometemos en el mantenimiento de nuestra flota de vehículos. Renovamos nuestra flota constantemente para poder disponer siempre de autos nuevos para nuestros clientes. Constantemente motivamos y capacitamos a nuestro equipo de trabajo para que puedan crecer y lograr sus metas, tanto profesionales como personales.",
//       },
//     ],
//   },
// ];

export const Nosotros = () => {
  return (
    <div className="w-full min-h-screen fade-in mx-auto space-y-2 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage title="Nosotros" image="/images2/carBanner.webp" />
      <PageUnderConstruction />
      {/* <div className="grid grid-cols-12 gap-4 lg:gap-6 max-w-7xl">
        <div className="col-span-full lg:col-span-8 flex flex-col gap-4">
          <Image
            src={ImgAbout}
            width={400}
            height={300}
            alt="Imagen nosotros"
            className="h-auto object-contain w-full rounded-md fade-in-5"
          />
          <h3 className="text-lg md:text-xl lg:text-2xl text-red-700 dark:text-red-500 font-light">
            Nuestra misión es brindar una experiencia de alquiler satisfactoria
            a nuestros clientes, proporcionando servicios convenientes para sus
            necesidades.
          </h3>
          <p>
            Nuestro inicio de actividad en el rubro se remonta al año 1971, por
            lo que nos ubicamos entre los pioneros de la actividad a nivel
            nacional.<br/> Nuestra experiencia nos permitió entender las necesidades
            de nuestros clientes para brindar un servicio de seguridad y calidad
            superior.
          </p>
          <p className="text-lg font-semibold">
            Cuando hablamos de niveles de seguridad y calidad, nos referimos a:
          </p>
          <ul className="space-y-2 dark:text-gray-300">
            <li>
              <span className="text-gray-800 dark:text-white font-semibold">Servicio:</span> Atención especializada por parte de nuestro
              personal, reemplazo inmediato de unidades por daños o services.
              Contamos con el servicio de NACIÓN SEGUROS Emergencia mecánicas
              las 24 hs.
            </li>
            <li>
              <span className="text-gray-800 dark:text-white font-semibold">Mantenimiento:</span> a nuestro cargo, con services
              preventivos programados.
            </li>
            <li>
              <span className="text-gray-800 dark:text-white font-semibold">Seguros:</span> Contratados en Nación Seguros compañía de
              seguros.
            </li>
            <li>
              <span className="text-gray-800 dark:text-white font-semibold">Documentación:</span> entregamos los vehículos con la
              documentación en regla, lo que evita eventuales demoras en
              controles camineros.
            </li>
          </ul>
        </div>
        <div className="col-span-full md:col-span-4">
          {nosotrosText.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mt-2">
              <h4 className="text-lg text-red-600 font-semibold">
                {item.title}
              </h4>
              <ul className="space-y-2">
                {item.listItem.map((listIt, i) => (
                  <li key={i}>
                    <span className="font-semibold">{listIt.item}</span>{" "}
                    {listIt.content}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
