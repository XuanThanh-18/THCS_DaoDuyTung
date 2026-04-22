// app/api/announcements/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

    const announcements = await prisma.announcement.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ priority: "desc" }, { publishDate: "desc" }],
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        status: true,
        priority: true,
        publishDate: true,
        expiryDate: true,
        createdAt: true,
        author: { select: { name: true } },
      },
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("[GET /api/announcements]", error);
    return NextResponse.json(
      { error: "Không thể tải thông báo" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, status, publishDate, priority, expiryDate } =
      body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Thiếu các trường bắt buộc: title, content" },
        { status: 400 },
      );
    }

    const uniqueSlug = await generateUniqueSlug(
      slug || title,
      prisma,
      "announcement",
    );

    const announcement = await prisma.announcement.create({
      data: {
        title,
        slug: uniqueSlug,
        content,
        status: status ?? "DRAFT",
        priority: priority ?? 0,
        publishDate: publishDate ? new Date(publishDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        authorId: user.userId,
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    console.error("[POST /api/announcements]", error);
    return NextResponse.json(
      { error: "Không thể tạo thông báo" },
      { status: 500 },
    );
  }
}
