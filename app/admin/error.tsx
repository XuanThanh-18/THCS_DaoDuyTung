// app/admin/error.tsx
// FIX M2: Error boundary riêng cho admin area
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error]", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={24} className="text-red-500" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Có lỗi xảy ra
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Trang này gặp sự cố. Thử tải lại hoặc quay về dashboard.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={14} />
            Thử lại
          </button>
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 border border-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-50 transition-colors"
          >
            Về Dashboard
          </Link>
        </div>
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-5 text-left text-xs bg-slate-100 text-slate-700 p-3 rounded-lg overflow-auto max-h-40">
            {error.message}
          </pre>
        )}
      </div>
    </div>
  );
}
