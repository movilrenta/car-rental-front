'use server'
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

interface UserPayload {
  user: string | null;
  role:string | null;
  message: string;
  token?: string
}

export async function getUserInformation():Promise<UserPayload> {
  try {
    const cokieStore = cookies()
    const token = cokieStore.get("authUser")?.value
    if (!token) return { user: null, role: null , message: "no token provided"}
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const { payload } = await jwtVerify(token!, secretKey) as {payload:{user:string, role:string}};
    return { user: payload.user, role: payload.role, token, message: "token authorized"}

  } catch (error) {
    console.log(error);
    return { user: null, role: null , message: "error"}
  }
}