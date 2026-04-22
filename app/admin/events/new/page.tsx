// app/admin/events/new/page.tsx
import ContentEditorForm from "@/components/admin/ContentEditorForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tạo sự kiện | Admin" };

export default function NewEventPage() {
  return <ContentEditorForm type="event" />;
}
