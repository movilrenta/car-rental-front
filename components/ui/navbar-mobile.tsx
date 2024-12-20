"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";
import { FaBars } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useAuthstore } from "@/stores/auth-store/login.store";

export const NavbarMobile = () => {
  const [toggle, setToggle] = React.useState<boolean>(false);
  const pathname = usePathname();
  const isLogged = useAuthstore((state) => state.isLogged);
  const LinksNavbar = [
    { label: "Reservas", link: "/reservas" },
    { label: "Empresas", link: "/empresas" },
    { label: "Flota de vehículos", link: "/flota" },
    { label: "Nosotros", link: "/nosotros" },
    { label: "Mi reserva", link: "/mi-reserva" },
  ];

  return (
    <Sheet open={toggle} onOpenChange={(open) => setToggle(open)}>
      <SheetTrigger>
        <FaBars size={25} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-screen">
          <div className="h-1/3">
            <Image
              src={"/images2/brand.png"}
              alt="movil-renta"
              width={150}
              height={150}
              className="h-auto"
            />
          </div>
          <ul className="flex flex-col items-center gap-6 h-2/3">
            {LinksNavbar.map((link) => (
              <li key={link.label}>
                <Link
                  onClick={() => setToggle(false)}
                  href={link.link}
                  className={clsx("text-lg hover:border-b-2 border-red-400", {
                    "text-red-500": pathname === link.link,
                  })}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {isLogged && (
              <li>
                <Link
                  onClick={() => setToggle(false)}
                  href="/admin"
                  className={clsx("text-lg hover:border-b-2 border-red-400", {
                    "text-red-500": pathname === "/reservas/reservation-list",
                  })}
                >
                  Lista de reservas
                </Link>
              </li>
            )}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};
