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
import { getTranslations } from "next-intl/server";

const iconMap = {
  location: <IoLocationSharp className="text-red-600 text-[2rem] w-12 min-w-12" />,
  clock: <FaClock className="text-red-600 text-[1.2rem] w-12 min-w-12" />,
  headphones: <FaHeadphonesSimple className="text-red-600 text-[1.4rem] w-12 min-w-12" />,
  phone: <FaPhoneAlt className="text-red-600 text-[1.3rem] w-12 min-w-12" />,
  garage: <GiMechanicGarage className="text-red-600 text-[1.6rem] w-12 min-w-12" />,
};
export const Contacto = async () => {
  const t = await getTranslations("ContactoPage")
  const contactText = t.raw("contactText") as {
    icon: keyof typeof iconMap;
    title: string;
    content: string;
  }[];

  return (
    <div className="min-h-screen animate-fade-in mb-7 space-y-2 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage title={t("bannerTitle")} image="/images2/carBanner.webp" />

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
                <div className="w-1/12 lg:w-auto mr-2">{iconMap[item.icon]}</div>
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
            {t("form.title")}
          </h2>
          <h4 className="text-center mb-4 text-base md:text-lg text-gray-700 dark:text-white">
            {t("form.subtitle")}
          </h4>
          <FormContact text={EmpresaFormText} />
        </div>
      </div>
    </div>
  );
};
