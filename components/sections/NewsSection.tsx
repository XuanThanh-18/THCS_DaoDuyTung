"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

interface Post {
  id: string;
  title: string;
  excerpt?: string | null;
  coverImage?: string | null;
  category: string;
  createdAt: string;
  publishDate?: string | null;
  slug: string;
  content?: string;
  author?: { name: string | null } | null;
}

export default function NewsSection() {
  const [news, setNews] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setNews(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("vi-VN");

  if (loading) {
    return (
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Tin tức nổi bật
          </h2>
          <p className="text-center text-on-surface-variant mt-8">
            Đang tải...
          </p>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Tin tức nổi bật
          </h2>
          <p className="text-center text-on-surface-variant mt-8">
            Chưa có tin tức nào.
          </p>
        </div>
      </section>
    );
  }

  const featured = news[0];
  const others = news.slice(1, 3);

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">
              Tin tức nổi bật
            </h2>
            <p className="text-on-surface-variant mt-2">
              Cập nhật những hoạt động và thành tích mới nhất
            </p>
          </div>
          <Link
            href="/news"
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline"
          >
            Tất cả bài viết <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured */}
          <Link
            href={`/news/${featured.slug}`}
            className="lg:col-span-2 group relative rounded-2xl overflow-hidden shadow-xl block"
          >
            <img
              src={
                featured.coverImage || "https://picsum.photos/seed/news/800/600"
              }
              alt={featured.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
              <span className="bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full w-fit mb-4">
                {featured.category}
              </span>
              <h3 className="text-3xl font-headline font-bold text-white mb-4 group-hover:text-primary/80 transition-colors">
                {featured.title}
              </h3>
              <p className="text-white/80 line-clamp-2 mb-6 font-body">
                {featured.excerpt || featured.content?.substring(0, 150)}
              </p>
              <div className="flex items-center gap-4 text-white/60 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {formatDate(featured.publishDate ?? featured.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {featured.author?.name ?? "Admin"}
                </span>
              </div>
            </div>
          </Link>

          {/* Others */}
          <div className="flex flex-col gap-8">
            {others.map((post) => (
              <Link
                key={post.id}
                href={`/news/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all block"
              >
                <div className="h-40 overflow-hidden">
                  <img
                    src={
                      post.coverImage ||
                      "https://picsum.photos/seed/news/400/300"
                    }
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-primary font-bold text-[10px] uppercase">
                    {post.category}
                  </span>
                  <h4 className="font-headline font-bold mt-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm mt-2 line-clamp-2 font-body">
                    {post.excerpt || post.content?.substring(0, 100)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
