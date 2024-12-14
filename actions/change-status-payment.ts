"use server"

// import { revalidatePath } from "next/cache"

export const changeStatusPayment = async (status:string) => {
 try {
  console.log(status)

  // revalidatePath('/reservas/reservation-list')
  return {
    ok:true,
    message:"Estado de orden cambiado"
  }
 } catch (error) {
  console.log(error)
  return {
    ok:false,
    message:"No se pudo cambiar el estado de orden"
  }
 }
}