// app/admin/documents/new/page.tsx
// Trang tạo tài liệu với drag & drop upload, progress bar, file preview
"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Upload,
  X,
  File,
  FileText,
  Image,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Home,
  ChevronRight,
  Files,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DOCUMENT_CATEGORIES } from "@/lib/constants";

interface UploadedFile {
  file: File;
  preview?: string;
  progress: number;
  status: "idle" | "uploading" | "done" | "error";
  url?: string;
  error?: string;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/"))
    return <Image size={20} className="text-blue-500" />;
  if (type.includes("pdf"))
    return <FileText size={20} className="text-red-500" />;
  if (type.includes("word") || type.includes("doc"))
    return <FileText size={20} className="text-blue-700" />;
  if (type.includes("sheet") || type.includes("excel"))
    return <FileText size={20} className="text-green-600" />;
  return <File size={20} className="text-slate-500" />;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function NewDocumentPage() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    fileUrl: "",
    fileType: "",
    fileSize: 0,
  });
  const set = (k: string, v: unknown) => setForm((p) => ({ ...p, [k]: v }));

  // ── Simulate upload (in production: upload to Supabase Storage / S3) ──
  const processFile = useCallback((file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      setError("File quá lớn (tối đa 50MB)");
      return;
    }

    const preview = file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : undefined;
    const uf: UploadedFile = {
      file,
      preview,
      progress: 0,
      status: "uploading",
    };
    setUploadedFile(uf);
    setError(null);

    // Auto-fill title from filename
    const nameWithoutExt = file.name.replace(/\.[^.]+$/, "");
    set("title", nameWithoutExt);
    set("fileType", file.type || "application/octet-stream");
    set("fileSize", file.size);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        // In production: upload to cloud storage and get real URL
        const fakeUrl = `https://storage.example.com/documents/${Date.now()}-${file.name}`;
        set("fileUrl", fakeUrl);
        setUploadedFile((prev) =>
          prev
            ? { ...prev, progress: 100, status: "done", url: fakeUrl }
            : null,
        );
      } else {
        setUploadedFile((prev) => (prev ? { ...prev, progress } : null));
      }
    }, 200);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    set("fileUrl", "");
    set("fileType", "");
    set("fileSize", 0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Vui lòng nhập tên tài liệu");
      return;
    }
    if (!form.category) {
      setError("Vui lòng chọn danh mục");
      return;
    }
    if (!form.fileUrl) {
      setError("Vui lòng upload file");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? "Có lỗi xảy ra");
      }
      setSaved(true);
      setTimeout(() => {
        router.push("/admin/documents");
        router.refresh();
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400">
        <Link
          href="/admin/dashboard"
          className="hover:text-slate-600 flex items-center gap-1"
        >
          <Home size={14} /> Dashboard
        </Link>
        <ChevronRight size={14} />
        <Link href="/admin/documents" className="hover:text-slate-600">
          Tài liệu
        </Link>
        <ChevronRight size={14} />
        <span className="text-slate-700 font-medium">Upload mới</span>
      </nav>

      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/documents"
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white border border-slate-200 transition-all"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Upload tài liệu mới
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Hỗ trợ PDF, Word, Excel, ảnh và nhiều định dạng khác
          </p>
        </div>
      </div>

      {/* Error / Success */}
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

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Drop zone */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              File tài liệu
            </p>
          </div>

          {!uploadedFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "m-4 rounded-xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center py-14 gap-3",
                dragging
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
              )}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                  dragging ? "bg-emerald-100" : "bg-slate-100",
                )}
              >
                <Upload
                  size={24}
                  className={dragging ? "text-emerald-500" : "text-slate-400"}
                />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-700">
                  {dragging ? "Thả file tại đây" : "Kéo & thả file vào đây"}
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  hoặc{" "}
                  <span className="text-blue-600 font-medium">
                    chọn file từ máy tính
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  PDF, Word, Excel, ảnh · Tối đa 50MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.zip,.rar"
              />
            </div>
          ) : (
            <div className="m-4">
              {/* File preview */}
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                {/* Image preview or icon */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  {uploadedFile.preview ? (
                    <img
                      src={uploadedFile.preview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getFileIcon(uploadedFile.file.type)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 truncate">
                    {uploadedFile.file.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {formatSize(uploadedFile.file.size)} ·{" "}
                    {uploadedFile.file.type || "Không xác định"}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span
                        className={cn(
                          "font-medium",
                          uploadedFile.status === "done"
                            ? "text-green-600"
                            : uploadedFile.status === "error"
                              ? "text-red-600"
                              : "text-blue-600",
                        )}
                      >
                        {uploadedFile.status === "done"
                          ? "✅ Upload hoàn tất"
                          : uploadedFile.status === "error"
                            ? "❌ Lỗi upload"
                            : `Đang upload... ${Math.round(uploadedFile.progress)}%`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          uploadedFile.status === "done"
                            ? "bg-green-500"
                            : uploadedFile.status === "error"
                              ? "bg-red-500"
                              : "bg-blue-500",
                        )}
                        style={{ width: `${uploadedFile.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Thông tin tài liệu
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Tên tài liệu <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Nhập tên tài liệu..."
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Danh mục <span className="text-red-400">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all bg-white"
            >
              <option value="">Chọn danh mục...</option>
              {DOCUMENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Mô tả (tùy chọn)
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Mô tả ngắn về nội dung tài liệu..."
              rows={3}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting || uploadedFile?.status !== "done"}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <CheckCircle2 size={15} />
            )}
            Lưu tài liệu
          </button>
          <Link
            href="/admin/documents"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            Hủy
          </Link>
          {!uploadedFile && (
            <p className="text-xs text-slate-400 ml-2">
              Vui lòng upload file trước khi lưu
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
