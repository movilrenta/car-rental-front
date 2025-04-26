import { Ayuda } from "@/view/ayuda";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('AyudaPage.consejosDeSeguridad');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}
export default function AyudaPage() {
  return (
   <Ayuda/>
  );
}