// app/events/[slug]/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/db";
import { formatDateLong, formatDateTime } from "@/lib/format";
import { SCHOOL } from "@/lib/constants";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug, status: "PUBLISHED" },
    select: { title: true, description: true, coverImage: true },
  });
  if (!event) return { title: "Không tìm thấy" };
  return {
    title: `${event.title} | ${SCHOOL.shortName}`,
    description: event.description.slice(0, 160),
    openGraph: {
      title: event.title,
      description: event.description.slice(0, 160),
      images: event.coverImage ? [event.coverImage] : [],
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  const event = await prisma.event.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { author: { select: { name: true } } },
  });

  if (!event) notFound();

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      <article className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-primary font-bold mb-10 hover:underline"
        >
          <ArrowLeft size={18} /> Quay lại sự kiện
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {event.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-md text-xs font-bold uppercase">
                <Tag size={12} />
                {event.category}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight tracking-tight mb-8">
            {event.title}
          </h1>

          {/* Event Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-surface-container rounded-2xl border border-outline/10">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-body mb-0.5">
                  Thời gian
                </p>
                <p className="font-bold text-on-surface text-sm">
                  {formatDateTime(event.eventDate)}
                </p>
              </div>
            </div>
            {event.location && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant font-body mb-0.5">
                    Địa điểm
                  </p>
                  <p className="font-bold text-on-surface text-sm">
                    {event.location}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {event.coverImage && (
          <div className="rounded-3xl overflow-hidden shadow-xl mb-12">
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none font-body text-on-surface-variant prose-headings:font-headline prose-headings:text-on-surface prose-a:text-primary prose-strong:text-on-surface">
          <ReactMarkdown>{event.description}</ReactMarkdown>
        </div>
      </article>

      <Footer />
    </main>
  );
}
