// app/admin/posts/new/page.tsx
import ContentEditorForm from "@/components/admin/ContentEditorForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tạo bài viết | Admin" };

export default function NewPostPage() {
  return <ContentEditorForm type="post" />;
}
