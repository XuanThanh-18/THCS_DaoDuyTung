"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award } from "lucide-react";

interface Student {
  id: number;
  name: string;
  achievement: string;
  description: string;
  image: string;
}

const achievementStudents: Student[] = [
  {
    id: 1,
    name: "Nguyễn Minh Anh",
    achievement: "Huy chương Vàng - Toán",
    description:
      "Học sinh xuất sắc với kiến thức Toán sâu, đạt điểm cao liên tục trong các kỳ thi quốc gia.",
    image: "https://picsum.photos/seed/student1/300/350",
  },
  {
    id: 2,
    name: "Trần Bảo Ngân",
    achievement: "Á quân - Tiếng Anh",
    description:
      "Thành thạo tiếng Anh, đã đạt chứng chỉ IELTS 7.5, tham gia các cuộc thi quốc tế.",
    image: "https://picsum.photos/seed/student2/300/350",
  },
  {
    id: 3,
    name: "Lê Thanh Huy",
    achievement: "Huy chương Vàng - Khoa học",
    description:
      "Có khả năng tư duy khoa học xuất sắc, thành công trong các dự án nghiên cứu.",
    image: "https://picsum.photos/seed/student3/300/350",
  },
  {
    id: 4,
    name: "Phạm Thảo Nhi",
    achievement: "Quán quân - Văn học",
    description:
      "Tài năng văn chương nổi bật, viết luận xuất sắc, yêu thích đọc sách và sáng tác.",
    image: "https://picsum.photos/seed/student4/300/350",
  },
  {
    id: 5,
    name: "Đặng Quốc Hùng",
    achievement: "Huy chương Bạc - Tin học",
    description:
      "Lập trình tài ba, tham gia các cuộc thi tin học online và offline đạt thứ hạng cao.",
    image: "https://picsum.photos/seed/student5/300/350",
  },
  {
    id: 6,
    name: "Vũ Hà Linh",
    achievement: "Á quân - Thể thao",
    description:
      "Vận động viên xuất sắc, đại diện nhà trường tham gia các giải thể thao cấp tỉnh.",
    image: "https://picsum.photos/seed/student6/300/350",
  },
  {
    id: 7,
    name: "Hoàng Gia Bảo",
    achievement: "Huy chương Vàng - Sinh học",
    description:
      "Chuyên sâu về sinh học, tham gia các hội thảo khoa học và dự án bảo vệ môi trường.",
    image: "https://picsum.photos/seed/student7/300/350",
  },
  {
    id: 8,
    name: "Dương Ngọc Hân",
    achievement: "Quán quân - Âm nhạc",
    description:
      "Tài năng âm nhạc đa tài, sáng tác và biểu diễn tốt, giảng dạy cho các bạn.",
    image: "https://picsum.photos/seed/student8/300/350",
  },
  {
    id: 9,
    name: "Phan Minh Khôi",
    achievement: "Huy chương Bạc - Toán",
    description:
      "Giải quyết bài toán phức tạp nhanh chóng, luôn đạt điểm cao trong các kỳ thi.",
    image: "https://picsum.photos/seed/student9/300/350",
  },
  {
    id: 10,
    name: "Ngô Quỳnh Anh",
    achievement: "Á quân - Vẽ",
    description:
      "Tài năng mỹ thuật thực sự, tranh vẽ của em đã được trưng bày tại các triển lãm.",
    image: "https://picsum.photos/seed/student10/300/350",
  },
];

const ITEMS_PER_PAGE = 4;

export default function AchievementSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const maxSlide = achievementStudents.length - ITEMS_PER_PAGE;

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev + 1;
      return next > maxSlide ? maxSlide : next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev - 1;
      return next < 0 ? 0 : next;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const moveDistance = e.clientX - dragStart;
    setDragOffset(moveDistance);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (Math.abs(dragOffset) > 50) {
      if (dragOffset > 0) {
        // Kéo sang phải → trượt lùi
        prevSlide();
      } else {
        // Kéo sang trái → trượt tiến
        nextSlide();
      }
    }

    setDragOffset(0);
  };

  const displayedStudents = achievementStudents.slice(
    currentSlide,
    currentSlide + ITEMS_PER_PAGE,
  );

  return (
    <section className="py-24 bg-yellow-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">
              Thành tích xuất sắc
            </span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface mt-4">
              Học sinh <span className="text-primary">tiêu biểu</span>
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center gap-8">
          {/* Left Button */}
          <button
            onClick={prevSlide}
            className="flex-shrink-0 p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-primary hover:text-white text-primary transition-all shadow-lg border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Carousel */}
          <div
            className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform duration-500 ease-out"
              style={{
                transform: isDragging
                  ? `translateX(${dragOffset}px)`
                  : `translateX(0)`,
                transitionDuration: isDragging ? "0ms" : "500ms",
              }}
            >
              {displayedStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Student Image */}
                  <div className="relative h-48 overflow-hidden bg-surface-container-low">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                      <Award size={24} className="text-yellow-300" />
                    </div>
                  </div>

                  {/* Student Info */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-lg font-bold text-on-surface">
                      {student.name}
                    </h3>
                    <div className="flex items-start gap-2">
                      <Award
                        size={16}
                        className="text-primary flex-shrink-0 mt-1"
                      />
                      <p className="text-sm font-semibold text-on-surface">
                        {student.achievement}
                      </p>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed text-xs">
                      {student.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={nextSlide}
            className="flex-shrink-0 p-3 rounded-full bg-white/30 backdrop-blur-md hover:bg-primary hover:text-white text-primary transition-all shadow-lg border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: maxSlide + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-primary w-8" : "bg-primary/30 w-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
