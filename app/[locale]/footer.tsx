import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Footer({ locale }: { locale: string }) {
  const footerItems = footerInfo[locale as "es" | "en"];
  return (
    <div className="grid grid-cols-4 px-16 gap-y-6 place-content-start bg-zinc-700 text-white pt-6 mx-auto ">
      {footerItems.map((item, index) => (
        <div
          key={index}
          className="col-span-4 sm:col-span-2 lg:col-span-1 flex flex-col"
        >
          <div className="py-1 font-semibold text-xl text-red-200">
            {item.title}
          </div>
          {item.items.map((item, index_item) => (
            <Link
              key={index_item}
              aria-label={item.label}
              href={item.link as any}
              className="py-1 hover:underline w-fit"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
      <Link href={"/home"} aria-label="enlace que redirige al inicio de la pagina" className="col-span-4 my-12">
        <Image
          src={"/images2/brandFoot.webp"}
          alt="logo de la empresa Movil Renta en gris"
          width={300}
          height={200}
          className="w-auto mx-auto"
        />
      </Link>
    </div>
  );
}

const footerInfo = {
  
    es: [
      {
        title: "Reservas",
        items: [
          {
            label: "Alquiler Particulares",
            link: "/reservas",
          },
          {
            label: "Soluciones para empresas",
            link: "/empresas",
          },
        ],
      },
      {
        title: "Servicios",
        items: [
          {
            label: "Nuestra flota de vehículos",
            link: "/flota",
          },
          {
            label: "Términos y condiciones",
            link: "/ayuda/terminos-y-condiciones",
          },
        ],
      },
      {
        title: "Ayuda",
        items: [
          {
            label: "Consejos de seguridad",
            link: "/ayuda",
          },
        ],
      },
      {
        title: "Movil Renta",
        items: [
          {
            label: "Contactanos",
            link: "/contacto",
          },
          {
            label: "Quienes somos",
            link: "/nosotros",
          },
        ],
      },
    ],
    en: [
      {
        title: "Reservations",
        items: [
          {
            label: "Private Rentals",
            link: "/reservas",
          },
          {
            label: "Business Solutions",
            link: "/empresas",
          },
        ],
      },
      {
        title: "Services",
        items: [
          {
            label: "Our Vehicle Fleet",
            link: "/flota",
          },
          {
            label: "Terms and Conditions",
            link: "/ayuda/terminos-y-condiciones",
          },
        ],
      },
      {
        title: "Help",
        items: [
          {
            label: "Safety Tips",
            link: "/ayuda",
          },
        ],
      },
      {
        title: "Movil Renta",
        items: [
          {
            label: "Contact Us",
            link: "/contacto",
          },
          {
            label: "About Us",
            link: "/nosotros",
          },
        ],
      },
    ],
  }    