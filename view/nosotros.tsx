import Image from "next/image";

import { getTranslations } from "next-intl/server";

import ImgAbout from "@/public/images2/mr-about.jpg";
import BannerPage from "./banner-page";

interface NosotrosText {
  title: string;
  listItem: {
    item: string;
    content: string;
  }[];
}

export const Nosotros = async () => {
  const t = await getTranslations("NosotrosPage");
  const listDescription = t.raw("listDescription") as {
    title: string;
    content: string;
  }[];

  const principales:NosotrosText[] = t.raw("principales")

  return (
    <div className="w-full min-h-screen animate-fade-in space-y-2 md:space-y-6 text-gray-900 dark:text-white mb-7">
      <BannerPage title={t("bannerTitle")} image="/images2/carBanner.webp" />
      <div className="grid grid-cols-12 gap-4 lg:gap-6 max-w-7xl mx-auto px-4 md:px-6 lg:px-0">
        <div className="col-span-full lg:col-span-8 flex flex-col gap-4">
          <div className="w-full overflow-hidden rounded-md">
            <Image
              src={ImgAbout}
              width={400}
              height={300}
              alt="Imagen nosotros"
              className="h-auto object-contain w-full hover:scale-105 transition-all duration-300"
            />
          </div>
          <h3 className="text-lg md:text-xl lg:text-2xl text-red-700 dark:text-red-500 font-light">
           {t("title")}
          </h3>
          <p>
            {t("subtitle")}
          </p>
          <p className="text-lg font-semibold">
            {t("discription")}
          </p>
          <ul className="space-y-2 dark:text-gray-300">
            {listDescription.map((item, index) => (
              <li key={index}>
                <span className="text-gray-800 dark:text-white font-semibold">
                 {item.title}
                </span>{" "}
                {item.content}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-full lg:col-span-4">
          {principales.map((item, index) => (
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
      </div>
    </div>
  );
};
