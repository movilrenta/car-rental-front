import Image from "next/image";
import imageConstruction from "@/public/images2/under-construction.webp";
import Link from "next/link";

export const PageUnderConstruction = () => {
  return (
    <div className="max-w-lg flex justify-center mx-auto mb-4 min-h-screen">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src={imageConstruction}
            width={350}
            height={350}
            alt="Imagen sitio en construcción"
            className="w-auto"
          />
        </Link>
    </div>
  );
};
