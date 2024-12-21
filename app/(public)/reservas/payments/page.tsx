export const metadata = {
  title: 'Payments',
  description: 'Formulario de reservas',
}

import axios from 'axios'
import PayForm from './pay-form'
const BACK = process.env.NEXT_PUBLIC_URL_BACK

export default async function Payments() {
  const {data} = await axios.get(`${BACK}aditionals`)
  return (
    <PayForm aditionals={data} />
  )
}