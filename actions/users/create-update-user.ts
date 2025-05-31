"use server";

import { UserFormValues, userSchema } from "@/components/schemas";
import { ActionResponse } from "@/types";
import { getUserInformation } from "../auth/getUser";
import { ROLES } from "@/constant/roles";
import { buildResponse } from "@/utils/build-response";
import { RESPONSE } from "@/constant/handler-actions";
import { AxiosError } from "axios";
// import { revalidatePath } from "next/cache";

export const createUpdateUser = async (
  values: UserFormValues
): Promise<ActionResponse> => {
  const { role } = await getUserInformation();
  if (role !== ROLES.superadmin && role !== ROLES.admin) {
    return buildResponse(RESPONSE.UNAUTHORIZED);
  }

  const parsedResults = userSchema.safeParse(values);
  if (!parsedResults.success) {
    return buildResponse(
      RESPONSE.USER.POST.ERROR,
      null,
      parsedResults.error.issues[0].message
    );
  }
  try {
    //TODO: esta parte puede servir para editar usuario y reutilizar la misma action
    if (parsedResults.data.email) {
      console.log(parsedResults.data, "Usuario editado");
      // revalidatePath('/admin/crear-usuarios/ver')
      return buildResponse(RESPONSE.USER.PUT.SUCCESS, parsedResults.data);
    }
    console.log(parsedResults.data);
    // revalidatePath('/admin/crear-usuarios/ver')
    return buildResponse(RESPONSE.USER.POST.SUCCESS, parsedResults.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.USER.POST.ERROR, null, error);
  }
};
