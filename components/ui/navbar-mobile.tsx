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
import { useAuthstore } from "@/stores/auth-store/login.store";
import ThemeToggle from "../theme-toggle";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import LanguageSwitcher from "@/app/[locale]/LocaleSwitcher";

export const NavbarMobile = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const pathname = usePathname();
  const isLogged = useAuthstore((state) => state.getLog());
  const LinksNavbar = [
    { label: "Reservas", link: "/reservas" },
    { label: "Empresas", link: "/empresas" },
    { label: "Flota de vehículos", link: "/flota" },
    { label: "Contacto", link: "/contacto" },
    { label: "Nosotros", link: "/nosotros" },
    // { label: "Mi reserva", link: "/mi-reserva" },
  ];

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
            {LinksNavbar.map((link) => (
              <li key={link.label}>
                <Link
                  onClick={() => setToggle(false)}
                  href={link.link}
                  className={clsx(
                    "text-xl font-semibold hover:border-b-2 border-red-400",
                    {
                      "text-red-500": pathname === link.link,
                    },
                    `${link.label === "Mi reserva" ? "text-xl" : ""}`
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <SheetFooter className="flex !flex-col items-center w-full gap-4">
          <LanguageSwitcher />
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
