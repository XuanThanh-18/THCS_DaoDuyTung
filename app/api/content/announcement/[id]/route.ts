import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateUniqueSlug } from "@/lib/slug";
import { getCurrentUser } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 403 },
      );
    }

    const data = await req.json();
    const { title, slug, content, status, publishDate } = data;

    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      return NextResponse.json(
        { error: "Thông báo không tồn tại" },
        { status: 404 },
      );
    }

    let uniqueSlug = slug;
    if (slug !== announcement.slug) {
      uniqueSlug = await generateUniqueSlug(slug, prisma, "announcement", id);
    }

    const updated = await prisma.announcement.update({
      where: { id },
      data: {
        title,
        slug: uniqueSlug,
        content,
        status: status || "DRAFT",
        publishDate: publishDate ? new Date(publishDate) : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/content/announcement/[id] error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Không có quyền truy cập" },
        { status: 403 },
      );
    }

    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      return NextResponse.json(
        { error: "Thông báo không tồn tại" },
        { status: 404 },
      );
    }

    await prisma.announcement.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/content/announcement/[id] error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
