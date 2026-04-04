import type {Metadata} from 'next';
import { Inter, Noto_Serif } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  title: 'THCS Đào Duy Tùng',
  description: 'Trang thông tin điện tử trường THCS Đào Duy Tùng',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={`${inter.variable} ${notoSerif.variable}`}>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
