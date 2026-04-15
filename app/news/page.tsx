"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  createdAt: string;
  slug: string;
  content: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setNews(data || []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
          <p className="text-center text-on-surface-variant">
            Đang tải tin tức...
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  const featured = news.length > 0 ? news[0] : null;
  const others = news.slice(1);

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-3 block">
            Bản tin học đường
          </span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface leading-tight tracking-tight">
            Tin tức & Sự kiện
          </h1>
          <p className="mt-6 text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
            Cập nhật những hoạt động mới nhất, thông báo quan trọng và những câu
            chuyện truyền cảm hứng từ ngôi trường Hạnh phúc THCS Đào Duy Tùng.
          </p>
        </header>

        {/* Featured Article */}
        {featured && (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 group">
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl editorial-shadow">
              <img
                src={
                  featured.coverImage ||
                  "https://picsum.photos/seed/news/800/600"
                }
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 aspect-video"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold uppercase">
                  {featured.category}
                </span>
                <span className="text-on-surface-variant text-sm font-body">
                  {formatDate(featured.createdAt)}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-on-surface-variant text-lg font-body leading-relaxed">
                {featured.excerpt || featured.content?.substring(0, 150)}
              </p>
              <Link
                href={`/news/${featured.slug}`}
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                Đọc tiếp <ArrowRight size={18} />
              </Link>
            </div>
          </article>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {others.map((post) => (
            <article key={post.id} className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 editorial-shadow">
                <img
                  src={
                    post.coverImage || "https://picsum.photos/seed/news/400/300"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-tertiary font-bold text-[10px] tracking-widest uppercase">
                  {post.category}
                </span>
                <span className="text-on-surface-variant text-xs font-body">
                  {formatDate(post.createdAt)}
                </span>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-on-surface-variant font-body text-sm line-clamp-3 leading-relaxed">
                {post.excerpt || post.content?.substring(0, 100)}
              </p>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
