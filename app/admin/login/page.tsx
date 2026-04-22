"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Lock, Mail, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Có lỗi xảy ra");
        setIsLoading(false);
        return;
      }

      // Đăng nhập thành công
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Không thể kết nối đến máy chủ");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-container-low flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl editorial-shadow p-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6">
            DDT
          </div>
          <h1 className="text-3xl font-headline font-bold text-on-surface">
            Quản trị hệ thống
          </h1>
          <p className="text-on-surface-variant mt-2 font-body">
            Vui lòng đăng nhập để tiếp tục
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-body flex items-start gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface font-body">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body disabled:opacity-50"
                placeholder="admin@daoduytung.edu.vn"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-on-surface font-body">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-primary/40 font-body disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-container transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Đây là khu vực dành cho quản trị viên. Chỉ những người được phép mới
            có thể truy cập.
          </p>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-primary hover:text-primary-container font-medium text-sm"
          >
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </main>
  );
}
