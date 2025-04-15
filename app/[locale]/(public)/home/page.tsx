import { GetBranchesAction } from '@/actions/branchs';
import { Home } from '@/view/home'
import { Metadata } from 'next'
// import {getTranslations} from 'next-intl/server';

export const metadata:Metadata = {
  title:"Inicio",
  description: "Bienvenido a movil renta, el mejor servicio de alquiler de vehículos"
}
export default async function Page ({ params }: { params: { locale: string } })  {
  // const t = await getTranslations('HomePage');
  const branches = await GetBranchesAction()

  return <Home branches={branches} params={params}/>

}
