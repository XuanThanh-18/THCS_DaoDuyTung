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
    const {
      title,
      slug,
      description,
      excerpt,
      coverImage,
      category,
      status,
      featured,
      publishDate,
      eventDate,
      location,
    } = data;

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Sự kiện không tồn tại" },
        { status: 404 },
      );
    }

    let uniqueSlug = slug;
    if (slug !== event.slug) {
      uniqueSlug = await generateUniqueSlug(slug, prisma, "event", id);
    }

    const updated = await prisma.event.update({
      where: { id },
      data: {
        title,
        slug: uniqueSlug,
        description,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        category: category || null,
        status: status || "DRAFT",
        featured: featured || false,
        eventDate: new Date(eventDate),
        location: location || null,
        publishDate: publishDate ? new Date(publishDate) : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/content/event/[id] error:", error);
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

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Sự kiện không tồn tại" },
        { status: 404 },
      );
    }

    await prisma.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/content/event/[id] error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
