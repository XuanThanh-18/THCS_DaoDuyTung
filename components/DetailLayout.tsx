// components/DetailLayout.tsx
// FIX H4: Thay <img> bằng next/image để tối ưu hiệu năng
"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  FileText,
  Download,
} from "lucide-react";
import { formatDateLong } from "@/lib/format";

interface DetailLayoutProps {
  title: string;
  date?: Date | string | null;
  readTime?: string;
  author?: string | null;
  location?: string;
  image?: string | null;
  content?: string | null;
  description?: string | null;
  fileUrl?: string | null;
  fileType?: string | null;
  badge?: string;
  children?: React.ReactNode;
}

export default function DetailLayout({
  title,
  date,
  readTime,
  author,
  location,
  image,
  content,
  description,
  fileUrl,
  fileType,
  badge,
  children,
}: DetailLayoutProps) {
  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          {badge && (
            <span className="inline-block text-primary font-bold tracking-widest text-xs uppercase mb-4">
              {badge}
            </span>
          )}

          <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-on-surface-variant mb-5 font-body">
            {date && (
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {formatDateLong(date)}
              </span>
            )}
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock size={14} /> {readTime}
              </span>
            )}
            {author && (
              <span className="flex items-center gap-1">
                <User size={14} /> {author}
              </span>
            )}
            {location && (
              <span className="flex items-center gap-1">
                <MapPin size={14} /> {location}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight mb-4">
            {title}
          </h1>

          {description && (
            <p className="text-lg text-on-surface-variant font-body max-w-2xl">
              {description}
            </p>
          )}
        </header>

        {/* FIX H4: Dùng next/image thay <img> */}
        {image && (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-12 relative aspect-video">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {/* File Download */}
        {fileUrl && (
          <div className="bg-surface-container-high rounded-2xl p-8 mb-12 border border-outline/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-on-surface-variant font-body">
                    Tập tin tài liệu
                  </p>
                  <p className="text-on-surface font-bold">{fileType}</p>
                </div>
              </div>
              <a
                href={fileUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-bold"
              >
                <Download size={18} /> Tải xuống
              </a>
            </div>
          </div>
        )}

        {/* Content */}
        {content && (
          <div className="prose prose-lg max-w-none font-body text-on-surface-variant prose-headings:font-headline prose-headings:text-on-surface prose-a:text-primary prose-strong:text-on-surface">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {children}
      </article>

      <Footer />
    </main>
  );
}
