import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import ContentEditorForm from "@/components/ContentEditorForm";

export const metadata = {
  title: "Chỉnh sửa sự kiện | Admin",
  description: "Chỉnh sửa sự kiện",
};

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    return <div className="p-8 text-center">Sự kiện không tồn tại</div>;
  }

  return <ContentEditorForm type="event" initialData={event} isEditing />;
}
