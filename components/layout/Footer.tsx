import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary font-bold text-xl">
                DT
              </div>
              <h2 className="font-serif font-bold text-xl leading-tight">
                TRƯỜNG THCS
                <br />
                ĐÀO DUY TÙNG
              </h2>
            </div>
            <p className="text-gray-300 text-sm">
              Nơi ươm mầm tài năng, chắp cánh ước mơ cho thế hệ trẻ.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-primary">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">Giới thiệu</Link></li>
              <li><Link href="/news" className="text-gray-300 hover:text-white transition-colors">Tin tức & Thông báo</Link></li>
              <li><Link href="/events" className="text-gray-300 hover:text-white transition-colors">Sự kiện</Link></li>
              <li><Link href="/documents" className="text-gray-300 hover:text-white transition-colors">Tài liệu biểu mẫu</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-primary">Thông tin liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">Đường Đào Duy Tùng, Huyện Đông Anh, TP Hà Nội</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-gray-300 text-sm">024 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-gray-300 text-sm">c2daoduytung@hanoi.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Trường THCS Đào Duy Tùng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
