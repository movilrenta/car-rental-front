import Image from "next/image";
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdGTranslate } from "react-icons/md";
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
            width={300}
            height={200}
            priority={true}
            className="w-auto"
          />
          {/* <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Discover Meetups</h1> */}
        </Link>

        {/* Right: Actions */}
        <div className="hidden sm:flex sm:auto-cols-max justify-start sm:justify-end gap-2 relative w-full sm:w-fit z-10">
          <div className="flex gap-8 w-full sm:w-fit justify-center items-center bg-red-800 text-white px-6 sm:absolute sm:top-0 sm:right-0 sm:rounded-es-3xl text-sm font-medium py-2">
            <div className="flex justify-center items-center gap-2 text-nowrap">
              <FaPhoneAlt /> 0800 777 7368
            </div>
            <div className="flex justify-center items-center gap-2 text-nowrap">
              <FaLocationDot /> San Lorenzo 370
            </div>
            <div className="flex justify-center items-center gap-2 text-nowrap">
              <MdGTranslate />
              <span className="hidden md:block">In english</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="block md:hidden absolute top-4 right-4">
          <NavbarMobile/>
        </div>
      </div>
      <NavbarLinks />
    </>
  );
}
