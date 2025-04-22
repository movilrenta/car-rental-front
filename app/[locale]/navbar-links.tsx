'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinks({locale}:{locale : string}) {
  const pathname = usePathname()

  const LinksNavbar = [
    { label: "Booking", label_es: "Reservas", path: "booking", path_es: "reservas" },
    { label: "Companies", label_es: "Empresas", path: "companies", path_es: "empresas" },
    { label: "Fleet", label_es: "Flota", path: "fleet", path_es: "flota" },
    { label: "About", label_es: "Nosotros", path: "about", path_es: "nosotros" },
    { label: "Contact", label_es: "Contacto", path: "contact", path_es: "contacto" },
  ]

  return (
    <div className="hidden lg:block my-6 mx-4">
      <ul className="flex flex-wrap -m-1">
        {LinksNavbar.map((item, index) => {
          const localizedPath = locale === "es" ? item.path_es : item.path
          const localizedLabel = locale === "es" ? item.label_es : item.label
          const fullPath = `/${locale}/${localizedPath}`;
          const isActive = pathname === fullPath;
          return (
            <li key={index} className="m-1">
              <Link
                href={fullPath}
                className={`
                  inline-flex items-center justify-center text-base font-semibold leading-5 rounded-full px-3 py-1 w-32 truncate line-clamp-1
                  border transition
                  ${isActive
                    ? " bg-red-700 text-white border-red-700 hover:bg-red-500"
                    : " bg-white dark:bg-gray-800 text-gray-500  dark:text-gray-400 border-gray-200 dark:border-gray-700/60 hover:bg-red-700 hover:text-white dark:hover:bg-red-700 dark:hover:text-white"
                  }
                `}
              >
                {localizedLabel}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}