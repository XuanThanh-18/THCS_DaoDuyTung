import type {Metadata} from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'THCS Đào Duy Tùng - Khai Phóng & Sáng Tạo',
  description: 'Trường Trung học Cơ sở Đào Duy Tùng - Nơi ươm mầm tài năng, kiến tạo tương lai.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${inter.variable} ${notoSerif.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
