import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { Plus, FileText, Calendar, Bell } from "lucide-react";

export const metadata = {
  title: "Quản lý nội dung | Admin",
  description: "Quản lý bài viết, sự kiện, thông báo",
};

export default async function ContentPage() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const contentTypes = [
    {
      title: "📰 Bài Viết & Tin Tức",
      description: "Quản lý bài viết, tin tức trên website",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      link: "/admin/content/post/new",
      action: "Thêm bài viết mới",
    },
    {
      title: "🎉 Sự Kiện",
      description: "Quản lý các sự kiện, hoạt động của trường",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      link: "/admin/content/event/new",
      action: "Thêm sự kiện mới",
    },
    {
      title: "📢 Thông Báo",
      description: "Quản lý thông báo quan trọng cho học sinh",
      icon: Bell,
      color: "from-orange-500 to-orange-600",
      link: "/admin/content/announcement/new",
      action: "Thêm thông báo mới",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            📚 Quản Lý Nội Dung
          </h1>
          <p className="text-lg text-slate-600">
            Tạo và quản lý bài viết, sự kiện, thông báo cho website THCS Đào Duy Tùng
          </p>
        </div>

        {/* Content Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contentTypes.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.link}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                {/* Color Header */}
                <div className={`bg-gradient-to-r ${item.color} h-24 flex items-end p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform"></div>
                  <Icon className="w-12 h-12 text-white" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 text-sm mb-6">
                    {item.description}
                  </p>

                  {/* Button */}
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    <Plus size={20} />
                    <span>{item.action}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 border-2 border-blue-200 rounded-lg p-6 md:p-8">
          <h3 className="text-lg font-bold text-blue-900 mb-4">💡 Hướng Dẫn Sử Dụng</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">✍️ Viết Nội Dung</h4>
              <p className="text-sm text-blue-800">
                Sử dụng trình soạn thảo giàu tính năng để viết nội dung với định dạng, ảnh, liên kết
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">🎨 Chèn Ảnh & Media</h4>
              <p className="text-sm text-blue-800">
                Dễ dàng thêm hình ảnh, căn chỉnh text, tạo danh sách có thứ tự
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">📅 Lên Lịch & Xuất Bản</h4>
              <p className="text-sm text-blue-800">
                Chọn danh mục, trạng thái, ngày xuất bản và xem trước nội dung
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
