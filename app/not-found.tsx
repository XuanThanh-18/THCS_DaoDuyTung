// app/not-found.tsx
// FIX M2: Global 404 — hiện tại project không có file này
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-8xl font-headline font-bold text-primary/20 mb-4">
            404
          </p>
          <h1 className="text-2xl font-headline font-bold text-on-surface mb-3">
            Không tìm thấy trang
          </h1>
          <p className="text-on-surface-variant font-body mb-8 leading-relaxed">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
