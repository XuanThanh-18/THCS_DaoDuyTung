"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  MapPin,
  Loader2,
  ChevronRight,
  Save,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";
import { ContentFormData } from "@/lib/validation";
import { generateSlug } from "@/lib/slug";
import RichTextEditor from "./RichTextEditor";

interface ContentEditorFormProps {
  type: "post" | "event" | "announcement";
  initialData?: any;
  isEditing?: boolean;
}

const CATEGORIES = {
  post: ["Sự kiện nổi bật", "Hoạt động", "Thể thao", "Giáo dục", "Tin tức"],
  event: [
    "Sự kiện lớn",
    "Thành tích",
    "Khoa học công nghệ",
    "Cộng đồng",
    "Văn hóa",
  ],
  announcement: ["Hành chính", "Quy định", "Học tập", "Thông báo khác"],
};

export default function ContentEditorForm({
  type,
  initialData,
  isEditing = false,
}: ContentEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    content: initialData?.content || "",
    excerpt: initialData?.excerpt || "",
    coverImage: initialData?.coverImage || "",
    category: initialData?.category || "",
    status: initialData?.status || "DRAFT",
    featured: initialData?.featured || false,
    publishDate: initialData?.publishDate
      ? new Date(initialData.publishDate).toISOString().split("T")[0]
      : "",
    // Fields riêng cho event
    description: initialData?.description || "",
    eventDate: initialData?.eventDate
      ? new Date(initialData.eventDate).toISOString().split("T")[0]
      : "",
    location: initialData?.location || "",
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: newTitle,
      slug: generateSlug(newTitle),
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent,
    action: "draft" | "publish",
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const endpoint = isEditing
        ? `/api/content/${type}/${initialData.id}`
        : `/api/content/${type}`;

      const method = isEditing ? "PUT" : "POST";

      const payload = {
        ...formData,
        status: action === "publish" ? "PUBLISHED" : "DRAFT",
        publishDate: formData.publishDate
          ? new Date(formData.publishDate)
          : null,
      };

      // Remove fields không cần cho type này
      if (type !== "event") {
        delete payload.eventDate;
        delete payload.location;
        delete payload.description;
      }
      if (type !== "post") {
        delete payload.excerpt;
      }

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Có lỗi xảy ra");
      }

      router.push(`/admin/content/${type}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            {isEditing ? "Chỉnh sửa" : "Tạo mới"}{" "}
            {type === "post"
              ? "bài viết"
              : type === "event"
                ? "sự kiện"
                : "thông báo"}
          </h1>
          <p className="text-slate-600">Điền thông tin chi tiết bên dưới</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Lỗi</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form
          className="gap-6"
          style={{
            display: "grid",
            gridTemplateColumns: showPreview ? "1fr 1fr" : "2fr 1fr",
            gridAutoFlow: "dense",
          }}
        >
          {/* Main Content */}
          <div className="space-y-6">
            {/* Title */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Tiêu đề *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Nhập tiêu đề..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-slate-500 mt-2">
                Tiêu đề không quá 200 ký tự
              </p>
            </div>

            {/* Slug */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="slug-tự-sinh..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-2">
                Tự sinh từ tiêu đề, có thể chỉnh sửa
              </p>
            </div>

            {/* Cover Image */}
            <div className="bg-white rounded-lg shadow p-6">
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Ảnh đại diện
              </label>
              <div className="flex gap-4">
                {formData.coverImage && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={formData.coverImage}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coverImage: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                URL ảnh hoặc tải lên từ máy
              </p>
            </div>

            {/* Excerpt */}
            {(type === "post" || type === "event") && (
              <div className="bg-white rounded-lg shadow p-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Tóm tắt ngắn
                </label>
                <textarea
                  value={
                    type === "event" ? formData.description : formData.excerpt
                  }
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [type === "event" ? "description" : "excerpt"]:
                        e.target.value,
                    }))
                  }
                  placeholder="Mô tả ngắn gọn nội dung..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-slate-900">
                  Nội dung chi tiết *
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition"
                >
                  {showPreview ? (
                    <>
                      <EyeOff size={16} /> Ẩn xem trước
                    </>
                  ) : (
                    <>
                      <Eye size={16} /> Xem trước
                    </>
                  )}
                </button>
              </div>
              <RichTextEditor
                value={formData.content}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, content: value }))
                }
                placeholder="Nhập nội dung chi tiết (hỗ trợ định dạng, ảnh, link)..."
              />
            </div>

            {/* Event Date & Location */}
            {type === "event" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <label className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Ngày diễn ra *
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        eventDate: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <label className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Địa điểm *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Nhập địa điểm..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1">
            {showPreview ? (
              /* Preview Panel */
              <div className="bg-white rounded-lg shadow sticky top-4 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h3 className="font-semibold text-white text-lg">
                    📋 Xem trước bài viết
                  </h3>
                </div>
                <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                  {/* Title Preview */}
                  {formData.title && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        Tiêu đề
                      </p>
                      <h1 className="text-2xl font-bold text-slate-900">
                        {formData.title}
                      </h1>
                    </div>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 pb-4 border-b">
                    {type === "event" && formData.eventDate && (
                      <div className="flex items-center gap-1 text-sm text-slate-600 bg-gray-100 px-3 py-1 rounded">
                        <Calendar size={14} />
                        {new Date(formData.eventDate).toLocaleDateString(
                          "vi-VN",
                        )}
                      </div>
                    )}
                    {type === "event" && formData.location && (
                      <div className="flex items-center gap-1 text-sm text-slate-600 bg-gray-100 px-3 py-1 rounded">
                        <MapPin size={14} />
                        {formData.location}
                      </div>
                    )}
                    {formData.category && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                        {formData.category}
                      </span>
                    )}
                  </div>

                  {/* Cover Image Preview */}
                  {formData.coverImage && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        Ảnh đại diện
                      </p>
                      <img
                        src={formData.coverImage}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/400x300?text=Lỗi+ảnh";
                        }}
                      />
                    </div>
                  )}

                  {/* Excerpt Preview */}
                  {(formData.excerpt || formData.description) && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        Tóm tắt
                      </p>
                      <p className="text-slate-700 line-clamp-4">
                        {formData.excerpt || formData.description}
                      </p>
                    </div>
                  )}

                  {/* Content Preview */}
                  {formData.content && (
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        Nội dung
                      </p>
                      <div
                        className="prose prose-sm max-w-none text-slate-700 line-clamp-6"
                        dangerouslySetInnerHTML={{ __html: formData.content }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Settings Panel */
              <>
                <div className="bg-white rounded-lg shadow p-6 sticky top-4 space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Cài đặt xuất bản
                    </h3>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Danh mục *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Chọn danh mục...</option>
                      {CATEGORIES[type].map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          status: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="DRAFT">📝 Nháp</option>
                      <option value="PENDING">⏳ Chờ duyệt</option>
                      <option value="PUBLISHED">✅ Đã đăng</option>
                    </select>
                  </div>

                  {/* Publish Date */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Ngày đăng
                    </label>
                    <input
                      type="date"
                      value={formData.publishDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          publishDate: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Featured */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            featured: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        🌟 Bài nổi bật
                      </span>
                    </label>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-200 pt-6">
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={(e) => handleSubmit(e, "draft")}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-slate-100 text-slate-900 font-semibold rounded-lg hover:bg-slate-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Lưu nháp
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleSubmit(e, "publish")}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        Xuất bản
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
