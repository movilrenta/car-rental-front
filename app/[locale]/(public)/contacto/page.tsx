import { Metadata } from "next";
import { Contacto } from "@/view";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ContactoPage');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}
export default function ContactoPage() {
  return (
   <Contacto/>
  );
}