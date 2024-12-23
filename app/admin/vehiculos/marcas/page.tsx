import { getBrands } from "@/actions";
import { BrandTable } from "./components/brands-table";
import CRUD_Brand from "./components/crud";
import { LuPlus } from "react-icons/lu";

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
      <CRUD_Brand
        children={
          <div className="border group duration-200 rounded-md w-fit px-2 bg-red-700 z-10 fixed top-20 right-6 flex gap-2 text-white items-center justify-center"><LuPlus className="text-3xl p-2 w-11 h-11" /><span className="">Nuevo</span></div>
        }
      />
      <BrandTable Brands={Brands || []} />
    </main>
  );
}
