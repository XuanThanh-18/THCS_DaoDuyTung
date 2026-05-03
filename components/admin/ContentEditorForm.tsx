// components/admin/ContentEditorForm.tsx
"use client";

import { useState, useRef, useCallback } from "react";
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
  Star,
  Hash,
  Type,
  Home,
  ChevronRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Minus,
  Code,
  Link2,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  EyeOff,
  Upload,
  X,
  CheckCircle2,
} from "lucide-react";
import { generateSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { POST_CATEGORIES, EVENT_CATEGORIES } from "@/lib/constants";
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

const TYPE_META: Record<
  ContentType,
  { label: string; back: string; api: string; color: string }
> = {
  post: {
    label: "Bài viết",
    back: "/admin/posts",
    api: "/api/posts",
    color: "blue",
  },
  event: {
    label: "Sự kiện",
    back: "/admin/events",
    api: "/api/events",
    color: "violet",
  },
  announcement: {
    label: "Thông báo",
    back: "/admin/announcements",
    api: "/api/announcements",
    color: "amber",
  },
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

// ── Rich Text Toolbar Actions ────────────────────────────
interface ToolbarAction {
  icon: React.ReactNode;
  title: string;
  action: string;
  value?: string;
}

function insertAtCursor(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string = "",
  placeholder: string = "",
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end) || placeholder;
  const newValue =
    textarea.value.substring(0, start) +
    before +
    selected +
    after +
    textarea.value.substring(end);
  return {
    value: newValue,
    cursorStart: start + before.length,
    cursorEnd: start + before.length + selected.length,
  };
}

function RichToolbar({
  textareaRef,
  onChange,
}: {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onChange: (val: string) => void;
}) {
  const exec = (
    before: string,
    after: string = "",
    placeholder: string = "text",
  ) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const result = insertAtCursor(ta, before, after, placeholder);
    onChange(result.value);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(result.cursorStart, result.cursorEnd);
    }, 0);
  };

  const insertLine = (prefix: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
    const newValue =
      ta.value.substring(0, lineStart) + prefix + ta.value.substring(lineStart);
    onChange(newValue);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + prefix.length, start + prefix.length);
    }, 0);
  };

  const groups = [
    [
      {
        icon: <Heading2 size={14} />,
        title: "Tiêu đề H2",
        fn: () => insertLine("## "),
      },
      {
        icon: <Heading3 size={14} />,
        title: "Tiêu đề H3",
        fn: () => insertLine("### "),
      },
    ],
    [
      {
        icon: <Bold size={14} />,
        title: "In đậm",
        fn: () => exec("**", "**", "in đậm"),
      },
      {
        icon: <Italic size={14} />,
        title: "In nghiêng",
        fn: () => exec("*", "*", "in nghiêng"),
      },
      {
        icon: <Code size={14} />,
        title: "Code",
        fn: () => exec("`", "`", "code"),
      },
    ],
    [
      {
        icon: <List size={14} />,
        title: "Danh sách",
        fn: () => insertLine("- "),
      },
      {
        icon: <ListOrdered size={14} />,
        title: "Danh sách số",
        fn: () => insertLine("1. "),
      },
      {
        icon: <Quote size={14} />,
        title: "Trích dẫn",
        fn: () => insertLine("> "),
      },
    ],
    [
      {
        icon: <Link2 size={14} />,
        title: "Chèn link",
        fn: () => exec("[", "](url)", "text link"),
      },
      {
        icon: <ImageIcon size={14} />,
        title: "Chèn ảnh",
        fn: () => exec("![", "](url ảnh)", "mô tả ảnh"),
      },
      {
        icon: <Minus size={14} />,
        title: "Đường phân cách",
        fn: () => {
          const ta = textareaRef.current;
          if (!ta) return;
          const val = ta.value + "\n---\n";
          onChange(val);
        },
      },
    ],
  ];

  return (
    <div className="flex items-center gap-1 flex-wrap px-3 py-2 border-b border-slate-200 bg-slate-50/80">
      {groups.map((group, gi) => (
        <div
          key={gi}
          className={cn(
            "flex items-center gap-0.5",
            gi > 0 && "ml-1 pl-1 border-l border-slate-200",
          )}
        >
          {group.map((btn, bi) => (
            <button
              key={bi}
              type="button"
              title={btn.title}
              onClick={btn.fn}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white rounded-md transition-colors"
            >
              {btn.icon}
            </button>
          ))}
        </div>
      ))}
      <div className="ml-auto text-[10px] text-slate-400 font-mono">
        Markdown
      </div>
    </div>
  );
}

// ── Form Field components ────────────────────────────────
function FormLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
      {children}{" "}
      {required && <span className="text-red-400 normal-case">*</span>}
    </label>
  );
}

function FormInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white",
        props.className,
      )}
    />
  );
}

function FormSelect({
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white",
        props.className,
      )}
    />
  );
}

// ── Main Component ───────────────────────────────────────
export default function ContentEditorForm({
  type,
  initialData,
  isEditing = false,
}: ContentEditorFormProps) {
  const router = useRouter();
  const meta = TYPE_META[type];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
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
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  const mainContent = type === "event" ? form.description : form.content;
  const mainContentKey = (
    type === "event" ? "description" : "content"
  ) as keyof FormState;
  const mainContentLabel =
    type === "event" ? "Mô tả chi tiết" : "Nội dung bài viết";

  const validate = (): string | null => {
    if (!form.title.trim()) return "Vui lòng nhập tiêu đề";
    if (type === "post" && !form.content.trim())
      return "Vui lòng nhập nội dung";
    if (type === "post" && !form.category) return "Vui lòng chọn danh mục";
    if (type === "event" && !form.description.trim())
      return "Vui lòng nhập mô tả";
    if (type === "event" && !form.eventDate)
      return "Vui lòng chọn ngày diễn ra";
    if (type === "announcement" && !form.content.trim())
      return "Vui lòng nhập nội dung";
    return null;
  };

  const buildPayload = (action: "draft" | "publish") => {
    const base = {
      title: form.title,
      slug: form.slug,
      status: action === "publish" ? "PUBLISHED" : "DRAFT",
      publishDate: form.publishDate ? new Date(form.publishDate) : null,
      featured: form.featured,
    };
    if (type === "post")
      return {
        ...base,
        content: form.content,
        excerpt: form.excerpt || null,
        coverImage: form.coverImage || null,
        category: form.category,
      };
    if (type === "event")
      return {
        ...base,
        description: form.description,
        excerpt: form.excerpt || null,
        coverImage: form.coverImage || null,
        category: form.category || null,
        eventDate: form.eventDate ? new Date(form.eventDate) : null,
        location: form.location || null,
      };
    return { ...base, content: form.content };
  };

  const handleSubmit = async (
    e: React.MouseEvent,
    action: "draft" | "publish",
  ) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const url = isEditing ? `${meta.api}/${initialData?.id}` : meta.api;
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(action)),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Có lỗi xảy ra");
      }
      setSaved(true);
      setTimeout(() => {
        router.push(meta.back);
        router.refresh();
      }, 600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const categories = CATEGORY_MAP[type];
  const btnColor =
    meta.color === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : meta.color === "violet"
        ? "bg-violet-600 hover:bg-violet-700"
        : "bg-amber-500 hover:bg-amber-600";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ── Breadcrumb ── */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          href="/admin/dashboard"
          className="hover:text-slate-600 flex items-center gap-1"
        >
          <Home size={14} /> Dashboard
        </Link>
        <ChevronRight size={14} />
        <Link href={meta.back} className="hover:text-slate-600">
          {meta.label}
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-700 font-medium">
          {isEditing ? "Chỉnh sửa" : "Tạo mới"}
        </span>
      </nav>

      {/* ── Page title row ── */}
      <div className="flex items-center gap-4">
        <Link
          href={meta.back}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white border border-slate-200 transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {isEditing ? `Chỉnh sửa ${meta.label}` : `Tạo ${meta.label} mới`}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {isEditing
              ? "Cập nhật nội dung và nhấn Lưu thay đổi"
              : "Điền đầy đủ thông tin và chọn Xuất bản"}
          </p>
        </div>
      </div>

      {/* ── Error / Success ── */}
      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" /> {error}
        </div>
      )}
      {saved && (
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl text-sm text-green-700">
          <CheckCircle2 size={16} /> Đã lưu thành công! Đang chuyển hướng...
        </div>
      )}

      {/* ── 2 col layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── LEFT: Main content (2/3) ── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title + Slug card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="mb-4">
              <FormLabel required>Tiêu đề</FormLabel>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder={`Nhập tiêu đề ${meta.label}...`}
                className="w-full text-xl font-semibold text-slate-900 placeholder:text-slate-300 bg-transparent border-none outline-none resize-none"
              />
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <Hash size={13} className="text-slate-400 shrink-0" />
              <span className="text-xs text-slate-400 shrink-0">Slug:</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                className="flex-1 text-xs text-slate-600 font-mono bg-transparent border-none outline-none"
                placeholder="tien-de-bai-viet"
              />
            </div>
          </div>

          {/* Cover image (only post/event) */}
          {type !== "announcement" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <FormLabel>Ảnh đại diện</FormLabel>
              <FormInput
                type="url"
                value={form.coverImage}
                onChange={(e) => set("coverImage", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {form.coverImage && (
                <div className="mt-3 relative rounded-xl overflow-hidden aspect-video bg-slate-100">
                  <img
                    src={form.coverImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <button
                    onClick={() => set("coverImage", "")}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Excerpt */}
          {type !== "announcement" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <FormLabel>Tóm tắt ngắn</FormLabel>
              <textarea
                value={form.excerpt}
                onChange={(e) => set("excerpt", e.target.value)}
                placeholder="Viết tóm tắt ngắn gọn, hiển thị ở trang danh sách..."
                rows={3}
                className="w-full text-sm border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
              />
            </div>
          )}

          {/* Event specific fields */}
          {type === "event" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Thông tin sự kiện
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <FormLabel required>Ngày diễn ra</FormLabel>
                  <div className="relative">
                    <Calendar
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <FormInput
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => set("eventDate", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <FormLabel>Địa điểm</FormLabel>
                  <div className="relative">
                    <MapPin
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <FormInput
                      type="text"
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                      placeholder="Hội trường tầng 3..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Rich Content Editor */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <FormLabel>{mainContentLabel}</FormLabel>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                {showPreview ? (
                  <>
                    <EyeOff size={12} /> Soạn thảo
                  </>
                ) : (
                  <>
                    <Eye size={12} /> Xem trước
                  </>
                )}
              </button>
            </div>

            {!showPreview ? (
              <>
                <RichToolbar
                  textareaRef={
                    textareaRef as React.RefObject<HTMLTextAreaElement>
                  }
                  onChange={(val) => set(mainContentKey, val)}
                />
                <textarea
                  ref={textareaRef}
                  value={mainContent}
                  onChange={(e) => set(mainContentKey, e.target.value)}
                  placeholder="Viết nội dung tại đây... (hỗ trợ Markdown)

# Tiêu đề lớn
## Tiêu đề nhỏ

**In đậm**, *in nghiêng*, `code`

- Danh sách
- Điểm 2

> Trích dẫn"
                  rows={20}
                  className="w-full px-5 py-4 text-sm text-slate-700 font-mono leading-relaxed focus:outline-none resize-y border-0 min-h-[400px]"
                />
              </>
            ) : (
              <div className="px-5 py-4 min-h-[400px] prose prose-sm max-w-none text-slate-700 prose-headings:font-bold prose-a:text-blue-600">
                {mainContent ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: mainContent
                        .replace(/^# (.+)$/gm, "<h1>$1</h1>")
                        .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                        .replace(/^### (.+)$/gm, "<h3>$1</h3>")
                        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\*(.+?)\*/g, "<em>$1</em>")
                        .replace(/`(.+?)`/g, "<code>$1</code>")
                        .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
                        .replace(/^- (.+)$/gm, "<li>$1</li>")
                        .replace(/^---$/gm, "<hr />")
                        .replace(/\n\n/g, "</p><p>")
                        .replace(
                          /!\[(.+?)\]\((.+?)\)/g,
                          '<img src="$2" alt="$1" class="rounded-lg" />',
                        )
                        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>'),
                    }}
                  />
                ) : (
                  <p className="text-slate-400 italic">Chưa có nội dung...</p>
                )}
              </div>
            )}

            <div className="px-5 py-2 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-400 flex items-center justify-between">
              <span>Hỗ trợ Markdown</span>
              <span>{mainContent.length} ký tự</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Sidebar (1/3) ── */}
        <div className="space-y-5">
          {/* Publish actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
              Xuất bản
            </h3>

            <div className="space-y-3 mb-5">
              <div>
                <FormLabel>Trạng thái</FormLabel>
                <FormSelect
                  value={form.status}
                  onChange={(e) => set("status", e.target.value)}
                >
                  <option value="DRAFT">📝 Nháp</option>
                  <option value="PENDING">⏳ Chờ duyệt</option>
                  <option value="PUBLISHED">✅ Đã đăng</option>
                </FormSelect>
              </div>
              <div>
                <FormLabel>Ngày đăng</FormLabel>
                <FormInput
                  type="date"
                  value={form.publishDate}
                  onChange={(e) => set("publishDate", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={(e) => handleSubmit(e, "publish")}
                disabled={loading}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2.5 text-white text-sm font-semibold rounded-xl transition-colors",
                  btnColor,
                  loading && "opacity-60 cursor-not-allowed",
                )}
              >
                {loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Send size={15} />
                )}
                {isEditing ? "Lưu thay đổi" : "Xuất bản ngay"}
              </button>
              <button
                onClick={(e) => handleSubmit(e, "draft")}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
              >
                <Save size={15} />
                Lưu nháp
              </button>
            </div>
          </div>

          {/* Category (only post/event) */}
          {categories.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <FormLabel required>Danh mục</FormLabel>
              <FormSelect
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
              >
                <option value="">Chọn danh mục...</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </FormSelect>
            </div>
          )}

          {/* Options */}
          {type !== "announcement" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                Tùy chọn
              </h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => set("featured", !form.featured)}
                  className={cn(
                    "w-9 h-5 rounded-full transition-colors relative cursor-pointer",
                    form.featured ? "bg-amber-400" : "bg-slate-200",
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform",
                      form.featured ? "translate-x-4" : "translate-x-0.5",
                    )}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Star
                      size={13}
                      className={
                        form.featured
                          ? "text-amber-400 fill-amber-400"
                          : "text-slate-400"
                      }
                    />
                    Bài viết nổi bật
                  </p>
                  <p className="text-xs text-slate-400">
                    Hiển thị ở vị trí đầu tiên
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Tips */}
          <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
            <p className="text-xs font-semibold text-blue-700 mb-2">
              💡 Mẹo soạn thảo
            </p>
            <ul className="text-xs text-blue-600 space-y-1 list-disc list-inside">
              <li>Dùng toolbar để định dạng nhanh</li>
              <li>Bấm "Xem trước" để kiểm tra</li>
              <li>Lưu nháp trước khi xuất bản</li>
              <li>Ảnh: dán URL trực tiếp vào editor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
