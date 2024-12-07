"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLinks({burger = false} : {burger?: boolean}) {
  const path = usePathname();
  const pathNoSlash = path.replace("/", "");

  const LinksNavbar = [
    { label: "Reservas", link: "reservas" },
    { label: "Empresas", link: "empresas" },
    { label: "Flota de vehículos", link: "flota" },
    { label: "Nosotros", link: "nosotros" },
  ];

  return (
    <div className={`${burger ? "sm:hidden" : "hidden sm:block"} my-6 mx-4 sm:mx-14`}>
      <ul className={`flex ${burger ? "flex-col" : ""} flex-wrap -m-1`}>
        {LinksNavbar.map((item, index) => (
          <li key={index} className="m-1">
            <Link
              href={`/${item.link}`}
              className={`inline-flex items-center justify-center text-sm font-medium leading-5 rounded-full px-3 py-1 ${
                pathNoSlash === item.link
                  ? "border border-transparent shadow-sm bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-800"
                  : "border hover:bg-red-700 hover:text-white border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              } transition`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
