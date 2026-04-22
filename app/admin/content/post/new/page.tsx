import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ContentEditorForm from "@/components/ContentEditorForm";

export const metadata = {
  title: "Tạo bài viết mới | Admin",
  description: "Tạo bài viết, tin tức mới cho website trường",
};

export default async function NewPostPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <ContentEditorForm type="post" />;
}
