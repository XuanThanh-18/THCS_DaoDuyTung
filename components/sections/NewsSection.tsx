import React from 'react';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

const mockNews = [
  {
    id: '1',
    title: 'Lễ vinh danh học sinh tiêu biểu học kỳ 1 năm học 2023-2024',
    excerpt: 'Tôn vinh những nỗ lực không ngừng nghỉ của thầy và trò trong suốt kỳ học vừa qua với nhiều giải thưởng cấp thành phố.',
    image: 'https://picsum.photos/seed/grad/800/600',
    category: 'Thành tích',
    date: '25/05/2024',
    author: 'Admin',
    featured: true,
  },
  {
    id: '2',
    title: 'Giải bóng đá nam học sinh chào mừng 26/3',
    excerpt: 'Sân chơi sôi động gắn kết tinh thần đoàn kết giữa các khối lớp.',
    image: 'https://picsum.photos/seed/football/400/300',
    category: 'Hoạt động',
    date: '20/03/2024',
  },
  {
    id: '3',
    title: 'Hội thảo định hướng nghề nghiệp 4.0',
    excerpt: 'Giúp học sinh khối 9 hiểu rõ về lộ trình học tập tương lai.',
    image: 'https://picsum.photos/seed/tech/400/300',
    category: 'Giáo dục',
    date: '15/03/2024',
  },
];

export default function NewsSection() {
  const featured = mockNews.find(n => n.featured);
  const others = mockNews.filter(n => !n.featured);

  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Tin tức nổi bật</h2>
            <p className="text-on-surface-variant mt-2">Cập nhật những hoạt động và thành tích mới nhất</p>
          </div>
          <Link href="/news" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
            Tất cả bài viết <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main News Item */}
          {featured && (
            <div className="lg:col-span-2 group relative h-full rounded-2xl overflow-hidden shadow-xl editorial-shadow">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                <span className="bg-primary text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full w-fit mb-4">
                  {featured.category}
                </span>
                <h3 className="text-3xl font-headline font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  {featured.title}
                </h3>
                <p className="text-white/80 line-clamp-2 mb-6 font-body">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-white/60 text-xs">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {featured.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {featured.author}</span>
                </div>
              </div>
            </div>
          )}

          {/* Secondary News Items */}
          <div className="flex flex-col gap-8">
            {others.map((news) => (
              <div key={news.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-40 overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-primary font-bold text-[10px] uppercase">{news.category}</span>
                  <h4 className="font-headline font-bold mt-2 group-hover:text-primary transition-colors line-clamp-2">
                    {news.title}
                  </h4>
                  <p className="text-on-surface-variant text-sm mt-2 line-clamp-2 font-body">
                    {news.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
