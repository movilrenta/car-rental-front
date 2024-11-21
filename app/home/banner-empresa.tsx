import Image from "next/image";
import Link from "next/link";
import { FaCheck } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import bannerEmpresa from "@/public/images2/banner-empresa.jpg";

export const BannerEmpresa = () => {
  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 md:gap-4 bg-white dark:bg-gray-800 shadow-sm my-6 py-8 px-4 sm:px-14 overflow-clip">
      <Image
          src={bannerEmpresa}
          width={400}
          height={400}
          alt="banner empresa"
          className="absolute w-auto right-0 h-full hidden lg:block"
        />
      <div className="h-full col-span-6 p-6">
        <h2 className="font-semibold text-4xl text-red-700 mb-6">Soluciones para empresas</h2>
        <h3 className="text-lg font-semibold mb-4">
          Aproveche las ventajas de nuestro leasing operativo o renting de
          vehículos a largo plazo.
        </h3>
        <ul className="flex flex-col h-48 lg:h-1/2 justify-evenly">
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>Rentabilidad</li>
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>Importantes beneficios impositivos</li>
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>Despreocupese del mantenimiento e impuestos</li>
          <li className="flex items-center gap-2"><FaLongArrowAltRight/>Renovación permanente de flota</li>
        </ul>
        <Link
          className="btn text-red-800 border border-red-800  hover:bg-red-800 hover:text-slate-50 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white whitespace-nowrap"
          href="/"
        >
          Más información
        </Link>
      </div>
      <div className="h-full col-span-6 relative">
        <div className="w-full lg:h-full flex items-center p-6">
          <div className="bg-red-800 bg-opacity-80 w-full py-6 px-10" >
            <ul className="h-full flex flex-col gap-6 text-sm sm:text-lg lg:text-xl justify-evenly">
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /> <span className="font-bold">+350</span> unidades último modelo
              </li>
							<hr className="bg-slate-50 w-full" />
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /><span className="font-bold">Cobertura</span> en toda la región
              </li>
							<hr className="bg-slate-50 w-full" />
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /><span className="font-bold">Renovación</span> permanente
              </li>
							<hr className="bg-slate-50 w-full" />
              <li className="flex items-center gap-2 text-slate-50">
                <FaCheck /><span className="font-bold">Beneficios</span> impositivos
              </li>
            </ul>
          </div>
        </div>
        
      </div>
    </div>
  );
};
