import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import NewsSection from "@/components/sections/NewsSection";
import AchievementSection from "@/components/sections/AchievementSection";
import EventSection from "@/components/sections/EventSection";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <NewsSection />
      <AchievementSection />
      <EventSection />

      {/* About Section on Home */}
      <section className="py-24 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://picsum.photos/seed/students/400/500"
                  alt="Students collaborating"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
                <div className="bg-secondary p-8 rounded-2xl text-white">
                  <p className="text-4xl font-bold">98%</p>
                  <p className="text-xs uppercase tracking-widest mt-1">
                    Học sinh khá giỏi
                  </p>
                </div>
              </div>
              <div className="pt-12 space-y-4">
                <div className="bg-primary p-8 rounded-2xl text-white">
                  <p className="text-4xl font-bold">10+</p>
                  <p className="text-xs uppercase tracking-widest mt-1">
                    Câu lạc bộ
                  </p>
                </div>
                <img
                  src="https://picsum.photos/seed/campus/400/500"
                  alt="School courtyard"
                  className="w-full h-64 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square bg-secondary/5 rounded-full blur-3xl"></div>
          </div>

          <div className="space-y-8">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">
              Về chúng tôi
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
              Kiến tạo thế hệ{" "}
              <span className="text-secondary underline decoration-primary underline-offset-8">
                vững kiến thức
              </span>
              , giàu kỹ năng
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-lg font-body">
              Trường THCS Đào Duy Tùng tự hào là một trong những cơ sở giáo dục
              hàng đầu, nơi kết hợp nhuần nhuyễn giữa chương trình học chuẩn
              quốc gia và các hoạt động ngoại khóa đa dạng. Chúng tôi tập trung
              vào việc phát triển tư duy phản biện và tinh thần tự chủ của học
              sinh.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Mô hình Happy School",
                "Ngoại khóa phong phú",
                "Cơ sở vật chất hiện đại",
                "Đội ngũ GV tâm huyết",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-primary" />
                  <span className="font-bold text-on-surface">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="inline-block bg-secondary text-white px-10 py-4 rounded-full font-semibold hover:bg-slate-900 transition-all shadow-lg"
            >
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            Góc nhìn THCS Đào Duy Tùng
          </h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-8 px-6 md:px-12 snap-x no-scrollbar">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-80 md:w-96 h-64 flex-shrink-0 rounded-2xl overflow-hidden snap-center shadow-md"
            >
              <img
                src={`https://picsum.photos/seed/gallery-${i}/600/400`}
                alt={`Gallery ${i}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
