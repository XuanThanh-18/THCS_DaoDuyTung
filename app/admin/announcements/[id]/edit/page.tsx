// app/admin/announcements/[id]/edit/page.tsx
import { prisma } from "@/lib/db";
import ContentEditorForm from "@/components/admin/ContentEditorForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chỉnh sửa thông báo | Admin" };

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const announcement = await prisma.announcement.findUnique({ where: { id } });
  if (!announcement) notFound();

  return (
    <ContentEditorForm
      type="announcement"
      initialData={announcement as Record<string, unknown>}
      isEditing
    />
  );
}
