// app/admin/events/page.tsx
import { prisma } from "@/lib/db";
import ContentTable from "@/components/admin/ContentTable";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Quản lý sự kiện | Admin" };

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { eventDate: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      category: true,
      featured: true,
      eventDate: true,
      publishDate: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sự kiện</h1>
        <p className="text-slate-500 text-sm mt-1">
          Quản lý các sự kiện và hoạt động của trường
        </p>
      </div>
      <ContentTable rows={events} type="event" publicBasePath="/events" />
    </div>
  );
}
