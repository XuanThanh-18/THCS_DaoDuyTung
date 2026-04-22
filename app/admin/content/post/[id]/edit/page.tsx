import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ContentEditorForm from "@/components/ContentEditorForm";

export const metadata = {
  title: "Chỉnh sửa bài viết | Admin",
  description: "Chỉnh sửa bài viết",
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    return <div className="p-8 text-center">Bài viết không tồn tại</div>;
  }

  return <ContentEditorForm type="post" initialData={post} isEditing />;
}
