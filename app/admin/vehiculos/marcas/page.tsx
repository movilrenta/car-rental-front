import { getBrands } from "@/actions";
import { BrandTable } from "./components/brands-table";

export default async function BrandsPage() {
  const { ok, data: Brands } = await getBrands();
  if (!ok)
    return (
      <div className="grid place-content-center">
        <h2 className="text-center text-2xl">
          Hubo un problema al cargar <span className="italic">Marcas</span>
        </h2>
      </div>
    );
  return (
    <main className="animate-fade-in p-6 relative">
      <BrandTable Brands={Brands || []} />
    </main>
  );
}
