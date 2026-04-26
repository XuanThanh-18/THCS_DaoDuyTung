// middleware.ts
// FIX C2: Bảo vệ /admin/register — chỉ SUPERADMIN đã login mới có thể truy cập
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

// Chỉ /admin/login là public — /admin/register yêu cầu SUPERADMIN
const FULLY_PUBLIC_ADMIN = ["/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua login page
  if (FULLY_PUBLIC_ADMIN.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Tất cả /admin/* cần phải có token hợp lệ
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url),
      );
      response.cookies.delete("admin_token");
      return response;
    }

    // FIX C2: /admin/register chỉ dành cho SUPERADMIN
    if (
      pathname.startsWith("/admin/register") &&
      payload.role !== "SUPERADMIN"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
