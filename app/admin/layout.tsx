// app/admin/layout.tsx
// Layout này bọc TẤT CẢ /admin/* kể cả login và register.
// Vì vậy KHÔNG được đặt auth check ở đây.
// Auth check đã được xử lý ở middleware.ts rồi.

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
