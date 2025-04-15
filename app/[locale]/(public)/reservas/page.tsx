import ReservaView from "@/view/reserva";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "Metadata" });
  return {
    title: t("bookingTitle")
  };
}

export default function ReservasPage() {
  return <ReservaView />;
}