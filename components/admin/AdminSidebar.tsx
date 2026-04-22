// components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_NAV_ITEMS, SCHOOL } from "@/lib/constants";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Files,
  Image,
  Mail,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Files,
  Image,
  Mail,
};

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

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 min-h-screen">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
            {SCHOOL.code}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-tight truncate">
              {SCHOOL.shortName}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = ICON_MAP[item.icon] ?? FileText;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-white/10",
              )}
            >
              <Icon size={18} className="shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {isActive && (
                <ChevronRight size={14} className="shrink-0 opacity-60" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <div className="px-3 py-2 rounded-lg bg-white/5">
          <p className="text-xs text-slate-400 truncate">{userEmail}</p>
          <p className="text-xs text-slate-500 mt-0.5">{userRole}</p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
        >
          <LogOut size={18} className="shrink-0" />
          {loggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
        </button>
      </div>
    </aside>
  );
}
