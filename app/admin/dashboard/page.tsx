// app/admin/dashboard/page.tsx
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatDateVN } from "@/lib/format";
import { CONTENT_STATUS_COLORS, CONTENT_STATUS_LABELS } from "@/lib/constants";
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

export const metadata = {
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

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const stats = await getStats();

  const statCards = [
    {
      label: "Bài viết",
      value: stats.totalPosts,
      sub: `${stats.publishedPosts} đã đăng`,
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
      href: "/admin/posts",
    },
    {
      label: "Sự kiện",
      value: stats.totalEvents,
      sub: "Tổng số sự kiện",
      icon: Calendar,
      color: "bg-purple-50 text-purple-600",
      href: "/admin/events",
    },
    {
      label: "Thông báo",
      value: stats.totalAnnouncements,
      sub: "Tổng số thông báo",
      icon: Bell,
      color: "bg-orange-50 text-orange-600",
      href: "/admin/announcements",
    },
    {
      label: "Tin nhắn mới",
      value: stats.unreadMessages,
      sub: "Chưa đọc",
      icon: Mail,
      color: "bg-green-50 text-green-600",
      href: "/admin/contact-messages",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tổng quan</h1>
          <p className="text-slate-500 text-sm mt-1">
            Chào mừng trở lại, {user?.email}
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Thêm bài viết
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
                </div>
                <div className={cn("p-2.5 rounded-lg", card.color)}>
                  <Icon size={20} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent posts */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-slate-400" />
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

        {/* Upcoming events */}
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
                Không có sự kiện sắp tới
              </p>
            ) : (
              stats.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="px-5 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-purple-600 leading-none">
                      {new Date(event.eventDate).getDate()}
                    </span>
                    <span className="text-[10px] text-purple-400 leading-none mt-0.5">
                      Th{new Date(event.eventDate).getMonth() + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {event.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {event.location ?? "Chưa có địa điểm"}
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

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
