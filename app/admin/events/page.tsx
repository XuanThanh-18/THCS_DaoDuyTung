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

  return <ContentTable rows={events} type="event" publicBasePath="/events" />;
}
