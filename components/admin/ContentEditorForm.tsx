// components/admin/ContentEditorForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  MapPin,
  Loader2,
  Save,
  Send,
  ArrowLeft,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Star,
} from "lucide-react";
import { generateSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";
import {
  POST_CATEGORIES,
  EVENT_CATEGORIES,
  CONTENT_STATUS_LABELS,
} from "@/lib/constants";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

type ContentType = "post" | "event" | "announcement";

interface ContentEditorFormProps {
  type: ContentType;
  initialData?: Record<string, unknown>;
  isEditing?: boolean;
}

const CATEGORY_MAP: Record<ContentType, readonly string[]> = {
  post: POST_CATEGORIES,
  event: EVENT_CATEGORIES,
  announcement: [],
};

const TYPE_LABELS: Record<ContentType, string> = {
  post: "bài viết",
  event: "sự kiện",
  announcement: "thông báo",
};

const BACK_HREF: Record<ContentType, string> = {
  post: "/admin/posts",
  event: "/admin/events",
  announcement: "/admin/announcements",
};

// API endpoint mới (không còn /api/content/)
const API_BASE: Record<ContentType, string> = {
  post: "/api/posts",
  event: "/api/events",
  announcement: "/api/announcements",
};

interface FormState {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  description: string;
  coverImage: string;
  category: string;
  status: string;
  featured: boolean;
  publishDate: string;
  eventDate: string;
  location: string;
}

export default function ContentEditorForm({
  type,
  initialData,
  isEditing = false,
}: ContentEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [form, setForm] = useState<FormState>({
    title: (initialData?.title as string) ?? "",
    slug: (initialData?.slug as string) ?? "",
    content: (initialData?.content as string) ?? "",
    excerpt: (initialData?.excerpt as string) ?? "",
    description: (initialData?.description as string) ?? "",
    coverImage: (initialData?.coverImage as string) ?? "",
    category: (initialData?.category as string) ?? "",
    status: (initialData?.status as string) ?? "DRAFT",
    featured: (initialData?.featured as boolean) ?? false,
    publishDate: initialData?.publishDate
      ? new Date(initialData.publishDate as string).toISOString().split("T")[0]
      : "",
    eventDate: initialData?.eventDate
      ? new Date(initialData.eventDate as string).toISOString().split("T")[0]
      : "",
    location: (initialData?.location as string) ?? "",
  });

  const set = (key: keyof FormState, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      // Chỉ tự sinh slug khi tạo mới
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const buildPayload = (action: "draft" | "publish") => {
    const base = {
      title: form.title,
      slug: form.slug,
      status: action === "publish" ? "PUBLISHED" : "DRAFT",
      publishDate: form.publishDate ? new Date(form.publishDate) : null,
      featured: form.featured,
    };

    if (type === "post") {
      return {
        ...base,
        content: form.content,
        excerpt: form.excerpt || null,
        coverImage: form.coverImage || null,
        category: form.category,
      };
    }

    if (type === "event") {
      return {
        ...base,
        description: form.description,
        excerpt: form.excerpt || null,
        coverImage: form.coverImage || null,
        category: form.category || null,
        eventDate: form.eventDate ? new Date(form.eventDate) : null,
        location: form.location || null,
      };
    }

    // announcement
    return {
      ...base,
      content: form.content,
    };
  };

  const handleSubmit = async (
    e: React.FormEvent,
    action: "draft" | "publish",
  ) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const base = API_BASE[type];
      const url = isEditing ? `${base}/${initialData?.id}` : base;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(action)),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Có lỗi xảy ra");
      }

      router.push(BACK_HREF[type]);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const categories = CATEGORY_MAP[type];
  const mainContent = type === "event" ? form.description : form.content;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href={BACK_HREF[type]}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {isEditing ? "Chỉnh sửa" : "Tạo mới"} {TYPE_LABELS[type]}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isEditing
              ? "Cập nhật nội dung và nhấn Lưu"
              : "Điền thông tin và chọn Xuất bản hoặc Lưu nháp"}
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Cột trái (2/3) ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Tiêu đề <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder={`Nhập tiêu đề ${TYPE_LABELS[type]}...`}
                required
                className="w-full text-lg font-semibold text-slate-900 placeholder:text-slate-300 bg-transparent border-none outline-none resize-none"
              />
              {/* Slug */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                <span className="text-xs text-slate-400 shrink-0">Slug:</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className="flex-1 text-xs text-slate-500 bg-slate-50 rounded px-2 py-1 font-mono outline-none focus:bg-slate-100 transition-colors"
                />
              </div>
            </div>

            {/* Cover image (post & event) */}
            {type !== "announcement" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Ảnh đại diện
                </label>
                {form.coverImage && (
                  <div className="mb-3 rounded-lg overflow-hidden aspect-video w-full bg-slate-100">
                    <img
                      src={form.coverImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} className="text-slate-400 shrink-0" />
                  <input
                    type="url"
                    value={form.coverImage}
                    onChange={(e) => set("coverImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 outline-none focus:bg-slate-100 transition-colors border border-slate-200 focus:border-slate-300"
                  />
                </div>
              </div>
            )}

            {/* Excerpt / Description */}
            {type !== "announcement" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  {type === "event" ? "Mô tả ngắn" : "Tóm tắt"}
                </label>
                <textarea
                  value={type === "event" ? form.excerpt : form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                  placeholder="Mô tả ngắn gọn..."
                  rows={3}
                  className="w-full text-sm text-slate-700 bg-transparent border-none outline-none resize-none placeholder:text-slate-300"
                />
              </div>
            )}

            {/* Nội dung chính */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {type === "event" ? "Mô tả chi tiết" : "Nội dung"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                >
                  {showPreview ? (
                    <>
                      <EyeOff size={14} /> Ẩn preview
                    </>
                  ) : (
                    <>
                      <Eye size={14} /> Preview
                    </>
                  )}
                </button>
              </div>

              {showPreview ? (
                <div className="prose prose-sm max-w-none min-h-[200px] text-slate-700">
                  <ReactMarkdown>{mainContent}</ReactMarkdown>
                </div>
              ) : (
                <textarea
                  value={mainContent}
                  onChange={(e) =>
                    set(
                      type === "event" ? "description" : "content",
                      e.target.value,
                    )
                  }
                  placeholder="Nhập nội dung (hỗ trợ Markdown)..."
                  rows={14}
                  required
                  className="w-full text-sm text-slate-700 bg-transparent border-none outline-none resize-none placeholder:text-slate-300 font-mono leading-relaxed"
                />
              )}
            </div>

            {/* Event: Date + Location */}
            {type === "event" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    <Calendar size={12} className="inline mr-1" />
                    Ngày diễn ra <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.eventDate}
                    onChange={(e) => set("eventDate", e.target.value)}
                    required
                    className="w-full text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 outline-none focus:bg-slate-100 border border-slate-200 focus:border-slate-300 transition-colors"
                  />
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                    <MapPin size={12} className="inline mr-1" />
                    Địa điểm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    placeholder="Tên địa điểm..."
                    required
                    className="w-full text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 outline-none focus:bg-slate-100 border border-slate-200 focus:border-slate-300 transition-colors"
                  />
                </div>
              </div>
            )}
          </div>

          {/* ── Cột phải (1/3) — Publishing sidebar ── */}
          <div className="space-y-5">
            {/* Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Xuất bản
              </p>
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleSubmit(e, "publish")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                {isEditing ? "Lưu & Xuất bản" : "Xuất bản ngay"}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={(e) => handleSubmit(e, "draft")}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
              >
                <Save size={16} />
                Lưu nháp
              </button>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Trạng thái
              </label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 outline-none border border-slate-200 focus:border-slate-300 transition-colors"
              >
                {Object.entries(CONTENT_STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category (post & event) */}
            {categories.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  required
                  className="w-full text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 outline-none border border-slate-200 focus:border-slate-300 transition-colors"
                >
                  <option value="">Chọn danh mục...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Publish date */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Ngày đăng
              </label>
              <input
                type="date"
                value={form.publishDate}
                onChange={(e) => set("publishDate", e.target.value)}
                className="w-full text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 outline-none border border-slate-200 focus:border-slate-300 transition-colors"
              />
            </div>

            {/* Featured (post & event) */}
            {type !== "announcement" && (
              <div className="bg-white rounded-xl border border-slate-200 p-5">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => set("featured", !form.featured)}
                    className={cn(
                      "w-10 h-6 rounded-full relative transition-colors",
                      form.featured ? "bg-blue-600" : "bg-slate-200",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all",
                        form.featured ? "left-5" : "left-1",
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 flex items-center gap-1">
                      <Star size={14} className="text-amber-400" />
                      Bài nổi bật
                    </p>
                    <p className="text-xs text-slate-400">
                      Hiển thị ở vị trí đặc biệt
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
