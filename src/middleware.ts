import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyEmail" ||
    path === "/";

  // Allow access to `/` for everyone
  if (path === "/") {
    return NextResponse.next();
  }

  // Prevent logged-in users from accessing login/signup/verifyEmail
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  // Redirect non-authenticated users to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // 🔹 Fetch user data from `/api/users/me`
  if (path === "/admin-panel") {
    try {
      const res = await fetch(`${request.nextUrl.origin}/api/users/me`, {
        headers: { Cookie: `token=${token}` },
      });

      if (!res.ok) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
      }

      const { data: user } = await res.json();
      const isAdmin = user?.isAdmin || false;

      if (!isAdmin) {
        return NextResponse.redirect(
          new URL("/not-authorized", request.nextUrl),
        );
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/signup",
    "/login",
    "/verifyEmail",
    "/admin-panel",
  ],
};
