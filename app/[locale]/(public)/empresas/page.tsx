import { Empresa } from "@/view";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('EmpresaPage');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function EmpresasPage() {
  return (
   <Empresa/>
  );
}