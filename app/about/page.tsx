"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Quote,
  Award,
  Users,
  BookOpen,
  Building2,
  GraduationCap,
  Trophy,
  Star,
  MapPin,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import Link from "next/link";

/* ─────────── Reusable fade-in wrapper ─────────── */
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────── Section label ─────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-5">
      <div className="w-8 h-[2px] bg-primary" />
      <span className="text-primary font-body text-xs font-bold tracking-[0.2em] uppercase">
        {children}
      </span>
    </div>
  );
}

/* ─────────── Stat card ─────────── */
function StatCard({
  value,
  label,
  color = "primary",
}: {
  value: string;
  label: string;
  color?: "primary" | "secondary" | "tertiary" | "green";
}) {
  const colorMap = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary",
    green: "text-green-600",
  };
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-outline-variant/30 hover:shadow-md transition-shadow">
      <p className={`text-4xl font-bold mb-1 font-headline ${colorMap[color]}`}>
        {value}
      </p>
      <p className="text-sm text-on-surface-variant font-body">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO — full-bleed cinematic with scroll cue
      ══════════════════════════════════════════ */}
      <section className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/about-hero/1920/1080"
            alt="Trường THCS Đào Duy Tùng"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        {/* Floating badge top-right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-8 right-8 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider"
        >
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          Trường chất lượng cao Đông Anh
        </motion.div>

        {/* Main hero text — bottom-left editorial style */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-12 h-[3px] bg-primary rounded-full" />
              <span className="text-white/70 text-sm font-body tracking-[0.15em] uppercase font-medium">
                Thành lập 26/08/2025
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-white leading-[1.05] tracking-tight max-w-4xl mb-8">
              Thực Học —<br />
              <em className="text-primary not-italic">Thực Làm —</em>
              <br />
              Thực Giá Trị
            </h1>

            <p className="text-white/75 text-lg md:text-xl max-w-xl font-body leading-relaxed mb-10">
              Trường THCS Đào Duy Tùng, Đông Anh, Hà Nội — nơi thắp sáng niềm
              tin và gieo mầm khát vọng cho thế hệ tương lai.
            </p>

            <div className="flex items-center gap-4 text-white/50 text-sm font-body">
              <MapPin size={14} />
              <span>Thôn Đài Bi, xã Đông Anh, Hà Nội</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          QUICK STATS BAR
      ══════════════════════════════════════════ */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {[
              { value: "615", label: "Học sinh" },
              { value: "42", label: "Cán bộ & giáo viên" },
              { value: "7.567m²", label: "Diện tích khuôn viên" },
              { value: "16", label: "Lớp học" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} direction="up">
                <div className="py-8 px-6 md:px-10 text-center">
                  <p className="text-3xl md:text-4xl font-headline font-bold mb-1">
                    {s.value}
                  </p>
                  <p className="text-white/70 text-sm font-body">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HISTORY — asymmetric layout
      ══════════════════════════════════════════ */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Image column */}
            <FadeIn direction="left" className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://picsum.photos/seed/history/800/1000"
                    alt="Lịch sử hình thành trường"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Floating milestone card */}
                <div className="absolute -bottom-8 -right-4 md:-right-10 bg-white rounded-2xl shadow-xl p-6 max-w-[200px]">
                  <Calendar size={20} className="text-primary mb-2" />
                  <p className="text-2xl font-headline font-bold text-on-surface">
                    2025
                  </p>
                  <p className="text-xs text-on-surface-variant font-body mt-1">
                    Năm thành lập trường
                  </p>
                </div>
                {/* Accent blob */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
              </div>
            </FadeIn>

            {/* Text column */}
            <FadeIn
              direction="right"
              delay={0.15}
              className="lg:col-span-7 lg:pt-8"
            >
              <SectionLabel>Lịch sử hình thành</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-8 leading-tight">
                Mốc son lịch sử giáo dục xã Đông Anh
              </h2>

              <div className="space-y-5 text-on-surface-variant text-lg leading-relaxed font-body mb-10">
                <p>
                  Ngày <strong className="text-on-surface">26/8/2025</strong>{" "}
                  đánh dấu một cột mốc quan trọng với sự ra đời của Trường THCS
                  Đào Duy Tùng — ngôi trường công lập đầu tiên được xây dựng
                  theo mô hình định hướng Chất lượng cao tại xã Đông Anh, Hà
                  Nội. Trường tọa lạc tại thôn Đài Bi với diện tích 7.567 m².
                </p>
                <p>
                  Ngôi trường vinh dự được mang tên nhà chí sĩ yêu nước{" "}
                  <strong className="text-on-surface">Đào Duy Tùng</strong> —
                  tấm gương sáng về lòng yêu nước và tinh thần kiên cường — là
                  niềm tự hào và động lực để thầy trò phấn đấu xây dựng môi
                  trường giáo dục hiện đại, nhân văn và giàu bản sắc.
                </p>
              </div>

              {/* Timeline milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    date: "26/8/2025",
                    event:
                      "Thành lập Trường THCS Đào Duy Tùng mô hình Chất lượng cao",
                    color: "border-primary",
                  },
                  {
                    date: "10/10/2025",
                    event:
                      "Lễ khánh thành trường, khẳng định vị thế giáo dục chất lượng cao",
                    color: "border-secondary",
                  },
                ].map((m, i) => (
                  <div
                    key={i}
                    className={`p-5 bg-surface-container-low rounded-xl border-l-4 ${m.color}`}
                  >
                    <p className="text-primary font-headline font-bold text-xl mb-1">
                      {m.date}
                    </p>
                    <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                      {m.event}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VISION & MISSION — dark glass cards
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-on-surface relative overflow-hidden">
        {/* background texture */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 50%, #a23a00 0%, transparent 50%), radial-gradient(circle at 75% 50%, #7a3fbb 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="text-center mb-16">
              <SectionLabel>Định hướng phát triển</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-white">
                Tầm nhìn & Sứ mệnh
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap size={32} />,
                title: "Sứ Mệnh",
                color: "border-primary/40",
                accent: "text-primary",
                content:
                  '"Thắp sáng niềm tin – Gieo mầm khát vọng" — Nơi dạy chữ, dạy người, nuôi dưỡng ước mơ, bồi đắp tinh thần hiếu học và rèn luyện bản lĩnh sáng tạo.',
              },
              {
                icon: <Star size={32} />,
                title: "Tầm Nhìn",
                color: "border-secondary/40",
                accent: "text-secondary-container",
                content:
                  "Trở thành trường THCS hàng đầu, tiên phong trong đổi mới giáo dục, đào tạo thế hệ công dân toàn cầu tự tin, sáng tạo và giàu nhân cách.",
              },
              {
                icon: <Zap size={32} />,
                title: "Tôn Chỉ",
                color: "border-tertiary/40",
                accent: "text-tertiary",
                content:
                  '"Thực học – Thực làm – Thực giá trị" — Xây dựng môi trường học tập thân thiện, đổi mới, khơi dậy khát vọng và lan tỏa tinh thần nhân ái.',
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div
                  className={`relative p-8 rounded-2xl border ${card.color} bg-white/5 backdrop-blur-sm h-full group hover:bg-white/10 transition-colors`}
                >
                  <div className={`mb-5 ${card.accent}`}>{card.icon}</div>
                  <h3
                    className={`text-xl font-headline font-bold mb-4 ${card.accent}`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-white/70 font-body leading-relaxed text-sm">
                    {card.content}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACILITIES — icon grid
      ══════════════════════════════════════════ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <FadeIn direction="left">
              <SectionLabel>Cơ sở vật chất</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface max-w-lg leading-tight">
                Trang Thiết Bị Hiện Đại Đạt Chuẩn Quốc Gia
              </h2>
            </FadeIn>
            <FadeIn direction="right" delay={0.1} className="shrink-0">
              <p className="text-on-surface-variant font-body max-w-sm text-right hidden md:block">
                Đầu tư đồng bộ hạ tầng để đảm bảo môi trường học tập tốt nhất.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Building2 size={28} />,
                title: "Khối Học",
                color: "text-primary",
                bg: "bg-primary/5 group-hover:bg-primary/10",
                items: [
                  "20 lớp học, sức chứa 800 học sinh",
                  "05 phòng học văn hoá mỗi tầng",
                  "01 phòng nghỉ giáo viên",
                  "02 khu vệ sinh nam, nữ riêng biệt",
                ],
              },
              {
                icon: <BookOpen size={28} />,
                title: "Phòng Bộ Môn",
                color: "text-secondary",
                bg: "bg-secondary/5 group-hover:bg-secondary/10",
                items: [
                  "12 phòng học bộ môn đa năng",
                  "Trang bị đầy đủ thiết bị giảng dạy",
                  "Phòng thực hành thí nghiệm",
                  "Phòng máy tính hiện đại",
                ],
              },
              {
                icon: <Trophy size={28} />,
                title: "Khối Đa Năng",
                color: "text-tertiary",
                bg: "bg-tertiary/5 group-hover:bg-tertiary/10",
                items: [
                  "Diện tích 810 m²",
                  "Tầng 1-2: 3.9m, Sàn thi đấu: 10.8m",
                  "Phục vụ thể thao & sự kiện",
                  "Sân khấu ngoài trời hiện đại",
                ],
              },
              {
                icon: <Users size={28} />,
                title: "Không Gian Xanh",
                color: "text-green-600",
                bg: "bg-green-50 group-hover:bg-green-100",
                items: [
                  "Khuôn viên 7.567 m² rộng rãi",
                  "Sân chơi đa năng cho học sinh",
                  "Vườn trường xanh mát",
                  "Không gian nghỉ ngơi thư giãn",
                ],
              },
              {
                icon: <GraduationCap size={28} />,
                title: "Thư Viện & Học Liệu",
                color: "text-orange-600",
                bg: "bg-orange-50 group-hover:bg-orange-100",
                items: [
                  "Thư viện sách phong phú",
                  "Tài nguyên học liệu số",
                  "Góc đọc sách yên tĩnh",
                  "Tài liệu tham khảo cập nhật",
                ],
              },
              {
                icon: <Star size={28} />,
                title: "Tiện Ích Khác",
                color: "text-blue-600",
                bg: "bg-blue-50 group-hover:bg-blue-100",
                items: [
                  "Căng-tin trường sạch sẽ, tiêu chuẩn",
                  "Y tế học đường đầy đủ",
                  "Camera an ninh toàn khuôn viên",
                  "Wifi phủ sóng toàn trường",
                ],
              },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div
                  className={`group p-8 rounded-2xl transition-all border border-transparent hover:border-on-surface/10 hover:shadow-lg cursor-default ${f.bg}`}
                >
                  <div className={`mb-5 ${f.color}`}>{f.icon}</div>
                  <h3 className="text-lg font-headline font-bold text-on-surface mb-4">
                    {f.title}
                  </h3>
                  <ul className="space-y-2">
                    {f.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-on-surface-variant font-body"
                      >
                        <CheckCircle2
                          size={14}
                          className={`mt-0.5 shrink-0 ${f.color}`}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STAFF — horizontal with big numbers
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <SectionLabel>Đội ngũ</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-6">
                Các Cán Bộ, Giáo Viên Tâm Huyết
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed font-body mb-8">
                Đội ngũ cán bộ giáo viên giàu kinh nghiệm, tâm huyết với nghề —
                luôn đặt sự phát triển toàn diện của học sinh lên hàng đầu.
              </p>

              <div className="p-5 bg-white rounded-xl border-l-4 border-primary shadow-sm">
                <p className="text-on-surface font-body text-base leading-relaxed">
                  <strong>Tổng số học sinh:</strong> 615 HS phân bổ về 16 lớp,
                  luôn nhận được sự chăm sóc chu đáo từ toàn thể đội ngũ nhà
                  trường.
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <StatCard value="42" label="Tổng số CBGVNV" color="primary" />
                <StatCard
                  value="31"
                  label="Tổng số Giáo Viên"
                  color="secondary"
                />
                <StatCard value="2" label="Cán Bộ Quản Lý" color="tertiary" />
                <StatCard
                  value="9"
                  label="Nhân Viên Hành Chính"
                  color="green"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ACHIEVEMENTS
      ══════════════════════════════════════════ */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="mb-16">
            <SectionLabel>Thành tích</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
              Kết Quả & Danh Hiệu Nổi Bật
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Teacher achievements */}
            <FadeIn direction="left" delay={0.1}>
              <div className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Award size={20} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-on-surface">
                    Thành Tích Giáo Viên
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: "primary",
                      text: "Thầy Nguyễn Xuân Sơn được CT UBND TP tặng bằng khen",
                    },
                    {
                      icon: "secondary",
                      text: "Cô Nguyễn Thị Lan và Cô Nguyễn Thị Bích Thành được CT UBND TP tặng bằng khen",
                    },
                    {
                      icon: "tertiary",
                      text: "Các giáo viên đạt giải Nhất, Nhì, Ba trong hội thi Giáo Viên Dạy Giỏi cấp xã",
                    },
                    {
                      icon: "green",
                      text: "Đạt giải Nhì hướng dẫn học sinh thi Nghiên cứu khoa học cấp xã",
                    },
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors"
                    >
                      <Award
                        size={16}
                        className={
                          a.icon === "primary"
                            ? "text-primary mt-0.5 shrink-0"
                            : a.icon === "secondary"
                              ? "text-secondary mt-0.5 shrink-0"
                              : a.icon === "tertiary"
                                ? "text-tertiary mt-0.5 shrink-0"
                                : "text-green-600 mt-0.5 shrink-0"
                        }
                      />
                      <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                        {a.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Student achievements */}
            <FadeIn direction="right" delay={0.15}>
              <div className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Trophy size={20} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-on-surface">
                    Thành Tích Học Sinh
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    "Tỉ lệ học sinh Khá - Giỏi đạt 98%, vượt chỉ tiêu thành phố",
                    "Nhiều học sinh đạt giải trong các kỳ thi học sinh giỏi cấp huyện",
                    "Học sinh tham gia và đạt giải thi khoa học kỹ thuật",
                    "Phong trào văn nghệ, thể thao phát triển mạnh với nhiều giải thưởng",
                  ].map((a, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors"
                    >
                      <Star
                        size={16}
                        className="text-secondary mt-0.5 shrink-0 fill-secondary"
                      />
                      <p className="text-sm text-on-surface-variant font-body leading-relaxed">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRINCIPAL MESSAGE — editorial quote block
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-5">
              {/* Image */}
              <div className="lg:col-span-2 relative min-h-[380px] lg:min-h-0">
                <img
                  src="https://picsum.photos/seed/principal/600/800"
                  alt="Hiệu Trưởng nhà trường"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 hidden lg:block" />
              </div>

              {/* Quote */}
              <div className="lg:col-span-3 p-10 md:p-16 flex flex-col justify-center">
                <Quote
                  size={52}
                  className="text-primary/15 mb-6 -ml-2"
                  strokeWidth={1.5}
                />
                <blockquote className="text-2xl md:text-3xl font-headline font-bold text-on-surface italic leading-snug mb-8">
                  "Giáo dục không phải là việc đổ đầy một cái bình, mà là thắp
                  sáng một ngọn lửa."
                </blockquote>
                <p className="text-on-surface-variant text-base font-body leading-relaxed mb-8">
                  Tại THCS Đào Duy Tùng, chúng tôi tin rằng mỗi đứa trẻ là một
                  hạt mầm tiềm năng. Với tôn chỉ{" "}
                  <em className="text-primary not-italic font-semibold">
                    "Thực học – Thực làm – Thực giá trị"
                  </em>
                  , chúng tôi cam kết tạo ra môi trường học tập nơi mỗi học sinh
                  không chỉ tiếp nhận kiến thức mà còn phát triển kỹ năng sống
                  và rèn luyện bản lĩnh.
                </p>
                <div>
                  <p className="font-bold text-lg text-on-surface font-headline">
                    Hiệu Trưởng Nhà Trường
                  </p>
                  <p className="text-primary text-sm font-body mt-1">
                    Trường THCS Đào Duy Tùng
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAMILY SUPPORT SECTION
      ══════════════════════════════════════════ */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <SectionLabel>Sự Ủng Hộ</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mb-6">
                Hỗ Trợ Từ Gia Đình Đào Duy Tùng
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed font-body mb-8">
                Ngay từ khi thành lập, trường luôn nhận được sự quan tâm, giúp
                đỡ và tạo điều kiện về cả vật chất lẫn tinh thần của gia đình cụ
                Đào Duy Tùng.
              </p>

              <div className="space-y-4">
                {[
                  "Hỗ trợ cơ sở vật chất và trang thiết bị giảng dạy",
                  "Trao học bổng khuyến học cho học sinh xuất sắc",
                  "Đồng hành trong các hoạt động văn hoá giáo dục",
                  "Kết nối cộng đồng, phát triển bền vững nhà trường",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2
                      size={18}
                      className="text-tertiary shrink-0"
                    />
                    <p className="text-on-surface-variant font-body">{item}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.15}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-primary/5 rounded-3xl rotate-3" />
                <div className="absolute inset-0 bg-secondary/5 rounded-3xl -rotate-2" />
                <img
                  src="https://picsum.photos/seed/family-support/600/600"
                  alt="Gia đình Đào Duy Tùng"
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-xl"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-primary overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 50%, white 0%, transparent 60%)",
          }}
        />
        <FadeIn className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white mb-4">
            Liên hệ với chúng tôi
          </h2>
          <p className="text-white/80 font-body text-lg mb-8">
            Có câu hỏi về trường hoặc muốn tìm hiểu thêm thông tin tuyển sinh?
            Chúng tôi luôn sẵn sàng lắng nghe.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-white/90 transition-colors shadow-lg"
            >
              Liên hệ ngay
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
            >
              Xem tin tức
            </Link>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </main>
  );
}
