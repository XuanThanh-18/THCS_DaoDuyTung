"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailLayout from "@/components/DetailLayout";
import { Loader, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location?: string;
  category?: string;
  coverImage?: string;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/events/${id}`);

      if (!response.ok) {
        throw new Error("Không tìm thấy sự kiện");
      }

      const data = await response.json();
      setEvent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải sự kiện");
      console.error("Failed to fetch event:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-primary" size={40} />
          <p className="text-on-surface-variant">Đang tải sự kiện...</p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-on-surface font-bold text-xl">{error || "Lỗi"}</p>
          <a href="/events" className="text-primary font-bold hover:underline">
            ← Quay lại danh sách sự kiện
          </a>
        </div>
      </main>
    );
  }

  return (
    <DetailLayout
      type="event"
      backLink="/events"
      backText="Quay lại sự kiện"
      title={event.title}
      category={event.category}
      date={formatDate(event.date)}
      location={event.location}
      image={event.coverImage}
    >
      {/* Event Details */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
            Thông tin chi tiết
          </h2>

          <div className="space-y-6">
            {/* Ngày và giờ */}
            <div className="p-6 bg-surface-container-high rounded-2xl border border-outline/20">
              <p className="text-on-surface-variant text-sm font-bold uppercase mb-2">
                📅 Ngày & Giờ
              </p>
              <p className="text-on-surface font-bold text-lg">
                {formatDate(event.date)}
              </p>
            </div>

            {/* Địa điểm */}
            {event.location && (
              <div className="p-6 bg-surface-container-high rounded-2xl border border-outline/20">
                <p className="text-on-surface-variant text-sm font-bold uppercase mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Địa điểm
                </p>
                <p className="text-on-surface font-bold text-lg">
                  {event.location}
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-4">
            Mô tả
          </h2>
          <div className="p-6 bg-surface-container-high rounded-2xl border border-outline/20">
            <p className="text-on-surface-variant leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-tertiary/10 rounded-2xl border border-primary/20">
        <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">
          Bạn muốn tham gia sự kiện này?
        </h3>
        <p className="text-on-surface-variant mb-6">
          Vui lòng liên hệ với phòng Công tác chủ nhiệm hoặc Ban tổ chức sự kiện
          để biết thêm chi tiết.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-bold"
        >
          Liên hệ ngay →
        </a>
      </div>
    </DetailLayout>
  );
}
