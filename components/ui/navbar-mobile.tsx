"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet";
import { FaBars, FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
//import { useAuthstore } from "@/stores/auth-store/login.store";
import ThemeToggle from "../theme-toggle";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import LanguageSwitcher from "@/app/[locale]/LocaleSwitcher";

export const NavbarMobile = ({locale}:{locale: string}) => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const pathname = usePathname();
  //const isLogged = useAuthstore((state) => state.getLog());
  const LinksNavbar = [
    { label: "Booking", label_es: "Reservas", path: "booking", path_es: "reservas" },
    { label: "Companies", label_es: "Empresas", path: "companies", path_es: "empresas" },
    { label: "Fleet", label_es: "Flota", path: "fleet", path_es: "flota" },
    { label: "About", label_es: "Nosotros", path: "about", path_es: "nosotros" },
    { label: "Contact", label_es: "Contacto", path: "contact", path_es: "contacto" },
  ]

  return (
    <Sheet open={toggle} onOpenChange={(open) => setToggle(open)}>
      <SheetTrigger>
        <FaBars size={25} />
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between bg-neutral-200">
        <div className="absolute left-4 top-4">
          <ThemeToggle />
        </div>
        <SheetHeader>
          <SheetTitle>
            {" "}
            <Link
              href="/home"
              className="flex justify-center items-center my-7"
            >
              <Image
                src={"/images2/brand.png"}
                alt="movil-renta"
                width={150}
                height={150}
                className="h-auto w-full max-w-52 m-auto"
              />
            </Link>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-full">
          <ul className="flex flex-col items-center gap-6">
            {LinksNavbar.map((item) => {
              const localizedPath = locale === "es" ? item.path_es : item.path
              const localizedLabel = locale === "es" ? item.label_es : item.label
              const fullPath = `/${locale}/${localizedPath}`;
              const isActive = pathname === fullPath;
              return (
              <li key={item.label}>
                <Link
                  onClick={() => setToggle(false)}
                  href={fullPath}
                  className={clsx(
                    "text-xl font-semibold hover:border-b-2 border-red-400",
                    `${isActive ? "text-red-600" : ""}`
                  )}
                >
                  {localizedLabel}
                </Link>
              </li>
            )})}
          </ul>
        </div>
        <SheetFooter className="flex !flex-col items-center w-full gap-4">
          <LanguageSwitcher mobile={true}/>
          <Link
            href="tel:08007777368"
            className="flex justify-center items-center gap-2 text-nowrap"
          >
            <FaPhoneAlt /> 0800 777 7368
          </Link>
          <Link
            href="https://maps.app.goo.gl/xi1a76ER778BHCCQA"
            className="flex justify-center items-center gap-2 text-nowrap"
            rel="noopener noreferrer"
          >
            <FaLocationDot /> San Lorenzo 370
            
          </Link>
          <Link
            href="mailto:informes@movilrenta.com.ar"
            className="flex justify-center items-center gap-2 text-nowrap"
          >
            <MdEmail />
            informes@movilrenta.com.ar
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
