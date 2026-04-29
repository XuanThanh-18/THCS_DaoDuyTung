// app/admin/dashboard/page.tsx
// FIX M1: Thêm redirect khi getCurrentUser() trả về null
// (Middleware đã xử lý, nhưng defense-in-depth tốt hơn)
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatDateVN } from "@/lib/format";
import { CONTENT_STATUS_COLORS, CONTENT_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Bell,
  Mail,
  TrendingUp,
  Clock,
  Plus,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Admin THCS Đào Duy Tùng",
};

async function getStats() {
  const [
    totalPosts,
    publishedPosts,
    totalEvents,
    totalAnnouncements,
    unreadMessages,
    recentPosts,
    recentEvents,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.event.count(),
    prisma.announcement.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        category: true,
        createdAt: true,
      },
    }),
    prisma.event.findMany({
      take: 5,
      orderBy: { eventDate: "asc" },
      where: {
        eventDate: { gte: new Date() },
        status: "PUBLISHED",
      },
      select: {
        id: true,
        title: true,
        eventDate: true,
        location: true,
      },
    }),
  ]);

  return {
    totalPosts,
    publishedPosts,
    totalEvents,
    totalAnnouncements,
    unreadMessages,
    recentPosts,
    recentEvents,
  };
}

const STAT_CARDS = [
  {
    key: "posts" as const,
    label: "Bài viết",
    href: "/admin/posts",
    icon: FileText,
    color: "text-blue-600 bg-blue-50",
  },
  {
    key: "events" as const,
    label: "Sự kiện",
    href: "/admin/events",
    icon: Calendar,
    color: "text-purple-600 bg-purple-50",
  },
  {
    key: "announcements" as const,
    label: "Thông báo",
    href: "/admin/announcements",
    icon: Bell,
    color: "text-amber-600 bg-amber-50",
  },
  {
    key: "messages" as const,
    label: "Tin nhắn",
    href: "/admin/messages",
    icon: Mail,
    color: "text-green-600 bg-green-50",
  },
];

export default async function DashboardPage() {
  // FIX M1: Defense-in-depth redirect nếu user null
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");

  const stats = await getStats();

  const statValues = {
    posts: stats.totalPosts,
    events: stats.totalEvents,
    announcements: stats.totalAnnouncements,
    messages: stats.unreadMessages,
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Xin chào, {user.email.split("@")[0]}! 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Đây là tổng quan hệ thống quản trị nhà trường
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Tạo bài viết
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.key}
              href={card.href}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className={cn("p-2 rounded-lg w-fit mb-3", card.color)}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-slate-900">
                {statValues[card.key]}
              </p>
              <p className="text-sm text-slate-500 mt-0.5">{card.label}</p>
              {card.key === "posts" && (
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <TrendingUp size={11} />
                  {stats.publishedPosts} đã đăng
                </p>
              )}
              {card.key === "messages" && stats.unreadMessages > 0 && (
                <span className="inline-block text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full mt-1">
                  {stats.unreadMessages} chưa đọc
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700">
                Bài viết gần đây
              </h2>
            </div>
            <Link
              href="/admin/posts"
              className="text-xs text-blue-600 hover:underline"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {stats.recentPosts.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">
                Chưa có bài viết nào
              </p>
            ) : (
              stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="px-5 py-3 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {post.category} · {formatDateVN(post.createdAt)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium shrink-0",
                      CONTENT_STATUS_COLORS[post.status],
                    )}
                  >
                    {CONTENT_STATUS_LABELS[post.status]}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700">
                Sự kiện sắp diễn ra
              </h2>
            </div>
            <Link
              href="/admin/events"
              className="text-xs text-blue-600 hover:underline"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {stats.recentEvents.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-8">
                Không có sự kiện nào sắp diễn ra
              </p>
            ) : (
              stats.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="px-5 py-3 flex items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {formatDateVN(event.eventDate)}
                      {event.location && ` · ${event.location}`}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
