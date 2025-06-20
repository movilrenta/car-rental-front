import { BannerCta } from '@/components/home/banner-cta'
import { BannerEmpresa } from '@/components/home/banner-empresa';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineSafety } from 'react-icons/ai';
import { BiSolidCarMechanic } from 'react-icons/bi';
import { GrUserExpert } from 'react-icons/gr';
import { IoCarSportOutline } from 'react-icons/io5';
import ButtonWhatsapp from './button-whatsapp';
import { getTranslations } from 'next-intl/server';

export const Home = async ({branches, params}:{branches:any, params: {locale: string}}) => {
  const t = await getTranslations('HomePage');
  return (
    <div className="flex flex-col gap-12 animate-fade-in mb-12">
      <BannerCta branches={branches} locale={params?.locale}/>
      <div className="mx-4 sm:mx-16 overflow-clip">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-5 items-center text-4xl font-semibold text-red-700 dark:text-red-200">
          {carTipes.map((item, index) => (
            <Link href={item.link} key={index} className="flex flex-col items-center justify-center gap-6 group w-full md:w-80">
              <div className="w-fit relative">
                <div>{t(`carTypes.${item.nameKey}`)}</div>
                <span className="absolute mx-auto inset-0 border-b-red-700 dark:border-b-red-200 border-b-4 w-0 group-hover:w-full duration-200"></span>
              </div>
              <Image
                src={item.image}
                alt={item?.alt}
                width={400}
                height={300}
                className="w-full min-w-40 md:w-80 group-hover:scale-105 duration-200"
              />
            </Link>
          ))}
        </div> 
      </div>

      <div className="mx-2 sm:mx-16">
        <div className="text-center text-3xl sm:text-5xl font-light pt-12 pb-8 font-inter">
          {t("quality.title")}
          </div>
        <p className="text-center text-lg max-w-[820px] mx-auto">{t("quality.subtitle")}</p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-[1220px] mx-auto py-10 px-6 md:px-16">
        {InfoUtil.map((item, index) => (
          <div key={index} className='col-span-4 md:col-span-2 lg:col-span-1 flex flex-col lg:flex-row'>
            <div className="flex lg:flex-col items-center gap-x-4 h-20 md:h-28 lg:h-52 gap-y-4 col-span-4 text-red-700 dark:text-red-200">
              {item.icon}
              <div className='flex flex-col justify-center lg:items-center lg:px-4 lg:gap-y-4'>
                <p className="py-0 uppercase font-semibold text-start lg:text-xl"> {t(`usefulInfo.${item.nameKey}.title`)}</p>
                <p className="text-sm md:text-base text-start font-light lg:text-center"> {t(`usefulInfo.${item.nameKey}.description`)}</p>
              </div>
            </div>
            {index < 3 && <div className='w-full lg:w-fit border md:hidden lg:block'></div>}
          </div>
        ))}
      </div>
      <BannerEmpresa />
      <ButtonWhatsapp />
    </div>
  );
}

const carTipes = [
  {
    nameKey: "car", // clave que se usará para traducir
    alt: "imagen de un auto",
    image: "/images2/cars.webp",
    link: "/flota?filter=car"
  },
  {
    nameKey: "utility",
    alt: "imagen de un vehiculo utilitario",
    image: "/images2/vans.webp",
    link: "/flota?filter=utility"
  },
  {
    nameKey: "van",
    alt: "imagen de una camioneta",
    image: "/images2/trucks.webp",
    link: "/flota?filter=van"
  },
]


const InfoUtil = [
  {
    nameKey: "experience",
    icon: <GrUserExpert aria-hidden="true" className="text-red-700 w-12 h-12 min-w-12 md:w-16 md:h-16 md:min-w-16"/>
  },
  {
    nameKey: "ownFleet",
    icon: <IoCarSportOutline aria-hidden="true" className="text-red-700 w-12 h-12 min-w-12 md:w-16 md:h-16 md:min-w-16"/>
  },
  {
    nameKey: "insurance",
    icon: <AiOutlineSafety aria-hidden="true" className="text-red-700 w-12 h-12 min-w-12 md:w-16 md:h-16 md:min-w-16"/>
  },
  {
    nameKey: "maintenance",
    icon: <BiSolidCarMechanic aria-hidden="true" className="text-red-700 w-12 h-12 min-w-12 md:w-16 md:h-16 md:min-w-16"/>
  }
]
