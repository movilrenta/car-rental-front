"use server"

import clientPromise from "@/lib/mongodb";
import { getUserInformation } from "@/actions/auth/getUser";
import { UserFormValues, userSchema } from "@/components/schemas"
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import { buildResponse } from "@/utils/build-response";
import { revalidatePath } from "next/cache";
import axios from "axios";

export const createUser = async(values:UserFormValues) => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "crearUsuarios")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

    try {
    const res = await axios.post("http://localhost:3000/api/users-mongo", values)
    console.log(res.data);
    if(res.data.status === 409) return buildResponse(RESPONSE.USER.POST.CONFLICT)
    revalidatePath('/admin/crear-usuarios/ver')
    return buildResponse(RESPONSE.USER.PUT.SUCCESS)
  } catch (error) {
    console.log("Error al realizar la peticion",error)
    return buildResponse({message:"Error interno", code: 500})
  }
}