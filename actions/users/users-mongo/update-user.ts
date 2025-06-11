"use server"

import { getUserInformation } from "@/actions/auth/getUser";
import { UserFormValues, userSchema } from "@/components/schemas";
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import clientPromise from "@/lib/mongodb";
import { buildResponse } from "@/utils/build-response";
import axios from "axios";
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
  try {
    const res = await axios.patch("http://localhost:3000/api/users-mongo", values)
    //console.log(res.data);
    revalidatePath('/es/admin/crear-usuarios/ver')
    return buildResponse(RESPONSE.USER.PUT.SUCCESS)
  } catch (error) {
    console.log("Error al realizar la peticion",error)
    return buildResponse({message:"Error interno", code: 500})
  }
}

  

    // if(!updatedUser){
    //   return buildResponse(RESPONSE.USER.PUT.ERROR,null)
    // }
    // 
