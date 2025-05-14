import { Nosotros } from "@/view";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('NosotrosPage');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function NosotrosPage() {
  return (
   <Nosotros/>
  );
}