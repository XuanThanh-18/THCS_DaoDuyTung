"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Files,
  LogOut,
  Plus,
  Settings,
  Users,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { name: "Tổng quan", icon: LayoutDashboard, id: "dashboard" },
  { name: "Bài viết", icon: FileText, id: "posts" },
  { name: "Sự kiện", icon: Calendar, id: "events" },
  { name: "Tài liệu", icon: Files, id: "documents" },
  { name: "Người dùng", icon: Users, id: "users" },
  { name: "Cài đặt", icon: Settings, id: "settings" },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Vẫn redirect ngay cả nếu lỗi
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
            DDT
          </div>
          <span className="font-headline font-bold text-lg">Admin Panel</span>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-body text-sm",
                activeTab === item.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-body text-sm"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-headline font-bold text-on-surface">
              {sidebarItems.find((i) => i.id === activeTab)?.name}
            </h1>
            <p className="text-on-surface-variant font-body mt-1">
              Chào mừng trở lại, Quản trị viên
            </p>
          </div>
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
            <Plus size={20} />
            Thêm mới
          </button>
        </header>

        {activeTab === "dashboard" && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  label: "Tổng bài viết",
                  value: "42",
                  icon: FileText,
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  label: "Sự kiện sắp tới",
                  value: "12",
                  icon: Calendar,
                  color: "text-secondary",
                  bg: "bg-secondary/10",
                },
                {
                  label: "Lượt truy cập",
                  value: "1,284",
                  icon: TrendingUp,
                  color: "text-tertiary",
                  bg: "bg-tertiary/10",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-3xl shadow-sm editorial-shadow flex items-center gap-6"
                >
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center",
                      stat.bg,
                      stat.color,
                    )}
                  >
                    <stat.icon size={32} />
                  </div>
                  <div>
                    <p className="text-on-surface-variant text-sm font-body font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-headline font-bold text-on-surface mt-1">
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-sm editorial-shadow overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-headline font-bold text-xl">
                  Hoạt động gần đây
                </h3>
                <button className="text-primary text-sm font-bold hover:underline">
                  Xem tất cả
                </button>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  {
                    title: "Bài viết mới: Lễ Khai Giảng 2024",
                    time: "2 giờ trước",
                    type: "post",
                  },
                  {
                    title: "Cập nhật tài liệu: Nội quy học sinh",
                    time: "5 giờ trước",
                    type: "doc",
                  },
                  {
                    title: "Sự kiện mới: Hội trại truyền thống",
                    time: "Hôm qua",
                    type: "event",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                        {item.type === "post" ? (
                          <FileText size={18} />
                        ) : item.type === "doc" ? (
                          <Files size={18} />
                        ) : (
                          <Calendar size={18} />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface font-body">
                          {item.title}
                        </p>
                        <p className="text-xs text-on-surface-variant font-body">
                          {item.time}
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <Settings size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== "dashboard" && (
          <div className="bg-white rounded-3xl shadow-sm editorial-shadow p-20 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6">
              {(() => {
                const Icon = sidebarItems.find((i) => i.id === activeTab)?.icon;
                return Icon ? <Icon size={48} /> : null;
              })()}
            </div>
            <h3 className="text-2xl font-headline font-bold text-on-surface">
              Tính năng đang phát triển
            </h3>
            <p className="text-on-surface-variant font-body mt-2 max-w-md">
              Mô-đun quản lý{" "}
              {sidebarItems.find((i) => i.id === activeTab)?.name.toLowerCase()}{" "}
              đang được hoàn thiện. Vui lòng quay lại sau.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
