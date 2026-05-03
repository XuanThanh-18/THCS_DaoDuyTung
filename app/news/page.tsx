// app/news/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { formatDateVN, formatRelative } from "@/lib/format";
import { SCHOOL } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Tag, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tin tức | ${SCHOOL.shortName}`,
  description: `Cập nhật những hoạt động mới nhất, thông báo quan trọng từ ${SCHOOL.name}`,
  openGraph: {
    title: `Tin tức | ${SCHOOL.shortName}`,
    description: `Cập nhật hoạt động mới nhất từ ${SCHOOL.name}`,
  },
};

async function getPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { publishDate: "desc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      category: true,
      featured: true,
      publishDate: true,
      createdAt: true,
      viewCount: true,
      author: { select: { name: true } },
    },
    take: 30,
  });
}

// Category color mapping
const CATEGORY_COLORS: Record<string, string> = {
  "Tin tức": "bg-blue-100 text-blue-700",
  "Thông báo": "bg-amber-100 text-amber-700",
  "Hoạt động": "bg-green-100 text-green-700",
  "Thành tích": "bg-purple-100 text-purple-700",
  "Giáo dục": "bg-teal-100 text-teal-700",
  "Tuyển sinh": "bg-rose-100 text-rose-700",
};

function CategoryBadge({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] ?? "bg-primary/10 text-primary";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wide ${color}`}
    >
      <Tag size={10} />
      {category}
    </span>
  );
}

export default async function NewsPage() {
  const posts = await getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null;
  const secondary = posts.filter((p) => p.id !== featured?.id).slice(0, 2);
  const rest = posts.filter(
    (p) => p.id !== featured?.id && !secondary.find((s) => s.id === p.id),
  );

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      {/* ── Page Header ── */}
      <div className="pt-28 pb-12 px-6 md:px-12 max-w-7xl mx-auto border-b border-outline-variant/30">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-primary font-body text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
              <span className="w-6 h-[2px] bg-primary inline-block" />
              Bản tin học đường
            </p>
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-surface leading-tight">
              Tin tức
            </h1>
          </div>
          <p className="text-on-surface-variant font-body max-w-sm md:text-right leading-relaxed text-sm">
            Những câu chuyện, thông báo và hoạt động mới nhất từ{" "}
            {SCHOOL.shortName}.
          </p>
        </div>
      </div>

      <div className="pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={28} className="text-on-surface-variant" />
            </div>
            <p className="text-on-surface-variant text-lg font-body">
              Chưa có bài viết nào được đăng.
            </p>
          </div>
        ) : (
          <>
            {/* ── Hero Feature + 2 Secondary ── */}
            {featured && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-10 mb-10">
                {/* Big featured card */}
                <Link
                  href={`/news/${featured.slug}`}
                  className="lg:col-span-7 group relative rounded-2xl overflow-hidden block bg-on-surface min-h-[460px] shadow-lg hover:shadow-2xl transition-shadow"
                >
                  {featured.coverImage ? (
                    <img
                      src={featured.coverImage}
                      alt={featured.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-80" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Featured badge */}
                  <div className="absolute top-5 left-5">
                    <span className="flex items-center gap-1.5 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      <TrendingUp size={10} /> Nổi bật
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <CategoryBadge category={featured.category} />
                    <h2 className="text-2xl md:text-3xl font-headline font-bold text-white mt-3 mb-3 leading-snug group-hover:text-primary/90 transition-colors line-clamp-3">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-white/70 text-sm font-body line-clamp-2 mb-4 leading-relaxed">
                        {featured.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-white/50 text-xs font-body">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDateVN(
                            featured.publishDate ?? featured.createdAt,
                          )}
                        </span>
                        {featured.author?.name && (
                          <span className="hidden sm:block">
                            · {featured.author.name}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1.5 text-white text-xs font-bold group-hover:gap-3 transition-all">
                        Đọc bài <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>

                {/* 2 Secondary cards stacked */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {secondary.map((post) => (
                    <Link
                      key={post.id}
                      href={`/news/${post.slug}`}
                      className="group flex gap-4 bg-white rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/20 hover:shadow-lg transition-all p-4 flex-1"
                    >
                      {post.coverImage && (
                        <div className="w-28 h-full min-h-[100px] rounded-xl overflow-hidden shrink-0">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex flex-col justify-between min-w-0 py-1 flex-1">
                        <div>
                          <CategoryBadge category={post.category} />
                          <h3 className="font-headline font-bold text-on-surface text-base mt-2 leading-snug group-hover:text-primary transition-colors line-clamp-3">
                            {post.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-on-surface-variant text-xs font-body mt-3">
                          <Calendar size={12} />
                          {formatDateVN(post.publishDate ?? post.createdAt)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── Divider ── */}
            {rest.length > 0 && (
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-outline-variant/30" />
                <span className="text-on-surface-variant text-xs font-bold uppercase tracking-widest font-body whitespace-nowrap">
                  Tất cả bài viết
                </span>
                <div className="flex-1 h-px bg-outline-variant/30" />
              </div>
            )}

            {/* ── Main Grid ── */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden border border-outline-variant/20 hover:border-primary/20 hover:shadow-xl transition-all flex flex-col"
                  >
                    {/* Image */}
                    <div className="aspect-[16/9] overflow-hidden bg-surface-container-high">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                          <Tag size={32} className="text-primary/20" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <CategoryBadge category={post.category} />
                        <span className="text-on-surface-variant text-xs font-body">
                          {formatRelative(post.publishDate ?? post.createdAt)}
                        </span>
                      </div>

                      <h3 className="font-headline font-bold text-on-surface text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="text-on-surface-variant text-sm font-body line-clamp-2 leading-relaxed flex-1">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/20">
                        <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-body">
                          <Calendar size={12} />
                          {formatDateVN(post.publishDate ?? post.createdAt)}
                        </div>
                        <span className="text-primary text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                          Đọc tiếp <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
