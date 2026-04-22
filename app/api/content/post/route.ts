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
      content,
      excerpt,
      coverImage,
      category,
      status,
      featured,
      publishDate,
    } = data;

    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Vui lòng điền đủ các trường bắt buộc" },
        { status: 400 },
      );
    }

    // Generate unique slug
    const uniqueSlug = await generateUniqueSlug(slug, prisma, "post");

    const post = await prisma.post.create({
      data: {
        title,
        slug: uniqueSlug,
        content,
        excerpt: excerpt || null,
        coverImage: coverImage || null,
        category,
        status: status || "DRAFT",
        featured: featured || false,
        publishDate: publishDate ? new Date(publishDate) : null,
        authorId: user.userId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/content/post error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
