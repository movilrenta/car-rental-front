import { Home } from '@/view/home'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title:"Inicio",
  description: "Bienvenido a movil renta, el mejor servicio de alquiler de vehículos"
}
export default async function Page ()  {
  return (
    <Home />
  )
}
