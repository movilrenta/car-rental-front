import { BannerCta } from '@/app/home/banner-cta'
import { BannerEmpresa } from '@/app/home/banner-empresa';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineSafety } from 'react-icons/ai';
import { BiSolidCarMechanic } from 'react-icons/bi';
import { GrUserExpert } from 'react-icons/gr';
import { IoCarSportOutline } from 'react-icons/io5';

export const Home = () => {
  return (
    <div className="flex flex-col gap-12 animate-fade-in mb-12">
      <BannerCta/>
      <div className="mx-4 sm:mx-16 overflow-clip">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-5 items-center text-4xl font-semibold text-red-700 dark:text-red-200">
          {carTipes.map((item, index) => (
            <Link href={item.link} key={index} className="flex flex-col items-center justify-center gap-6 group w-full md:w-80">
              <div className="w-fit relative">
              <h4>{item.name}</h4>
              <span className="absolute mx-auto inset-0 border-b-red-700 dark:border-b-red-200 border-b-4 w-0 group-hover:w-full duration-200"></span>
              </div>
              <Image src={item.image} alt="autos" width={400} height={300} className="w-full min-w-40 md:w-80 group-hover:scale-105 duration-200"/>
            </Link>
          ))}
        </div> 
      </div>

      <div className="mx-2 sm:mx-16">
        <h4 className="text-center text-3xl sm:text-5xl font-light pt-12 pb-8 font-inter">Calidad de servicio</h4>
        <p className="text-center text-lg max-w-[820px] mx-auto">Nuestra experiencia de más de 50 años, nos permite hoy ser la agencia de alquiler de vehículos sin chofer más importante de la región, ofreciendo un servicio de nivel internacional.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-[1220px] mx-auto pt-12 pb-12 px-16">
        {InfoUtil.map((item, index) => (
          <div key={index} className="col-span-4 sm:col-span-2 lg:col-span-1 text-red-700 dark:text-red-200">
            {item.icon}
            <h4 className="py-6 uppercase font-semibold text-center">{item.title}</h4>
            <p className="text-center font-light">{item.description}</p>
          </div>
        ))}
      </div>
      <BannerEmpresa />
    </div>
  );
}

const carTipes = [
  {
    name: "Autos",
    image: "/images2/cars.webp",
    link: "#"
  },
  {
    name: "Utilitarios",
    image: "/images2/vans.webp",
    link: "#"
  },
  {
    name: "Camionetas",
    image: "/images2/trucks.webp",
    link: "#"
  },
]

const InfoUtil = [
  {
    title: "Experiencia",
    description: "Atención personalizada, puntualidad, seguridad y respaldo.",
    icon: <GrUserExpert className="w-20 h-20 mx-auto"/>
  },
  {
    title: "Flota Propia",
    description: "Más de 350 unidades modernas, disponibilidad inmediata.",
    icon: <IoCarSportOutline className="w-20 h-20 mx-auto"/>
  },
  {
    title: "Seguro",
    description: "Contamos con el respaldo de Federación Patronal Seguros para su total tranquilidad.",
    icon: <AiOutlineSafety className="w-20 h-20 mx-auto"/>
  },
  {
    title: "Mantenimiento",
    description: "A nuestro cargo, con services preventivos programados.",
    icon: <BiSolidCarMechanic className="w-20 h-20 mx-auto"/>
  },
]
