// app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

type Params = { params: Promise<{ id: string }> };

// GET — không tăng viewCount ở API route
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true } } },
    });
    if (!event) {
      return NextResponse.json(
        { error: "Không tìm thấy sự kiện" },
        { status: 404 },
      );
    }
    return NextResponse.json(event);
  } catch (error) {
    console.error("[GET /api/events/[id]]", error);
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
    } = body;

    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Không tìm thấy sự kiện" },
        { status: 404 },
      );
    }

    const uniqueSlug =
      slug && slug !== existing.slug
        ? await generateUniqueSlug(slug, prisma, "event", id)
        : existing.slug;

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        slug: uniqueSlug,
        description,
        excerpt: excerpt ?? null,
        coverImage: coverImage ?? null,
        category: category ?? null,
        status,
        featured: featured ?? false,
        eventDate: eventDate ? new Date(eventDate) : existing.eventDate,
        location: location ?? null,
        publishDate: publishDate ? new Date(publishDate) : null,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("[PUT /api/events/[id]]", error);
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
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/events/[id]]", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
