import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ContentEditorForm from "@/components/ContentEditorForm";

export const metadata = {
  title: "Chỉnh sửa thông báo | Admin",
  description: "Chỉnh sửa thông báo",
};

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const announcement = await prisma.announcement.findUnique({
    where: { id },
  });

  if (!announcement) {
    return <div className="p-8 text-center">Thông báo không tồn tại</div>;
  }

  return (
    <ContentEditorForm
      type="announcement"
      initialData={announcement}
      isEditing
    />
  );
}
