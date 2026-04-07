"use client";

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, School } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/555586409_122107003545009523_3936176408430220952_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeG0qRlwxlZxUMhL7dwWWahNXINA51cvISlcg0DnVy8hKSqB7ZH01nXScvmnNyb92u7mVBKQ4WX0BLtutaWb9NMe&_nc_ohc=V12K5QCQhLQQ7kNvwFkmvfj&_nc_oc=Adp33xk3STwQTKV5fHNc4tCcySS_oebNmQ7G1gFyA20D4FlCjYU9DebuAq0lauMPnLI&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=UV5hN_zrK32Jy-nj43bJIQ&_nc_ss=7a3a8&oh=00_Af1w4ElXd_1XabJKrvViiwE8vG_npeNfFOc8iII-22ldxg&oe=69D7B0B0"
          alt="Trường THCS Đào Duy Tùng Campus"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Gradient overlay for smooth effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md text-white border border-primary/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
            <School size={16} className="text-primary" />
            Khởi đầu tri thức
          </div>

          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white leading-[1.1] tracking-tight">
            Chào mừng đến với <br />
            <span className="text-primary">THCS Đào Duy Tùng</span>
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed font-body">
            Nơi ươm mầm tài năng, nuôi dưỡng những giá trị nhân văn và kiến tạo
            tương lai vững chắc cho thế hệ học sinh trong môi trường hạnh phúc.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/about"
              className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-container transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Giới thiệu nhà trường
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/news"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              Xem tin tức
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
