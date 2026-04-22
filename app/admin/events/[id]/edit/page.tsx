// app/admin/events/[id]/edit/page.tsx
import { prisma } from "@/lib/db";
import ContentEditorForm from "@/components/admin/ContentEditorForm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chỉnh sửa sự kiện | Admin" };

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <ContentEditorForm
      type="event"
      initialData={event as Record<string, unknown>}
      isEditing
    />
  );
}
