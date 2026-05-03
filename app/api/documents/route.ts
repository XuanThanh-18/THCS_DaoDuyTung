// app/api/documents/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { name: true } } },
    });
    return NextResponse.json(documents);
  } catch (error) {
    console.error("[GET /api/documents]", error);
    return NextResponse.json(
      { error: "Không thể tải tài liệu" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // ✅ Lấy user từ session (không nhận authorId từ client)
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, fileUrl, fileType, fileSize, category } = body;

    // Validate bắt buộc
    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Thiếu tiêu đề tài liệu" },
        { status: 400 },
      );
    }
    if (!fileUrl) {
      return NextResponse.json(
        { error: "Thiếu đường dẫn file" },
        { status: 400 },
      );
    }
    if (!category) {
      return NextResponse.json({ error: "Thiếu danh mục" }, { status: 400 });
    }

    const document = await prisma.document.create({
      data: {
        title: title.trim(),
        description: description?.trim() ?? null,
        fileUrl,
        fileType: fileType ?? "application/octet-stream",
        fileSize: fileSize ?? null,
        category,
        authorId: user.userId, // ✅ lấy từ session
      },
    });

    return NextResponse.json(document, { status: 201 });
  } catch (error) {
    console.error("[POST /api/documents]", error);
    return NextResponse.json(
      { error: "Không thể tạo tài liệu" },
      { status: 500 },
    );
  }
}
