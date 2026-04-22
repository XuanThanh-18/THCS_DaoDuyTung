// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { generateUniqueSlug } from "@/lib/slug";

// GET — public, lấy bài đã publish
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);

    const posts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        ...(category && { category }),
        ...(featured === "true" && { featured: true }),
      },
      orderBy: { publishDate: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        featured: true,
        publishDate: true,
        createdAt: true,
        author: { select: { name: true } },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("[GET /api/posts]", error);
    return NextResponse.json(
      { error: "Không thể tải bài viết" },
      { status: 500 },
    );
  }
}

// POST — yêu cầu ADMIN
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
      content,
      excerpt,
      coverImage,
      category,
      status,
      featured,
      publishDate,
    } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Thiếu các trường bắt buộc: title, content, category" },
        { status: 400 },
      );
    }

    const uniqueSlug = await generateUniqueSlug(slug || title, prisma, "post");

    const post = await prisma.post.create({
      data: {
        title,
        slug: uniqueSlug,
        content,
        excerpt: excerpt ?? null,
        coverImage: coverImage ?? null,
        category,
        status: status ?? "DRAFT",
        featured: featured ?? false,
        publishDate: publishDate ? new Date(publishDate) : null,
        authorId: user.userId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("[POST /api/posts]", error);
    return NextResponse.json(
      { error: "Không thể tạo bài viết" },
      { status: 500 },
    );
  }
}
