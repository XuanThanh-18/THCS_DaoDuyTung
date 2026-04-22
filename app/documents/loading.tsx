// app/documents/loading.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function DocumentsLoading() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16 space-y-4">
          <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-14 w-1/2 bg-slate-200 rounded animate-pulse" />
          <div className="h-5 w-2/3 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="h-10 w-full bg-slate-200 rounded-xl animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-20 bg-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
