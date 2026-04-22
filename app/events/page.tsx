"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  category?: string;
  coverImage?: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
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
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      full: date.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) >= new Date();
  };

  const upcomingEvents = events.filter((e) => isUpcoming(e.date));
  const pastEvents = events.filter((e) => !isUpcoming(e.date));

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-3 block">
            Lịch sự kiện
          </span>
          <h1 className="text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight">
            Sự kiện & Hoạt động
          </h1>
          <p className="mt-4 text-on-surface-variant max-w-2xl text-lg font-body">
            Theo dõi các sự kiện, lễ hội và hoạt động ngoại khóa của nhà trường.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-on-surface-variant">
            Đang tải sự kiện...
          </p>
        ) : events.length === 0 ? (
          <p className="text-center text-on-surface-variant py-12">
            Chưa có sự kiện nào.
          </p>
        ) : (
          <>
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <section className="mb-20">
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-8">
                  Sự kiện sắp tới
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event) => {
                    const dateInfo = formatDate(event.date);
                    return (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="group flex flex-col h-full rounded-2xl overflow-hidden bg-surface-container-high hover:bg-surface-container transition-all duration-300 hover:shadow-xl"
                      >
                        {/* Image */}
                        {event.coverImage && (
                          <div className="relative aspect-video overflow-hidden bg-surface-container">
                            <img
                              src={event.coverImage}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          {/* Date Badge */}
                          <div className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg w-fit">
                            <Calendar size={16} className="text-primary" />
                            <span className="text-sm font-bold text-primary">
                              {dateInfo.day}/{dateInfo.month}/{dateInfo.year}
                            </span>
                          </div>

                          {/* Category */}
                          {event.category && (
                            <span className="text-xs font-bold uppercase text-tertiary mb-2">
                              {event.category}
                            </span>
                          )}

                          {/* Title */}
                          <h3 className="font-headline font-bold text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>

                          {/* Location */}
                          {event.location && (
                            <p className="text-sm text-on-surface-variant mb-4 flex items-center gap-1">
                              <MapPin size={14} /> {event.location}
                            </p>
                          )}

                          {/* Description */}
                          {event.description && (
                            <p className="text-sm text-on-surface-variant line-clamp-2 flex-1 mb-4">
                              {event.description}
                            </p>
                          )}

                          {/* Read More */}
                          <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                            Xem chi tiết <ChevronRight size={16} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <section>
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-8">
                  Sự kiện đã qua
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event) => {
                    const dateInfo = formatDate(event.date);
                    return (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className="group flex flex-col h-full rounded-2xl overflow-hidden bg-surface-container-high hover:bg-surface-container transition-all duration-300 hover:shadow-xl opacity-75 hover:opacity-100"
                      >
                        {/* Image */}
                        {event.coverImage && (
                          <div className="relative aspect-video overflow-hidden bg-surface-container">
                            <img
                              src={event.coverImage}
                              alt={event.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          {/* Date Badge */}
                          <div className="mb-4 inline-flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-lg w-fit">
                            <Calendar size={16} className="text-secondary" />
                            <span className="text-sm font-bold text-secondary">
                              {dateInfo.day}/{dateInfo.month}/{dateInfo.year}
                            </span>
                          </div>

                          {/* Category */}
                          {event.category && (
                            <span className="text-xs font-bold uppercase text-on-surface-variant mb-2">
                              {event.category}
                            </span>
                          )}

                          {/* Title */}
                          <h3 className="font-headline font-bold text-on-surface mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {event.title}
                          </h3>

                          {/* Location */}
                          {event.location && (
                            <p className="text-sm text-on-surface-variant mb-4 flex items-center gap-1">
                              <MapPin size={14} /> {event.location}
                            </p>
                          )}

                          {/* Description */}
                          {event.description && (
                            <p className="text-sm text-on-surface-variant line-clamp-2 flex-1 mb-4">
                              {event.description}
                            </p>
                          )}

                          {/* Read More */}
                          <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                            Xem chi tiết <ChevronRight size={16} />
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
