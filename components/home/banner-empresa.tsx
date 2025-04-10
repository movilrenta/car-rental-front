import Image from "next/image";
import { Link } from '@/i18n/navigation'; // si usás next-intl con configuración recomendada
import { FaCheck } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import bannerEmpresa from "@/public/images2/banner-empresa.jpg";
import { getTranslations } from "next-intl/server";

export const BannerEmpresa = async () => {
  const t = await getTranslations('HomePage.Business');
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 md:gap-4 dark:bg-gray-800 shadow-sm my-6 py-8 px-2 sm:px-14 overflow-clip">
      <Image
          src={bannerEmpresa}
          width={400}
          height={400}
          alt="banner empresa"
          className="absolute w-auto right-0 h-full hidden lg:block"
        />
      <div className="h-full col-span-6 p-3 md:p-6 lg:mb-12 z-10">
        <h2 className="font-semibold text-2xl md:text-4xl text-red-700 mb-6">{t("title")}</h2>
        <h3 className="text-lg font-semibold mb-4 ">
        {t("description")}
        </h3>
        <ul className="flex flex-col h-48 lg:h-1/2 justify-evenly">
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>{t("li_1")}</li>
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>{t("li_2")}</li>
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>{t("li_3")}</li>
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>{t("li_4")}</li>
        </ul>
        <Link
          className="btn text-red-800 border border-red-800  hover:bg-red-800 hover:text-slate-50 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap"
          href="/empresas"
        >
          {t("button")}
        </Link>
      </div>
      <div className="h-full col-span-6 relative">
        <div className="w-full lg:h-full flex items-center p-3 md:p-6">
          <div className="bg-red-800 bg-opacity-80 w-full py-6 px-10" >
            <ul className="h-full flex flex-col gap-6 text-sm sm:text-lg lg:text-xl justify-evenly">
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /><span className="font-bold">{t("frame_1")}</span>{t("frame_1B")}
              </li>
							<hr className="bg-slate-50 w-full" />
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /><span className="font-bold">{t("frame_2")}</span>{t("frame_2B")}
              </li>
							<hr className="bg-slate-50 w-full" />
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /><span className="font-bold">{t("frame_3")}</span>{t("frame_3B")}
              </li>
							<hr className="bg-slate-50 w-full" />
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /><span className="font-bold">{t("frame_4")}</span>{t("frame_4B")}
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};
