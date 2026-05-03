// app/documents/loading.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="h-44 bg-gradient-to-br from-slate-100 to-slate-200" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-14 bg-slate-200 rounded" />
          <div className="h-4 w-12 bg-slate-100 rounded" />
        </div>
        <div className="h-4 w-4/5 bg-slate-200 rounded" />
        <div className="h-3 w-2/3 bg-slate-100 rounded" />
        <div className="h-3 w-20 bg-slate-100 rounded" />
        <div className="flex gap-2 pt-1">
          <div className="h-8 flex-1 bg-slate-100 rounded-lg" />
          <div className="h-8 flex-1 bg-blue-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function DocumentsLoading() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      <div className="pt-28 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-16 space-y-4">
          <div className="h-3 w-28 bg-slate-200 rounded animate-pulse" />
          <div className="h-12 w-64 bg-slate-200 rounded animate-pulse" />
          <div className="h-5 w-96 bg-slate-100 rounded animate-pulse" />
        </div>
        {/* Search skeleton */}
        <div className="flex gap-4 mb-8">
          <div className="h-10 w-80 bg-white border border-slate-200 rounded-xl animate-pulse" />
        </div>
        {/* Category pills skeleton */}
        <div className="flex gap-2 mb-8">
          {[80, 72, 88, 68, 76, 84, 72].map((w, i) => (
            <div
              key={i}
              className="h-8 rounded-full bg-slate-200 animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
