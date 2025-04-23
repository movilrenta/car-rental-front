'use server'
import axios from "axios"

export async function GetInfoDataPaywayAction(siteOperationId: string) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}payments?siteOperationId=${siteOperationId}`, {
      headers: {
        'apikey': process.env.NEXT_PRIVATE_API_KEY_PAYWAY,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    })
    return {status: 200, data: res.data.results}
  } catch (error) {
    console.log(error)
  }
}