import Link from 'next/link';
import { Menu, Search } from 'lucide-react';

export function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                DT
              </div>
              <div>
                <h1 className="font-serif font-bold text-secondary text-xl leading-tight">
                  TRƯỜNG THCS
                  <br />
                  ĐÀO DUY TÙNG
                </h1>
              </div>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary font-medium">Trang chủ</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary font-medium">Giới thiệu</Link>
            <Link href="/news" className="text-gray-700 hover:text-primary font-medium">Tin tức</Link>
            <Link href="/events" className="text-gray-700 hover:text-primary font-medium">Sự kiện</Link>
            <Link href="/documents" className="text-gray-700 hover:text-primary font-medium">Tài liệu</Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary font-medium">Liên hệ</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-primary">
              <Search className="w-5 h-5" />
            </button>
            <button className="md:hidden text-gray-500 hover:text-primary">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
