// app/admin/(protected)/layout.tsx
// Layout này chỉ bọc các trang CẦN đăng nhập: dashboard, posts, events...
// Login và register KHÔNG nằm trong thư mục này nên không bị bọc.

import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950">
      <AdminSidebar userEmail={user.email} userRole={user.role} />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
