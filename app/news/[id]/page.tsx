'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function NewsDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from /api/posts/[id]
    // Mocking for now
    const mockPost = {
      id: '1',
      title: 'Rộn ràng không khí chuẩn bị cho Lễ Khai Giảng năm học mới 2024 - 2025',
      content: `
# Chào mừng năm học mới

Công tác chuẩn bị cho ngày tựu trường đang được thầy và trò nhà trường gấp rút hoàn thiện, hứa hẹn một năm học đầy thành công và hạnh phúc.

## Các hoạt động chuẩn bị
- Trang trí khuôn viên trường học
- Tập duyệt nghi thức đội
- Chuẩn bị các tiết mục văn nghệ

Chúng tôi rất mong chờ được đón các em học sinh trở lại trường!
      `,
      image: 'https://picsum.photos/seed/news1/1200/600',
      category: 'Sự kiện nổi bật',
      date: '25 Tháng 8, 2024',
      author: 'Admin',
    };
    
    setPost(mockPost);
    setIsLoading(false);
  }, [id]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      <article className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <Link href="/news" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline">
          <ArrowLeft size={18} /> Quay lại tin tức
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold uppercase">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-on-surface-variant text-sm font-body">
              <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
              <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-surface leading-tight tracking-tight">
            {post.title}
          </h1>
        </header>

        <div className="rounded-3xl overflow-hidden shadow-xl mb-12 editorial-shadow">
          <img src={post.image} alt={post.title} className="w-full h-auto" />
        </div>

        <div className="prose prose-lg max-w-none font-body text-on-surface-variant prose-headings:font-headline prose-headings:text-on-surface prose-primary">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>

      <Footer />
    </main>
  );
}
