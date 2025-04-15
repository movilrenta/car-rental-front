
import Image from "next/image";
import BannerPage from "./banner-page";
import ImageCompany from "@/public/images2/mr-company.jpg";
import { ListRender } from "@/components/list-render";
import { FormContact } from "@/components/empresa/form-contact";
import { getTranslations } from "next-intl/server";

export const EmpresaFormText = {
  name: {
    label: "Nombre y Apellido",
    placeholder: "José Perez",
  },
  email: {
    label: "Correo Electrónico",
    placeholder: "joseperez@email.com",
  },
  phone: {
    label: "Teléfono",
    placeholder: "(+54)1122334455",
  },
  company: {
    label: "Empresa",
    placeholder: "Empresa S.A.",
  },
  description: {
    label: "Detalle sus necesidades",
    placeholder: "Detalle",
  },
  buttonConfirmText: "Finalizar consulta",
  buttonSendingText: "Enviando consulta"
};

export const Empresa = async () => {
  const t = await getTranslations("EmpresaPage");
  const listItems = t.raw("benefits") as {
    title: string;
    subItems: { title: string }[];
  }[];

  return (
    <div className="min-h-screen animate-fade-in space-y-2 mb-7 md:space-y-6 text-gray-900 dark:text-white">
      <BannerPage title={t("bannerTitle")} image="/images2/carBanner.webp" />
      {/* <PageUnderConstruction /> */}
      <div className="grid grid-cols-12 md:px-4 lg:px-0 gap-4 lg:gap-x-2 max-w-7xl lg:mx-auto">
        <div className="col-span-full flex flex-col gap-4 p-4 lg:col-span-7">
          <h1 className="text-red-600 font-bold text-xl lg:text-3xl">
            {t("title")}
          </h1>
          <Image
            src={ImageCompany}
            alt={t("imageAlt")}
            width={400}
            height={300}
            className="h-auto object-contain w-full rounded-md"
          />
          <h2 className="text-red-700 dark:text-red-600 font-light lg:text-xl">
            {t("subtitle")}
          </h2>
          <p className="font-semibold">{t("description")}</p>
        </div>
        <div className="col-span-full lg:col-span-5">
          <ListRender items={listItems} counterItem={false} />
        </div>
        {/* Formulario de contacto */}
        <hr className="border-t border-gray-300 rounded-full col-span-full my-2 px-4" />
        <div className="col-span-full max-w-3xl mx-auto p-4">
          <h2 className="text-center text-red-700 mb-4 dark:text-red-600 text-xl font-semibold lg:text-2xl">
            {t("form.title")}
          </h2>
          <h3 className="text-center mb-4 text-lg text-gray-700 dark:text-white">
            {t("form.subtitle")}
          </h3>
          <FormContact text={EmpresaFormText} />
        </div>
      </div>
    </div>
  );
};
