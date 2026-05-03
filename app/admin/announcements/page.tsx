// app/admin/announcements/page.tsx
import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Quản lý thông báo | Admin" };

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.announcement.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      publishDate: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });

  return (
    <ContentTable
      rows={announcements}
      type="announcement"
      publicBasePath="/announcements"
    />
  );
}
