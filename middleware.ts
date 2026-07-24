import { NextResponse, type NextRequest } from "next/server";
import { getSessionFromRequest } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = await getSessionFromRequest(req);

  const isAdminRoute = pathname.startsWith("/admin");
  const isPrivateRoute =
    isAdminRoute ||
    pathname.startsWith("/favoritos") ||
    pathname.startsWith("/enviar") ||
    pathname.startsWith("/mis-envios");

  if (!isPrivateRoute) return NextResponse.next();

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && session.role !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/favoritos/:path*", "/enviar/:path*", "/mis-envios/:path*"],
};
