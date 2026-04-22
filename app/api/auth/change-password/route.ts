// app/api/auth/change-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, hashPassword } from "@/lib/password";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { oldPassword, newPassword, confirmPassword } = await request.json();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "Vui lòng điền đầy đủ thông tin" },
        { status: 400 },
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Mật khẩu xác nhận không khớp" },
        { status: 400 },
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Mật khẩu mới phải có ít nhất 8 ký tự" },
        { status: 400 },
      );
    }

    const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
    if (!dbUser) {
      return NextResponse.json(
        { error: "Người dùng không tồn tại" },
        { status: 404 },
      );
    }

    const validOld = await verifyPassword(oldPassword, dbUser.password);
    if (!validOld) {
      return NextResponse.json(
        { error: "Mật khẩu cũ không chính xác" },
        { status: 401 },
      );
    }

    const hashed = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.userId },
      data: { password: hashed },
    });

    return NextResponse.json({
      success: true,
      message: "Đổi mật khẩu thành công",
    });
  } catch (error) {
    console.error("[change-password]", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
