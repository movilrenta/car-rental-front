"use server"

import clientPromise from "@/lib/mongodb";
import { getUserInformation } from "@/actions/auth/getUser";
import { UserFormValues, userSchema } from "@/components/schemas"
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import { buildResponse } from "@/utils/build-response";
import { revalidatePath } from "next/cache";

export const createUser = async(values:UserFormValues) => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "crearUsuarios")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  const parsedResults = userSchema.safeParse(values)
  if(!parsedResults.success){
     return buildResponse(
      RESPONSE.USER.POST.ERROR,
      null,
      parsedResults.error.issues[0].message
    );
  }

  const { name, email, password, roles, isBloqued} = parsedResults.data
  const client = await clientPromise;
  try {
    const db = client.db(process.env.MONGO_URL);
    const user = await db.collection("Users").insertOne({
      name,
      email,
      password,
      isBloqued: isBloqued,
      role: roles
    })

    if(!user){
      console.log("Error al crear usuario", user)
      return buildResponse(RESPONSE.USER.POST.ERROR, null)
    }
    revalidatePath('/es/admin/crear-usuarios/ver')
    return buildResponse(RESPONSE.USER.POST.SUCCESS)
  } catch (error) {
    console.log("Error interno al crear user", error)
    return buildResponse({
      message:"Error al crear usuario",
      code:500
    })
  }
}