"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DetailLayout from "@/components/DetailLayout";
import { Loader } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  category: string;
  createdAt: string;
  slug: string;
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/posts/${id}`);

      if (!response.ok) {
        throw new Error("Không tìm thấy tin tức");
      }

      const data = await response.json();
      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi khi tải tin tức");
      console.error("Failed to fetch post:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-primary" size={40} />
          <p className="text-on-surface-variant">Đang tải tin tức...</p>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-on-surface font-bold text-xl">{error || "Lỗi"}</p>
          <a href="/news" className="text-primary font-bold hover:underline">
            ← Quay lại tin tức
          </a>
        </div>
      </main>
    );
  }

  return (
    <DetailLayout
      type="news"
      backLink="/news"
      backText="Quay lại tin tức"
      title={post.title}
      category={post.category}
      date={formatDate(post.createdAt)}
      author="Admin"
      image={post.coverImage}
      content={post.content}
    />
  );
}
