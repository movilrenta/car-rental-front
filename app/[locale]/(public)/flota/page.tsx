import { GetCarsAction } from "@/actions/car";
import { Flota } from "@/view";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "Metadata" });
  return {
    title: t("fleetTitle")
  };
}

export default async function FlotaPage() {
  const resp = await GetCarsAction();
  if (!resp) {
    redirect("/home");
  }
  return <Flota cars={resp} />;
}
