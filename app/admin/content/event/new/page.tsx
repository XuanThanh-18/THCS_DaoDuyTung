import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ContentEditorForm from "@/components/ContentEditorForm";

export const metadata = {
  title: "Tạo sự kiện mới | Admin",
  description: "Tạo sự kiện mới cho website trường",
};

export default async function NewEventPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <ContentEditorForm type="event" />;
}
