// app/documents/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { formatDateVN } from "@/lib/format";
import { SCHOOL, DOCUMENT_CATEGORIES } from "@/lib/constants";
import type { Metadata } from "next";
import DocumentSearch from "@/components/DocumentSearch";

export const metadata: Metadata = {
  title: `Văn bản & Tài liệu | ${SCHOOL.shortName}`,
  description: `Tài liệu, văn bản hành chính của ${SCHOOL.name}`,
};

async function getDocuments() {
  return prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      fileUrl: true,
      fileType: true,
      fileSize: true,
      category: true,
      createdAt: true,
    },
  });
}

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <header className="mb-16">
          <span className="text-tertiary font-bold tracking-widest text-xs uppercase mb-3 block">
            Hệ thống lưu trữ
          </span>
          <h1 className="text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight">
            Văn bản & Tài liệu
          </h1>
          <p className="mt-4 text-on-surface-variant max-w-2xl text-lg font-body">
            Truy cập và tải về các văn bản quy định, biểu mẫu và tài liệu chính
            thức của nhà trường.
          </p>
        </header>

        {/* Client component để handle search */}
        <DocumentSearch documents={documents} />
      </div>

      <Footer />
    </main>
  );
}
