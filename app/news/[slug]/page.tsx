// app/news/[slug]/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { formatDateLong } from "@/lib/format";
import { SCHOOL } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    select: { title: true, excerpt: true, coverImage: true },
  });
  if (!post) return { title: "Không tìm thấy" };
  return {
    title: `${post.title} | ${SCHOOL.shortName}`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}
export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true },
  });
  return posts.map((p) => ({ slug: p.slug }));
}
export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { author: { select: { name: true } } },
  });

  if (!post) notFound();

  // Tăng view count (fire and forget)
  prisma.post
    .update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } })
    .catch(() => {});

  // Bài liên quan
  const related = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      category: post.category,
      id: { not: post.id },
    },
    take: 3,
    orderBy: { publishDate: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      publishDate: true,
      createdAt: true,
    },
  });

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <article className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:underline"
        >
          <ArrowLeft size={18} /> Quay lại tin tức
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold uppercase">
              <Tag size={12} />
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-on-surface-variant text-sm">
              <Calendar size={14} />
              {formatDateLong(post.publishDate ?? post.createdAt)}
            </span>
            {post.author?.name && (
              <span className="flex items-center gap-1.5 text-on-surface-variant text-sm">
                <User size={14} />
                {post.author.name}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-xl text-on-surface-variant font-body leading-relaxed border-l-4 border-primary pl-5">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none font-body text-on-surface-variant prose-headings:font-headline prose-headings:text-on-surface prose-a:text-primary prose-strong:text-on-surface">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="border-t border-outline/20 py-16 px-6 md:px-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-8">
            Bài viết liên quan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.id} href={`/news/${r.slug}`} className="group">
                <div className="aspect-video rounded-xl overflow-hidden mb-3 shadow-sm">
                  <img
                    src={
                      r.coverImage ??
                      "https://picsum.photos/seed/related/400/300"
                    }
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs text-on-surface-variant mb-1">
                  {formatDateLong(r.publishDate ?? r.createdAt)}
                </p>
                <h3 className="font-headline font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
