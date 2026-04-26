// app/error.tsx
// FIX M2: Global error boundary — bắt lỗi runtime, tránh crash toàn trang
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Có thể tích hợp Sentry / logging service ở đây
    console.error("[Global Error]", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h1 className="text-2xl font-headline font-bold text-on-surface mb-3">
          Có lỗi xảy ra
        </h1>
        <p className="text-on-surface-variant font-body mb-8 leading-relaxed">
          Hệ thống gặp sự cố không mong muốn. Vui lòng thử lại hoặc liên hệ quản
          trị viên nếu lỗi tiếp tục xuất hiện.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 border border-outline/30 rounded-lg font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && error.message && (
          <pre className="mt-6 text-left text-xs bg-slate-100 text-slate-700 p-4 rounded-lg overflow-auto">
            {error.message}
          </pre>
        )}
      </div>
    </main>
  );
}
