"use server";

import { buildResponse } from "@/utils/build-response";
import { getUserInformation } from "@/actions/auth/getUser";
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export const deleteUser = async (id: string) => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "crearUsuarios");
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  if(!id)return buildResponse(RESPONSE.USER.DELETE.ERROR, null);

  const client = await clientPromise;
  const db = client.db(process.env.MONGO_URL);
  try {
    const deletedUser = await db.collection("Users").deleteOne({
      _id:new ObjectId(id)
    })

    if(!deletedUser) return buildResponse(RESPONSE.USER.DELETE.ERROR)
    revalidatePath('/es/admin/crear-usuarios/ver')
  return buildResponse(RESPONSE.USER.DELETE.SUCCESS);
  } catch (error) {
    console.log("Error al eliminar usuario", error)
    return buildResponse({message:"Error al eliminar usuario", code:500})
  }
};
