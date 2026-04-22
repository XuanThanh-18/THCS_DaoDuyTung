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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Thông báo</h1>
        <p className="text-slate-500 text-sm mt-1">
          Quản lý các thông báo dành cho học sinh và phụ huynh
        </p>
      </div>
      <ContentTable
        rows={announcements}
        type="announcement"
        publicBasePath="/announcements"
      />
    </div>
  );
}
