// app/admin/(protected)/dashboard/page.tsx
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { formatDateVN, formatRelative } from "@/lib/format";
import { CONTENT_STATUS_COLORS, CONTENT_STATUS_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Bell,
  Mail,
  TrendingUp,
  Plus,
  ArrowRight,
  Eye,
  CheckCircle2,
  Clock,
  Users,
  BookOpen,
  Newspaper,
  BarChart3,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Admin THCS Đào Duy Tùng",
};

async function getStats() {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalEvents,
    upcomingEvents,
    totalAnnouncements,
    unreadMessages,
    totalMessages,
    totalDocuments,
    recentPosts,
    recentEvents,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.event.count(),
    prisma.event.count({
      where: { status: "PUBLISHED", eventDate: { gte: new Date() } },
    }),
    prisma.announcement.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.contactMessage.count(),
    prisma.document.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        status: true,
        category: true,
        createdAt: true,
        slug: true,
      },
    }),
    prisma.event.findMany({
      take: 4,
      orderBy: { eventDate: "asc" },
      where: { eventDate: { gte: new Date() }, status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        eventDate: true,
        location: true,
        slug: true,
      },
    }),
  ]);
  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalEvents,
    upcomingEvents,
    totalAnnouncements,
    unreadMessages,
    totalMessages,
    totalDocuments,
    recentPosts,
    recentEvents,
  };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  const stats = await getStats();

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Chào buổi sáng"
      : hour < 18
        ? "Chào buổi chiều"
        : "Chào buổi tối";

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-1">{greeting},</p>
          <h1 className="text-2xl font-bold text-slate-900">
            {user.email.split("@")[0]} 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Đây là tổng quan hệ thống quản trị nhà trường
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <Plus size={16} />
          Tạo bài viết
        </Link>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Bài viết",
            value: stats.totalPosts,
            href: "/admin/posts",
            icon: Newspaper,
            color: "text-blue-600",
            bg: "bg-blue-50",
            sub: `${stats.publishedPosts} đã đăng · ${stats.draftPosts} nháp`,
            subColor: "text-slate-400",
          },
          {
            label: "Sự kiện",
            value: stats.totalEvents,
            href: "/admin/events",
            icon: Calendar,
            color: "text-violet-600",
            bg: "bg-violet-50",
            sub: `${stats.upcomingEvents} sắp diễn ra`,
            subColor: "text-violet-500",
          },
          {
            label: "Tài liệu",
            value: stats.totalDocuments,
            href: "/admin/documents",
            icon: BookOpen,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            sub: "Tài liệu đã đăng tải",
            subColor: "text-slate-400",
          },
          {
            label: "Tin nhắn",
            value: stats.totalMessages,
            href: "/admin/contact-messages",
            icon: Mail,
            color: "text-amber-600",
            bg: "bg-amber-50",
            sub:
              stats.unreadMessages > 0
                ? `${stats.unreadMessages} chưa đọc`
                : "Tất cả đã đọc",
            subColor:
              stats.unreadMessages > 0
                ? "text-amber-600 font-semibold"
                : "text-slate-400",
            badge: stats.unreadMessages > 0 ? stats.unreadMessages : null,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-2.5 rounded-xl", card.bg)}>
                  <Icon size={20} className={card.color} />
                </div>
                {card.badge && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-1">
                {card.value}
              </p>
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className={cn("text-xs mt-1", card.subColor)}>{card.sub}</p>
            </Link>
          );
        })}
      </div>

      {/* ── Quick Actions ── */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Thao tác nhanh
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Bài viết mới",
              href: "/admin/posts/new",
              icon: FileText,
              color:
                "border-blue-200 hover:bg-blue-50 hover:border-blue-300 text-blue-700",
            },
            {
              label: "Sự kiện mới",
              href: "/admin/events/new",
              icon: Calendar,
              color:
                "border-violet-200 hover:bg-violet-50 hover:border-violet-300 text-violet-700",
            },
            {
              label: "Thông báo mới",
              href: "/admin/announcements/new",
              icon: Bell,
              color:
                "border-amber-200 hover:bg-amber-50 hover:border-amber-300 text-amber-700",
            },
            {
              label: "Upload tài liệu",
              href: "/admin/documents/new",
              icon: BookOpen,
              color:
                "border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 text-emerald-700",
            },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl border bg-white transition-all text-sm font-medium",
                  action.color,
                )}
              >
                <Plus size={15} />
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Grid: Recent Posts + Upcoming Events ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Posts (3/5) */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700">
                Bài viết gần đây
              </h2>
            </div>
            <Link
              href="/admin/posts"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {stats.recentPosts.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-10">
                Chưa có bài viết nào
              </p>
            ) : (
              stats.recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="px-6 py-3.5 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <FileText size={15} className="text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {post.category} · {formatRelative(post.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        CONTENT_STATUS_COLORS[post.status] ??
                          "bg-slate-100 text-slate-600",
                      )}
                    >
                      {CONTENT_STATUS_LABELS[post.status] ?? post.status}
                    </span>
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="p-1.5 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Events (2/5) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-700">
                Sự kiện sắp tới
              </h2>
            </div>
            <Link
              href="/admin/events"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              Xem tất cả <ArrowRight size={12} />
            </Link>
          </div>
          <div className="p-4 space-y-3">
            {stats.recentEvents.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">
                Không có sự kiện nào sắp tới
              </p>
            ) : (
              stats.recentEvents.map((event) => {
                const d = new Date(event.eventDate);
                return (
                  <Link
                    key={event.id}
                    href={`/admin/events/${event.id}/edit`}
                    className="flex gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    {/* Date box */}
                    <div className="w-12 bg-violet-50 rounded-xl flex flex-col items-center justify-center py-2 shrink-0">
                      <p className="text-lg font-bold text-violet-700 leading-none">
                        {d.getDate()}
                      </p>
                      <p className="text-[10px] text-violet-400 font-medium mt-0.5">
                        Th{d.getMonth() + 1}
                      </p>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {event.title}
                      </p>
                      {event.location && (
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {event.location}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
