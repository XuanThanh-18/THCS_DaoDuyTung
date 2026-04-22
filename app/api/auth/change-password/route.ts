import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, hashPassword } from "@/lib/password";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { oldPassword, newPassword, confirmPassword } = body;

    // Validate input
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
        { error: "Mật khẩu phải có ít nhất 8 ký tự" },
        { status: 400 },
      );
    }

    // Get user with password
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify old password
    const isOldPasswordValid = await verifyPassword(
      oldPassword,
      dbUser.password,
    );
    if (!isOldPasswordValid) {
      return NextResponse.json(
        { error: "Mật khẩu cũ không chính xác" },
        { status: 401 },
      );
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password
    await prisma.user.update({
      where: { id: user.userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: "Mật khẩu đã được thay đổi thành công",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
