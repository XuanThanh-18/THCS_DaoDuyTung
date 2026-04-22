"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Download,
  FileText,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface DetailLayoutProps {
  type: "news" | "event" | "document";
  backLink: string;
  backText: string;
  title: string;
  category?: string;
  date?: string;
  author?: string;
  location?: string;
  image?: string;
  content?: string;
  description?: string;
  fileUrl?: string;
  fileType?: string;
  metadata?: Array<{ label: string; value: string; icon: React.ReactNode }>;
  children?: React.ReactNode;
}

export default function DetailLayout({
  type,
  backLink,
  backText,
  title,
  category,
  date,
  author,
  location,
  image,
  content,
  description,
  fileUrl,
  fileType,
  metadata,
  children,
}: DetailLayoutProps) {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <article className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={backLink}
          className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline transition-colors"
        >
          <ArrowLeft size={18} /> {backText}
        </Link>

        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {category && (
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold uppercase">
                {category}
              </span>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-on-surface-variant text-sm font-body">
              {date && (
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {date}
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
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-on-surface leading-tight tracking-tight mb-4">
            {title}
          </h1>

          {/* Description for documents */}
          {description && (
            <p className="text-lg text-on-surface-variant font-body max-w-2xl">
              {description}
            </p>
          )}
        </header>

        {/* Featured Image */}
        {image && (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
            <img src={image} alt={title} className="w-full h-auto" />
          </div>
        )}

        {/* File Download Section (for documents) */}
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

        {/* Content Section */}
        {content && (
          <div className="prose prose-lg max-w-none font-body text-on-surface-variant prose-headings:font-headline prose-headings:text-on-surface prose-a:text-primary prose-strong:text-on-surface">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {/* Custom Children */}
        {children}
      </article>

      <Footer />
    </main>
  );
}
