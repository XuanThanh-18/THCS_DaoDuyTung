// lib/constants.ts

export const SCHOOL = {
  name: "Trường THCS Đào Duy Tùng",
  shortName: "THCS Đào Duy Tùng",
  code: "DDT",
  address: "Hà Nội, Việt Nam",
  email: "contact@daoduytung.edu.vn",
  phone: "",
  foundedYear: 2000,
} as const;

export const POST_CATEGORIES = [
  "Tin tức",
  "Thông báo",
  "Hoạt động",
  "Thành tích",
  "Giáo dục",
  "Tuyển sinh",
] as const;

export const EVENT_CATEGORIES = [
  "Học thuật",
  "Văn nghệ",
  "Thể thao",
  "Tình nguyện",
  "Lễ kỷ niệm",
  "Hội thảo",
] as const;

export const DOCUMENT_CATEGORIES = [
  "Hành chính",
  "Học vụ",
  "Biểu mẫu",
  "Quy định",
  "Kế hoạch",
  "Báo cáo",
] as const;

export const CONTENT_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Nháp",
  PENDING: "Chờ duyệt",
  PUBLISHED: "Đã đăng",
};

export const CONTENT_STATUS_COLORS: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600",
  PENDING: "bg-yellow-100 text-yellow-700",
  PUBLISHED: "bg-green-100 text-green-700",
};

export const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Tin tức", href: "/news" },
  { label: "Sự kiện", href: "/events" },
  { label: "Thư viện ảnh", href: "/gallery" },
  { label: "Tài liệu", href: "/documents" },
  { label: "Liên hệ", href: "/contact" },
] as const;

export const ADMIN_NAV_ITEMS = [
  { label: "Tổng quan", href: "/admin/dashboard", icon: "LayoutDashboard" },
  { label: "Bài viết", href: "/admin/posts", icon: "FileText" },
  { label: "Sự kiện", href: "/admin/events", icon: "Calendar" },
  { label: "Thông báo", href: "/admin/announcements", icon: "Bell" },
  { label: "Tài liệu", href: "/admin/documents", icon: "Files" },
  { label: "Thư viện ảnh", href: "/admin/gallery", icon: "Image" },
  { label: "Liên hệ", href: "/admin/contact-messages", icon: "Mail" },
] as const;

export const PAGINATION = {
  defaultPageSize: 10,
  adminPageSize: 20,
} as const;
