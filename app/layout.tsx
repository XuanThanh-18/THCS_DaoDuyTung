// app/layout.tsx
// FIX H2: Dùng next/font thay vì CSS @import — tránh FOUT, cải thiện LCP/CLS
import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";
import { SCHOOL } from "@/lib/constants";

// FIX: next/font tự động preload và tối ưu subset
const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  variable: "--font-headline",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  title: {
    default: SCHOOL.name,
    template: `%s | ${SCHOOL.shortName}`,
  },
  description: `Website chính thức của ${SCHOOL.name}. Thông tin tuyển sinh, tin tức, sự kiện và hoạt động nhà trường.`,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: SCHOOL.name,
  },
  // FIX: Thêm robots meta
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${notoSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
