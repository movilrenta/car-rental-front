"use server"

import { getUserInformation } from "@/actions/auth/getUser";
import { UserFormValues } from "@/components/schemas"
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import { buildResponse } from "@/utils/build-response";
import { revalidatePath } from "next/cache";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;

export const createUser = async(values:UserFormValues) => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "crearUsuarios")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

    try {
    const res = await axios.post(`${URL}api/users-mongo`, values)
    
    if(res.data.status === 409) return buildResponse(RESPONSE.USER.POST.CONFLICT)
    revalidatePath('/admin/crear-usuarios/ver')
    return buildResponse(RESPONSE.USER.POST.SUCCESS)
  } catch (error) {
    console.log("Error al realizar la peticion",error)
    return buildResponse({message:"Error interno", code: 500})
  }
}