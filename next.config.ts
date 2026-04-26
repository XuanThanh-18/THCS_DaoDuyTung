// next.config.ts
// FIX H3: Tạo next.config.ts — đã thiếu hoàn toàn trong project
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // FIX H3: Cho phép external images từ các nguồn thường dùng
  // Thêm domain cụ thể khi project dùng image upload
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Mở rộng, cần narrow lại khi production
      },
    ],
    // Tối ưu format hiện đại
    formats: ["image/avif", "image/webp"],
  },

  // Security headers cho production
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
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Tối ưu production build
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
