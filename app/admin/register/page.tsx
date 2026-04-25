// app/admin/register/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SCHOOL } from "@/lib/constants";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Shield,
  Info,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

type Role = "ADMIN" | "SUPERADMIN";

interface SetupStatus {
  isFirstSetup: boolean;
  totalUsers: number;
}

export default function RegisterPage() {
  const router = useRouter();

  const [setupStatus, setSetupStatus] = useState<SetupStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("ADMIN");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Kiểm tra trạng thái setup
  useEffect(() => {
    fetch("/api/auth/register")
      .then((res) => res.json())
      .then((data) => {
        setSetupStatus(data);
        // Nếu lần đầu setup, bắt buộc chọn SUPERADMIN
        if (data.isFirstSetup) setRole("SUPERADMIN");
      })
      .catch(() => setSetupStatus({ isFirstSetup: false, totalUsers: 1 }))
      .finally(() => setLoadingStatus(false));
  }, []);

  // Kiểm tra độ mạnh mật khẩu
  const passwordStrength = (() => {
    if (!password) return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: "Yếu", color: "bg-red-500", width: "20%" };
    if (score <= 2)
      return { label: "Trung bình", color: "bg-yellow-500", width: "50%" };
    if (score <= 3) return { label: "Khá", color: "bg-blue-500", width: "70%" };
    return { label: "Mạnh", color: "bg-green-500", width: "100%" };
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Đăng ký thất bại");
        return;
      }

      setSuccess(
        `Tạo tài khoản ${role} thành công! Đang chuyển đến trang đăng nhập...`,
      );
      setTimeout(() => router.push("/admin/login"), 2000);
    } catch {
      setError("Không thể kết nối đến server. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingStatus) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isFirstSetup = setupStatus?.isFirstSetup ?? false;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-2xl mb-4">
            <span className="text-white font-bold text-lg">{SCHOOL.code}</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            {SCHOOL.shortName}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isFirstSetup
              ? "Thiết lập tài khoản quản trị viên đầu tiên"
              : "Tạo tài khoản quản trị mới"}
          </p>
        </div>

        {/* First Setup Banner */}
        {isFirstSetup && (
          <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
            <Sparkles size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-800">
                Lần đầu thiết lập hệ thống
              </p>
              <p className="text-xs text-blue-600 mt-0.5">
                Chưa có tài khoản nào trong hệ thống. Hãy tạo tài khoản{" "}
                <strong>SUPERADMIN</strong> đầu tiên để bắt đầu quản trị.
              </p>
            </div>
          </div>
        )}

        {/* Not First Setup Warning */}
        {!isFirstSetup && (
          <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
            <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                Yêu cầu xác thực
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                Hệ thống đã có tài khoản. Chỉ{" "}
                <strong>SUPERADMIN đang đăng nhập</strong> mới có thể tạo tài
                khoản mới. Nếu bạn chưa đăng nhập, vui lòng{" "}
                <Link href="/admin/login" className="underline font-semibold">
                  đăng nhập trước
                </Link>
                .
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-100 rounded-lg text-sm text-red-600">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="flex items-center gap-2.5 p-3.5 bg-green-50 border border-green-100 rounded-lg text-sm text-green-700">
                <CheckCircle2 size={16} className="shrink-0" />
                {success}
              </div>
            )}

            {/* Họ tên */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Họ và tên
              </label>
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                  autoComplete="name"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@daoduytung.edu.vn"
                  required
                  autoComplete="email"
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 8 ký tự"
                  required
                  autoComplete="new-password"
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {/* Password strength indicator */}
              {password && passwordStrength && (
                <div className="mt-2">
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${passwordStrength.color} rounded-full transition-all duration-300`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Độ mạnh:{" "}
                    <span
                      className={`font-medium ${
                        passwordStrength.label === "Mạnh"
                          ? "text-green-600"
                          : passwordStrength.label === "Khá"
                            ? "text-blue-600"
                            : passwordStrength.label === "Trung bình"
                              ? "text-yellow-600"
                              : "text-red-600"
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Xác nhận mật khẩu */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  required
                  autoComplete="new-password"
                  className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-300 bg-red-50"
                      : confirmPassword && password === confirmPassword
                        ? "border-green-300 bg-green-50"
                        : "border-slate-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Mật khẩu không khớp</p>
              )}
              {confirmPassword && password === confirmPassword && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Mật khẩu khớp
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Vai trò
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* ADMIN */}
                <button
                  type="button"
                  onClick={() => !isFirstSetup && setRole("ADMIN")}
                  disabled={isFirstSetup}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                    role === "ADMIN"
                      ? "border-blue-500 bg-blue-50"
                      : isFirstSetup
                        ? "border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 cursor-pointer"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      role === "ADMIN" ? "bg-blue-100" : "bg-slate-100"
                    }`}
                  >
                    <Shield
                      size={16}
                      className={
                        role === "ADMIN" ? "text-blue-600" : "text-slate-400"
                      }
                    />
                  </div>
                  <p
                    className={`text-sm font-semibold ${role === "ADMIN" ? "text-blue-700" : "text-slate-700"}`}
                  >
                    Admin
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                    Quản lý nội dung, đăng bài
                  </p>
                  {role === "ADMIN" && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  )}
                </button>

                {/* SUPERADMIN */}
                <button
                  type="button"
                  onClick={() => setRole("SUPERADMIN")}
                  className={`relative p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    role === "SUPERADMIN"
                      ? "border-purple-500 bg-purple-50"
                      : "border-slate-200 hover:border-purple-300 hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${
                      role === "SUPERADMIN" ? "bg-purple-100" : "bg-slate-100"
                    }`}
                  >
                    <ShieldCheck
                      size={16}
                      className={
                        role === "SUPERADMIN"
                          ? "text-purple-600"
                          : "text-slate-400"
                      }
                    />
                  </div>
                  <p
                    className={`text-sm font-semibold ${role === "SUPERADMIN" ? "text-purple-700" : "text-slate-700"}`}
                  >
                    Super Admin
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-tight">
                    Toàn quyền hệ thống
                  </p>
                  {role === "SUPERADMIN" && (
                    <div className="absolute top-2.5 right-2.5 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  )}
                </button>
              </div>

              {/* Role description */}
              <div className="mt-3 p-3 bg-slate-50 rounded-lg">
                {role === "ADMIN" ? (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-blue-600">Admin</span>{" "}
                    có thể đăng bài viết, thông báo, sự kiện và quản lý nội
                    dung. Không thể tạo tài khoản mới hoặc thay đổi cài đặt hệ
                    thống.
                  </p>
                ) : (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-purple-600">
                      Super Admin
                    </span>{" "}
                    có toàn quyền hệ thống bao gồm quản lý tài khoản, cài đặt hệ
                    thống và tất cả chức năng của Admin.
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !!success}
              className={`w-full py-2.5 px-4 text-white text-sm font-semibold rounded-lg transition-colors disabled:cursor-not-allowed ${
                role === "SUPERADMIN"
                  ? "bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400"
                  : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400"
              }`}
            >
              {loading
                ? "Đang tạo tài khoản..."
                : `Tạo tài khoản ${role === "SUPERADMIN" ? "Super Admin" : "Admin"}`}
            </button>

            {/* Link về đăng nhập */}
            <div className="pt-1 border-t border-slate-100">
              <Link
                href="/admin/login"
                className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
              >
                <ArrowLeft size={14} />
                Quay lại trang đăng nhập
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © {new Date().getFullYear()} {SCHOOL.name}
        </p>
      </div>
    </div>
  );
}
