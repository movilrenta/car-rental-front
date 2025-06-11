"use server";

import clientPromise from "@/lib/mongodb";
import { LoginFormValues, loginSchema } from "@/types/login.schema";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export const loginUser = async (values: LoginFormValues) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  const parsedResults = loginSchema.safeParse(values);
  if (!parsedResults.success)
    return { success: false, message: parsedResults.error.issues[0].message };
  const { user, password } = parsedResults.data;
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_URL);
  try {
    const userdb = await db.collection("Users").findOne({
      email: user,
    });
    if (!user)
      return {
        success: false,
        message: "El usuario y/o contraseña no coinciden",
      };
    if (password !== userdb?.password)
      return {
        success: false,
        message: "El usuario y/o contraseña no coinciden",
      };
    const data = { role: userdb.role, user: userdb.name };
    const token = await new SignJWT(data)
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
      success: true,
      message: "Sesión iniciada con exito",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Hubo un problema al iniciar sesión",
    };
  }
};
