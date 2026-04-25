// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

// Routes trong /admin/* không cần đăng nhập
const PUBLIC_ADMIN_ROUTES = ["/admin/login", "/admin/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua các trang public (login, register)
  if (PUBLIC_ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Bảo vệ toàn bộ /admin/*
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      // Token hết hạn hoặc không hợp lệ → xóa cookie + redirect
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url),
      );
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
