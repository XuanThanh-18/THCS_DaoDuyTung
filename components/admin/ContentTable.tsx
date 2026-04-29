// components/admin/ContentTable.tsx — FIXED VERSION
// Fix: API_BASE paths phải khớp với actual API route files
// Fix: ADMIN_PATH phải khớp với actual admin page folders
//
// ⚠️ QUAN TRỌNG: Kiểm tra folder nào thực sự tồn tại trong project của bạn:
//   Option A: app/api/posts/[id]/route.ts   → dùng API_BASE_A
//   Option B: app/api/content/post/[id]/route.ts → dùng API_BASE_B
//   (Audit tìm thấy mâu thuẫn giữa 2 phần code)

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
  publicBasePath: string;
}

const TYPE_LABELS = {
  post: { single: "bài viết", plural: "Bài viết" },
  event: { single: "sự kiện", plural: "Sự kiện" },
  announcement: { single: "thông báo", plural: "Thông báo" },
};

// ── CHỌN 1 TRONG 2 OPTION SAU ──────────────────────────────────────────────
//
// Option A: Nếu API routes nằm ở app/api/posts/, app/api/events/, etc.
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

// Option B: Nếu API routes nằm ở app/api/content/{type}/
// const API_BASE: Record<string, string> = {
//   post: "/api/content/post",
//   event: "/api/content/event",
//   announcement: "/api/content/announcement",
// };
// const ADMIN_PATH: Record<string, string> = {
//   post: "content/post",
//   event: "content/event",
//   announcement: "content/announcement",
// };
// ───────────────────────────────────────────────────────────────────────────

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
  const adminPath = ADMIN_PATH[type];

  const filtered = rows.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()),
  );

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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder={`Tìm ${labels.single}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
        </div>
        <Link
          href={`/admin/${adminPath}/new`}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Thêm {labels.single}
        </Link>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          {search
            ? `Không tìm thấy ${labels.single} nào với từ khóa "${search}"`
            : `Chưa có ${labels.single} nào.`}
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 font-medium text-slate-600">
                  Tiêu đề
                </th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">
                  Trạng thái
                </th>
                <th className="text-left px-4 py-3 font-medium text-slate-600 hidden lg:table-cell">
                  Ngày tạo
                </th>
                <th className="text-right px-4 py-3 font-medium text-slate-600">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-slate-800 line-clamp-1">
                        {row.title}
                      </p>
                      {row.category && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          {row.category}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        CONTENT_STATUS_COLORS[
                          row.status as keyof typeof CONTENT_STATUS_COLORS
                        ] ?? "bg-slate-100 text-slate-600",
                      )}
                    >
                      {CONTENT_STATUS_LABELS[
                        row.status as keyof typeof CONTENT_STATUS_LABELS
                      ] ?? row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 hidden lg:table-cell">
                    {formatDateVN(row.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {/* View public */}
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
                      {/* Edit */}
                      <Link
                        href={`/admin/${adminPath}/${row.id}/edit`}
                        className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
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
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 disabled:opacity-50"
                          >
                            {deletingId === row.id ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              "Xác nhận"
                            )}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded hover:bg-slate-200"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmId(row.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
  );
}
