"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailLayout from "@/components/DetailLayout";
import FileViewer from "@/components/FileViewer";
import { Loader } from "lucide-react";

interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  category: string;
  createdAt: string;
}

export default function DocumentDetailPage() {
  const { id } = useParams();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDocument();
  }, [id]);

  const fetchDocument = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/documents/${id}`);

      if (!response.ok) {
        throw new Error("Không tìm thấy tài liệu");
      }

      const data = await response.json();
      setDocument(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải tài liệu");
      console.error("Failed to fetch document:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-primary" size={40} />
          <p className="text-on-surface-variant">Đang tải tài liệu...</p>
        </div>
      </main>
    );
  }

  if (error || !document) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-on-surface font-bold text-xl">{error || "Lỗi"}</p>
          <a
            href="/documents"
            className="text-primary font-bold hover:underline"
          >
            ← Quay lại danh sách tài liệu
          </a>
        </div>
      </main>
    );
  }

  return (
    <DetailLayout
      type="document"
      backLink="/documents"
      backText="Quay lại tài liệu"
      title={document.title}
      category={document.category}
      date={formatDate(document.createdAt)}
      description={document.description}
      fileUrl={document.fileUrl}
      fileType={document.fileType}
    >
      {/* File Viewer */}
      <div className="mt-12">
        <h2 className="text-2xl font-headline font-bold text-on-surface mb-6">
          Xem & Tải tệp
        </h2>
        <FileViewer
          fileUrl={document.fileUrl}
          fileName={document.title}
          fileType={document.fileType}
        />
      </div>
    </DetailLayout>
  );
}
