// app/error.tsx
"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-full mb-4">
          <AlertTriangle className="text-red-500" size={24} />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Đã xảy ra lỗi
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Trang này gặp sự cố. Vui lòng thử lại hoặc quay về trang chủ.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
          <a
            href="/"
            className="px-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  );
}
