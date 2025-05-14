import { Confirm } from "@/view";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('ReservaPage.ConfirmarPage');

  return {
    title: t('meta.title'),
  };
}
export default function ConfirmarPage() {
  return <Confirm />;
}