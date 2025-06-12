"use server"

import { getUserInformation } from "@/actions/auth/getUser";
import { NewPasswordFormSchema } from "@/app/[locale]/admin/change-password/schema";
import { UserFormValues, userSchema } from "@/components/schemas";
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import { buildResponse } from "@/utils/build-response";
import axios from "axios";
import { revalidatePath } from "next/cache";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;

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
    const res = await axios.patch(`${URL}api/users-mongo`, values)
    //console.log(res.data);
    revalidatePath('/es/admin/crear-usuarios/ver')
    return buildResponse(RESPONSE.USER.PUT.SUCCESS)
  } catch (error) {
    console.log("Error al realizar la peticion",error)
    return buildResponse({message:"Error interno", code: 500})
  }
}

export const changePasswordAction = async (values: any) => {
  const { _id } = await getUserInformation();
  const parsedResults = NewPasswordFormSchema.safeParse(values)
  if(!parsedResults.success){
     return buildResponse(
      RESPONSE.USER.PUT.ERROR,
      null,
      parsedResults.error.issues[0].message
    );
  }
  try {
    values._id = _id
    const { data } = await axios.patch(`${URL}api/change-password`, values)
    if(data.success) {
      return buildResponse(RESPONSE.USER.PUT.SUCCESS)
    }
    return buildResponse(RESPONSE.USER.PUT.ERROR, null, data.message)
    //revalidatePath('/es/admin/crear-usuarios/ver')
  } catch (error) {
    console.log("Error al realizar la peticion",error)
    return buildResponse({message:"Error interno", code: 500})
  }
}

  

    // if(!updatedUser){
    //   return buildResponse(RESPONSE.USER.PUT.ERROR,null)
    // }
    // 
