import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyEmail" ||
    path === "/";

  const token = request.cookies.get("token")?.value || "";

  // 🔹 Allow access to `/` for everyone (no redirection)
  if (path === "/") {
    return NextResponse.next();
  }

  // 🔹 If user is logged in, prevent them from visiting login/signup/verifyEmail
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // 🔹 If user is not logged in, redirect them to login for protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/signup", "/login", "/verifyEmail"],
};
