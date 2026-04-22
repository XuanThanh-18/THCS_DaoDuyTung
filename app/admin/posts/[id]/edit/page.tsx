// app/admin/posts/[id]/edit/page.tsx
import { prisma } from "@/lib/db";
import ContentEditorForm from "@/components/admin/ContentEditorForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chỉnh sửa bài viết | Admin" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <ContentEditorForm
      type="post"
      initialData={post as Record<string, unknown>}
      isEditing
    />
  );
}
