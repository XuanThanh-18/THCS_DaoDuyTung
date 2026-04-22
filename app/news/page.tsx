// app/news/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { formatDateVN } from "@/lib/format";
import { SCHOOL } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Tin tức & Sự kiện | ${SCHOOL.shortName}`,
  description: `Cập nhật những hoạt động mới nhất, thông báo quan trọng từ ${SCHOOL.name}`,
  openGraph: {
    title: `Tin tức & Sự kiện | ${SCHOOL.shortName}`,
    description: `Cập nhật hoạt động mới nhất từ ${SCHOOL.name}`,
  },
};

async function getPosts() {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishDate: "desc" },
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
      author: { select: { name: true } },
    },
    take: 30,
  });
}

export default async function NewsPage() {
  const posts = await getPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0] ?? null;
  const others = posts.filter((p) => p.id !== featured?.id);

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
            chuyện truyền cảm hứng từ {SCHOOL.name}.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-on-surface-variant text-lg">
              Chưa có bài viết nào được đăng.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 group">
                <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={
                      featured.coverImage ??
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
                      {formatDateVN(featured.publishDate ?? featured.createdAt)}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-on-surface-variant text-lg font-body leading-relaxed">
                      {featured.excerpt}
                    </p>
                  )}
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
            {others.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {others.map((post) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group"
                  >
                    <article>
                      <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-md">
                        <img
                          src={
                            post.coverImage ??
                            "https://picsum.photos/seed/news/400/300"
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
                          {formatDateVN(post.publishDate ?? post.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-xl font-headline font-bold text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="text-on-surface-variant font-body text-sm line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </article>
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
