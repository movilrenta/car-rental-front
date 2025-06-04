"use server";

import { USERS } from "@/constant/mockUser";
import { loginSchema } from "@/types/login.schema";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
  // const userRenta = process.env.US_MOVIL_RENTA;
  // const passRenta = process.env.PAS_MOVIL_RENTA;
  try {
    const parsedResult = await loginSchema.safeParseAsync(values);
    if (!parsedResult.success) {
      return {
        ok: false,
        message: `${parsedResult.error.errors}`,
      };
    }

    const matchUser = USERS.find((u) => 
      u.email === parsedResult.data.user &&
      u.password === parsedResult.data.password
    )
    if(!matchUser) {
      return {
        ok:false,
        message:"El usuario y/o contraseña no coinciden"
      }
    }
    // if (
    //   parsedResult.data.user !== userRenta ||
    //   parsedResult.data.password !== passRenta
    // ) {
    //   return {
    //     ok: false,
    //     message: "El usuario y/o contraseña no coinciden",
    //   };
    // }

    const data = { role: matchUser.role, user: matchUser.email };
    // console.log({data})
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
