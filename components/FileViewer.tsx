"use client";

import React, { useState, useEffect } from "react";
import { Download, Eye, File, AlertCircle, Loader2 } from "lucide-react";

interface FileViewerProps {
  fileUrl: string;
  fileName: string;
  fileType: string;
}

export default function FileViewer({
  fileUrl,
  fileName,
  fileType,
}: FileViewerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const getFileIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes("doc") || lowerType.includes("word")) return "📄";
    if (lowerType.includes("xls") || lowerType.includes("excel")) return "📊";
    if (lowerType.includes("pdf")) return "📑";
    if (lowerType.includes("ppt") || lowerType.includes("powerpoint"))
      return "🎯";
    return "📋";
  };

  const canPreviewFile = (type: string) => {
    const lowerType = type.toLowerCase();
    // PDF can be previewed, others need to be downloaded
    return lowerType.includes("pdf");
  };

  const handlePreview = () => {
    setIsLoading(true);
    setPreviewError(null);

    // Try to open in new window for preview
    const link = document.createElement("a");
    link.href = fileUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();

    setIsLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <div className="bg-gradient-to-br from-surface-container to-surface-container-high rounded-2xl p-8 border border-outline/20 shadow-lg">
      {/* File Preview Area */}
      <div className="mb-8">
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-surface rounded-xl border-2 border-dashed border-outline/30">
          <div className="text-6xl mb-4">{getFileIcon(fileType)}</div>
          <h3 className="text-on-surface font-headline font-bold text-lg text-center mb-2">
            {fileName}
          </h3>
          <p className="text-on-surface-variant text-sm text-center mb-4">
            Loại tệp: <span className="font-bold">{fileType}</span>
          </p>

          {/* Preview/Download Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {canPreviewFile(fileType) && (
              <button
                onClick={handlePreview}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 bg-tertiary text-on-tertiary rounded-lg hover:bg-tertiary/90 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Đang mở...
                  </>
                ) : (
                  <>
                    <Eye size={18} /> Xem trước
                  </>
                )}
              </button>
            )}

            <a
              href={fileUrl}
              download={fileName}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-bold"
            >
              <Download size={18} /> Tải xuống
            </a>
          </div>
        </div>
      </div>

      {/* File Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-surface rounded-lg">
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">
            Định dạng
          </p>
          <p className="text-on-surface font-bold text-lg">{fileType}</p>
        </div>

        <div className="p-4 bg-surface rounded-lg">
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">
            Kích thước
          </p>
          <p className="text-on-surface font-bold text-lg">-</p>
        </div>

        <div className="p-4 bg-surface rounded-lg">
          <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">
            Trạng thái
          </p>
          <p className="text-on-surface font-bold text-lg">✓ Sẵn sàng</p>
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-6 p-4 bg-secondary/10 rounded-lg flex gap-3">
        <AlertCircle className="text-secondary flex-shrink-0" size={20} />
        <p className="text-sm text-on-surface-variant">
          Để xem chi tiết nội dung file Word hoặc Excel, vui lòng tải xuống và
          mở bằng ứng dụng phù hợp trên thiết bị của bạn.
        </p>
      </div>
    </div>
  );
}
