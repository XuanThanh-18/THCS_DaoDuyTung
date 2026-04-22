// app/api/announcements/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const announcement = await prisma.announcement.findUnique({
      where: { id },
      include: { author: { select: { name: true } } },
    });
    if (!announcement) {
      return NextResponse.json(
        { error: "Không tìm thấy thông báo" },
        { status: 404 },
      );
    }
    return NextResponse.json(announcement);
  } catch (error) {
    console.error("[GET /api/announcements/[id]]", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { title, slug, content, status, publishDate, priority, expiryDate } =
      body;

    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Không tìm thấy thông báo" },
        { status: 404 },
      );
    }

    const uniqueSlug =
      slug && slug !== existing.slug
        ? await generateUniqueSlug(slug, prisma, "announcement", id)
        : existing.slug;

    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        title,
        slug: uniqueSlug,
        content,
        status,
        priority: priority ?? 0,
        publishDate: publishDate ? new Date(publishDate) : null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
      },
    });

    return NextResponse.json(announcement);
  } catch (error) {
    console.error("[PUT /api/announcements/[id]]", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const user = await getCurrentUser();
    if (!user || (user.role !== "ADMIN" && user.role !== "SUPERADMIN")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id } = await params;
    await prisma.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/announcements/[id]]", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
