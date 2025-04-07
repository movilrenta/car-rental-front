import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import NavbarLinks from "./navbar-links";
import ThemeToggle from "@/components/theme-toggle";
import { NavbarMobile } from "@/components/ui/navbar-mobile";

export default function Navbar() {

  return (
    <>
      <div className="flex sm:flex-row justify-between relative dark:bg-zinc-700 max-w-full z-0">
        {/* Left: Title */}
        <Link href={"/"} className="my-4 sm:mb-0 sm:my-1 mx-4 sm:mx-14 z-0">
          <Image
            src={"/images2/brand.png"}
            alt="logo"
            width={450}
            height={300}
            quality={100}
            priority={true}
            className="w-auto md:h-24 py-0 sm:py-2"
          />
          {/* <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Discover Meetups</h1> */}
        </Link>

        {/* Right: Actions */}
        <div className="hidden lg:flex sm:auto-cols-max justify-start sm:justify-end items-center gap-2 relative w-full sm:w-fit z-10 h-12">
        <ThemeToggle />
          <div className="flex gap-8 w-full sm:w-fit justify-center items-center bg-red-800 text-white px-6 h-12 sm:rounded-es-3xl text-sm font-medium py-2">
            <Link href="tel:08007777368" className="flex justify-center items-center gap-2 text-nowrap">
              <FaPhoneAlt /> 0800 777 7368
            </Link>
            <Link
            href="https://maps.app.goo.gl/xi1a76ER778BHCCQA"
            className="flex justify-center items-center gap-2 text-nowrap"
            target="_blank"
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
          </div>
        </div>
        <div className="flex lg:hidden absolute inset-y-0 right-4">
          <NavbarMobile/>
        </div>
      </div>
      <NavbarLinks />
    </>
  );
}
