import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function LogoNavbar() {
  return (
    <Link href={"/home"} aria-label="boton de arriba - logo de la empresa - lleva al inicio" className="my-4 sm:mb-0 sm:my-1 ms-4 z-0">
      <Image
        src={"/images2/brand.png"}
        alt="logo de la empresa Movil Renta"
        width={450}
        height={300}
        quality={100}
        priority={true}
        className="w-full md:h-24 py-0 sm:py-2"
      />
      <h1 className="sr-only">Alquiler de autos en tucuman, salta, santiago y jujuy</h1>
    </Link>
  );
}
