import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="grid grid-cols-4 px-16 gap-y-6 place-content-start bg-zinc-700 text-white pt-6 mx-auto ">
    {footerInfo.map((item, index) => (
      <div key={index} className="col-span-4 sm:col-span-2 lg:col-span-1 flex flex-col">
        <h5 className="py-1 font-semibold text-xl text-red-200">{item.title}</h5>
        {item.items.map((item, index_item) => (
          <Link key={index_item} href={item.link} className="py-1 hover:underline w-fit">{item.label}</Link>
        ))}
      </div>
    ))}
    <div className="col-span-4 my-12">
      <Image src={"/images2/brandFoot.webp"} alt="logo" width={300} height={200} className="w-auto mx-auto"/>
    </div>
  </div>
  )
}

const footerInfo = [
  {
    title: "Reservas",
    items: [
      {
        label: "Alquiler Particulares",
        link: "/reservas"
      },
      {
        label: "Soluciones para empresas",
        link: "/empresas"
      },
    ]
  },
  {
    title: "Servicios",
    items: [
      {
        label: "Nuestra flota de vehículos",
        link: "/flota"
      },
      {
        label: "Términos y condiciones",
        link: "/ayuda/terminos-y-condiciones"
      },
    ]
  },
  {
    title: "Ayuda",
    items: [
      {
        label: "Consejos de seguridad",
        link: "/ayuda"
      }
    ]
  },
  {
    title: "Movil Renta",
    items: [
      {
        label: "Contactanos",
        link: "/contacto"
      },
      {
        label: "Quienes somos",
        link: "/nosotros"
      },
    ]
  }
]