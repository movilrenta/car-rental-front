"use server";

import { LoginFormValues, loginSchema } from "@/types/login.schema";
import axios, { AxiosError } from "axios";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export const loginUser = async (values: LoginFormValues) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const parsedResults = loginSchema.safeParse(values);
  if (!parsedResults.success)
    return { success: false, message: parsedResults.error.issues[0].message };
  const { user, password } = parsedResults.data;
  try {
    const {data} = await axios.post("http://localhost:3000/api/login", {user,password})
    if(!data.success) return {success:false, message:data.message}
    const info = { role: data.user.role, user: data.user.name };
    const token = await new SignJWT(info)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("3h")
      .sign(secretKey);
    const cookieStore = cookies();
    cookieStore.set("authUser", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return {
      success: data.success,
      message: data.message,
    };
  } catch (error) {
    if(error instanceof AxiosError){
      return {
        success:false,
        message: error.message
      }
    }
    console.log(error);
    return {
      success: false,
      message: "Hubo un problema al iniciar sesión",
    };
  }
};
