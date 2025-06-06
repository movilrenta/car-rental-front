'use server';

import axios from "axios";
import { ActionResponse } from "@/types";
import { revalidatePath } from "next/cache";
import { getUserInformation } from "./auth/getUser";
import { buildResponse } from "@/utils/build-response";
import { RESPONSE } from "@/constant/handler-actions";
import getAuthorized from "@/components/utils/get-authorized";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA

export async function GetBranchesAction() {
  try {
    const {data} = await axios.get(`${URL}api/branches`)
    return data.response
  }
  catch (error) {
    console.log(error);
    return []
  }
}

export async function PostBranchesAction(branch: any): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  const authorized = getAuthorized(role, "sucursales")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  try {
    const { data } = await axios.post(`${URL}/api/branches`, branch)
    revalidatePath("/admin/sucursales/ver")
    return buildResponse(RESPONSE.BRANCHES.POST.SUCCESS, data)
  }
  catch (error) {
    return buildResponse(RESPONSE.BRANCHES.POST.ERROR, null, error)
    //return {message: "error", error: error, status: 400}
  }
}


export async function PutBranchesAction(branch: any): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  const authorized = getAuthorized(role, "sucursales")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  try {
    const { data } = await axios.put(`${URL}/api/branches/${branch.id}`, branch)
    revalidatePath("/admin/sucursales/ver")
    return buildResponse(RESPONSE.BRANCHES.PUT.SUCCESS, data)
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.BRANCHES.PUT.ERROR, null, error)
  }
}

export async function DeleteBranchesAction(id: number): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  const authorized = getAuthorized(role, "sucursales")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);

  try {
    const { data } = await axios.delete(`${URL}/api/branches/${id}`)
    revalidatePath("/admin/sucursales/ver")
    return buildResponse(RESPONSE.BRANCHES.DELETE.SUCCESS, data)
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.BRANCHES.DELETE.ERROR, null, error)
  }
}
