// app/admin/users/page.tsx
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Shield, ShieldCheck, UserPlus, Calendar } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Quản lý tài khoản | Admin" };

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  // Chỉ SUPERADMIN mới được vào trang này
  if (!currentUser || currentUser.role !== "SUPERADMIN") {
    redirect("/admin/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tài khoản quản trị
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Quản lý tài khoản Admin và Super Admin — {users.length} tài khoản
          </p>
        </div>
        <Link
          href="/admin/register"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          <UserPlus size={16} />
          Tạo tài khoản mới
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                Tên
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                Email
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                Vai trò
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600">
                Ngày tạo
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        user.role === "SUPERADMIN"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {(user.name ?? user.email).charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-800">
                      {user.name ?? "—"}
                      {user.email === currentUser.email && (
                        <span className="ml-2 text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                          Bạn
                        </span>
                      )}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-600">{user.email}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      user.role === "SUPERADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role === "SUPERADMIN" ? (
                      <>
                        <ShieldCheck size={12} /> Super Admin
                      </>
                    ) : (
                      <>
                        <Shield size={12} /> Admin
                      </>
                    )}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={13} />
                    {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Permission info */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-xs font-semibold text-slate-600 mb-2">
          Phân quyền vai trò
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <Shield size={14} className="text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-slate-700">Admin</p>
              <p className="text-xs text-slate-500">
                Đăng và quản lý nội dung (bài viết, thông báo, sự kiện)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck
              size={14}
              className="text-purple-500 mt-0.5 shrink-0"
            />
            <div>
              <p className="text-xs font-semibold text-slate-700">
                Super Admin
              </p>
              <p className="text-xs text-slate-500">
                Toàn quyền hệ thống + quản lý tài khoản
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
