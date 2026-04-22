// app/events/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { formatDateVN } from "@/lib/format";
import { SCHOOL } from "@/lib/constants";
import Link from "next/link";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sự kiện & Hoạt động | ${SCHOOL.shortName}`,
  description: `Các sự kiện, hoạt động nổi bật của ${SCHOOL.name}`,
};

async function getEvents() {
  const now = new Date();
  const [upcoming, past] = await Promise.all([
    prisma.event.findMany({
      where: { status: "PUBLISHED", eventDate: { gte: now } },
      orderBy: { eventDate: "asc" },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        category: true,
        eventDate: true,
        location: true,
      },
    }),
    prisma.event.findMany({
      where: { status: "PUBLISHED", eventDate: { lt: now } },
      orderBy: { eventDate: "desc" },
      take: 6,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        category: true,
        eventDate: true,
        location: true,
      },
    }),
  ]);
  return { upcoming, past };
}

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-3 block">
            Lịch hoạt động
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface leading-tight tracking-tight">
            Sự kiện & Hoạt động
          </h1>
          <p className="mt-6 text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
            Những sự kiện, hoạt động đặc sắc của {SCHOOL.shortName}.
          </p>
        </header>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-primary rounded-full inline-block" />
              Sắp diễn ra
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcoming.map((event) => {
                const d = new Date(event.eventDate);
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group bg-surface-container rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-outline/10"
                  >
                    {event.coverImage && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={event.coverImage}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-3">
                      {/* Date badge */}
                      <div className="flex items-center gap-2 text-primary font-bold text-sm">
                        <Calendar size={16} />
                        {formatDateVN(d)}
                      </div>
                      {event.category && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">
                          {event.category}
                        </span>
                      )}
                      <h3 className="font-headline font-bold text-on-surface text-lg line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      {event.location && (
                        <p className="text-sm text-on-surface-variant flex items-center gap-1.5">
                          <MapPin size={14} className="shrink-0" />
                          {event.location}
                        </p>
                      )}
                      {event.description && (
                        <p className="text-sm text-on-surface-variant line-clamp-2 flex-1">
                          {event.description}
                        </p>
                      )}
                      <div className="flex items-center gap-1 text-primary font-bold text-sm mt-1 group-hover:gap-3 transition-all">
                        Xem chi tiết <ChevronRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section>
            <h2 className="text-2xl font-headline font-bold text-on-surface mb-8 flex items-center gap-2">
              <span className="w-2 h-6 bg-slate-300 rounded-full inline-block" />
              Đã diễn ra
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group flex gap-4 p-4 rounded-xl border border-outline/10 hover:border-outline/30 hover:shadow-sm transition-all bg-surface-container"
                >
                  {event.coverImage && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-on-surface-variant mb-1">
                      {formatDateVN(event.eventDate)}
                    </p>
                    <h3 className="font-bold text-on-surface text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    {event.location && (
                      <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1">
                        <MapPin size={11} /> {event.location}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <div className="text-center py-24">
            <p className="text-on-surface-variant text-lg">
              Chưa có sự kiện nào.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
