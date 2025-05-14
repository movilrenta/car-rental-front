import PayForm from './pay-form'
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "PaymentsPage.meta" });
  return {
    title: t("title"),
    description: t("description")
  };
}

export default async function Payments() {
  return (
    <PayForm />
  )
}