import React from "react";
import { ChevronRight, Calendar } from "lucide-react";
import Link from "next/link";

const mockEvents = [
  {
    id: "1",
    image:
      "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/661017680_122141739177009523_6087797697629764731_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeGm_nvGvc8-uCb8SyLC9vlK5ihauiSBoQTmKFq6JIGhBGxbNNuiT6NbceZhUFjqAfI2yb-JqU28YGl4vucOGLyB&_nc_ohc=3ZYIFpYToB0Q7kNvwExkiZ3&_nc_oc=AdoFWdiLsaO8VYY7CZX4NY_cBnkZFiBkfDDEo9LxR1OLmPYsqx9jBot-vxyv944qW9s&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=eSftvtreWYld86lcdFx2ig&_nc_ss=7a3a8&oh=00_Af38RdoLajcsrYd9lUENZzXhZtE9SPoV1Vlqsb21o0RUcw&oe=69D7A914",
    date: "2024-11-20",
    day: "20",
    month: "Tháng 11",
    title: "Hội trại truyền thống 2024",
    description:
      "Chương trình trải nghiệm kỹ năng sống và sinh hoạt tập thể lớn nhất năm với nhiều hoạt động ý nghĩa.",
    link: "/events/hoi-trai-truyen-thong-2024",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
    date: "2024-12-05",
    day: "05",
    month: "Tháng 12",
    title: "Triển lãm sáng tạo STEM",
    description:
      "Nơi các nhà khoa học nhí trình bày những dự án nghiên cứu độc đáo và sáng tạo của mình.",
    link: "/events/trien-lam-stem-2024",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
    date: "2024-12-15",
    day: "15",
    month: "Tháng 12",
    title: "Lễ trao giải học sinh giỏi",
    description:
      "Tôn vinh những học sinh xuất sắc trong năm học với nhiều phần thưởng giá trị.",
    link: "/events/le-trao-giai-hoc-sinh-gioi-2024",
  },
];

export default function EventSection() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          {/* <span className="text-secondary font-body uppercase tracking-widest text-sm font-bold">
            Lịch trình giáo dục
          </span> */}
          <h2 className="text-3xl md:text-4xl font-headline font-bold mt-4">
            Sự kiện nổi bật
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Event Content */}
              <div className="p-6">
                <h3 className="text-xl font-headline font-bold text-slate-800 mb-1 line-clamp-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={14} className="text-slate-500" />
                  <span className="text-sm font-medium text-slate-600">
                    {event.day} {event.month}
                  </span>
                </div>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 font-body leading-relaxed">
                  {event.description}
                </p>
                <Link
                  href={event.link}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors group-hover:gap-3"
                >
                  Xem chi tiết
                  <ChevronRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
