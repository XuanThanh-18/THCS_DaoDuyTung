import React from 'react';
import Link from 'next/link';
import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
              DDT
            </div>
            <h3 className="font-headline font-bold text-2xl">THCS Đào Duy Tùng</h3>
          </div>
          <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
            Môi trường giáo dục tiên tiến, nơi mỗi học sinh đều là một cá thể đặc biệt và được tỏa sáng theo cách riêng của mình.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all">
              <Youtube size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-primary uppercase tracking-wider text-xs">Liên kết nhanh</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><Link href="/about" className="hover:text-primary transition-colors">Giới thiệu</Link></li>
            <li><Link href="/news" className="hover:text-primary transition-colors">Tin tức & Sự kiện</Link></li>
            <li><Link href="/documents" className="hover:text-primary transition-colors">Thư viện tài liệu</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Liên hệ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-primary uppercase tracking-wider text-xs">Thông tin liên hệ</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="text-primary shrink-0" />
              <span>Cổ Loa, Đông Anh, Hà Nội, Việt Nam</span>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>thcsdaoduytung@hanoi.edu.vn</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>Hotline: 024.3XXX.XXXX</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <span>© 2024 THCS Đào Duy Tùng. All rights reserved.</span>
        <div className="flex gap-8">
          <Link href="/terms" className="hover:text-primary">Điều khoản sử dụng</Link>
          <Link href="/privacy" className="hover:text-primary">Chính sách bảo mật</Link>
        </div>
      </div>
    </footer>
  );
}
