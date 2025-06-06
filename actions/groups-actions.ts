"use server";

import { GroupForm } from "@/app/[locale]/admin/vehiculos/grupos/components/groupSchema";
import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { getUserInformation } from "./auth/getUser";
import { ActionResponse } from "@/types";
import { buildResponse } from "@/utils/build-response";
import { RESPONSE } from "@/constant/handler-actions";
import getAuthorized from "@/components/utils/get-authorized";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA;

export const putGroup = async (values: GroupForm): Promise<ActionResponse> => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "grupos")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  try {
    const res = await axios.put(`${URL}api/groups/${values.id}`, values);
    revalidatePath("/admin/vehiculos/grupos");
    return buildResponse(RESPONSE.GROUPS.PUT.SUCCESS, res.data);
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.GROUPS.PUT.ERROR, null, error);
  }
};

export const postGroup = async (values: GroupForm): Promise<ActionResponse> => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "grupos")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  try {
    const res = await axios.post(`${URL}/api/groups`, values);

    revalidatePath("/admin/vehiculos/grupos");
    return buildResponse(RESPONSE.GROUPS.POST.SUCCESS, res.data);
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.GROUPS.POST.ERROR, null, error);
  }
};

export const deleteGroup = async (id: number): Promise<ActionResponse> => {
  const { role } = await getUserInformation();
  const authorized = getAuthorized(role, "grupos")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  try {
    await axios.delete(`${URL}/api/groups/${id}`);
    revalidatePath("/admin/vehiculos/grupos");
    return buildResponse(RESPONSE.GROUPS.DELETE.SUCCESS, null);
  } catch (error) {
    if (error instanceof AxiosError) {
       return buildResponse({
        message: error.response?.data.error.message,
        code: error.status || 500,
      });
    }
    return buildResponse(RESPONSE.GROUPS.DELETE.ERROR, null, error);
  }
};
