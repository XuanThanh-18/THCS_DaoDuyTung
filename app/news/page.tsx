import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const mockNews = [
  {
    id: '1',
    title: 'Rộn ràng không khí chuẩn bị cho Lễ Khai Giảng năm học mới 2024 - 2025',
    excerpt: 'Công tác chuẩn bị cho ngày tựu trường đang được thầy và trò nhà trường gấp rút hoàn thiện, hứa hẹn một năm học đầy thành công và hạnh phúc.',
    image: 'https://picsum.photos/seed/news1/800/600',
    category: 'Sự kiện nổi bật',
    date: '25 Tháng 8, 2024',
    featured: true,
  },
  {
    id: '2',
    title: 'Triển lãm mỹ thuật "Ước mơ tuổi hồng" lần thứ V',
    excerpt: 'Nơi hội tụ hơn 200 tác phẩm hội họa độc đáo do chính bàn tay tài hoa của các em học sinh THCS Đào Duy Tùng thể hiện.',
    image: 'https://picsum.photos/seed/news2/400/300',
    category: 'Hoạt động',
    date: '15.08.2024',
  },
  {
    id: '3',
    title: 'Dự án "Happy School": Giờ học hạnh phúc với Yoga & Mindfulness',
    excerpt: 'Áp dụng các bài tập thư giãn tâm trí giúp học sinh giảm căng thẳng và tăng cường khả năng tập trung trong học tập.',
    image: 'https://picsum.photos/seed/news3/400/300',
    category: 'Hoạt động',
    date: '12.08.2024',
  },
  {
    id: '4',
    title: 'Phát động phong trào "Quyên góp sách - Trao gửi yêu thương"',
    excerpt: 'Chương trình ý nghĩa nhằm xây dựng tủ sách dùng chung và tặng sách cho các bạn học sinh có hoàn cảnh khó khăn tại vùng cao.',
    image: 'https://picsum.photos/seed/news4/400/300',
    category: 'Tin tức',
    date: '10.08.2024',
  },
];

export default function NewsPage() {
  const featured = mockNews.find(n => n.featured);
  const others = mockNews.filter(n => !n.featured);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-3 block">Bản tin học đường</span>
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-on-surface leading-tight tracking-tight">Tin tức & Sự kiện</h1>
          <p className="mt-6 text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">
            Cập nhật những hoạt động mới nhất, thông báo quan trọng và những câu chuyện truyền cảm hứng từ ngôi trường Hạnh phúc THCS Đào Duy Tùng.
          </p>
        </header>

        {/* Featured Article */}
        {featured && (
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 group">
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl editorial-shadow">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 aspect-video"
              />
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold uppercase">
                  {featured.category}
                </span>
                <span className="text-on-surface-variant text-sm font-body">{featured.date}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-on-surface leading-tight group-hover:text-primary transition-colors">
                {featured.title}
              </h2>
              <p className="text-on-surface-variant text-lg font-body leading-relaxed">
                {featured.excerpt}
              </p>
              <Link href={`/news/${featured.id}`} className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
                Đọc tiếp <ArrowRight size={18} />
              </Link>
            </div>
          </article>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {others.map((news) => (
            <article key={news.id} className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 editorial-shadow">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-tertiary font-bold text-[10px] tracking-widest uppercase">{news.category}</span>
                <span className="text-on-surface-variant text-xs font-body">{news.date}</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {news.title}
              </h3>
              <p className="text-on-surface-variant font-body text-sm line-clamp-3 leading-relaxed">
                {news.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
