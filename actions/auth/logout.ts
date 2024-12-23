"use server"

import { cookies } from "next/headers"

export const logout = async () => {
  const cookieStore = cookies()
  if(cookieStore.has("authUser")){
    cookieStore.delete("authUser")
    return {
      ok:true,
      message:"Sesión cerrada con exito"
    }
  }
}