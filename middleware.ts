import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const restrictedRoutes = ['/admin', '/reservas/reservation-list', '/reservation-list'];
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

  try {
    if (restrictedRoutes.some(route => pathname === route || pathname.startsWith(route))) {
      const token = request.cookies.get("authUser")?.value;

      if (!token) {
        //console.log("Token no encontrado");
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Verificar el token
      try {
        await jwtVerify(token, secretKey);
        //console.log("Token válido");

      } catch (error) {
        console.error("Error al verificar el token:", error);
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', "/reservas/reservation-list", "/reservas/reservation-list/:path*"],
};
