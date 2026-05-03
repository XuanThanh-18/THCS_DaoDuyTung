// app/events/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { formatDateVN, formatDateLong } from "@/lib/format";
import { SCHOOL } from "@/lib/constants";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Clock,
  Tag,
  ChevronRight,
  Sparkles,
} from "lucide-react";
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
        excerpt: true,
        description: true,
        coverImage: true,
        category: true,
        eventDate: true,
        location: true,
        featured: true,
      },
    }),
    prisma.event.findMany({
      where: { status: "PUBLISHED", eventDate: { lt: now } },
      orderBy: { eventDate: "desc" },
      take: 9,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
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

// Format day/month separately for date badge
function splitDate(date: Date | string) {
  const d = new Date(date);
  return {
    day: d.getDate().toString().padStart(2, "0"),
    month: `Th${d.getMonth() + 1}`,
    year: d.getFullYear(),
    weekday: d.toLocaleDateString("vi-VN", { weekday: "short" }),
  };
}

// Category accent colors
const CAT_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Học thuật": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-400" },
  "Văn nghệ": { bg: "bg-pink-50", text: "text-pink-700", dot: "bg-pink-400" },
  "Thể thao": {
    bg: "bg-green-50",
    text: "text-green-700",
    dot: "bg-green-400",
  },
  "Tình nguyện": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-400",
  },
  "Lễ kỷ niệm": {
    bg: "bg-purple-50",
    text: "text-purple-700",
    dot: "bg-purple-400",
  },
  "Hội thảo": { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-400" },
};

function CategoryPill({ category }: { category: string | null }) {
  if (!category) return null;
  const c = CAT_COLORS[category] ?? {
    bg: "bg-primary/10",
    text: "text-primary",
    dot: "bg-primary",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${c.bg} ${c.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {category}
    </span>
  );
}

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();
  const featuredUpcoming = upcoming[0] ?? null;
  const otherUpcoming = upcoming.slice(1);

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto border-b border-outline-variant/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-tertiary font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-tertiary inline-block" />
              Lịch hoạt động
            </p>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-surface leading-tight">
              Sự kiện &<br className="hidden sm:block" /> Hoạt động
            </h1>
          </div>
          <p className="text-on-surface-variant font-body max-w-xs md:text-right leading-relaxed text-sm">
            Những sự kiện nổi bật và hoạt động phong trào của {SCHOOL.shortName}
            .
          </p>
        </div>
      </div>

      <div className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* ════════════════════════════════
            UPCOMING EVENTS
        ════════════════════════════════ */}
        {upcoming.length > 0 && (
          <section className="mt-12 mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={18} className="text-primary" />
              <h2 className="text-xl font-headline font-bold text-on-surface">
                Sắp diễn ra
              </h2>
              <span className="ml-1 bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {upcoming.length}
              </span>
            </div>

            {/* Featured upcoming — hero card */}
            {featuredUpcoming && (
              <Link
                href={`/events/${featuredUpcoming.slug}`}
                className="group block rounded-3xl overflow-hidden mb-6 bg-on-surface relative min-h-[360px] shadow-xl hover:shadow-2xl transition-shadow"
              >
                {featuredUpcoming.coverImage ? (
                  <img
                    src={featuredUpcoming.coverImage}
                    alt={featuredUpcoming.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-tertiary to-secondary" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                <div className="relative z-10 h-full flex flex-col justify-between p-8 md:p-12 min-h-[360px]">
                  <div className="flex items-start justify-between">
                    <CategoryPill category={featuredUpcoming.category} />
                    {/* Big date badge */}
                    <div className="text-right hidden sm:block">
                      <p className="text-white/50 text-xs font-body uppercase tracking-widest">
                        {splitDate(featuredUpcoming.eventDate).weekday}
                      </p>
                      <p className="text-white text-5xl font-headline font-bold leading-none">
                        {splitDate(featuredUpcoming.eventDate).day}
                      </p>
                      <p className="text-white/70 text-sm font-body">
                        {splitDate(featuredUpcoming.eventDate).month} ·{" "}
                        {splitDate(featuredUpcoming.eventDate).year}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl md:text-4xl font-headline font-bold text-white mb-4 leading-tight group-hover:text-primary/90 transition-colors max-w-2xl">
                      {featuredUpcoming.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm font-body mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formatDateLong(featuredUpcoming.eventDate)}
                      </span>
                      {featuredUpcoming.location && (
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {featuredUpcoming.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                      Xem chi tiết <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Other upcoming — card grid */}
            {otherUpcoming.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherUpcoming.map((event) => {
                  const d = splitDate(event.eventDate);
                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.slug}`}
                      className="group bg-white rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/30 hover:shadow-lg transition-all flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden bg-surface-container-high">
                        {event.coverImage ? (
                          <img
                            src={event.coverImage}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-tertiary/10" />
                        )}
                        {/* Date badge overlay */}
                        <div className="absolute top-3 left-3 bg-white rounded-xl px-3 py-2 shadow-md text-center min-w-[52px]">
                          <p className="text-primary text-xl font-headline font-bold leading-none">
                            {d.day}
                          </p>
                          <p className="text-on-surface-variant text-[10px] font-bold uppercase mt-0.5">
                            {d.month}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="mb-2">
                          <CategoryPill category={event.category} />
                        </div>
                        <h3 className="font-headline font-bold text-on-surface text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {event.title}
                        </h3>
                        {event.location && (
                          <p className="text-xs text-on-surface-variant flex items-center gap-1.5 font-body mb-3">
                            <MapPin
                              size={12}
                              className="shrink-0 text-tertiary"
                            />
                            {event.location}
                          </p>
                        )}
                        {(event.excerpt || event.description) && (
                          <p className="text-sm text-on-surface-variant font-body line-clamp-2 leading-relaxed flex-1">
                            {event.excerpt ?? event.description}
                          </p>
                        )}
                        <div className="flex items-center gap-1 text-primary text-xs font-bold mt-4 group-hover:gap-2 transition-all">
                          Xem chi tiết <ChevronRight size={14} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ════════════════════════════════
            PAST EVENTS
        ════════════════════════════════ */}
        {past.length > 0 && (
          <section>
            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-outline-variant/30" />
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-on-surface-variant" />
                <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest font-body whitespace-nowrap">
                  Đã diễn ra
                </span>
              </div>
              <div className="flex-1 h-px bg-outline-variant/30" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {past.map((event) => {
                const d = splitDate(event.eventDate);
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-outline/30 hover:shadow-md transition-all flex"
                  >
                    {/* Left: date column */}
                    <div className="w-20 shrink-0 bg-surface-container-low flex flex-col items-center justify-center py-5 px-2 border-r border-outline-variant/20 gap-0.5">
                      <span className="text-2xl font-headline font-bold text-on-surface-variant group-hover:text-primary transition-colors leading-none">
                        {d.day}
                      </span>
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant/70 tracking-wide">
                        {d.month}
                      </span>
                      <span className="text-[10px] text-on-surface-variant/50 font-body">
                        {d.year}
                      </span>
                    </div>

                    {/* Right: content */}
                    <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        <CategoryPill category={event.category} />
                        <h3 className="font-headline font-bold text-on-surface text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mt-2">
                          {event.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-body mt-3">
                        {event.location && (
                          <>
                            <MapPin size={11} className="shrink-0" />
                            <span className="truncate">{event.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {upcoming.length === 0 && past.length === 0 && (
          <div className="text-center py-32">
            <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar size={28} className="text-on-surface-variant" />
            </div>
            <p className="text-on-surface-variant text-lg font-body">
              Chưa có sự kiện nào.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
