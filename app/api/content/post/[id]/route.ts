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
      content,
      excerpt,
      coverImage,
      category,
      status,
      featured,
      publishDate,
    } = data;

    // Check if post exists
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Bài viết không tồn tại" },
        { status: 404 },
      );
    }

    // Generate unique slug if changed
    let uniqueSlug = slug;
    if (slug !== post.slug) {
      uniqueSlug = await generateUniqueSlug(slug, prisma, "post", id);
    }

    const updated = await prisma.post.update({
      where: { id },
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
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/content/post/[id] error:", error);
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

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Bài viết không tồn tại" },
        { status: 404 },
      );
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/content/post/[id] error:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra" }, { status: 500 });
  }
}
