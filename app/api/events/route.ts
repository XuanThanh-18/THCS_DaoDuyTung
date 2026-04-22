// app/api/events/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get("upcoming");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
    const now = new Date();

    const events = await prisma.event.findMany({
      where: {
        status: "PUBLISHED",
        ...(upcoming === "true" && { eventDate: { gte: now } }),
        ...(upcoming === "false" && { eventDate: { lt: now } }),
      },
      orderBy:
        upcoming === "true" ? { eventDate: "asc" } : { eventDate: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        excerpt: true,
        coverImage: true,
        category: true,
        featured: true,
        eventDate: true,
        location: true,
        publishDate: true,
        createdAt: true,
        author: { select: { name: true } },
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("[GET /api/events]", error);
    return NextResponse.json(
      { error: "Không thể tải sự kiện" },
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

    if (!title || !description || !eventDate) {
      return NextResponse.json(
        { error: "Thiếu các trường bắt buộc: title, description, eventDate" },
        { status: 400 },
      );
    }

    const uniqueSlug = await generateUniqueSlug(slug || title, prisma, "event");

    const event = await prisma.event.create({
      data: {
        title,
        slug: uniqueSlug,
        description,
        excerpt: excerpt ?? null,
        coverImage: coverImage ?? null,
        category: category ?? null,
        status: status ?? "DRAFT",
        featured: featured ?? false,
        eventDate: new Date(eventDate),
        location: location ?? null,
        publishDate: publishDate ? new Date(publishDate) : null,
        authorId: user.userId,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("[POST /api/events]", error);
    return NextResponse.json(
      { error: "Không thể tạo sự kiện" },
      { status: 500 },
    );
  }
}
