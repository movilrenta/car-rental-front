import axios from 'axios'
import PayForm from './pay-form'
import { GetAdditionalsAction } from '@/actions/additionals'

export const metadata = {
  title: 'Payments',
  description: 'Formulario de reservas',
}

//const BACK = process.env.NEXT_PUBLIC_URL_BACK

export default async function Payments() {
  const data = await GetAdditionalsAction()
  return (
    <PayForm aditionals={data} />
  )
}