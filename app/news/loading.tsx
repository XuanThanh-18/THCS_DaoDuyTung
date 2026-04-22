// app/news/loading.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NewsLoading() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-16 space-y-4">
          <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-14 w-2/3 bg-slate-200 rounded animate-pulse" />
          <div className="h-5 w-1/2 bg-slate-100 rounded animate-pulse" />
        </div>
        {/* Featured skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7 aspect-video bg-slate-200 rounded-3xl animate-pulse" />
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
            <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-slate-200 rounded animate-pulse" />
            <div className="h-10 w-4/5 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
          </div>
        </div>
        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[4/3] bg-slate-200 rounded-2xl animate-pulse" />
              <div className="h-3 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-6 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
