import { GetBranchesAction } from '@/actions/branchs';
import { Home } from '@/view/home'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage.meta");
  return {
    title: t("title")
  };
}

export default async function Page ({ params }: { params: { locale: string } })  {
  const branches = await GetBranchesAction()
  return <Home branches={branches} params={params}/>
}
