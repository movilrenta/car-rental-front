import React from "react";
import Image from "next/image";
import BannerPage from "./banner-page";

import { FaClock, FaPhoneAlt } from "react-icons/fa";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { GiMechanicGarage } from "react-icons/gi";

import imgContacto from "@/public/images2/mr-contacto.jpg";
import { FormContact } from "@/components/empresa/form-contact";
import { EmpresaFormText } from "./empresa";
// import { PageUnderConstruction } from "@/components/page-under-construction";

const contactText = [
  {
    icon: <IoLocationSharp className="text-red-600 text-[1.2rem]" />,
    title: "Dirección:",
    content: "San Lorenzo 370, S.M. de Tucumán, Tucumán (T4000CAJ) Argentina.",
  },
  {
    icon: <FaClock className="text-red-600 text-[1.2rem]" />,
    title: "Horarios de atención:",
    content:
      "Lunes a viernes de 8:00 a 20:00 hs/ Sábado 9:00 a 12:00 y de 17:00 a 19:00 hs.",
  },
  {
    icon: <FaHeadphonesSimple className="text-red-600 text-[1.2rem]" />,
    title: "Linea gratuita",
    content: "0800 777 7368",
  },
  {
    icon: <FaPhoneAlt className="text-red-600 text-[1.2rem]" />,
    title: "Atención al cliente",
    content: "+54 9 381 4310550",
  },
  {
    icon: <GiMechanicGarage className="text-red-600 text-[1.2rem]" />,
    title: "Servicio de emergencia mecánica 24hs",
    content: " +54 9 381 3648505",
  },
];

const contactTitleForm = {
  title: "Esperamos su consulta",
  subtitle:
    "Complete el siguiente formulario para cotizar una solución a medida de las necesidades concretas de su empresa.",
};

export const Contacto = () => {
  return (
    <div className="min-h-screen animate-fade-in mb-7 space-y-2 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage title="Contactanos" image="/images2/carBanner.webp" />
      {/* <PageUnderConstruction /> */}
      <div className="grid grid-cols-12 p-4 gap-4 md:gap-6 max-w-7xl mx-auto">
        <div className="col-span-full grid grid-cols-12 space-y-4 md:gap-4 lg:gap-6">
          {/* imagen */}
          <div className="col-span-full md:col-span-6 lg:col-span-4 overflow-hidden rounded-md">
            <Image
              quality={100}
              src={imgContacto}
              alt="persona dentro de automovil"
              width={350}
              height={550}
              className="w-full object-cover md:hover:scale-105 transition-all duration-300"
            />
          </div>
          <ul className="col-span-full md:col-span-6 lg:col-span-8 space-y-4">
            {contactText.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1/12 lg:w-auto lg:mr-2">{item.icon}</div>
                <div className="w-11/12 lg:w-auto lg:mr-2 text-sm md:text-base">
                  <h4>{item.title}</h4>
                  <p className="font-semibold">{item.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <hr className="border-t border-gray-300 rounded-full col-span-full my-2 px-4" />
        <div className="col-span-full space-y-4 md:space-y-6 max-w-3xl mx-auto">
          <h2 className="text-center text-red-700 mb-4 dark:text-red-600 text-xl font-semibold lg:text-2xl">
            {contactTitleForm.title}
          </h2>
          <h4 className="text-center mb-4 text-base md:text-lg text-gray-700 dark:text-white">
            {contactTitleForm.subtitle}
          </h4>
          <FormContact text={EmpresaFormText} />
        </div>
      </div>
    </div>
  );
};
