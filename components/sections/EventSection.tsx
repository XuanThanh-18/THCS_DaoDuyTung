"use client";
import React, { useState, useEffect } from "react";
import { ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt?: string | null;
  eventDate: string; // ← đúng tên field
  location?: string | null;
  category?: string | null;
  coverImage?: string | null;
  createdAt: string;
}

export default function EventSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events?upcoming=true&limit=3");
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: String(date.getDate()).padStart(2, "0"),
      month: `Tháng ${date.getMonth() + 1}`,
    };
  };

  if (loading) {
    return (
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Sự kiện nổi bật
          </h2>
          <p className="text-on-surface-variant mt-4">Đang tải...</p>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Sự kiện nổi bật
          </h2>
          <p className="text-on-surface-variant mt-4">
            Chưa có sự kiện sắp tới.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mt-4">
            Sự kiện nổi bật
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => {
            const dateInfo = formatDate(event.eventDate); // ← dùng eventDate
            return (
              <div
                key={event.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      event.coverImage ||
                      "https://picsum.photos/seed/event/400/300"
                    }
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-headline font-bold text-slate-800 mb-1 line-clamp-2">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={14} className="text-slate-500" />
                    <span className="text-sm font-medium text-slate-600">
                      {dateInfo.day} {dateInfo.month}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 font-body leading-relaxed">
                    {event.excerpt || event.description}
                  </p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group-hover:gap-3"
                  >
                    Xem chi tiết
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
