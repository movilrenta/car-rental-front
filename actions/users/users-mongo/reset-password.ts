"use server";

import { getUserInformation } from "@/actions/auth/getUser";
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import clientPromise from "@/lib/mongodb";
import { buildResponse } from "@/utils/build-response";
import { ObjectId } from "mongodb";

export const resetPassword = async (id: string) => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "crearUsuarios");
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  const client = await clientPromise;
  try {
    const db = client.db(process.env.MONGO_URL);
    const updatedUser = await db
      .collection("Users")
      .updateOne({ _id: new ObjectId(id) }, { $set: { password: "" } });
    if (!updatedUser) {
      return buildResponse(RESPONSE.USER.PUT.ERROR, null);
    }
    return buildResponse(RESPONSE.USER.PUT.SUCCESS);
  } catch (error) {
    console.log("Error al actualizar usuario", error);
    return buildResponse({ message: "Error interno", code: 500 });
  }
};
