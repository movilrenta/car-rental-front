"use server"

import { getUserInformation } from "@/actions/auth/getUser";
import { UserFormValues, userSchema } from "@/components/schemas";
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import clientPromise from "@/lib/mongodb";
import { buildResponse } from "@/utils/build-response";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const updateUser = async (values:UserFormValues) => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "crearUsuarios")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  const parsedResults = userSchema.safeParse(values)
  if(!parsedResults.success){
     return buildResponse(
      RESPONSE.USER.PUT.ERROR,
      null,
      parsedResults.error.issues[0].message
    );
  }

  const { id, name, email, password, roles, isBloqued} = parsedResults.data;
  const client = await clientPromise;
  try {
    const db = client.db(process.env.MONGO_URL);
    const updatedUser = await db.collection("Users").updateOne(
      {_id:new ObjectId(id)},
      {$set: {name, email, password, role: roles, isBloqued}}
    )

    if(!updatedUser){
      return buildResponse(RESPONSE.USER.PUT.ERROR,null)
    }
    revalidatePath('/es/admin/crear-usuarios/ver')
    return buildResponse(RESPONSE.USER.PUT.SUCCESS)
  } catch (error) {
    console.log("Error al actualizar usuario",error)
    return buildResponse({message:"Error interno", code: 500})
  }
}