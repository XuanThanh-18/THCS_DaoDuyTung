// next.config.ts — FIXED VERSION
// Fix: remotePatterns dùng specific hostname thay vì wildcard "**"
// Next.js 15 không hỗ trợ double-star hostname wildcard

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Supabase Storage
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      // Unsplash (thường dùng cho placeholder)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Google Storage (nếu dùng Firebase)
      {
        protocol: "https",
        hostname: "*.googleapis.com",
      },
      // Thêm domain khác khi cần:
      // { protocol: "https", hostname: "your-cdn.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  compress: true,
  poweredByHeader: false,

  // Fix: Cho phép build kể cả có lỗi TypeScript nhỏ (tắt nếu muốn strict)
  // typescript: { ignoreBuildErrors: true },
  // eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
