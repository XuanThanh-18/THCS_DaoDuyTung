// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { getCurrentUser } from "@/lib/auth";

/**
 * Chiến lược bảo mật đăng ký:
 *
 * CÁCH 1 — Không có user nào trong DB (lần đầu setup):
 *   → Cho phép tạo tài khoản SUPERADMIN đầu tiên tự do.
 *
 * CÁCH 2 — Đã có user trong DB:
 *   → Chỉ SUPERADMIN đang đăng nhập mới được tạo thêm user.
 *   → ADMIN không được tạo thêm user.
 *   → Người chưa đăng nhập bị từ chối hoàn toàn.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, confirmPassword, role } = body;

    // ── Validate input ────────────────────────────────────
    if (!name || !email || !password || !confirmPassword || !role) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 },
      );
    }

    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Họ tên phải có ít nhất 2 ký tự" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email không hợp lệ" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Mật khẩu phải có ít nhất 8 ký tự" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Mật khẩu xác nhận không khớp" },
        { status: 400 },
      );
    }

    if (!["ADMIN", "SUPERADMIN"].includes(role)) {
      return NextResponse.json({ error: "Role không hợp lệ" }, { status: 400 });
    }

    // ── Kiểm tra DB có user nào chưa ─────────────────────
    const existingUserCount = await prisma.user.count();
    const isFirstSetup = existingUserCount === 0;

    if (isFirstSetup) {
      // Lần đầu setup: chỉ được tạo SUPERADMIN
      if (role !== "SUPERADMIN") {
        return NextResponse.json(
          { error: "Tài khoản đầu tiên phải là SUPERADMIN" },
          { status: 400 },
        );
      }
    } else {
      // Đã có user: yêu cầu người dùng hiện tại phải là SUPERADMIN
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        return NextResponse.json(
          {
            error:
              "Bạn cần đăng nhập với quyền SUPERADMIN để tạo tài khoản mới",
          },
          { status: 401 },
        );
      }

      if (currentUser.role !== "SUPERADMIN") {
        return NextResponse.json(
          { error: "Chỉ SUPERADMIN mới có quyền tạo tài khoản mới" },
          { status: 403 },
        );
      }
    }

    // ── Kiểm tra email đã tồn tại ────────────────────────
    const existingEmail = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email này đã được sử dụng" },
        { status: 409 },
      );
    }

    // ── Tạo user ──────────────────────────────────────────
    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: role as "ADMIN" | "SUPERADMIN",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Tạo tài khoản ${role} thành công`,
        user: newUser,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/auth/register]", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}

// GET — Kiểm tra trạng thái setup (có cần tạo tài khoản đầu tiên không)
export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ isFirstSetup: count === 0, totalUsers: count });
  } catch {
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
