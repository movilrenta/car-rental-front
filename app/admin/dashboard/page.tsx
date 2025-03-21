import brand from '@/public/images2/brand.png'
import Image from "next/image";

export default function AdminPage() {
  return (
    <div className="h-full w-full flex flex-col p-6 items-center">
      <h1 className="text-xl">Administración de MOVIL RENTA</h1>
      <p className="text-sm text-neutral-400">
        Panel de administración de todo lo referido a los autos
      </p>
      <div className="pointer-events-none">
        <div className="mt-10">
          <Image
          src={brand}
          alt="Movil Renta brand"
          width={280}
          height={200}
          className="w-auto object-fill"
          />
        </div>
      </div>
    </div>
  );
}