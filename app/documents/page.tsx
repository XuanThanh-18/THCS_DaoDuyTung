import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, Filter, Download, Share2, Eye } from 'lucide-react';

const mockDocs = [
  {
    id: '1',
    title: 'Kế hoạch giáo dục nhà trường năm học 2023 - 2024',
    category: 'Hành chính',
    date: '15/09/2023',
    image: 'https://picsum.photos/seed/doc1/400/500',
  },
  {
    id: '2',
    title: 'Nội quy học sinh và Quy tắc ứng xử học đường',
    category: 'Nội quy',
    date: '05/09/2023',
    image: 'https://picsum.photos/seed/doc2/400/500',
  },
  {
    id: '3',
    title: 'Mẫu đơn xin nghỉ học dành cho học sinh',
    category: 'Biểu mẫu',
    date: '10/08/2023',
    image: 'https://picsum.photos/seed/doc3/400/500',
  },
  {
    id: '4',
    title: 'Hướng dẫn ôn tập học kỳ I các môn văn hóa',
    category: 'Học tập',
    date: '20/11/2023',
    image: 'https://picsum.photos/seed/doc4/400/500',
  },
];

export default function DocumentsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-3 block">HỆ THỐNG LƯU TRỮ</span>
          <h1 className="text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight">Văn bản & Tài liệu</h1>
          <p className="mt-4 text-on-surface-variant max-w-2xl text-lg font-body">
            Truy cập và tải về các văn bản quy định, biểu mẫu và tài liệu giảng dạy chính thức của nhà trường.
          </p>
        </header>

        {/* Search & Filter */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm tên văn bản, mã hiệu hoặc từ khóa..."
              className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary/40 transition-all text-on-surface font-body"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-4 bg-surface-container-high rounded-xl text-on-surface hover:bg-surface-container transition-colors font-body font-medium">
              <Filter size={20} />
              Bộ lọc
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockDocs.map((doc) => (
            <div key={doc.id} className="group flex flex-col">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface-container-high shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                <img src={doc.image} alt={doc.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 px-6">
                  <button className="w-full py-3 bg-white text-secondary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                    <Eye size={18} /> Xem chi tiết
                  </button>
                  <button className="w-full py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container transition-colors">
                    <Download size={18} /> Tải về
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-secondary text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {doc.category}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="font-headline font-bold text-lg text-on-surface line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {doc.title}
                </h3>
                <p className="text-sm text-on-surface-variant mt-2 font-body">{doc.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
