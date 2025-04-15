import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function LogoNavbar() {
  return (
    <Link href={"/home"} className="my-4 sm:mb-0 sm:my-1 mx-4 sm:mx-14 z-0">
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
  );
}
