"use server";

import { getUserInformation } from "@/actions/auth/getUser";
import getAuthorized from "@/components/utils/get-authorized";
import { RESPONSE } from "@/constant/handler-actions";
import { buildResponse } from "@/utils/build-response";
import axios from "axios";

export const resetPassword = async (values: {
  _id: string;
  password: string;
}) => {
  console.log(values, "desde resetAction")
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "crearUsuarios");
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    const { data } = await axios.patch(
      "http://localhost:3000/api/reestart-password/",
      values
    );
    if (!data.success) {
      return buildResponse(RESPONSE.USER.PUT.ERROR, null);
    }

    return buildResponse(RESPONSE.USER.PUT.SUCCESS);
  } catch (error) {
    console.log("Error al actualizar usuario", error);
    return buildResponse({ message: "Error interno", code: 500 });
  }
};
