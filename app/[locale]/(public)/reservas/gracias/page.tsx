import { Gracias } from "@/view/gracias";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('GraciasPage');

  return {
    title: t('meta.title'),
  };
}

export default function GraciasPage() {
  return <Gracias />;
}
