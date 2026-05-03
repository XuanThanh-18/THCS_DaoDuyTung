// components/DocumentSearch.tsx
"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  Download,
  FileText,
  File,
  X,
  Eye,
  FileSpreadsheet,
  Presentation,
  Image as ImageIcon,
  Archive,
  ChevronRight,
  Filter,
  FolderOpen,
  ExternalLink,
  Calendar,
  HardDrive,
  Tag,
} from "lucide-react";
import { formatDateVN } from "@/lib/format";
import { DOCUMENT_CATEGORIES } from "@/lib/constants";

// ─── Types ────────────────────────────────────────────────
interface Document {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  fileType: string;
  fileSize: number | null;
  category: string;
  createdAt: Date;
}

// ─── Helpers ──────────────────────────────────────────────
function formatFileSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function getFileExt(fileType: string, fileUrl: string): string {
  // Try from URL first
  const urlMatch = fileUrl.split("?")[0].split(".").pop()?.toUpperCase();
  if (urlMatch && urlMatch.length <= 5) return urlMatch;
  // Fallback from MIME
  const mime = fileType.toLowerCase();
  if (mime.includes("pdf")) return "PDF";
  if (mime.includes("wordprocessingml") || mime.includes("msword"))
    return "DOCX";
  if (mime.includes("spreadsheetml") || mime.includes("excel")) return "XLSX";
  if (mime.includes("presentationml") || mime.includes("powerpoint"))
    return "PPTX";
  if (mime.includes("jpeg") || mime.includes("jpg")) return "JPG";
  if (mime.includes("png")) return "PNG";
  if (mime.includes("zip") || mime.includes("rar")) return "ZIP";
  if (mime.includes("text")) return "TXT";
  return "FILE";
}

interface FileStyle {
  icon: React.ReactNode;
  bg: string;
  accent: string;
  badgeBg: string;
  badgeText: string;
  gradientFrom: string;
  gradientTo: string;
}

function getFileStyle(ext: string): FileStyle {
  switch (ext) {
    case "PDF":
      return {
        icon: <FileText size={32} />,
        bg: "bg-red-50",
        accent: "text-red-500",
        badgeBg: "bg-red-500",
        badgeText: "text-white",
        gradientFrom: "from-red-100",
        gradientTo: "to-red-50",
      };
    case "DOCX":
    case "DOC":
      return {
        icon: <FileText size={32} />,
        bg: "bg-blue-50",
        accent: "text-blue-600",
        badgeBg: "bg-blue-600",
        badgeText: "text-white",
        gradientFrom: "from-blue-100",
        gradientTo: "to-blue-50",
      };
    case "XLSX":
    case "XLS":
      return {
        icon: <FileSpreadsheet size={32} />,
        bg: "bg-emerald-50",
        accent: "text-emerald-600",
        badgeBg: "bg-emerald-600",
        badgeText: "text-white",
        gradientFrom: "from-emerald-100",
        gradientTo: "to-emerald-50",
      };
    case "PPTX":
    case "PPT":
      return {
        icon: <Presentation size={32} />,
        bg: "bg-orange-50",
        accent: "text-orange-500",
        badgeBg: "bg-orange-500",
        badgeText: "text-white",
        gradientFrom: "from-orange-100",
        gradientTo: "to-orange-50",
      };
    case "JPG":
    case "JPEG":
    case "PNG":
    case "GIF":
    case "WEBP":
      return {
        icon: <ImageIcon size={32} />,
        bg: "bg-purple-50",
        accent: "text-purple-500",
        badgeBg: "bg-purple-500",
        badgeText: "text-white",
        gradientFrom: "from-purple-100",
        gradientTo: "to-purple-50",
      };
    case "ZIP":
    case "RAR":
      return {
        icon: <Archive size={32} />,
        bg: "bg-amber-50",
        accent: "text-amber-600",
        badgeBg: "bg-amber-600",
        badgeText: "text-white",
        gradientFrom: "from-amber-100",
        gradientTo: "to-amber-50",
      };
    default:
      return {
        icon: <File size={32} />,
        bg: "bg-slate-50",
        accent: "text-slate-500",
        badgeBg: "bg-slate-500",
        badgeText: "text-white",
        gradientFrom: "from-slate-100",
        gradientTo: "to-slate-50",
      };
  }
}

// ─── Skeleton Card ─────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-16 bg-slate-200 rounded-full" />
        </div>
        <div className="h-4 w-4/5 bg-slate-200 rounded" />
        <div className="h-3 w-3/5 bg-slate-100 rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-8 flex-1 bg-slate-100 rounded-lg" />
          <div className="h-8 flex-1 bg-slate-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Thumbnail ─────────────────────────────────────────────
function DocumentThumbnail({
  doc,
  style,
  ext,
}: {
  doc: Document;
  style: FileStyle;
  ext: string;
}) {
  const isImage = ["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(ext);

  if (isImage) {
    return (
      <div className="h-44 overflow-hidden bg-slate-100">
        <img
          src={doc.fileUrl}
          alt={doc.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            // fallback to icon if image fails
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) {
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center ${style.bg}"><div class="${style.accent} opacity-40 scale-150">📄</div></div>`;
            }
          }}
        />
      </div>
    );
  }

  // For PDF: show a styled "document preview" area with decorative lines
  return (
    <div
      className={`h-44 bg-gradient-to-br ${style.gradientFrom} ${style.gradientTo} flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* Decorative paper lines */}
      <div className="absolute inset-4 opacity-10">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-current mb-3 last:mb-0"
            style={{ width: `${70 + (i % 3) * 10}%` }}
          />
        ))}
      </div>
      {/* Big icon */}
      <div className={`${style.accent} opacity-25 mb-2 transform scale-[2.5]`}>
        {style.icon}
      </div>
      {/* Ext badge floating */}
      <span
        className={`absolute bottom-3 right-3 text-[10px] font-black px-2 py-1 rounded-md ${style.badgeBg} ${style.badgeText} tracking-wider opacity-70`}
      >
        {ext}
      </span>
    </div>
  );
}

// ─── Preview Modal ─────────────────────────────────────────
function PreviewModal({
  doc,
  onClose,
}: {
  doc: Document;
  onClose: () => void;
}) {
  const ext = getFileExt(doc.fileType, doc.fileUrl);
  const style = getFileStyle(ext);
  const isPDF = ext === "PDF";
  const isImage = ["JPG", "JPEG", "PNG", "GIF", "WEBP"].includes(ext);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`p-2 rounded-lg ${style.bg} ${style.accent} shrink-0`}
            >
              {style.icon}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-slate-800 truncate text-sm leading-tight">
                {doc.title}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {ext} · {formatFileSize(doc.fileSize)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4 shrink-0">
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink size={13} /> Mở tab mới
            </a>
            <a
              href={doc.fileUrl}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download size={13} /> Tải xuống
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Viewer */}
        <div className="flex-1 overflow-auto bg-slate-50 min-h-0">
          {isPDF ? (
            <iframe
              src={`${doc.fileUrl}#toolbar=1&view=FitH`}
              className="w-full h-full min-h-[60vh]"
              title={doc.title}
            />
          ) : isImage ? (
            <div className="flex items-center justify-center p-8 h-full min-h-[60vh]">
              <img
                src={doc.fileUrl}
                alt={doc.title}
                className="max-w-full max-h-full rounded-xl shadow-lg object-contain"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center min-h-[60vh]">
              <div
                className={`w-20 h-20 ${style.bg} rounded-2xl flex items-center justify-center mb-5 ${style.accent}`}
              >
                <div className="scale-[1.8]">{style.icon}</div>
              </div>
              <p className="text-slate-700 font-semibold mb-2">
                Không thể xem trước định dạng {ext}
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Vui lòng tải về để xem nội dung tài liệu
              </p>
              <a
                href={doc.fileUrl}
                download
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
              >
                <Download size={16} /> Tải xuống ngay
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Document Card ─────────────────────────────────────────
function DocumentCard({
  doc,
  onPreview,
}: {
  doc: Document;
  onPreview: (doc: Document) => void;
}) {
  const ext = getFileExt(doc.fileType, doc.fileUrl);
  const style = getFileStyle(ext);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onPreview(doc)}
      >
        <DocumentThumbnail doc={doc} style={style} ext={ext} />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
            <Eye size={13} /> Xem trước
          </span>
        </div>
        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide bg-white/90 text-slate-600 px-2.5 py-1 rounded-full shadow-sm backdrop-blur-sm">
          {doc.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* File type badge + size */}
        <div className="flex items-center gap-2 mb-2.5">
          <span
            className={`text-[10px] font-black px-2 py-0.5 rounded ${style.badgeBg} ${style.badgeText} tracking-wider`}
          >
            {ext}
          </span>
          {doc.fileSize && (
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
              <HardDrive size={10} /> {formatFileSize(doc.fileSize)}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onPreview(doc)}
          className="font-semibold text-slate-800 text-sm leading-snug line-clamp-2 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors flex-1"
        >
          {doc.title}
        </h3>

        {/* Description */}
        {doc.description && (
          <p className="text-xs text-slate-400 line-clamp-1 mb-2">
            {doc.description}
          </p>
        )}

        {/* Date */}
        <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-3">
          <Calendar size={10} />
          {formatDateVN(doc.createdAt)}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onPreview(doc)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Eye size={13} /> Xem trước
          </button>
          <a
            href={doc.fileUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Tải xuống"
          >
            <Download size={13} /> Tải xuống
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────
interface Props {
  documents: Document[];
}

export default function DocumentSearch({ documents }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load for skeleton effect
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const categories = ["Tất cả", ...DOCUMENT_CATEGORIES];

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        doc.title.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q) ||
        (doc.description?.toLowerCase().includes(q) ?? false);
      const matchCat =
        activeCategory === "Tất cả" || doc.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [documents, search, activeCategory]);

  // Category counts
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = { "Tất cả": documents.length };
    documents.forEach((d) => {
      counts[d.category] = (counts[d.category] ?? 0) + 1;
    });
    return counts;
  }, [documents]);

  return (
    <>
      {/* ── Search + Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
          <Filter size={14} />
          <span>{filtered.length} tài liệu</span>
        </div>
      </div>

      {/* ── Category pills ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const count = catCounts[cat] ?? 0;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {cat}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Grid ── */}
      {isLoading ? (
        /* Skeleton */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mb-5">
            <FolderOpen size={32} className="text-slate-400" />
          </div>
          <p className="text-slate-700 font-semibold text-lg mb-1">
            {search ? "Không tìm thấy kết quả" : "Chưa có tài liệu nào"}
          </p>
          <p className="text-slate-400 text-sm">
            {search
              ? `Không có tài liệu nào phù hợp với "${search}"`
              : "Chưa có tài liệu nào trong danh mục này"}
          </p>
          {search && (
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("Tất cả");
              }}
              className="mt-4 text-sm text-blue-600 hover:underline font-medium"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      ) : (
        /* Document grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} onPreview={setPreviewDoc} />
          ))}
        </div>
      )}

      {/* ── Preview Modal ── */}
      {previewDoc && (
        <PreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />
      )}
    </>
  );
}
