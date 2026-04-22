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

    // Validate required fields
    if (!title || !description || !category || !eventDate || !location) {
      return NextResponse.json(
        { error: "Vui lòng điền đủ các trường bắt buộc" },
        { status: 400 },
      );
    }

    // Generate unique slug
    const uniqueSlug = await generateUniqueSlug(slug, prisma, "event");

    const event = await prisma.event.create({
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
        authorId: user.userId,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("POST /api/content/event error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
