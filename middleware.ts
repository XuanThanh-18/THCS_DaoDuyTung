// middleware.ts — FIXED VERSION
// Fix: Thêm "/admin" vào matcher để bắt cả root admin route
// Fix: Bảo vệ /admin/register chỉ cho SUPERADMIN

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

// Các route trong /admin/* KHÔNG cần auth
const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bỏ qua các public paths
  if (PUBLIC_ADMIN_PATHS.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Bảo vệ tất cả /admin và /admin/*
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url),
      );
      response.cookies.delete("admin_token");
      return response;
    }

    // /admin/register chỉ dành cho SUPERADMIN
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
  // Fix: Thêm "/admin" để bắt route không có path
  matcher: ["/admin", "/admin/:path*"],
};
