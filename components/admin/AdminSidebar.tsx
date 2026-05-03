// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SCHOOL } from "@/lib/constants";
import Image from "next/image";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Files,
  Image as ImageIcon,
  Mail,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";
import { useState } from "react";

const NAV_SECTIONS = [
  {
    label: "Tổng quan",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Nội dung",
    items: [
      { label: "Bài viết", href: "/admin/posts", icon: FileText },
      { label: "Sự kiện", href: "/admin/events", icon: Calendar },
      { label: "Thông báo", href: "/admin/announcements", icon: Bell },
    ],
  },
  {
    label: "Tài nguyên",
    items: [
      { label: "Tài liệu", href: "/admin/documents", icon: Files },
      { label: "Thư viện ảnh", href: "/admin/gallery", icon: ImageIcon },
    ],
  },
  {
    label: "Liên hệ",
    items: [{ label: "Tin nhắn", href: "/admin/contact-messages", icon: Mail }],
  },
];

interface AdminSidebarProps {
  userEmail: string;
  userRole: string;
}

export default function AdminSidebar({
  userEmail,
  userRole,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
    }
  };

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/admin/dashboard" && pathname.startsWith(href));

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-screen">
      {/* ── Brand ── */}
      <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-100">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold">DDT</span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate leading-tight">
            {SCHOOL.shortName}
          </p>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
            Admin Panel
          </p>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                        active
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      )}
                    >
                      <Icon
                        size={16}
                        className={active ? "text-blue-600" : "text-slate-400"}
                      />
                      {item.label}
                      {active && (
                        <ChevronRight
                          size={14}
                          className="ml-auto text-blue-400"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User info + Logout ── */}
      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-3 px-2 py-2 mb-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-700 truncate">
              {userEmail.split("@")[0]}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <Shield size={10} className="text-blue-500" />
              <span className="text-[10px] text-blue-600 font-medium">
                {userRole}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
        >
          <LogOut size={15} />
          {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>
      </div>
    </aside>
  );
}
