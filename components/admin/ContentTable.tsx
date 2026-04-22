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
  AlertTriangle,
  Loader2,
  Search,
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
  publicBasePath: string; // e.g. "/news"
}

const TYPE_LABELS = {
  post: { single: "bài viết", plural: "Bài viết" },
  event: { single: "sự kiện", plural: "Sự kiện" },
  announcement: { single: "thông báo", plural: "Thông báo" },
};

const API_BASE: Record<string, string> = {
  post: "/api/posts",
  event: "/api/events",
  announcement: "/api/announcements",
};

export default function ContentTable({
  rows,
  type,
  publicBasePath,
}: ContentTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const labels = TYPE_LABELS[type];

  const filtered = rows.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE[type]}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      router.refresh();
    } catch {
      alert("Xóa thất bại. Vui lòng thử lại.");
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder={`Tìm ${labels.single}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
          />
        </div>
        <Link
          href={`/admin/${type === "post" ? "posts" : type === "event" ? "events" : "announcements"}/new`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shrink-0"
        >
          <Plus size={16} />
          Thêm {labels.single}
        </Link>
      </div>

      {/* Count */}
      <p className="text-sm text-slate-500">
        {filtered.length} {labels.single}
        {search && ` khớp với "${search}"`}
      </p>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-sm">
              {search
                ? `Không tìm thấy ${labels.single} nào.`
                : `Chưa có ${labels.single} nào. Hãy tạo mới!`}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Tiêu đề
                </th>
                {type !== "announcement" && (
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Danh mục
                  </th>
                )}
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">
                  {type === "event" ? "Ngày diễn ra" : "Ngày tạo"}
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Trạng thái
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Title */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      {row.featured && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 truncate max-w-[280px]">
                          {row.title}
                        </p>
                        <p className="text-xs text-slate-400 font-mono truncate max-w-[280px]">
                          /{row.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  {type !== "announcement" && (
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="text-xs text-slate-500">
                        {row.category ?? "—"}
                      </span>
                    </td>
                  )}

                  {/* Date */}
                  <td className="px-4 py-3.5 hidden sm:table-cell">
                    <span className="text-xs text-slate-500">
                      {type === "event" && row.eventDate
                        ? formatDateVN(row.eventDate)
                        : formatDateVN(row.createdAt)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-full font-medium",
                        CONTENT_STATUS_COLORS[row.status] ??
                          "bg-slate-100 text-slate-600",
                      )}
                    >
                      {CONTENT_STATUS_LABELS[row.status] ?? row.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {/* View public */}
                      {row.status === "PUBLISHED" && (
                        <a
                          href={`${publicBasePath}/${row.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                          title="Xem trên website"
                        >
                          <Eye size={15} />
                        </a>
                      )}

                      {/* Edit */}
                      <Link
                        href={`/admin/${
                          type === "post"
                            ? "posts"
                            : type === "event"
                              ? "events"
                              : "announcements"
                        }/${row.id}/edit`}
                        className="p-1.5 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                        title="Chỉnh sửa"
                      >
                        <Pencil size={15} />
                      </Link>

                      {/* Delete */}
                      {confirmId === row.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(row.id)}
                            disabled={deletingId === row.id}
                            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors disabled:opacity-50"
                          >
                            {deletingId === row.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <AlertTriangle size={12} />
                            )}
                            Xóa
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 rounded-md hover:bg-slate-100 transition-colors"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(row.id)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
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
        )}
      </div>
    </div>
  );
}
