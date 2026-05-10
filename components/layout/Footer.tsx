import React from "react";
import Link from "next/link";
import { Facebook, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/images/logo/Logo.jpg"
              alt="Logo trường"
              width={85}
              height={85}
              className="object-contain"
            />
            <h3 className="font-headline font-bold text-2xl">
              Trường THCS Đào Duy Tùng
            </h3>
          </div>
          <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
            Môi trường giáo dục tiên tiến, nơi mỗi học sinh đều là một cá thể
            đặc biệt và được tỏa sáng theo cách riêng của mình.
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/DaoDuyTung.DongAnh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-[#1877F2] text-white rounded-lg shadow-sm hover:shadow-md hover:bg-[#165CC2] transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook size={22} strokeWidth={2.5} />
            </a>
            <a
              href="https://www.youtube.com/@DaoDuyTung"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center bg-[#FF0000] text-white rounded-lg shadow-sm hover:shadow-md hover:bg-[#CC0000] transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube size={22} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-primary uppercase tracking-wider text-xs">
            Liên kết nhanh
          </h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="hover:text-primary transition-colors"
              >
                Tin tức & Sự kiện
              </Link>
            </li>
            <li>
              <Link
                href="/documents"
                className="hover:text-primary transition-colors"
              >
                Thư viện tài liệu
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-primary transition-colors"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-primary uppercase tracking-wider text-xs">
            Thông tin liên hệ
          </h4>
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

      <div className="max-w-[1600px] mx-auto pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <span>© 2024 THCS Đào Duy Tùng. All rights reserved.</span>
        <div className="flex gap-8">
          <Link href="/terms" className="hover:text-primary">
            Điều khoản sử dụng
          </Link>
          <Link href="/privacy" className="hover:text-primary">
            Chính sách bảo mật
          </Link>
        </div>
      </div>
    </footer>
  );
}
