import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/slug";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 403 },
      );
    }

    const data = await req.json();
    const { title, slug, content, status, publishDate } = data;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Vui lòng điền đủ các trường bắt buộc" },
        { status: 400 },
      );
    }

    const uniqueSlug = await generateUniqueSlug(slug, prisma, "announcement");

    const announcement = await prisma.announcement.create({
      data: {
        title,
        slug: uniqueSlug,
        content,
        status: status || "DRAFT",
        publishDate: publishDate ? new Date(publishDate) : null,
        authorId: user.userId,
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error("POST /api/content/announcement error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
