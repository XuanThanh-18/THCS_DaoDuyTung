// components/admin/ContentTable.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatDateVN } from "@/lib/format";
import { CONTENT_STATUS_COLORS, CONTENT_STATUS_LABELS } from "@/lib/constants";
import {
  Pencil,
  Trash2,
  Plus,
  Eye,
  Loader2,
  Search,
  ChevronRight,
  Home,
  AlertTriangle,
  SlidersHorizontal,
  X,
  Filter,
} from "lucide-react";

export interface ContentRow {
  id: string;
  title: string;
  slug: string;
  status: string;
  category?: string | null;
  featured?: boolean;
  publishDate?: Date | string | null;
  eventDate?: Date | string | null;
  createdAt: Date | string;
  author?: { name: string | null } | null;
}

interface ContentTableProps {
  rows: ContentRow[];
  type: "post" | "event" | "announcement";
  publicBasePath: string;
}

const TYPE_CONFIG = {
  post: { label: "Bài viết", newLabel: "Thêm bài viết", color: "blue" },
  event: { label: "Sự kiện", newLabel: "Thêm sự kiện", color: "violet" },
  announcement: {
    label: "Thông báo",
    newLabel: "Thêm thông báo",
    color: "amber",
  },
};

const API_BASE: Record<string, string> = {
  post: "/api/posts",
  event: "/api/events",
  announcement: "/api/announcements",
};
const ADMIN_PATH: Record<string, string> = {
  post: "posts",
  event: "events",
  announcement: "announcements",
};

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả" },
  { value: "PUBLISHED", label: "Đã đăng" },
  { value: "DRAFT", label: "Nháp" },
  { value: "PENDING", label: "Chờ duyệt" },
];

export default function ContentTable({
  rows,
  type,
  publicBasePath,
}: ContentTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const cfg = TYPE_CONFIG[type];
  const adminPath = ADMIN_PATH[type];

  const filtered = rows.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE[type]}/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Xóa thất bại");
      }
      router.refresh();
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Xóa thất bại. Vui lòng thử lại.",
      );
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  const statusCounts = STATUS_OPTIONS.slice(1).map((s) => ({
    ...s,
    count: rows.filter((r) => r.status === s.value).length,
  }));

  return (
    <div className="space-y-6">
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          href="/admin/dashboard"
          className="hover:text-slate-600 flex items-center gap-1"
        >
          <Home size={14} /> Dashboard
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-700 font-medium">{cfg.label}</span>
      </nav>

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{cfg.label}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {rows.length} {cfg.label.toLowerCase()} trong hệ thống
          </p>
        </div>
        <Link
          href={`/admin/${adminPath}/new`}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm",
            type === "post"
              ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
              : type === "event"
                ? "bg-violet-600 hover:bg-violet-700 shadow-violet-200"
                : "bg-amber-500 hover:bg-amber-600 shadow-amber-200",
          )}
        >
          <Plus size={16} />
          {cfg.newLabel}
        </Link>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setStatusFilter("")}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
            !statusFilter
              ? "bg-slate-900 text-white"
              : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
          )}
        >
          Tất cả
          <span className="ml-1.5 text-xs opacity-60">{rows.length}</span>
        </button>
        {statusCounts.map((s) => (
          <button
            key={s.value}
            onClick={() =>
              setStatusFilter(s.value === statusFilter ? "" : s.value)
            }
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              statusFilter === s.value
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50",
            )}
          >
            {s.label}
            <span className="ml-1.5 text-xs opacity-60">{s.count}</span>
          </button>
        ))}
      </div>

      {/* ── Main card ── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Search bar */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Tìm kiếm ${cfg.label.toLowerCase()}...`}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-slate-50"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400 ml-auto">
            {filtered.length} kết quả
          </p>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Search size={22} className="text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">Không tìm thấy kết quả</p>
            <p className="text-slate-400 text-sm mt-1">
              Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide w-[40%]">
                    Tiêu đề
                  </th>
                  {type !== "announcement" && (
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                      Danh mục
                    </th>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    {type === "event" ? "Ngày diễn ra" : "Ngày tạo"}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    Tác giả
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-slate-800 line-clamp-1 leading-snug">
                            {row.title}
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5 font-mono">
                            /{row.slug}
                          </p>
                        </div>
                        {row.featured && (
                          <span className="shrink-0 text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded">
                            Nổi bật
                          </span>
                        )}
                      </div>
                    </td>

                    {type !== "announcement" && (
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        {row.category && (
                          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                            {row.category}
                          </span>
                        )}
                      </td>
                    )}

                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold",
                          row.status === "PUBLISHED"
                            ? "bg-green-100 text-green-700"
                            : row.status === "PENDING"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600",
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            row.status === "PUBLISHED"
                              ? "bg-green-500"
                              : row.status === "PENDING"
                                ? "bg-amber-500"
                                : "bg-slate-400",
                          )}
                        />
                        {CONTENT_STATUS_LABELS[row.status] ?? row.status}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-500 text-xs hidden lg:table-cell">
                      {formatDateVN(
                        type === "event" && row.eventDate
                          ? row.eventDate
                          : row.createdAt,
                      )}
                    </td>

                    <td className="px-4 py-3.5 hidden lg:table-cell">
                      {row.author?.name && (
                        <span className="text-xs text-slate-500">
                          {row.author.name}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        {row.status === "PUBLISHED" && (
                          <Link
                            href={`${publicBasePath}/${row.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Xem trang công khai"
                          >
                            <Eye size={15} />
                          </Link>
                        )}

                        <Link
                          href={`/admin/${adminPath}/${row.id}/edit`}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Chỉnh sửa"
                        >
                          <Pencil size={15} />
                        </Link>

                        {confirmId === row.id ? (
                          <div className="flex items-center gap-1 bg-red-50 border border-red-100 rounded-lg px-2 py-1">
                            <AlertTriangle size={12} className="text-red-500" />
                            <button
                              onClick={() => handleDelete(row.id)}
                              disabled={deletingId === row.id}
                              className="text-xs text-red-600 font-semibold hover:text-red-700 disabled:opacity-50"
                            >
                              {deletingId === row.id ? (
                                <Loader2 size={12} className="animate-spin" />
                              ) : (
                                "Xóa"
                              )}
                            </button>
                            <button
                              onClick={() => setConfirmId(null)}
                              className="text-xs text-slate-500 hover:text-slate-700 ml-1"
                            >
                              Hủy
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmId(row.id)}
                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
