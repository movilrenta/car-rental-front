'use server'

import axios from "axios";
import { revalidatePath } from "next/cache";
import { getUserInformation } from "./auth/getUser";
import { buildResponse } from "@/utils/build-response";
import { RESPONSE } from "@/constant/handler-actions";
import { ActionResponse } from "@/types";
import getAuthorized from "@/components/utils/get-authorized";

const URL = process.env.NEXT_PUBLIC_URL_MOVILRENTA

export async function GetAddressesAction() {
  try {
    const {data} = await axios.get(`${URL}/api/addresses`)
    return data.response
  }
  catch (error) {
    console.log(error);
    return []
    //return {message: "error", error: error, status: 400}
  }
}

export async function PostAddressesAction(address: any): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  const authorized = getAuthorized(role, "direcciones")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    //await setupCsrf();
    const { data } = await axios.post(`${URL}/api/addresses`, address) // TODO token
    revalidatePath('/admin/sucursales', 'layout')
    return buildResponse(RESPONSE.ADDRESSES.POST.SUCCESS, data);
    //return {data: res.data, status: res.status}
  }
  catch (error) {
    console.log(error);
    return buildResponse(RESPONSE.ADDRESSES.POST.ERROR, null, error)
    //return {message: "error", error: error, status: 400}
  }
}


export async function PutAddressesAction(address: any): Promise<ActionResponse> {
  const { role, token } = await getUserInformation()
  const authorized = getAuthorized(role, "direcciones")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    const { data } = await axios.put(`${URL}/api/addresses/${address.id}`, address) // TODO token
    revalidatePath('/admin/sucursales', 'layout')
    return buildResponse(RESPONSE.ADDRESSES.PUT.SUCCESS, data)
  }
  catch (error) {
    console.log("2222");
    console.log(error);
    return buildResponse(RESPONSE.ADDRESSES.PUT.ERROR, null, error)
    //return {message: "error", error: error, status: 400}
  }
}

export async function DeleteAddressesAction(id: number) {
  const { role, token } = await getUserInformation()
  const authorized = getAuthorized(role, "direcciones")
  if (!authorized) return buildResponse(RESPONSE.UNAUTHORIZED);
  try {
    const { data } = await axios.delete(`${URL}/api/addresses/${id}`) // TODO token
    revalidatePath('/admin/sucursales', 'layout')
    return buildResponse(RESPONSE.ADDRESSES.DELETE.SUCCESS, data)
  }
  catch (error) {
    console.log(error)
    return buildResponse(RESPONSE.ADDRESSES.DELETE.ERROR, null, error)
    //return {message: "error", error: error, status: 400}
  }
}