"use server";

import { loginSchema } from "@/types/login.schema";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  const userRenta = process.env.US_MOVIL_RENTA;
  const passRenta = process.env.PAS_MOVIL_RENTA;
  try {
    const parsedResult = await loginSchema.safeParseAsync(values);
    //console.log(parsedResult, userRenta);
    if (!parsedResult.success) {
      return {
        ok: false,
        message: `${parsedResult.error.errors}`,
      };
    }
    if (
      parsedResult.data.user !== userRenta ||
      parsedResult.data.password !== passRenta
    ) {
      return {
        ok: false,
        message: "El usuario y/o contraseña no coinciden",
      };
    }

    const data = { role: "admin", user: "Test MR" };
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
      ok: true,
      message: "Sesión iniciada con exito",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Hubo un problema al iniciar sesión",
    };
  }
};
