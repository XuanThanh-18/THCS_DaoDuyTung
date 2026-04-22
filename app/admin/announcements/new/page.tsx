// app/admin/announcements/new/page.tsx
import ContentEditorForm from "@/components/admin/ContentEditorForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tạo thông báo | Admin" };

export default function NewAnnouncementPage() {
  return <ContentEditorForm type="announcement" />;
}
