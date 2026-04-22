import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ContentEditorForm from "@/components/ContentEditorForm";

export const metadata = {
  title: "Tạo thông báo mới | Admin",
  description: "Tạo thông báo mới cho website trường",
};

export default async function NewAnnouncementPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <ContentEditorForm type="announcement" />;
}
