"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const slides = [
  {
    src: "/images/banners/ngay-nha-giao-viet-nam-giaovien.jpg",
    alt: "Lễ tri ân thầy cô tại sân trường",
  },
  {
    src: "/images/banners/le-khai-giang-hocsinh.jpg",
    alt: "Học sinh rạng rỡ trong ngày khai giảng",
  },
  {
    src: "/images/banners/ngay-nha-giao-hocsinh.jpg",
    alt: "Hoạt động học sinh năng động tại trường",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const handleDragStart = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStartX(event.clientX);
    setDragOffset(0);
  };

  const handleDragMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null) return;
    setDragOffset(event.clientX - dragStartX);
  };

  const handleDragEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX === null) return;
    const deltaX = event.clientX - dragStartX;
    const threshold = 80;

    if (deltaX > threshold) {
      setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    } else if (deltaX < -threshold) {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }

    setDragStartX(null);
    setDragOffset(0);
  };

  const handleDragCancel = () => {
    setDragStartX(null);
    setDragOffset(0);
  };

  return (
    <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-50">
      <div className="relative flex h-[clamp(420px,55vh,520px)] w-full flex-col md:flex-row overflow-hidden bg-white">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative z-10 flex w-full flex-col justify-center gap-6 px-6 py-10 md:w-[40%] md:px-16 lg:px-20"
        >
          <div className="inline-flex rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-slate-600 shadow-sm shadow-slate-200/50 backdrop-blur-sm">
            TRƯỜNG THCS ĐÀO DUY TÙNG
          </div>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-[#450367] sm:text-4xl lg:text-5xl">
            CHÀO MỪNG BẠN ĐẾN VỚI TRƯỜNG THCS ĐÀO DUY TÙNG
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Nơi học sinh phát triển toàn diện, nuôi dưỡng tinh thần sáng tạo và
            giá trị nhân văn trong môi trường giáo dục hiện đại.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/about"
              aria-label="Tìm hiểu thêm về trường THCS Đào Duy Tùng"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition duration-300 hover:-translate-y-0.5 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              Tìm hiểu thêm
            </Link>
            <Link
              href="/news"
              aria-label="Xem video giới thiệu trường THCS Đào Duy Tùng"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-900 shadow-sm transition duration-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0f3d91]/20"
            >
              Xem video giới thiệu
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full h-[320px] md:h-full md:w-[60%] cursor-grab active:cursor-grabbing select-none touch-pan-y"
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragCancel}
          onPointerLeave={handleDragCancel}
          style={{ x: dragOffset }}
        >
          <Image
            src={slides[activeIndex].src}
            alt={slides[activeIndex].alt}
            fill
            draggable={false}
            className="object-cover select-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 960px"
            priority={activeIndex === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-950/30 via-transparent to-transparent" />
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/95 via-white/40 to-transparent" />
        </motion.div>

        <div className="absolute left-6 bottom-6 flex items-center gap-2 md:left-10">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`Chuyển sang slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-primary shadow-[0_0_0_6px_rgba(var(--primary),0.12)]"
                  : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
