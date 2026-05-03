// app/admin/posts/page.tsx
import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Quản lý bài viết | Admin" };

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      category: true,
      featured: true,
      publishDate: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });

  return <ContentTable rows={posts} type="post" publicBasePath="/news" />;
}
