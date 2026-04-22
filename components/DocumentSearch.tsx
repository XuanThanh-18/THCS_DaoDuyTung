// components/DocumentSearch.tsx
"use client";

import { useState, useMemo } from "react";
import { Search, Download, FileText, File } from "lucide-react";
import { formatDateVN } from "@/lib/format";
import { DOCUMENT_CATEGORIES } from "@/lib/constants";

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

interface Props {
  documents: Document[];
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

const FILE_ICON_COLORS: Record<string, string> = {
  PDF: "text-red-500 bg-red-50",
  DOCX: "text-blue-500 bg-blue-50",
  DOC: "text-blue-500 bg-blue-50",
  XLSX: "text-green-500 bg-green-50",
  XLS: "text-green-500 bg-green-50",
  PPTX: "text-orange-500 bg-orange-50",
};

export default function DocumentSearch({ documents }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("Tất cả");

  const categories = ["Tất cả", ...DOCUMENT_CATEGORIES];

  const filtered = useMemo(() => {
    return documents.filter((doc) => {
      const matchSearch =
        search === "" ||
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.category.toLowerCase().includes(search.toLowerCase()) ||
        (doc.description?.toLowerCase().includes(search.toLowerCase()) ??
          false);
      const matchCategory =
        activeCategory === "Tất cả" || doc.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [documents, search, activeCategory]);

  return (
    <div>
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-outline/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-surface"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-white"
                : "bg-surface-container text-on-surface-variant hover:bg-primary/10 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-sm text-on-surface-variant mb-6">
        {filtered.length} tài liệu
      </p>

      {/* Document list */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <FileText
            size={40}
            className="mx-auto text-on-surface-variant/30 mb-3"
          />
          <p className="text-on-surface-variant">
            Không tìm thấy tài liệu nào.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc) => {
            const iconClass =
              FILE_ICON_COLORS[doc.fileType.toUpperCase()] ??
              "text-slate-500 bg-slate-50";

            return (
              <div
                key={doc.id}
                className="flex items-center gap-4 p-5 rounded-2xl border border-outline/10 bg-surface-container hover:border-outline/30 hover:shadow-sm transition-all"
              >
                <div className={`p-3 rounded-xl shrink-0 ${iconClass}`}>
                  <FileText size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-on-surface text-sm leading-snug truncate">
                    {doc.title}
                  </p>
                  {doc.description && (
                    <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">
                      {doc.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-on-surface-variant">
                    <span className="font-medium text-tertiary uppercase">
                      {doc.fileType}
                    </span>
                    {doc.fileSize && (
                      <>
                        <span>·</span>
                        <span>{formatFileSize(doc.fileSize)}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{formatDateVN(doc.createdAt)}</span>
                  </div>
                </div>
                <a
                  href={doc.fileUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                  title="Tải xuống"
                >
                  <Download size={18} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
