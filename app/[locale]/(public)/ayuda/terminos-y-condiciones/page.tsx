import { Metadata } from "next";
import { TerminosCondiciones } from "@/view";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('AyudaPage.terminosYCondiciones');

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function TerminosYCondicionesPage() {
  return (
    <TerminosCondiciones/>
  );
}